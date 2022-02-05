import { createRowData, getGlobalRowData, getDataSubscription } from '../HighFrequencyGridData';

describe('HighFrequencyGridData', () => {
  test('creates data', async () => {
    createRowData();
    const data = getGlobalRowData();

    expect(data.length > 0).toBeTruthy();
  });

  test('creates data and can subscribe', (done) => {
    createRowData();

    const observable = getDataSubscription();
    const subscription = observable.subscribe((item) => {
      expect(item.trade).toBeTruthy();

      subscription.unsubscribe();
      done();
    });
  });
});
