import { render, screen, waitFor } from '@testing-library/react';
import { Observable } from 'rxjs';
import HighFrequencyGrid from '../HighFrequencyGrid';
import { createRowData, getGlobalRowData, getDataSubscription } from '../HighFrequencyGridData';

jest.mock('../HighFrequencyGridData');

describe('HighFrequencyGrid', () => {
  test('renders data - updates before grid', async () => {
    getGlobalRowData.mockImplementation(() => {
      return [{ trade: 1 }];
    });

    getDataSubscription.mockImplementation(() => {
      const observable = new Observable((subscriber) => {
        subscriber.next({ trade: 2 });
      });
      return observable;
    });

    render(<HighFrequencyGrid />);

    const header = screen.getByText('Trade');
    expect(header).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    expect(createRowData).toHaveBeenCalled();
    expect(getDataSubscription).toHaveBeenCalled();
    expect(getGlobalRowData).toHaveBeenCalled();
  });

  test('renders data - updates', async () => {
    getGlobalRowData.mockImplementation(() => {
      return [{ trade: 1 }];
    });

    getDataSubscription.mockImplementation(() => {
      const observable = new Observable((subscriber) => {
        const intervalId = setInterval(() => {
          subscriber.next({ trade: 2 });
        }, 50);

        return function unsubscribe() {
          clearInterval(intervalId);
        };
      });

      return observable;
    });

    render(<HighFrequencyGrid />);

    const header = screen.getByText('Trade');
    expect(header).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    expect(createRowData).toHaveBeenCalled();
    expect(getDataSubscription).toHaveBeenCalled();
    expect(getGlobalRowData).toHaveBeenCalled();
  });
});
