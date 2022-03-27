import React from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc } from "@firebase/firestore";
import { useState } from "react";
import { login } from "../../features/User/userSlice";
import { useDispatch } from "react-redux";
import { userRef, db } from "../../firebase";

const SignUp = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        updateProfile(cred.user, { displayName: name })
          .then(() => {
            dispatch(
              login({
                name: name,
                uid: cred.user.uid,
                jobDesc: jobDesc,
                email: email,
              })
            );
          })
          .then(() => {
            setDoc(doc(db, "users", cred.user.uid), {
              jobDesc: jobDesc,
            }).then(() => {
              navigate("/");
              // window.location.reload();
            });
          });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setPassword("");
      });
  };
  return (
    <div className="signup">
      <header className="signup__header">
        <div className="main__logo">
          <Link to="/">
            <img src="./images/linkedin-logo.png" alt="" />
          </Link>
        </div>

        <h1>Make the most of your professional life</h1>
      </header>
      <div className="content">
        <form className="signup__form" onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Job Description"
            required
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Join</button>
        </form>
        <div className="login__link">
          Already on Linkedin?{" "}
          <Link to="/login">
            {" "}
            <span>sign in</span>{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
