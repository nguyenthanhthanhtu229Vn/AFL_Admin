import React, { useState, useEffect } from "react";
import styles from "./styles/style.module.css";
import { Link, useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import axios from "axios";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import { toast } from "react-toastify";
import LoadingAction from "../LoadingComponent/LoadingAction";
function Login() {
  const firebaseConfig = {
    apiKey: "AIzaSyCYXpUYy_KK1FjtBjz19gY2QTWi4sBcsgU",
    authDomain: "amateurfoooballleague.firebaseapp.com",
    databaseURL: "gs://amateurfoooballleague.appspot.com",
    projectId: "amateurfoooballleague",
    storageBucket: "amateurfoooballleague.appspot.com",
    messagingSenderId: "765175452190",
    appId: "1:765175452190:web:3e01517d116d4777c9140f",
    measurementId: "G-7Z7LB0W52J",
  };

  firebase.initializeApp(firebaseConfig);

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePass = () => {
    setPasswordShown(!passwordShown);
  };

  const [loading, setloading] = useState(false);
  const [newAcc, setNewAcc] = useState(false);
  let navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    username: "",
    password: "",
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const [userNameErr, setUserNameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const loginWithPass = async () => {
    try {
      if (
        inputValues.username.trim() === "" ||
        (inputValues.password.trim() == null &&
          inputValues.password.trim() == "") ||
        inputValues.password.trim() == null
      ) {
        setUserNameErr("Vui lòng nhập tên đăng nhập");
        setPasswordErr("Vui lòng nhập mật khẩu");
        return;
      } else if (
        inputValues.username.trim() === "" ||
        inputValues.password.trim() == null
      ) {
        setUserNameErr("Vui lòng nhập tên đăng nhập");
        setPasswordErr("");
        return;
      } else if (
        inputValues.password.trim() === "" ||
        inputValues.password.trim() == null
      ) {
        setPasswordErr("Vui lòng nhập mật khẩu");
        setUserNameErr("");
        return;
      } else {
        setUserNameErr("");
        setPasswordErr("");
      }

      setloading(true);
      const data = {
        email: inputValues.username,
        password: inputValues.password,
      };
      const response = await axios.post(
        "https://afootballleague.ddns.net/api/v1/auth/login-email-password",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.data.userVM.roleId === 1) {
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        window.location.reload();
        setloading(false);
        navigate("../home", { replace: true });
      } else {
        toast.error("Bạn không phải là admin", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setloading(false);
      }
    } catch (err) {
      console.log(err.response.data);
      if (err.response.data === "Tài khoản không tồn tại") {
        setUserNameErr(err.response.data);
        setPasswordErr("");
      }
      if (err.response.data === "Sai mật khẩu") {
        setUserNameErr("");
        setPasswordErr(err.response.data);
      }
      setloading(false);
    }
  };

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!user) {
          console.log("user not loggin");
          setNewAcc(false);
          return;
        }
        const token = await user.getIdToken();
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  const auth = getAuth();

  return (
    <div className={styles.login}>
      <ScrollToTop />
      {loading ? <LoadingAction /> : null}
      <div className={styles.container__wrap}>
        <div className={styles.login__sub}>
          <img
            src="assets/img/homepage/cornor.jpg"
            alt="cornor"
            className={styles.imgBack}
          />
          <Link to="/" className={styles.logo}>
            <img src="assets/img/homepage/logo.png" alt="logo" />
          </Link>
          <div className={styles.login__sub__text}>
            <h3>Chúng tôi rất vui khi thấy bạn trở lại!</h3>
            <h2>Amateur Football League</h2>
          </div>
        </div>
        <div className={styles.login__main}>
          <form action="" method="POST" className={styles.login__form}>
            <h4>Đăng nhập</h4>
            <div>
              <img src="/assets/icons/mail-icon.svg" alt="lock" />
              <input
                type="text"
                required
                autoComplete="off"
                className={styles.email}
                name="username"
                onChange={handleOnChange}
              />
            </div>
            <p className={styles.error}>{userNameErr}</p>
            <div>
              <img src="/assets/icons/lock-icon.svg" alt="lock" />
              <input
                type={passwordShown ? "text" : "password"}
                required
                className={styles.pass}
                name="password"
                onChange={handleOnChange}
              />
              <img
                src="/assets/icons/eye-close-up.png"
                alt="eye"
                className={styles.eyesPass}
                onClick={togglePass}
              />
            </div>
            <p className={styles.error}>{passwordErr}</p>
            <div className={styles.remember__pass}>
              <Link to={"/resetPassword"}>Quên mật khẩu?</Link>
            </div>
            <button
              type="submit"
              className={styles.btn_login}
              onClick={(e) => {
                loginWithPass();
                e.preventDefault();
              }}
            >
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
