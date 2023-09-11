import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
// the actual value that i want to access
export const UserContext = createContext({
  // the empty state of an object should be null
  // so we know there is no context when the user value is null
  currentUser: null,
  setCurrentUser: () => null,
});
//the provider essentially allows any of its children components to access the values inside of its use state
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  //the moment i will initialize this listener i will run this callback once, any future callbacks is going to be tied directly to the actual auth state changing
  useEffect(() => {
    //the moment that this listener mounts, it will check the authentication state
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) createUserDocumentFromAuth(user);
      setCurrentUser(user);
      console.log(user);
    });
    //this unsubscribe method will clean the listener
    return unsubscribe;
  }, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
