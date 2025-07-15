import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const enterText = async (value: string) => {
  const box = screen.getByRole('textbox') as HTMLTextAreaElement;

  await userEvent.clear(box); // value now ''

  if (value === '') {
    fireEvent.change(box, { target: { value: ' ' } }); // 1. space
    fireEvent.change(box, { target: { value: '' } }); // 2. back to empty
  } else {
    fireEvent.change(box, { target: { value } });
  }
};

describe('String-Calculator UI – happy paths', () => {
  const cases = [
    { in: '', out: '0' },
    { in: '1,2', out: '3' },
    { in: '1', out: '1' },
    { in: '1,2,3,4,5', out: '15' },
    { in: '1,2\\n3\\n4\\n5', out: '15' },
    { in: '//;\\n1;2;3;4;5', out: '15' },
    { in: '//[***]\\n1***2***3***4***5', out: '15' },
    { in: '//[***][%%]\\n1***2%%3***4%%5', out: '15' },
    { in: '//[.*]\\n1.*2.*3', out: '6' },
    { in: '//[;][***]\\n1;2***3;4', out: '10' },
    { in: '//[***][%]\\n1000***1001%2', out: '1002' },
    { in: '//[;]\\n', out: '0' },
    { in: '1,2,', out: '3' },
    {
      in: Array.from({ length: 100 }, (_, i) => i + 1).join(','),
      out: '5050',
    },
  ] as const;

  it.each(cases)('%s ⇒ %s', async ({ in: input, out }) => {
    render(<App />);
    await enterText(input);

    const sum = await screen.findByText(/sum:/i); // ← wait for render
    expect(sum).toHaveTextContent(out);
  });
});

describe('String-Calculator UI – negative numbers', () => {
  const negs = [
    { in: '-1,2,3', list: '-1' },
    { in: '-1,-2,-3', list: '-1, -2, -3' },
    { in: '//;\\n-1;2;3', list: '-1' },
    { in: '//;\\n-1;-2;-3', list: '-1, -2, -3' },
    { in: '//[***][%]\\n-1***2%3***-4', list: '-1, -4' },
  ] as const;

  it.each(negs)('error for "%s"', async ({ in: input, list }) => {
    render(<App />);
    await enterText(input);

    const err = await screen.findByText(
      new RegExp(`negative numbers not allowed.*${list}`)
    );
    expect(err).toBeInTheDocument();
  });
});
