import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import TutorialGrid from '../TutorialGrid';

const mockData = [{ make: 'Porsche', model: 'Boxter', price: 72000 }];

describe('TutorialGrid', () => {
  let fetchSpy;
  beforeEach(() => {
    fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );
  });
  afterEach(() => {
    global.fetch.mockRestore();
  });

  test('renders button, and rows', async () => {
    render(<TutorialGrid />);

    const getSelectedRowsButton = screen.getByText('Get selected rows');
    expect(getSelectedRowsButton).toBeInTheDocument();

    await waitFor(() => expect(fetchSpy).toHaveBeenCalledTimes(1));

    const porcheRow = screen.getByText('Porsche');
    expect(porcheRow).toBeInTheDocument();
  });

  test('clicks a row then it is picked up by Get selected rows', async () => {
    render(<TutorialGrid />);

    await waitFor(() => expect(fetchSpy).toHaveBeenCalledTimes(1));

    const porcheRow = screen.getByText('Porsche');
    expect(porcheRow).toBeInTheDocument();
    fireEvent.click(porcheRow);

    const getSelectedRowsButton = screen.getByText('Get selected rows');
    expect(getSelectedRowsButton).toBeInTheDocument();
    fireEvent.click(getSelectedRowsButton);

    await waitFor(() => {
      expect(screen.getByText('Selected nodes: Porsche Boxter')).toBeInTheDocument();
    });
  });
});
