import { useState } from "react";

export default function useArray(initialArray) {
    const [array, setArray] = useState(initialArray);

    const push = (element) => {
        setArray([...array, element]);
    };

    const filter = (callback) => {
        setArray(array.filter(callback));
    };

    const update = (index, newElement) => {
        setArray([
            ...array.slice(0, index),
            newElement,
            ...array.slice(index + 1, array.length),
        ]);
    };

    const remove = (index) => {
        setArray([...array.slice(0, index), ...array.slice(index + 1, array.length)]);
    };

    const clear = () => {
        setArray([]);
    };

    return {
        array,
        set: setArray,
        push,
        filter,
        update,
        remove,
        clear
    };
}