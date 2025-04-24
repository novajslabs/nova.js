import { renderHook, act } from '@testing-library/react';
import { useLang } from '../useLang';

describe('useLang Hook', () => {
  const originalNavigatorLanguage = navigator.language;

  beforeEach(() => {
    Object.defineProperty(navigator, 'language', {
      writable: true,
      value: 'en-US'
    });
  });

  afterEach(() => {
    // Restore the original language value
    Object.defineProperty(navigator, 'language', {
      writable: true,
      value: originalNavigatorLanguage
    });
  });

  it('should return the initial language', () => {
    const { result } = renderHook(() => useLang());
    expect(result.current).toBe('en-US');
  });

  it('should update language on "languagechange" event', () => {
    const { result } = renderHook(() => useLang());

    act(() => {
      // Trigger the languagechange event
      Object.defineProperty(navigator, 'language', {
        writable: true,
        value: 'es-ES'
      });
      window.dispatchEvent(new Event('languagechange'));
    });

    // Verify that the hook updates the value
    expect(result.current).toBe('es-ES');
  });
});
