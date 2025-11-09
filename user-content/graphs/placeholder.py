"""EXAMPLE PYTHON GRAPH MAKER. Suppose file name is `my_graph.py`"""

from matplotlib import pyplot as plt
from matplotlib.pyplot import Figure

def doit() -> Figure:
	"""Method returns a figure that will be saved to `website/src/assets/svg-data/my_graph.svg` by main routine"""
	...

if __name__ == "__main__":
	figure = doit()
	plt.show(figure)