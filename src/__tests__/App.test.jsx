import { render, screen } from '@testing-library/react';
import App from '../App';

jest.mock('../grids/TutorialGrid', () => {
  return function TutorialGrid() {
    return <div>Tutorial Grid</div>;
  };
});

test('renders label', () => {
  render(<App />);
  const appText = screen.getByText('The App');
  expect(appText).toBeInTheDocument();
});
