import { useState } from 'react';
import { StringCalculator } from 'string-calculator'; // default also works
import './App.css';

const calculator = new StringCalculator();

export default function App() {
  const [raw, setRaw] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Convert the escape sequence "\n" into an actual newline
  const normalise = (s: string) => s.replace(/\\n/g, '\n');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setRaw(value);

    try {
      const sum = calculator.add(normalise(value));
      setResult(sum);
      setError(null);
    } catch (err) {
      setResult(null);
      setError((err as Error).message);
    }
  };

  return (
    <main style={{ maxWidth: 480, margin: '4rem auto', textAlign: 'center' }}>
      <h1>String Calculator</h1>

      <textarea
        value={raw}
        onChange={handleChange}
        rows={4}
        placeholder={'e.g.\n1,2\\n3\\n4\\n5\nor\n//[;]\\n1;2'}
        style={{ width: '100%', padding: '0.6rem', fontSize: '1rem' }}
      />

      {result !== null && (
        <p style={{ marginTop: '1rem', fontSize: '1.2rem' }}>
          Sum: <strong>{result}</strong>
        </p>
      )}

      {error && <p style={{ marginTop: '1rem', color: 'crimson' }}>{error}</p>}
    </main>
  );
}

