// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// https://hceris.com/jest-fail-test-if-unexpected-network-request-happens/
const spies = {
  fetch: jest.spyOn(window, 'fetch'),
};
beforeEach(() => {
  jest.resetAllMocks();
});
afterEach(() => {
  expect(spies.fetch).not.toHaveBeenCalled();
});
