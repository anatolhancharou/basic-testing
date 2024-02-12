import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 10, b: 20, action: Action.Subtract, expected: -10 },
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 2, b: 21, action: Action.Multiply, expected: 42 },
  { a: -1, b: -2, action: Action.Multiply, expected: 2 },
  { a: 3, b: 1, action: Action.Divide, expected: 3 },
  { a: 10, b: 4, action: Action.Divide, expected: 2.5 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 6, b: 2, action: Action.Exponentiate, expected: 36 },
  { a: 2, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 1, b: 0, action: null, expected: null },
  { a: 3, b: 3, action: 'Divide', expected: null },
  { a: 27, b: 3, action: true, expected: null },
  { a: '3', b: 3, action: Action.Exponentiate, expected: null },
  { a: 3, b: '2', action: Action.Subtract, expected: null },
  { a: true, b: false, action: Action.Multiply, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should get the result of simpleCalculator({ $a, $b, $action })',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
