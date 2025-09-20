from enum import Enum
from pathlib import Path
from typing import Any, Self, TypedDict
from json import JSONEncoder, JSONDecoder, loads, dumps

from codable import Codable


class AcademicLevel(Enum):
	SIXIEME = "6e"
	...

class IncludedInOutput(Codable):
	classname: str
	chapter: int
	disclaimer: str | None

class BakingOutput(Codable):
	title: str
	level: AcademicLevel | None
	included_in: list[IncludedInOutput]
	content: str | None

def bake_page(content_dir: Path, output_dir: Path):
	content_path = content_dir / "content.md"
	if not content_path.exists():
		raise RuntimeError()
	content_txt = content_path.read_text(encoding="utf-8")
	
	data_path = content_dir / "metadata.json"
	if not data_path.exists():
		raise RuntimeError()

	output = BakingOutput.decode_from_path(data_path)
	output.content = content_txt

	output.serialize(output_dir / f"{content_dir.name}.json")

if __name__ == "__main__":
	repo_root = Path(__file__).parent.parent
	content_dir = repo_root / "lessons/list/test"
	output_dir = repo_root / "website/src/assets/.lessons-json"
	bake_page(content_dir, output_dir)