import * as React from "react";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import apiClient from "../../Services/apiClient";

export default function LoginPage({ appState, setAppState }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const Navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try{

      const {data, error, message} = await apiClient.login({
        email: email,
        password: password
      })
      console.log(data)
      console.log(error)
      if (data) {
        setAppState((prevState) => ({
          ...prevState,
                user: data.userInfo,
                nutrition: data.nutrition,
                isAuthenticated: true
              }));
      }
      localStorage.setItem("Lifetracker_Token", data.token )
      apiClient.setToken(data.token);
      Navigate("/activity");
    }catch(err){
      console.log(err);
      const message = err?.response?.data?.error?.message;
      setErrors((e) => ({
        ...e,
        form: message ? String(message) : String(err),
      }));

    }
    // try {
    //   const res = await axios.post(`http://localhost:3001/auth/login`, {
    //     email: email,
    //     password: password
    //   });

    //   console.log(res.data.token);
    //   if (res?.data?.userInfo) {
    //     setAppState((prevState) => ({
    //       ...prevState,
    //       user: res.data.userInfo,
    //       nutrition: res.data.nutrition,
    //       isAuthenticated: true
    //     }));

    //    localStorage.setItem("Lifetracker_Token", res.data.token )
    //     Navigate("/");
    //   } else {
    //     setErrors((e) => ({
    //       ...e,
    //       form: "Invalid Password/Email",
    //     }));
    //     //setIsLoading(false);
    //   }
    // } catch (err) {
    //   console.log(err);
    //   const message = err?.response?.data?.error?.message;
    //   setErrors((e) => ({
    //     ...e,
    //     form: "Invalid Password/Email",
    //   }));
    // }
  };

  return (
    <>
      <div className="css-9cjjy5">
        <div className="chakra-stack css-15xvz01">
          <span className="chakra-avatar css-11g7hql">
            <svg
              viewBox="0 0 128 128"
              className="chakra-avatar__svg css-16ite8i"
              role="img"
              aria-label=" avatar"
            >
              <path
                fill="currentColor"
                d="M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z"
              ></path>
              <path
                fill="currentColor"
                d="M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24"
              ></path>
            </svg>
          </span>
          <h2 className="chakra-heading css-3q8efk">Welcome</h2>
          <div className="css-ebzegt">
            <form onSubmit={handleLogin}>
              <div className="chakra-stack css-1opnp10">
                <div role="group" className="chakra-form-control css-1kxonj9">
                  <div
                    className="chakra-input__group css-bx0blc"
                    data-group="true"
                  >
                    <div className="chakra-input__left-element css-1cw84h2">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        className="css-119zpey"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path>
                      </svg>
                    </div>
                    <input
                      name="email"
                      type="email"
                      placeholder="Email"
                      id="field-:rg:"
                      required=""
                      aria-required="true"
                      className="chakra-input css-trvw4f"
                      onChange={(event) => setEmail(event.target.value)}
                      value={email}

                      //   style='background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAmJJREFUWAntV7uKIkEUvbYGM4KID3wEIgjKRLLpKGLgFwiCfslGhkb7IbLgAzE1GhMxWxRRBEEwmEgDERWfW6fXuttq60a2wU6B1qlzb9U5fatsKROJVigUArvd7oeAyePx6Af3qGYymT7F2h8Wi+V7Pp+fmE7iv4Sw81GieusKIzNh4puCJzdaHIagCW1F4KSeQ4O4pPLoPb/3INBGBZ7avgz8fxWIxWIUCoX43Blegbe3NwoGg88zwMoncFUB8Yokj8dDdrv9MpfHVquV/H4/iVcpc1qgKAp5vV6y2WxaWhefreB0OimXy6kGkD0YDKhSqdB2u+XJqVSK4vE4QWS5XKrx0WjEcZ/PR9lslhwOh8p1Oh2q1Wp0OBw4RwvOKpBOp1kcSdivZPLvmxrjRCKhiiOOSmQyGXp5ecFQbRhLcRDRaJTe39//BHW+2cDr6ysFAoGrlEgkwpwWS1I7z+VykdvtliHuw+Ew40vABvb7Pf6hLuMk/rGY02ImBZC8dqv04lpOYjaw2WzUPZcB2WMPZet2u1cmZ7MZTSYTNWU+n9N4PJbp3GvXYPIE2ADG9Xqder2e+kTr9ZqazSa1222eA6FqtUoQwqHCuFgscgWQWC6XaTgcEiqKQ9poNOiegbNfwWq1olKppB6yW6cWVcDHbDarIuzuBBaLhWrqVvwy/6wCMnhLXMbR4wnvtX/F5VxdAzJoRH+2BUYItlotmk6nLGW4gX6/z+IAT9+CLwPPr8DprnZ2MIwaQBsV+DBKUEfnQ8EtFRdFneBDKWhCW8EVGbdUQfxESR6qKhaHBrSgCe3fbLTpPlS70M0AAAAASUVORK5CYII="); background-repeat: no-repeat; background-attachment: scroll; background-size: 16px 18px; background-position: 98% 50%; cursor: auto;'
                    />
                  </div>
                </div>
                <div role="group" className="chakra-form-control css-1kxonj9">
                  <div
                    className="chakra-input__group css-bx0blc"
                    data-group="true"
                  >
                    <div className="chakra-input__left-element css-17ke578">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 448 512"
                        className="css-119zpey"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"></path>
                      </svg>
                    </div>
                    <input
                      name="password"
                      type="password"
                      placeholder="Password"
                      id="field-:rh:"
                      required=""
                      aria-required="true"
                      className="chakra-input css-67vh0"
                      onChange={(event) => setPassword(event.target.value)}
                      value={password}
                      //   style='background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAmJJREFUWAntV7uKIkEUvbYGM4KID3wEIgjKRLLpKGLgFwiCfslGhkb7IbLgAzE1GhMxWxRRBEEwmEgDERWfW6fXuttq60a2wU6B1qlzb9U5fatsKROJVigUArvd7oeAyePx6Af3qGYymT7F2h8Wi+V7Pp+fmE7iv4Sw81GieusKIzNh4puCJzdaHIagCW1F4KSeQ4O4pPLoPb/3INBGBZ7avgz8fxWIxWIUCoX43Blegbe3NwoGg88zwMoncFUB8Yokj8dDdrv9MpfHVquV/H4/iVcpc1qgKAp5vV6y2WxaWhefreB0OimXy6kGkD0YDKhSqdB2u+XJqVSK4vE4QWS5XKrx0WjEcZ/PR9lslhwOh8p1Oh2q1Wp0OBw4RwvOKpBOp1kcSdivZPLvmxrjRCKhiiOOSmQyGXp5ecFQbRhLcRDRaJTe39//BHW+2cDr6ysFAoGrlEgkwpwWS1I7z+VykdvtliHuw+Ew40vABvb7Pf6hLuMk/rGY02ImBZC8dqv04lpOYjaw2WzUPZcB2WMPZet2u1cmZ7MZTSYTNWU+n9N4PJbp3GvXYPIE2ADG9Xqder2e+kTr9ZqazSa1222eA6FqtUoQwqHCuFgscgWQWC6XaTgcEiqKQ9poNOiegbNfwWq1olKppB6yW6cWVcDHbDarIuzuBBaLhWrqVvwy/6wCMnhLXMbR4wnvtX/F5VxdAzJoRH+2BUYItlotmk6nLGW4gX6/z+IAT9+CLwPPr8DprnZ2MIwaQBsV+DBKUEfnQ8EtFRdFneBDKWhCW8EVGbdUQfxESR6qKhaHBrSgCe3fbLTpPlS70M0AAAAASUVORK5CYII="); background-repeat: no-repeat; background-attachment: scroll; background-size: 16px 18px; background-position: 98% 50%; cursor: auto;'
                    />

                    <div className="chakra-input__right-element css-1qww07b">
                      <button
                        type="button"
                        className="chakra-button css-18zqh0c"
                      >
                        Show
                      </button>
                    </div>
                  </div>
                </div>
                {errors.form && <div>{errors.form}</div>}
                <button type="submit" className="chakra-button css-4lvvxn">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="css-0">
          New to us? <Link to="/register">Sign Up</Link>
        </div>
      </div>
    </>
  );
}
