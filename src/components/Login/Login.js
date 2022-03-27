import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { login } from "../../features/User/userSlice";
import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import { getDoc, doc } from "@firebase/firestore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { db } from "../../firebase";

const Login = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        getDoc(doc(db, "users", cred.user.uid)).then((userData) => {
          navigate("/");
          dispatch(
            login({
              name: cred.user.displayName,
              uid: cred.user.uid,
              email: cred.user.email,
              jobDesc: userData.data().jobDesc,
            })
          );
        });
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setPassword("");
      });
  };

  return (
    <div className="login">
      <header className="login__header">
        <div className="header__left">
          <div className="main__logo">
            <img src="./images/linkedin-logo.png" alt="" />
          </div>
        </div>
      </header>

      <div className="content">
        <form className="login__form" onSubmit={handleLogin} action="">
          <div className="heading">
            <h1>Sign In</h1>
            <h4>Stay updated on your professional world</h4>
          </div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <Link to="/request-password-reset">
            <p className="forgotpassword__link">Forgot Password?</p>{" "}
          </Link>
          <button type="submit">Sign In</button>
        </form>
        <div className="signup__link">
          New to LinkedIn?{" "}
          <Link to="/sign-up">
            {" "}
            <span>Join now</span>{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
