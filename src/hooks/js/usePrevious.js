/**
 * usePrevious.js
 *
 * The usePrevious is a custom hook that allows a component to keep track of the previous
 * value of a variable. This is useful when you want to compare the current value of a variable
 * with its previous value.
 */

import { useRef } from 'react';

export default function usePrevious(value) {
    const currentRef = useRef(value);
    const previousRef = useRef();

    if (currentRef.current !== value) {
        previousRef.current = currentRef.current;
        currentRef.current = value;
    }

    return previousRef.current;
}