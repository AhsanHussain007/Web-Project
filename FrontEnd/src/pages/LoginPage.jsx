import { useState } from "react";
import styles from "./../css/skeleton.module.css";
import ReceptionPage from "./ReceptionPage";
import DoctorPage from "./DoctorPage";

export default function LoginPage() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("reception");
  const [isSignup, setIsSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const onLoginTypeOption = (e) => {
    setLoginType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignup) {
      if (password !== confirmPassword) {
        alert("Passwords don't match!");
        return;
      }
      const data = { email, password, userName };

      try {
        await fetch("http://localhost:3000/user/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => {
            console.log("res", res);
            if (res.status === 201 || res.status === 200) {
              setIsSignup(false);
            }
          })
          .then((data) => {
            console.log(data);
          });
      } catch (err) {
        alert(err);
      }
    } else {
      // Handle login logic here
      try {
        await fetch("http://localhost:3000/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        })
          .then((res) => {
            console.log("res", res);
            if (res.status === 200) {
              alert("Login Successful");
              setIsLoggedIn(true);
            }
          })
          .then((data) => {
            console.log(data);
          });
      } catch (error) {}
      console.log("Login:", { userName, password, loginType });
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    // Clear form fields when switching modes
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setEmail("");
  };

  return (
    <>
      {!isLoggedIn && (
        <div className={styles.defaultX}>
          <div className={styles.containerX}>
            <form onSubmit={handleSubmit}>
              <h1>{isSignup ? "Sign Up" : "Login"}</h1>
              <table>
                <tbody>
                  {isSignup && (
                    <tr>
                      <td>
                        <label htmlFor="userName">UserName:</label>
                      </td>
                      <td>
                        <input
                          type="text"
                          value={userName}
                          onChange={(e) => setUsername(e.target.value)}
                          id="userName"
                          required
                        />
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td>
                      <label htmlFor="email">Email:</label>
                    </td>
                    <td>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="password">Password:</label>
                    </td>
                    <td>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        required
                      />
                    </td>
                  </tr>
                  {isSignup && (
                    <tr>
                      <td>
                        <label htmlFor="confirmPassword">
                          Confirm Password:
                        </label>
                      </td>
                      <td>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          id="confirmPassword"
                          required
                        />
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td>
                      <label>Login Type:</label>
                    </td>
                    <td>
                      <input
                        type="radio"
                        id="reception"
                        value="reception"
                        name="loginType"
                        onChange={onLoginTypeOption}
                        defaultChecked
                      />
                      <label htmlFor="reception">Reception</label>
                      <input
                        type="radio"
                        id="doctor"
                        value="doctor"
                        name="loginType"
                        onChange={onLoginTypeOption}
                      />
                      <label htmlFor="doctor">Doctor</label>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" align="center">
                      <button type="submit" className={styles.buttonX}>
                        {isSignup ? "Sign Up" : "Login"}
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" align="center">
                      <p>
                        {isSignup
                          ? "Already have an account? "
                          : "Need an account? "}
                        <span
                          onClick={toggleMode}
                          style={{
                            color: "#d4aa3a",
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                        >
                          {isSignup ? "Login" : "Sign Up"}
                        </span>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
      )}
      {isLoggedIn && loginType === "reception" && <ReceptionPage />}
      {isLoggedIn && loginType === "doctor" && <DoctorPage />}
    </>
  );
}
