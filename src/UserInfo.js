import React from 'react';

const UserInfo = ({ nodeInfo }) => {
  if (!nodeInfo) return null;

  const { user, group, users, groups } = nodeInfo;

  return (
    <div style={{
      position: 'absolute',
      right: '20px',
      top: '20px',
      background: 'rgba(0, 0, 0, 0.7)',
      color: '#fff',
      padding: '20px',
      borderRadius: '10px',
      maxWidth: '300px'
    }}>
      {user && (
        <>
          <h3>{user.name}</h3>
          <p>Member of {groups.length} groups:</p>
          <ul>
            {groups.map(group => (
              <li key={group.id}>{group.name}</li>
            ))}
          </ul>
        </>
      )}
      {group && (
        <>
          <h3>{group.name}</h3>
          <p>Contains {users.length} users:</p>
          <ul>
            {users.map(user => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default UserInfo;
