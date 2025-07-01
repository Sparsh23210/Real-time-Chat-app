import React from 'react';
// import onlineImage from '../icons/onlineImage'
export default function UserList({ users }) {
    return (
        <div className="user-list p-3 border-start" style={{ minWidth: 200 }}>
            {/* <h6>Users in Room:</h6> */}
            <ul className="list-unstyled">
                {users.map(({ name }) => (
                    <li key={name} className="mb-2">
                        <span className="badge bg-success me-2">
                             {name}
                             {/* <img alt="Online Icon" src={onlineImage}/> */}
                        </span>
                       
                    </li>
                ))}
            </ul>
        </div>
    );
}