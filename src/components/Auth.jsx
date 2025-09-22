import { useState } from "react";
import { auth, provider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const Auth = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const emailHandler = (e) => {
    let value = e.target.value;
    setEmail(value);
    console.log(value);
  };

  const passwordHandler = (e) => {
    let value = e.target.value;
    setPassword(value);
    console.log(value);
  };

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    signOut(auth);
  };

  const googleLogin = () => {
    signInWithPopup(auth, provider);
  };

  
  return (
    <>
      <input type="text" onChange={(e) => emailHandler(e)} /> <br></br>
      <input type="password" onChange={(e) => passwordHandler(e)} />
      <br></br>
      <button onClick={register}>Register</button>
      <button onClick={googleLogin}>Log In with Google</button>
      <button onClick={logOut}>Log Out</button>
    </>
  );
};
