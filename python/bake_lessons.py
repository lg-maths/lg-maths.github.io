from pathlib import Path
from typing import Any, Self, TypedDict
from tomllib import loads as toml_loads
from json import dumps as json_dumps
from uuid import uuid4

class Exercice(TypedDict):
	id: int
	statement: str
	solution: str

class ClassesEl(TypedDict):
	classname: str
	chapter: int
	disclaimer: str

class Lesson(TypedDict):
	title: str
	classes: list[ClassesEl]
	content: str | None
	exercises: list[Exercice] | None
	id: str | None

class OutputListLessonElement(TypedDict):
	id: str
	title: str
	classname: str
	chapter: int

class OutputListLessons(TypedDict):
	classes_sorted: list[str]
	lessons: list[OutputListLessonElement]

def _key_sort_classname(classname: str) -> int:
	SORT_CLASSES = "abcdefghijklmnopqrstuvwxyz654321T"

	try:
		return SORT_CLASSES.index(classname[0])
	except ValueError:
		return 0

def _validate_filename(file_name: str) -> bool:
	"""Returns True if file_name is a string containing 
	only alphanumerical characters. Only other char `-` is allowed."""
	return file_name.replace('-', '').isalnum()

def bake_list(lessons: list[Lesson], output_dir: Path):
	output = OutputListLessons(
		classes_sorted=sorted(
			set(
				c["classname"]
				for lesson in lessons
				for c in lesson["classes"]
			),
			key=_key_sort_classname
		),
		lessons=[
			OutputListLessonElement(
				id=lesson["id"],
				title=lesson["title"],
				classname=class_el["classname"],
				chapter=class_el["chapter"]
			)
			for lesson in lessons
			for class_el in lesson["classes"]
		]
	)

	output_file_path = output_dir / "generic.json"
	output_file_path.write_text(json_dumps(output))


def bake_all(list_dir: Path, output_dir: Path):
	output_dir.mkdir(parents=True, exist_ok=True)

	all_lessons: list[Lesson] = [
		toml_loads(lesson_toml_path.read_text("utf-8"))
		for lesson_toml_path in list_dir.iterdir()
		if lesson_toml_path.is_file() and lesson_toml_path.suffix == ".toml"
	]

	for lesson in all_lessons:
		if lesson["id"] is None:
			lesson["id"] = uuid4().hex
			print(f"WARNING: lesson ID for lesson {lesson["title"]} not set. Using UUID instead.")
		if not _validate_filename(lesson["id"]):
			raise Exception(f"'{lesson["id"]}' is not a valid ID.")
		for _class in lesson["classes"]:
			if _class["disclaimer"] == "":
				_class["disclaimer"] = None

	if (len(all_lessons) != len(set(lesson["id"] for lesson in all_lessons))):
		raise Exception("At least two lessons have same ID.")
	
	for lesson in all_lessons:
		output_file_path = output_dir / f"{lesson["id"]}.json"
		output_file_path.write_text(json_dumps(lesson), "utf-8")

	bake_list(all_lessons, output_dir)
		
if __name__ == "__main__":
	repo_root = Path(__file__).parent.parent
	bake_all(repo_root / "user-content/lessons", repo_root / "website/src/assets/json-data")