import { generateLinkedList } from './index';

const list = {
  next: {
    next: {
      next: null,
      value: null,
    },
    value: 2,
  },
  value: 1,
};

const linkedList = generateLinkedList([1, 2]);

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(linkedList).toStrictEqual(list);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(linkedList).toMatchSnapshot();
  });
});
