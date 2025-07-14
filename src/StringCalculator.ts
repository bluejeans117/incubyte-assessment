export class StringCalculator {
  add(numbers: string): number {
    if (numbers === '') {
      return 0;
    }
    if (numbers.includes(',')) {
      return numbers.split(',').reduce((acc, num) => acc + Number(num), 0);
    }
    return Number(numbers);
  }
}

