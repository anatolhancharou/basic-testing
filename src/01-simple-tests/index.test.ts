import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Add })).toBe(3);
    expect(simpleCalculator({ a: -1, b: 1, action: Action.Add })).toBe(0);
    expect(simpleCalculator({ a: 10, b: 32, action: Action.Add })).toBe(42);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Subtract })).toBe(-1);
    expect(simpleCalculator({ a: -1, b: 1, action: Action.Subtract })).toBe(-2);
    expect(simpleCalculator({ a: 10, b: 5, action: Action.Subtract })).toBe(5);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 1, b: -2, action: Action.Multiply })).toBe(-2);
    expect(simpleCalculator({ a: 2, b: 21, action: Action.Multiply })).toBe(42);
    expect(simpleCalculator({ a: 0, b: 5, action: Action.Multiply })).toBe(0);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 10, b: -2, action: Action.Divide })).toBe(-5);
    expect(simpleCalculator({ a: 100, b: 2, action: Action.Divide })).toBe(50);
    expect(simpleCalculator({ a: 16, b: 4, action: Action.Divide })).toBe(4);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Exponentiate })).toBe(
      4,
    );
    expect(simpleCalculator({ a: 2, b: 0, action: Action.Exponentiate })).toBe(
      1,
    );
    expect(simpleCalculator({ a: 5, b: 3, action: Action.Exponentiate })).toBe(
      125,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: null })).toBeNull();
    expect(simpleCalculator({ a: 2, b: 21, action: false })).toBeNull();
    expect(simpleCalculator({ a: 1, b: 42, action: 'Multiply' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '2', b: 2, action: Action.Add })).toBeNull();
    expect(
      simpleCalculator({ a: 2, b: false, action: Action.Multiply }),
    ).toBeNull();
    expect(
      simpleCalculator({ a: '2', b: null, action: Action.Add }),
    ).toBeNull();
  });
});
