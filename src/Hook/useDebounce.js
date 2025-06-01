import React, { useCallback, useEffect, useRef } from 'react'

/**
 * useDebounceCallback - returns a debounced version of a callback function
 * @param {function} callback - the function to debounce
 * @param {number} delay - debounce delay in ms
 * @returns debounced function
 */

export function useDebounce(callback, delay) {
 const timer = useRef(null);

 useEffect(()=>{
    return () => clearTimeout(timer.current)
 },[])
 return useCallback(
    (...args) => {
        if (timer.current) {
            clearTimeout(timer.current)
        }

        timer.current = setTimeout(() => {
            callback(...args)

        }, delay)
    }, [callback, delay]
 )
}
