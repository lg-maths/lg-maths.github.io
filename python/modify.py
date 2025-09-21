from enum import Enum
from pathlib import Path
from typing import Any, Self, TypedDict
from json import JSONEncoder, JSONDecoder, loads, dumps

from codable import Codable

if __name__ == "__main__":
	repo_root = Path(__file__).parent.parent
	lessons_dir = repo_root / "lessons/list"
	for d in lessons_dir.iterdir():
		data_path = d / "data.json"
		if data_path.exists():
			data_path.rename(
				data_path.with_name("metadata.json")
			)