from enum import Enum
from pathlib import Path
from typing import Any, Self, TypedDict
from json import JSONEncoder, JSONDecoder, loads, dumps

from codable import Codable

class ClassesEl(Codable):
	classname: str
	chapter: int
	disclaimer: str | None

class Metadata(Codable):
	title: str
	classes: list[ClassesEl]
	content: str | None
	id: int | None

class OutputListLessonElement(Codable):
	id: int
	title: str
	classname: str
	chapter: int

class OutputListLessons(Codable):
	classes_sorted: list[str]
	lessons: list[OutputListLessonElement]

def _key_sort_classname(classname: str) -> int:
	SORT_CLASSES = "654321T"

	try:
		return SORT_CLASSES.index(classname[0])
	except ValueError:
		return 0

def bake_page(content_dir: Path, output_dir: Path, lesson_id: int) -> Metadata:
	content_path = content_dir / "content.md"
	if not content_path.exists():
		raise RuntimeError()
	content_txt = content_path.read_text(encoding="utf-8")
	
	data_path = content_dir / "metadata.json"
	if not data_path.exists():
		raise RuntimeError()

	output = Metadata.decode_from_path(data_path)
	output.content = content_txt
	output.id = lesson_id

	output.serialize(output_dir / f"{lesson_id}.json")

	return output

def bake_list(lessons: list[Metadata], output_dir: Path):
	output = OutputListLessons(
		classes_sorted=sorted(
			set(
				c.classname
				for metadata in lessons
				for c in metadata.classes
			),
			key=_key_sort_classname
		),
		lessons=[
			OutputListLessonElement(
				id=metadata.id,
				title=metadata.title,
				classname=class_el.classname,
				chapter=class_el.chapter
			)
			for metadata in lessons
			for class_el in metadata.classes
		]
	)

	output.serialize(output_dir / "generic.json")


def bake_all(list_dir: Path, output_dir: Path):
	all_metadata = [
		bake_page(lesson_dir, output_dir, lesson_id)
		for lesson_id, lesson_dir in enumerate(list_dir.iterdir())
	]

	bake_list(all_metadata, output_dir)
		
if __name__ == "__main__":
	repo_root = Path(__file__).parent.parent
	bake_all(repo_root / "lessons/list", repo_root / "website/src/assets/.lessons-json")