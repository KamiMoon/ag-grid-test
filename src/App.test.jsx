import { render, screen } from '@testing-library/react';
import App from './App';

test('renders label', () => {
  render(<App />);
  const appText = screen.getByText('The App');
  expect(appText).toBeInTheDocument();
});
