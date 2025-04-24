import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react';
import useArray from '../useArray';

describe('useArray', () => {
  it('should initialize with the given array', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));
    expect(result.current.array).toEqual([1, 2, 3]);
  });

  it('should push an element', () => {
    const { result } = renderHook(() => useArray([1, 2]));
    act(() => {
      result.current.push(3);
    });
    expect(result.current.array).toEqual([1, 2, 3]);
  });

  it('should filter elements', () => {
    const { result } = renderHook(() => useArray([1, 2, 3, 4]));
    act(() => {
      result.current.filter((n: number) => n % 2 === 0);
    });
    expect(result.current.array).toEqual([2, 4]);
  });

  it('should update an element at a given index', () => {
    const { result } = renderHook(() => useArray(['a', 'b', 'c']));
    act(() => {
      result.current.update(1, 'z');
    });
    expect(result.current.array).toEqual(['a', 'z', 'c']);
  });

  it('should remove an element at a given index', () => {
    const { result } = renderHook(() => useArray([10, 20, 30]));
    act(() => {
      result.current.remove(1);
    });
    expect(result.current.array).toEqual([10, 30]);
  });

  it('should clear the array', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));
    act(() => {
      result.current.clear();
    });
    expect(result.current.array).toEqual([]);
  });

  it('should set the array directly', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));
    act(() => {
      result.current.set([7, 8, 9]);
    });
    expect(result.current.array).toEqual([7, 8, 9]);
  });
});

