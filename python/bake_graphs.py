#!/usr/bin/env python3
"""
Bake Graphs Script

This script processes Python files in user-content/graphs/ that contain doit() functions
returning matplotlib Figure objects. It saves these figures as SVG files in
website/src/assets/svg-data/ for use in the Angular application.
"""

import os
import sys
import importlib.util
from pathlib import Path
from typing import Optional
import matplotlib.pyplot as plt
from matplotlib.figure import Figure


def load_module_from_file(filepath: str) -> Optional[object]:
    """
    Load a Python module from a file path using importlib.

    Args:
        filepath: Path to the Python file

    Returns:
        The loaded module object, or None if loading fails
    """
    try:
        spec = importlib.util.spec_from_file_location("graph_module", filepath)
        if spec is None or spec.loader is None:
            print(f"Warning: Could not create spec for {filepath}")
            return None

        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        return module
    except Exception as e:
        print(f"Error loading module from {filepath}: {e}")
        return None


def save_figure_as_svg(figure: Figure, output_path: str) -> bool:
    """
    Save a matplotlib Figure as SVG.

    Args:
        figure: The matplotlib Figure to save
        output_path: Path where to save the SVG file

    Returns:
        True if successful, False otherwise
    """
    try:
        # Ensure the output directory exists
        output_dir = os.path.dirname(output_path)
        os.makedirs(output_dir, exist_ok=True)

        # Save as SVG
        figure.savefig(output_path, format='svg', bbox_inches='tight')
        print(f"Successfully saved: {output_path}")
        return True
    except Exception as e:
        print(f"Error saving figure to {output_path}: {e}")
        return False


def process_graph_file(graph_file_path: str, output_dir: str) -> bool:
    """
    Process a single graph file.

    Args:
        graph_file_path: Path to the Python file containing the doit() function
        output_dir: Directory where to save the SVG output

    Returns:
        True if successful, False otherwise
    """
    # Get the filename without extension for the output filename
    filename = os.path.basename(graph_file_path)
    name_without_ext = os.path.splitext(filename)[0]
    output_path = os.path.join(output_dir, f"{name_without_ext}.svg")

    # Load the module
    module = load_module_from_file(graph_file_path)
    if module is None:
        return False

    # Check if doit function exists
    if not hasattr(module, 'doit'):
        print(f"Warning: {filename} does not have a doit() function")
        return False

    try:
        # Call the doit function
        figure = module.doit()

        # Verify it's a matplotlib Figure
        if not isinstance(figure, Figure):
            print(f"Warning: doit() in {filename} did not return a matplotlib Figure")
            return False

        # Save the figure
        return save_figure_as_svg(figure, output_path)

    except Exception as e:
        print(f"Error processing {filename}: {e}")
        return False


def main():
    """Main function to process all graph files."""
    # Define paths
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    graphs_dir = project_root / "user-content" / "graphs"
    output_dir = project_root / "website" / "src" / "assets" / "svg-data"

    print("Starting graph baking process...")
    print(f"Graphs directory: {graphs_dir}")
    print(f"Output directory: {output_dir}")

    # Check if graphs directory exists
    if not graphs_dir.exists():
        print(f"Error: Graphs directory does not exist: {graphs_dir}")
        sys.exit(1)

    # Process each graph file
    success_count = 0
    for i, graph_file in enumerate(graphs_dir.iterdir()):
        print(f"\nProcessing: {graph_file.name}")
        if process_graph_file(str(graph_file), str(output_dir)):
            success_count += 1

    print(f"\nProcessing complete: {i+1} files processed successfully")

if __name__ == "__main__":
    main()