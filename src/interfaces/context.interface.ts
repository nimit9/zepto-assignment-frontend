import { ChangeEvent, KeyboardEvent, ReactNode, RefObject } from 'react';
import { IUser } from './user.interface';

export interface IState {
    users: IUser[];
    pickedUsers: IUser[];
    searchedUsers: IUser[];
    backspacePressed: boolean;
}

export interface IAppContextValue extends IState {
    handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
    changePickedValueInUsersArray: (
        selectedUserId: string,
        pickedValue: undefined | true,
    ) => void;
    pickUser: (selectedId: string) => void;
    removePickedUser: (selectedId: string) => void;
    handleBackspace: (e: KeyboardEvent<HTMLInputElement>) => void;
    focusInput: () => void;
    inputRef: RefObject<HTMLInputElement>;
}

export interface IAppProviderProps {
    children: ReactNode;
}
