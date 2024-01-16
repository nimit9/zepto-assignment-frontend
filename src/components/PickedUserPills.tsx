import React from 'react';
import { useAppContext } from '../context/context';
import UserAvatar from './UserAvatar';

const PickedUserPills = () => {
    const { pickedUsers, backspacePressed, removePickedUser } = useAppContext();
    return (
        <>
            {pickedUsers.map(({ id: userId, name }, index) => {
                const outlineClass =
                    index === pickedUsers.length - 1 && backspacePressed
                        ? 'outline-[#0b57d0] outline outline-offset-1'
                        : '';

                return (
                    <div
                        key={userId}
                        className={`flex rounded-full border-2 items-center gap-1.5 bg-gray-100 ${outlineClass}`}
                    >
                        <UserAvatar userId={userId} userName={name} size={20} />
                        <span className="text-sm col-span-2">{name}</span>
                        <span
                            className="mr-1.5 text-[#777] cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                removePickedUser(userId);
                            }}
                        >
                            &#x2715;
                        </span>
                    </div>
                );
            })}
        </>
    );
};

export default PickedUserPills;
