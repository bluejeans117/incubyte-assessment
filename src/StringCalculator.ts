export class StringCalculator {
  add(numbers: string): number {
    if (numbers === '') {
      return 0;
    }
    const negatives: number[] = [];
    const [delimiter, rest] = numbers.split('\n', 2);
    if (delimiter.startsWith('//')) {
      let customDelimiter = '';
      if (delimiter.length === 3) {
        customDelimiter = delimiter.slice(2);
      } else {
        // Extract all delimiters from the format //[.*][.*]
        const delimiterPattern = /\[(.+?)\]/g;
        const matches = delimiter.match(delimiterPattern);
        if (matches) {
          // Escape special regex characters and create regex pattern
          const escapedDelimiters = matches.map((match) => {
            const delimiter = match.slice(1, -1);
            // Escape special regex characters
            return delimiter.replace(/[-/^$*+?.()|[\]{}]/g, '\\$&');
          });
          customDelimiter = escapedDelimiters.join('|');
        }
      }
      // Escape the custom delimiter string and create regex
      const regex = new RegExp(customDelimiter, 'g');
      // Split and filter out empty strings that might result from consecutive delimiters
      const numbersArray = rest.split(regex).filter((num) => num.trim() !== '');
      const sum = numbersArray.reduce((acc, num) => {
        this.checkNegativeAndPush(negatives, Number(num.trim()));
        return this.checkNumberGreaterThan1000AndReturnAcc(
          acc,
          Number(num.trim())
        );
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

