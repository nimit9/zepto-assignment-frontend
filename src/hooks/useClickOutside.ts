import { useEffect, useRef } from 'react';

type UseOutsideClickProps = {
    callback: () => void;
};

const useOutsideClick = ({ callback }: UseOutsideClickProps) => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };
        // Attach the event listener when the component mounts
        document.addEventListener('click', handleClickOutside);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [callback]);

    return ref;
};

export default useOutsideClick;
