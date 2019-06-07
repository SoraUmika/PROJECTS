import numpy as np

array1 = np.array([i for i in range(10)])
array2 = np.array([i for i in range(10, 30, 2)])
array3 = np.array([i for i in range(30, 40, 3)])
merge_array = np.c_[array1, array2]
print(merge_array)