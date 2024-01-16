import { KeyboardEvent, useRef, useState } from 'react';

import useOutsideClick from '../hooks/useClickOutside';
import { useAppContext } from '../context/context';
import UserSearchDropdown from './UserSearchDropdown';
import PickedUserPills from './PickedUserPills';
import useDropdownKeyboardNavigation from '../hooks/useDropdownKeyboardNavigation';

const SearchUsers = () => {
    const { focusInput, inputRef, handleBackspace, handleSearch } =
        useAppContext();

    const [showDropdown, setShowDropdown] = useState(false);

    const { handleKeyDown, focusedIndex, dropdownRef } =
        useDropdownKeyboardNavigation();

    const useOutsideCallbackFn = () => {
        // Check if the input is focused
        if (inputRef.current && inputRef.current === document.activeElement)
            return;

        // Close the dropdown if it is open
        if (showDropdown) setShowDropdown(false);
    };

    const outsideClickRef = useOutsideClick({
        callback: useOutsideCallbackFn,
    });

    return (
        <>
            <div
                className="w-full flex flex-wrap gap-4 border-b-2 border-[#0b57d0] pb-2"
                onClick={(e) => {
                    e.stopPropagation();
                    focusInput();
                }}
            >
                <PickedUserPills />
                <div
                    className="relative min-w-[250px] md:min-w-[400px] lg:min-w-[420px]"
                    ref={outsideClickRef}
                >
                    <input
                        className="flex-1 outline-none w-full bg-[#F8F9FB]"
                        placeholder="Add new user.."
                        onFocus={() => setShowDropdown(true)}
                        onChange={handleSearch}
                        onKeyDown={(e) => {
                            handleKeyDown(e);
                            handleBackspace(e);
                        }}
                        ref={inputRef}
                    />
                    {showDropdown && (
                        <UserSearchDropdown
                            focusedIndex={focusedIndex}
                            handleKeyDown={handleKeyDown}
                            ref={dropdownRef}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default SearchUsers;
