import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userCookie = Cookies.get('user');
    return userCookie ? JSON.parse(userCookie) : {
      name: "",
      surname: "",
      phoneNumber: "",
    };
  });

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    Cookies.set('user', JSON.stringify(updatedUser), { expires: 7 });
  };

  const logoutUser = () => {
    setUser({
      name: "",
      surname: "",
      phoneNumber: "",
    });
    Cookies.remove('user');
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
