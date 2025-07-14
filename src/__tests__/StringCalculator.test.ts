import { StringCalculator } from '../StringCalculator';

describe('StringCalculator', () => {
  let calculator: StringCalculator;

  beforeEach(() => {
    calculator = new StringCalculator();
  });

  it('should return 0 for empty string', () => {
    expect(calculator.add('')).toBe(0);
  });

  it('should return the sum of numbers separated by commas', () => {
    expect(calculator.add('1,2')).toBe(3);
  });

  it('should return the sum of single number', () => {
    expect(calculator.add('1')).toBe(1);
  });

  it('should return the sum of multiple numbers separated by commas', () => {
    expect(calculator.add('1,2,3,4,5')).toBe(15);
  });

  it('should return the sum of numbers separated by new lines', () => {
    expect(calculator.add('1,2\n3\n4\n5')).toBe(15);
  });

  it('should return the sum of numbers separated by custom delimiter', () => {
    expect(calculator.add('//;\n1;2;3;4;5')).toBe(15);
  });

  it('should throw error for single negative number', () => {
    expect(() => calculator.add('-1,2,3')).toThrow(
      'negative numbers not allowed -1'
    );
  });

  it('should throw error for all negative numbers', () => {
    expect(() => calculator.add('-1,-2,-3,-4,-5')).toThrow(
      'negative numbers not allowed -1, -2, -3, -4, -5'
    );
  });

  it('should throw error for single negative number with custom delimiter', () => {
    expect(() => calculator.add('//;\n-1;2;3;4;5')).toThrow(
      'negative numbers not allowed -1'
    );
  });

  it('should throw error for all negative numbers with custom delimiter', () => {
    expect(() => calculator.add('//;\n-1;-2;-3;-4;-5')).toThrow(
      'negative numbers not allowed -1, -2, -3, -4, -5'
    );
  });

  it('should ignore numbers greater than 1000', () => {
    expect(calculator.add('1,2,1001')).toBe(3);
  });

  it('should ignore numbers greater than 1000 with custom delimiter', () => {
    expect(calculator.add('//;\n1;2;1001')).toBe(3);
  });
});
