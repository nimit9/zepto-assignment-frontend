import { ForwardedRef, Fragment, KeyboardEvent, forwardRef } from 'react';
import { useAppContext } from '../context/context';
import ALL_USERS from '../mockData/USERS.json';
import UserAvatar from './UserAvatar';

const UserSearchDropdown = forwardRef(function UserSearchDropdown(
    {
        focusedIndex,
        handleKeyDown,
    }: {
        focusedIndex: number | null;
        handleKeyDown: (e?: KeyboardEvent<HTMLDivElement>) => void;
    },
    ref: ForwardedRef<HTMLDivElement>,
) {
    const { searchedUsers, pickedUsers, pickUser } = useAppContext();

    const isUserNotAvaiable =
        pickedUsers.length === ALL_USERS.length || searchedUsers.length === 0;

    return (
        <div
            className={
                'absolute mt-2 w-full rounded-md shadow-lg flex flex-col gap-1 bg-white border p-1 max-h-[400px] overflow-auto'
            }
            onKeyDown={handleKeyDown}
            ref={ref}
        >
            {isUserNotAvaiable ? (
                <span className="text-[#777]">No user available..</span>
            ) : (
                searchedUsers.map(({ id, name, picked, email }, index) => (
                    <Fragment key={id}>
                        {!picked && (
                            <div
                                className={`flex gap-2.5 items-center cursor-pointer rounded-md p-1 ${
                                    focusedIndex === index ? 'bg-gray-200' : ''
                                }`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleKeyDown();
                                    pickUser(id);
                                }}
                            >
                                <UserAvatar
                                    userName={name}
                                    userId={id}
                                    size={32}
                                />

                                <div className="flex flex-col md:flex-row md:items-center md:gap-2 md:w-full">
                                    <span className="text-sm font-medium md:w-1/2 md:flex-1">
                                        {name}
                                    </span>
                                    <span className="text-xs text-[#777] md:w-1/2">
                                        {email}
                                    </span>
                                </div>
                            </div>
                        )}
                    </Fragment>
                ))
            )}
        </div>
    );
});

export default UserSearchDropdown;
