#!/usr/bin/env python3
"""
Script to fix all metadata.json files to match the new data structure.
"""

import json
from pathlib import Path
from typing import Dict, Any, List

def fix_metadata_file(metadata_path: Path) -> None:
    """Fix a single metadata.json file to match the new structure."""
    if not metadata_path.exists():
        print(f"Skipping {metadata_path} - file does not exist")
        return
    
    try:
        # Read the current metadata
        with open(metadata_path, 'r', encoding='utf-8') as f:
            old_data = json.load(f)
        
        # Create new structure
        new_data = {
            "title": old_data.get("title", "Untitled"),
            "classes": old_data.get("included_in", []),  # Rename included_in to classes
            "content": None,  # Set to null, content comes from content.md
            "id": None  # Add id field as null
        }
        
        # Write the fixed metadata
        with open(metadata_path, 'w', encoding='utf-8') as f:
            json.dump(new_data, f, indent='\t', ensure_ascii=False)
        
        print(f"Fixed: {metadata_path}")
        
    except Exception as e:
        print(f"Error fixing {metadata_path}: {e}")

def fix_all_metadata_files(lessons_dir: Path) -> None:
    """Fix all metadata.json files in the lessons directory."""
    if not lessons_dir.exists():
        print(f"Lessons directory does not exist: {lessons_dir}")
        return
    
    fixed_count = 0
    
    for lesson_dir in lessons_dir.iterdir():
        if lesson_dir.is_dir():
            metadata_path = lesson_dir / "metadata.json"
            if metadata_path.exists():
                fix_metadata_file(metadata_path)
                fixed_count += 1
            else:
                print(f"No metadata.json found in {lesson_dir}")
    
    print(f"\nFixed {fixed_count} metadata.json files")

if __name__ == "__main__":
    repo_root = Path(__file__).parent.parent
    lessons_list_dir = repo_root / "lessons" / "list"
    
    print("Fixing all metadata.json files...")
    print(f"Lessons directory: {lessons_list_dir}")
    
    fix_all_metadata_files(lessons_list_dir)
    
    print("\nDone!")