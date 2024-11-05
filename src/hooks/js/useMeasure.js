import { useState, useEffect, useRef } from 'react'

export const useMeasure = () => {
    const [size, setSize] = useState({ width: 0, height: 0 })
    const elementRef = useRef(null)

    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            if (entries.length > 0) {
                const entry = entries[0]
                const { width, height } = entry.contentRect
                setSize({ width, height })
            }
        })

        if (elementRef.current) {
            observer.observe(elementRef.current)
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current)
            }
        }
    }, [])

    return [elementRef, size]
}