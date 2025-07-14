export class StringCalculator {
  add(numbers: string): number {
    if (numbers === '') {
      return 0;
    }
    const negatives: number[] = [];
    const [delimiter, rest] = numbers.split('\n', 2);
    if (delimiter.startsWith('//')) {
      const customDelimiter = delimiter.slice(2);
      const sum = rest.split(customDelimiter).reduce((acc, num) => {
        this.checkNegativeAndPush(negatives, Number(num));
        return this.checkNumberGreaterThan1000AndReturnAcc(acc, Number(num));
      }, 0);
      return this.returnSumOrNegativeError(sum, negatives);
    }
    if (numbers.includes(',') || numbers.includes('\n')) {
      const sum = numbers.split(/,|\n/).reduce((acc, num) => {
        this.checkNegativeAndPush(negatives, Number(num));
        return this.checkNumberGreaterThan1000AndReturnAcc(acc, Number(num));
      }, 0);
      return this.returnSumOrNegativeError(sum, negatives);
    }
    return Number(numbers);
  }

  checkNegativeAndPush(negatives: number[], num: number) {
    if (num < 0) {
      negatives.push(num);
    }
  }

  checkNumberGreaterThan1000AndReturnAcc(acc: number, num: number) {
    if (num > 1000) {
      return acc;
    }
    return acc + num;
  }

  returnSumOrNegativeError(sum: number, negatives: number[]) {
    if (negatives.length > 0) {
      throw new Error(`negative numbers not allowed ${negatives.join(', ')}`);
    }
    return sum;
  }
}
