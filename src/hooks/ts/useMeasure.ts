import { useState, useEffect, useRef } from 'react'

type Size = {
    width: number
    height: number
}

export const useMeasure = () => {
    const [size, setSize] = useState<Size>({ width: 0, height: 0 })
    const elementRef = useRef<HTMLElement | null>(null)

    useEffect(() => {
        const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
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
                observer.disconnect()
            }
        }
    }, [])

    return [elementRef, size] as const
}