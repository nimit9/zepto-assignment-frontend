import React from 'react';

const UserAvatar = ({
    userId,
    userName,
    size,
}: {
    userId: string;
    userName: string;
    size: number;
}) => {
    return (
        <img
            src={`https://i.pravatar.cc/${size}?u=${userId}`}
            alt={userName}
            className="rounded-full shadow-sm m-px"
        />
    );
};

export default UserAvatar;
