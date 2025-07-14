export class StringCalculator {
  add(numbers: string): number {
    if (numbers === '') {
      return 0;
    }
    const [delimiter, rest] = numbers.split('\n', 2);
    if (delimiter.startsWith('//')) {
      const customDelimiter = delimiter.slice(2);
      return rest
        .split(customDelimiter)
        .reduce((acc, num) => acc + Number(num), 0);
    }
    if (numbers.includes(',') || numbers.includes('\n')) {
      return numbers.split(/,|\n/).reduce((acc, num) => acc + Number(num), 0);
    }
    return Number(numbers);
  }
}
