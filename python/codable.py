from enum import Enum
from json import JSONEncoder
from json import loads as json_loads
from tomllib import loads as toml_loads
from pathlib import Path
from typing import Any, Self, TypedDict
from types import GenericAlias, UnionType

class Codable:
	def __init__(self, **kwargs):
		for attr_name, attr_type in self.__annotations__.items():
			value = Codable.parse2type(kwargs.get(attr_name), attr_type)
			setattr(self, attr_name, value)

	@staticmethod
	def parse2type(obj: Any, parse_type: type | GenericAlias | UnionType) -> Any:
		if isinstance(parse_type, GenericAlias):
			origin = parse_type.__origin__
			if origin in (tuple, list, set, frozenset):
				args = parse_type.__args__
				if len(args) == 1:
					inside_type, = parse_type.__args__
					return origin(Codable.parse2type(el, inside_type) for el in obj)
				
				if len(args) != len(obj): # in this case, arguments for the generic must match elements number
					raise RuntimeError(f"Mismatch between generic arguments {parse_type} and object number of elements {obj}")
				
				return origin(Codable.parse2type(el, tel) for el, tel in zip(obj, parse_type.__args__))
			elif origin == dict:
				key_type, value_type = parse_type.__args__
				return {Codable.parse2type(k, key_type): Codable.parse2type(v, value_type) for k, v in obj.items()}
			else:
				raise RuntimeError(f"`GenericAlias` {parse_type} not supported yet.")
		elif isinstance(parse_type, UnionType):
			for t in parse_type.__args__:
				try:
					return Codable.parse2type(obj, t)
				except:
					pass
			raise RuntimeError(f"{obj} cannot be parsed into any of {parse_type}.")
		elif issubclass(parse_type, Codable):
			if isinstance(obj, parse_type):
				return obj
			if not isinstance(obj, dict):
				raise RuntimeError()
			
			return parse_type(
				**{k: Codable.parse2type(v, parse_type.__annotations__[k]) for k, v in obj.items()}
			)
		
		if obj is None:
			if isinstance(obj, parse_type):
				return None
			raise RuntimeError()
	
		try:
			return parse_type(obj)
		except:
			raise RuntimeError(f"{obj} cannot be parsed into {parse_type}.")
	
	@classmethod
	def parse(cls, json_object: dict[str, Any]) -> str:
		return cls(**json_object)
	
	def encode(self) -> str:
		return CodableCustomEncoder(ensure_ascii=False).encode(self)
	
	@classmethod
	def decode_from_json_string(cls, json_str: str) -> Self:
		return cls.parse(json_loads(json_str))
	
	@classmethod
	def decode_from_toml_string(cls, toml_str: str) -> Self:
		return cls.parse(toml_loads(toml_str))
	
	@classmethod
	def decode_from_path(cls, txt_file: Path) -> Self:
		txt = txt_file.read_text("utf-8")

		if txt_file.suffix == ".json":
			return cls.decode_from_json_string(txt)
		elif txt_file.suffix == ".toml":
			return cls.decode_from_toml_string(txt)
		
		raise ValueError(f"`{txt_file.suffix}` not supported")
	
	def serialize(self, dump_file_path: Path):
		dump_file_path.write_text(self.encode(), "utf-8")


class CodableCustomEncoder(JSONEncoder):
	def default(self, o):
		if isinstance(o, Enum):
			return o.value
		
		try:
			return super().default(o)
		except:
			if not isinstance(o, Codable):
				raise RuntimeError()
		
		return {
			attrname: getattr(o, attrname)
			for attrname in o.__annotations__.keys()
		}


