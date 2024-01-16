import {
    ChangeEvent,
    KeyboardEvent,
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';

import {
    IAppContextValue,
    IAppProviderProps,
} from '../interfaces/context.interface';

import ALL_USERS from '../mockData/USERS.json';
import { IUser } from '../interfaces/user.interface';

const AppContext = createContext<IAppContextValue | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context)
        throw new Error('useAppContext must be used with AppProvider');
    return context;
};

export const AppProvider = ({ children }: IAppProviderProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [users, setUsers] = useState<IUser[]>(ALL_USERS);
    const [pickedUsers, setPickedUsers] = useState<IUser[]>([]);
    const [searchedUsers, setSearchedUsers] = useState<IUser[]>(ALL_USERS);

    const [backspacePressed, setBackspacePressed] = useState(false);

    useEffect(() => {
        setSearchedUsers(users.filter((user) => !user.picked));
    }, [users]);

    // Function to check if a string includes a substring, case-insensitive
    const checkStringIncludesSubstring = (string: string, substring: string) =>
        string.toLowerCase().includes(substring.toLowerCase());

    // Handler for search input value changes
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        // If input is empty, display all users in dropdown list
        if (!inputValue) {
            setSearchedUsers(users);
            return;
        }

        const filteredUsers = users.filter(
            (user) =>
                !user.picked &&
                (checkStringIncludesSubstring(user.name, inputValue) ||
                    checkStringIncludesSubstring(user.email, inputValue)),
        );
        setSearchedUsers(filteredUsers);
    };

    // Function to update the picked value in the users array
    const changePickedValueInUsersArray = (
        selectedUserId: string,
        pickedValue: undefined | true,
    ) => {
        setUsers((prevUsers) => {
            return prevUsers.map((user) =>
                user.id === selectedUserId
                    ? { ...user, picked: pickedValue }
                    : user,
            );
        });

        // Clear input and focus on it after picking or removing a user
        clearInput();
        focusInput();
        setBackspacePressed(false);
    };

    // Function to handle picking a user from dropdown
    const pickUser = (selectedId: string) => {
        const userToPick = users.find((user) => user.id === selectedId);

        if (userToPick) {
            // Update picked users and change picked value in users array
            setPickedUsers((prevPickedUsers) => [
                ...prevPickedUsers,
                userToPick,
            ]);
            changePickedValueInUsersArray(selectedId, true);
        }
        setBackspacePressed(false);
    };

    const removePickedUser = (selectedId: string) => {
        setPickedUsers((prevPickedUsers) =>
            prevPickedUsers.filter((user) => user.id !== selectedId),
        );
        changePickedValueInUsersArray(selectedId, undefined);
    };

    // Handler for the Backspace key

    const handleBackspace = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace')
            if (inputRef.current && !inputRef.current.value) {
                if (backspacePressed && pickedUsers.length > 0) {
                    // If backspace is pressed twice, remove the last picked user
                    removePickedUser(pickedUsers.at(-1)!.id);
                } else {
                    // Set backspacePressed to true if it's the first Backspace press
                    setBackspacePressed(true);
                }
            } else {
                setBackspacePressed(false);
            }
    };

    const clearInput = () => {
        if (inputRef.current) inputRef.current.value = '';
    };

    const focusInput = () => {
        if (inputRef.current) inputRef.current.focus();
    };

    const contextValue: IAppContextValue = {
        users,
        pickedUsers,
        searchedUsers,
        backspacePressed,
        inputRef,
        focusInput,
        handleBackspace,
        removePickedUser,
        pickUser,
        changePickedValueInUsersArray,
        handleSearch,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};
