import { useEffect, useState } from 'react';

export default function useWindowSize() {
    const [size, setSize] = useState([0, 0]);

    function updateSize() {
        setSize([window.outerWidth, window.outerHeight]);
    }

    useEffect(() => {
        window.addEventListener('resize', updateSize);
        updateSize();

        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return size;
}