from enum import Enum
from pathlib import Path
from typing import Any, Self, TypedDict
from json import JSONEncoder, JSONDecoder, loads, dumps

from codable import Codable


class AcademicLevel(Enum):
	SIXIEME = "6e"
	CINQUIEME = "5e"
	QUATRIEME = "4e"
	TROISIEME = "3e"
	SECONDE = "2d"
	PREMIERE = "1e"
	TERMINALE = "Te"

class IncludedInOutput(Codable):
	classname: str
	chapter: int
	disclaimer: str | None

class BakingOutput(Codable):
	title: str
	level: AcademicLevel | None
	included_in: list[IncludedInOutput]
	content: str | None
	id: int | None

def bake_page(content_dir: Path, output_dir: Path, lesson_id: int):
	content_path = content_dir / "content.md"
	if not content_path.exists():
		raise RuntimeError()
	content_txt = content_path.read_text(encoding="utf-8")
	
	data_path = content_dir / "metadata.json"
	if not data_path.exists():
		raise RuntimeError()

	output = BakingOutput.decode_from_path(data_path)
	output.content = content_txt
	output.id = lesson_id

	output.serialize(output_dir / f"{lesson_id}.json")

def bake_all(list_dir: Path, output_dir: Path):
	for lesson_id, lesson_dir in enumerate(list_dir.iterdir()):
		bake_page(lesson_dir, output_dir, lesson_id)

if __name__ == "__main__":
	repo_root = Path(__file__).parent.parent
	bake_all(repo_root / "lessons/list", repo_root / "website/src/assets/.lessons-json")