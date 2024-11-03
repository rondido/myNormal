const shiftLeft = (data, selected) => {
  const indices = selected
    .map((item) => data.indexOf(item))
    .filter((index) => index !== -1);
  const newData = [...data];

  if (indices.length === 0) {
    return newData;
  }

  for (let i = 0; i < indices.length; i++) {
    const currentIndex = indices[i];
    const nextIndex = i === indices.length - 1 ? indices[0] : indices[i + 1];

    [newData[currentIndex], newData[nextIndex]] = [
      newData[nextIndex],
      newData[currentIndex],
    ];
  }

  return newData;
};

// 테스트 케이스 및 결과 출력
const testCases = [
  { data: [1, 2, 3], selected: [1], expected: [1, 2, 3] },
  { data: [1, 2, 3], selected: [2], expected: [2, 1, 3] },
  { data: [1, 2, 3], selected: [3], expected: [1, 3, 2] },
  { data: [1, 2, 3], selected: [1, 2], expected: [1, 2, 3] },
  { data: [1, 2, 3], selected: [2, 1], expected: [1, 2, 3] },
  { data: [1, 2, 3], selected: [1, 3], expected: [1, 3, 2] },
  { data: [1, 2, 3], selected: [3, 1], expected: [1, 3, 2] },
  { data: [1, 2, 3], selected: [2, 3], expected: [2, 3, 1] },
  { data: [1, 2, 3], selected: [3, 2], expected: [2, 3, 1] },
  { data: [1, 2, 3], selected: [1, 2, 3], expected: [1, 2, 3] },
];

// 결과 출력
testCases.forEach(({ data, selected, expected }, index) => {
  const result = shiftLeft(data, selected);
  console.log(
    `Test Case ${index + 1}: data = ${JSON.stringify(
      data
    )}, selected = ${JSON.stringify(selected)} => result = ${JSON.stringify(
      result
    )}, expected = ${JSON.stringify(expected)}`
  );
});
