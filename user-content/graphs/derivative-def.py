"""EXAMPLE PYTHON GRAPH MAKER. Suppose file name is `my_graph.py`"""

from matplotlib import pyplot as plt
from matplotlib.pyplot import Figure
import numpy as np

def doit() -> Figure:
	"""Method returns a figure that will be saved to `website/src/assets/svg-data/my_graph.svg` by main routine"""
	fig, ax = plt.subplots(figsize=(10, 8))
	
	# Define the function f(x) = x^2
	def f(x):
		return x**2
	
	# Choose x0 = 1
	x0 = 1
	y0 = f(x0)
	
	# Define x range for plotting
	x = np.linspace(-1, 5, 1000)
	y = f(x)
	
	# Plot the function
	ax.plot(x, y, 'b-', linewidth=2, label=r'$f(x) = x^2$')
	
	# Plot the point (x0, f(x0))
	ax.plot(x0, y0, 'ko', markersize=8, label=r'$(x_0, f(x_0))$')
	
	# Define points getting closer to x0
	x_points = [3, 2.5, 2, 1.5]
	colors = ['red', 'orange', 'green', 'purple']
	
	# Plot secant lines from (x0, y0) to each (x_n, f(x_n))
	for i, xn in enumerate(x_points):
		yn = f(xn)
		# Plot the point (xn, yn)
		ax.plot(xn, yn, 'o', color=colors[i], markersize=6, 
				label=r'$(x_{' + str(i+1) + r'}, f(x_{' + str(i+1) + r'}))$')
		
		# Plot secant line
		x_secant = np.linspace(-1, 5, 10)
		y_secant = y0 + ((yn - y0)/(xn - x0)) * (x_secant - x0)
		ax.plot(x_secant, y_secant, color=colors[i], linestyle='--', alpha=0.7,
				label=f'Secant line to x={xn}')
	
	# Plot the tangent line at x0
	# For f(x) = x^2, f'(x) = 2x, so at x0=1, slope = 2
	slope = 2 * x0
	x_tangent = np.linspace(-1, 5, 100)
	y_tangent = y0 + slope * (x_tangent - x0)
	ax.plot(x_tangent, y_tangent, 'k-', linewidth=2, label='Tangent line')
	
	# Customize the plot
	ax.set_xlabel('x', fontsize=12)
	ax.set_ylabel('y', fontsize=12)
	ax.set_title('Limit Definition of the Derivative\n' + 
				r'$f(x) = x^2$, $x_0 = 1$', fontsize=14)
	ax.grid(True, alpha=0.3)
	
	# Place legend at the bottom
	box = ax.get_position()
	ax.set_position([box.x0, box.y0 + box.height * 0.1,
					box.width, box.height * 0.9])
	
	# Create legend with multiple columns for better layout
	legend = ax.legend(loc='upper center', bbox_to_anchor=(0.5, -0.08),
					  fancybox=True, shadow=True, ncol=5, fontsize=10)
	
	# Set axis limits
	ax.set_xlim(-1, 5)
	ax.set_ylim(-1, 20)
	
	plt.tight_layout()
	return fig

if __name__ == "__main__":
	figure = doit()
	plt.show()