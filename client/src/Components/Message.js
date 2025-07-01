import React from 'react'
import reactEmoji from 'react-emoji';
export default function Message({ message = {}, name }) {
    const { user, text } = message;
    let issentbycurrentuser = false;
    const trimmedname = name.trim().toLowerCase();
    if ( user === trimmedname) {
        issentbycurrentuser = true;
    }
    return (
        issentbycurrentuser ? (
            <div className="d-flex justify-content-end mb-2">
                <div className="bg-primary text-blue rounded px-3 py-2 me-2">
                    <p className="mb-1 ">{reactEmoji.emojify(text)}</p>
                </div>
                <span className="align-self-end small text-muted">{trimmedname}</span>
            </div>
        ) : (
            <div className="d-flex justify-content-start mb-2">
                <div className="bg-light text-dark rounded px-3 py-2 ms-2">
                    <p className="mb-1">{reactEmoji.emojify(text)}</p>
                </div>
                <span className="align-self-end small text-muted">{user}</span>
            </div>
        )
    );
}
