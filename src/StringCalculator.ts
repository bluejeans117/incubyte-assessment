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
    const negatives: number[] = [];
    if (numbers.includes(',') || numbers.includes('\n')) {
      const sum = numbers.split(/,|\n/).reduce((acc, num) => {
        if (Number(num) < 0) {
          negatives.push(Number(num));
        }
        return acc + Number(num);
      }, 0);
      if (negatives.length > 0) {
        throw new Error(`negative numbers not allowed ${negatives.join(', ')}`);
      }
      return sum;
    }
    return Number(numbers);
  }
}
