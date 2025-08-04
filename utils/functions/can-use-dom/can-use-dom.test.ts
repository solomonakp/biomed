import { canUseDOM } from './can-use-dom';

describe('utils - can-use-dom', () => {
  let windowSpy: jest.SpyInstance;

  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('should the canUseDom function be exported correctly', () => {
    expect(canUseDOM).toBeDefined();
  });

  it('should the canUseDom function be truthy if windows is defined', () => {
    const isBrowser = canUseDOM();

    expect(isBrowser).toBeTruthy();
  });
  it('should the canUseDom function be false if windows is not defined', () => {
    windowSpy.mockImplementation(() => undefined);

    const isBrowser = canUseDOM();
    expect(isBrowser).toBeFalsy();
  });
});
