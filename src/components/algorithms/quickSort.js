export const quickSort = (originalList) => {
  const list = [...originalList];

  if (list.length < 2) {
    return list;
  }

  const pivot = list[0];

  const smaller = list.filter((item) => item < pivot);
  const bigger = list.filter((item) => item > pivot);
  delay(2000);
  return [...quickSort(smaller), pivot, ...quickSort(bigger)];
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
