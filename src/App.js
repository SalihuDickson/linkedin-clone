import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import LogInOrSignUp from "./components/LoginOrSignUp/LogInOrSignUp";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import EditPost from "./components/Home/Feed/Post/EditPost/EditPost";
import { useEffect } from "react";
import { onAuthStateChanged, getAuth } from "@firebase/auth";
import { doc, getDoc } from "@firebase/firestore";
import { login, logout } from "./features/User/userSlice";
import { db } from "./firebase";

function App() {
  const auth = getAuth();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    let isMounted = true;
    let subAuth = null;

    if (isMounted) {
      subAuth = onAuthStateChanged(auth, (user) => {
        if (user) {
          getDoc(doc(db, "users", user.uid)).then((userData) => {
            dispatch(
              login({
                name: user.displayName,
                uid: user.uid,
                email: user.email,
                jobDesc: userData.data().jobDesc,
              })
            );
          });
        } else {
          dispatch(logout());
        }
      });
    }

    return () => {
      isMounted = false;
      subAuth();
    };
  }, []);

  return (
    <div className="App">
      {!user ? (
        <>
          <Routes>
            <Route path="/" element={<LogInOrSignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route
              path="/request-password-reset"
              element={<ForgotPassword />}
            />
          </Routes>
        </>
      ) : (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
