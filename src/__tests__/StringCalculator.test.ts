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

  it('should return the sum of numbers separated by custom delimiter with more than 1 character', () => {
    expect(calculator.add('//[***]\n1***2***3***4***5')).toBe(15);
  });

  it('should return the sum of numbers separated by multiple custom delimiters', () => {
    expect(calculator.add('//[***][%%]\n1***2%%3***4%%5')).toBe(15);
  });

  it('should support a delimiter that contains regex meta-characters', () => {
    // The delimiter is ".*" which includes '.' and '*'
    expect(calculator.add('//[.*]\n1.*2.*3')).toBe(6);
  });

  it('should handle a mix of single-char and multi-char delimiters', () => {
    // ";" (1 char) and "***" (3 chars) in the same header
    expect(calculator.add('//[;][***]\n1;2***3;4')).toBe(10);
  });

  it('should include 1000 but skip numbers >1000 with custom delimiters', () => {
    // 1000 is counted, 1001 is ignored
    expect(calculator.add('//[***][%]\n1000***1001%2')).toBe(1002);
  });

  it('should return 0 when the string has custom delimiters but no numbers', () => {
    // After the \n there is nothing
    expect(calculator.add('//[;]\n')).toBe(0);
  });

  it('should throw and list all negative numbers when multiple delimiters are used', () => {
    expect(() => calculator.add('//[***][%]\n-1***2%3***-4')).toThrow(
      'negative numbers not allowed -1, -4'
    );
  });

  it('should ignore a trailing delimiter at the end of the string', () => {
    // Common user typo: dangling comma
    expect(calculator.add('1,2,')).toBe(3);
  });

  it('should correctly sum a long list of numbers', () => {
    const input = Array.from({ length: 100 }, (_, i) => i + 1).join(',');
    const expected = (100 * 101) / 2; // 5050
    expect(calculator.add(input)).toBe(expected);
  });
});
