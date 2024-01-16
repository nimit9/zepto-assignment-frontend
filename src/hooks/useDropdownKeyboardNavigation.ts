import { KeyboardEvent, useRef, useState } from 'react';
import { useAppContext } from '../context/context';

const useDropdownKeyboardNavigation = () => {
    const { inputRef, searchedUsers, pickUser } = useAppContext();
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const scrollIntoView = (index: number) => {
        const dropdown = dropdownRef.current;
        const item = dropdown && dropdown.children[index];

        if (dropdown && item && item instanceof HTMLDivElement) {
            const dropdownRect = dropdown.getBoundingClientRect();
            const itemRect = item.getBoundingClientRect();

            const dropdownTop = dropdownRect.top;
            const itemTop = itemRect.top;

            let scrollPosition;

            if (itemTop < dropdownTop) {
                // If the item is above the visible area, scroll to the top of the item
                scrollPosition =
                    dropdown.scrollTop + itemTop - dropdownTop - 12;
            } else if (itemRect.bottom > dropdownRect.bottom) {
                // If the item is below the visible area, scroll to the bottom of the item
                scrollPosition =
                    dropdown.scrollTop +
                    itemRect.bottom -
                    dropdownRect.bottom +
                    12;
            }

            dropdown.scrollTo({
                top: scrollPosition,
                behavior: 'smooth',
            });
        }
    };

    const handleKeyDown = (e?: KeyboardEvent<HTMLDivElement>) => {
        if (!e) {
            setFocusedIndex(null);
            return;
        }
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setFocusedIndex((prevIndex) => {
                const newIndex =
                    prevIndex === null
                        ? 0
                        : Math.min(prevIndex + 1, searchedUsers.length - 1);
                scrollIntoView(newIndex);
                return newIndex;
            });
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setFocusedIndex((prevIndex) => {
                if (prevIndex === 0 && inputRef.current) {
                    inputRef.current.focus();
                    return null;
                }
                if (prevIndex === null) {
                    return null;
                }
                const newIndex =
                    prevIndex === null ? 0 : Math.max(prevIndex - 1, 0);
                scrollIntoView(newIndex);
                return newIndex;
            });
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (focusedIndex !== null) {
                pickUser(searchedUsers[focusedIndex].id);
            }
            setFocusedIndex(null);
            scrollIntoView(0);
        }
    };

    return { handleKeyDown, focusedIndex, dropdownRef };
};

export default useDropdownKeyboardNavigation;
