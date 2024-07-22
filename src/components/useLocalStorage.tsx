import { useState, useEffect } from 'react';

const useLocalStorage = (key: string, initialValue: number) => {
    const [storedValue, setStoredValue] = useState<number>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? parseInt(item, 10) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    const setValue = (value: number | ((val: number) => number)) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, valueToStore.toString());
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setValue] as const;
};

export default useLocalStorage;
