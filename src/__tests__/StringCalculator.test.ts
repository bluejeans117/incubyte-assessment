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
});

