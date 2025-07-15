import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('String-Calculator UI', () => {
  it('computes sum for commas + \\n', async () => {
    render(<App />);

    const box = screen.getByRole('textbox');
    // type "1,2\n3" literally – the component converts \n to newline
    await userEvent.type(box, '1,2\\n3');

    expect(screen.getByText(/sum:/i)).toHaveTextContent('6');
  });

  it('computes sum for custom delimiter header', async () => {
    render(<App />);
    const box = screen.getByRole('textbox');

    await userEvent.clear(box);
    await userEvent.type(box, '//;\\n1;2;3;4;5');

    expect(screen.getByText(/sum:/i)).toHaveTextContent('15');
  });

  it('shows error when negatives are entered', async () => {
    render(<App />);
    const box = screen.getByRole('textbox');

    await userEvent.clear(box);
    await userEvent.type(box, '1,-2');

    expect(
      screen.getByText(/negative numbers not allowed/i)
    ).toBeInTheDocument();
  });
});
