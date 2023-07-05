import * as React from "react";
import "./RegistrationPage.css";
import { useState } from "react";
import {Link , useNavigate} from "react-router-dom";
import axios from "axios";

export default function RegistrationPage({setAppState}) {
const [userInfo, setUserInfo] = useState({ 
  email: "",
  username: "",
  first_name: "",
  last_name: "",
  password: "",
  confirmpassword: "",  
});

const Navigate = useNavigate()

console.log(userInfo)

const [errors, setErrors] = useState({});
const [isLoading, setIsLoading] = useState(false);

const handleOnInputChange = (event) => {
 if (event.target.name === "password") {
  if (
    userInfo.confirmpassword && 
    userInfo.confirmpassword !== event.target.value

  ) {
    setErrors ((e) => ({...e, confirmPassword: "Passwords do not match"}));
  } else {
    setErrors ((e) => ({...e, confirmPassword: null }))
  }
 }


 if (event.target.name === "confirmpassword ") {
  if(
    userInfo.password && userInfo.password !== event.target.value
  ){ 
    setErrors((e)=>({...e, confirmPassword: "Passwords do not match"}));
  } else{ 
    setErrors ((e) => ({...e, confirmPassword: null}))
  }
 }
if (event.target.name === "email") {
  if(event.target.value.indexOf ("@") === -1){
    setErrors((e)=>({...e, email: "Please enter a valid email."}));
  } else{
    setErrors ((e) => ({...e, email: null}))
  }
}

setUserInfo((prevState) => ({
  ...prevState,
  [event.target.name]: event.target.value,
}));

};

const handleOnSubmit = async(e) => {
  e.preventDefault();
  setIsLoading(true);
  setErrors ((e) => ({...e, form: null }));
  if (userInfo.confirmpassword  !== userInfo.password) {
    // setErrors((e) => ({...e, passwordConfirm: "Passwords do not match."}))

    setIsLoading(false);
    return;
  } else {

    // setErrors((e) => ({...e, passwordConfirm: null}));
  }

  try {
    const res = await axios.post(`http://localhost:3001/auth/register`, {
      email: userInfo.email,
      username: userInfo.username,
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      password: userInfo.password
    });

    console.log(res);
    if (res?.data?.user) {
      setAppState((...prevState) => ({
        ...prevState,
        user: res.data.user,
        isAuthenticated: true,
      }));
      setIsLoading(false);
      Navigate("/");
    } else {
      setErrors((e) => ({
        ...e, 
        form: "Something went wrong with registering",
      }));
      setIsLoading(false);
    }
  } catch {
    console.log(err)
    const message = err?.response?.data?.error?.message;
    setErrors((e) => ({
      ...e,
      form: message ? String(message) : String(err),
    }))
  }
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
          <h2 className="chakra-heading css-3q8efk">Create an Account</h2>
          <div className="css-ebzegt">
            <form >
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
                      id="field-:ra:"
                      required=""
                      aria-required="true"
                      className="chakra-input css-trvw4f"
                      value={userInfo.email}
                      onChange={handleOnInputChange}
                      // style='background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAfBJREFUWAntVk1OwkAUZkoDKza4Utm61iP0AqyIDXahN2BjwiHYGU+gizap4QDuegWN7lyCbMSlCQjU7yO0TOlAi6GwgJc0fT/fzPfmzet0crmD7HsFBAvQbrcrw+Gw5fu+AfOYvgylJ4TwCoVCs1ardYTruqfj8fgV5OUMSVVT93VdP9dAzpVvm5wJHZFbg2LQ2pEYOlZ/oiDvwNcsFoseY4PBwMCrhaeCJyKWZU37KOJcYdi27QdhcuuBIb073BvTNL8ln4NeeR6NRi/wxZKQcGurQs5oNhqLshzVTMBewW/LMU3TTNlO0ieTiStjYhUIyi6DAp0xbEdgTt+LE0aCKQw24U4llsCs4ZRJrYopB6RwqnpA1YQ5NGFZ1YQ41Z5S8IQQdP5laEBRJcD4Vj5DEsW2gE6s6g3d/YP/g+BDnT7GNi2qCjTwGd6riBzHaaCEd3Js01vwCPIbmWBRx1nwAN/1ov+/drgFWIlfKpVukyYihtgkXNp4mABK+1GtVr+SBhJDbBIubVw+Cd/TDgKO2DPiN3YUo6y/nDCNEIsqTKH1en2tcwA9FKEItyDi3aIh8Gl1sRrVnSDzNFDJT1bAy5xpOYGn5fP5JuL95ZjMIn1ya7j5dPGfv0A5eAnpZUY3n5jXcoec5J67D9q+VuAPM47D3XaSeL4AAAAASUVORK5CYII="); background-repeat: no-repeat; background-attachment: scroll; background-size: 16px 18px; background-position: 98% 50%; cursor: auto;'
                    />
                  </div>
                </div>
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
                        <path d="M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0 112 64.5 112 144s64.5 144 144 144zm128 32h-55.1c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16H128C57.3 320 0 377.3 0 448v16c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-16c0-70.7-57.3-128-128-128z"></path>
                      </svg>
                    </div>
                    <input
                      name="username"
                      type="text"
                      placeholder="Username"
                      id="field-:rb:"
                      required=""
                      aria-required="true"
                      className="chakra-input css-trvw4f"
                      value={userInfo.username}
                      onChange={handleOnInputChange}

                    />
                  </div>
                </div>
                <div className="css-9jay18">
                  <div role="group" className="chakra-form-control css-1kxonj9">
                    <div
                      className="chakra-input__group css-bx0blc"
                      data-group="true"
                    >
                      <input
                        type="text"
                        name="first_name"
                        placeholder="First name"
                        id="field-:rc:"
                        required=""
                        aria-required="true"
                        className="chakra-input css-qz53jc"
                        value={userInfo.first_name}
                        onChange={handleOnInputChange}

                      />
                    </div>
                  </div>
                  &nbsp;
                  <div role="group" className="chakra-form-control css-1kxonj9">
                    <div
                      className="chakra-input__group css-bx0blc"
                      data-group="true"
                    >
                      <input
                        name="last_name"
                        type="text"
                        placeholder="Last name"
                        id="field-:rd:"
                        required=""
                        aria-required="true"
                        className="chakra-input css-qz53jc"
                        value={userInfo.last_name}
                        onChange={handleOnInputChange}

                      />
                    </div>
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
                      id="field-:re:"
                      required=""
                      aria-required="true"
                      className="chakra-input css-67vh0"
                      value={userInfo.password}
                      onChange={handleOnInputChange}

                      // style='background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABKRJREFUWAnNl0tsVGUUxzvTTlslZUaCloZHY6BRFkp9sDBuqgINpaBp02dIDImwKDG6ICQ8jBYlhg0rxUBYEALTpulMgBlqOqHRDSikJkZdGG0CRqAGUuwDovQ1/s7NPTffnTu3zMxGvuT2vP7n8Z3vu+dOi4r+5xUoJH8sFquamZmpTqfTVeIfCARGQ6HQH83NzaP5xsu5gL6+vuVzc3NdJN1Kkhd8Ev1MMYni4uJjra2tt3wwLvUjCxgYGFg8Pj7+MV5dPOUub3/hX0zHIpFId0NDw6Q/jO4tZOzv76+Znp6+AOb5TBw7/YduWC2Hr4J/IhOD/GswGHy7vb39tyw2S+VbAC1/ZXZ29hKoiOE8RrIvaPE5WvyjoS8CX8sRvYPufYpZYtjGS0pKNoD/wdA5bNYCCLaMYMMEWq5IEn8ZDof3P6ql9pF9jp8cma6bFLGeIv5ShdISZUzKzqPIVnISp3l20caTJsaPtwvc3dPTIx06ziZkkyvY0FnoW5l+ng7guAWnpAI5w4MkP6yy0GQy+dTU1JToGm19sqKi4kBjY+PftmwRYn1ErEOq4+i2tLW1DagsNGgKNv+p6tj595nJxUbyOIF38AwipoSfnJyMqZ9SfD8jxlWV5+fnu5VX6iqgt7d3NcFeUiN0n8FbLEOoGkwdgY90dnbu7OjoeE94jG9wd1aZePRp5AOqw+9VMM+qLNRVABXKkLEWzn8S/FtbdAhnuVQE7LdVafBPq04pMYawO0OJ+6XHZkFcBQA0J1xKgyhlB0EChEWGX8RulsgjvOjEBu+5V+icWOSoFawuVwEordluG28oSCmXSs55SGSCHiXhmDzC25ghMHGbdwhJr6sAdpnyQl0FYIyoEX5CeYOuNHg/NhvGiUUxVgfV2VUAxjtqgPecp9oKoE4sNnbX9HcVgMH8nD5nAoWnKM/5ZmKyySRdq3pCmDncR4DxOwVC64eHh0OGLOcur1Vey46xUZ3IcVl5oa4OlJaWXgQwJwZyhUdGRjqE14VtSnk/mokhxnawiwUvsZmsX5u+rgKamprGMDoA5sKhRCLxpDowSpsJ8vpCj2AUPzg4uIiNfKIyNMkH6Z4hF3k+RgTYz6vVAEiKq2bsniZIC0nTtvMVMwBzoBT9tKkTHp8Ak1V8dTrOE+NgJs7VATESTH5WnVAgfHUqlXK6oHpJEI1G9zEZH/Du16leqHyS0UXBNKmeOMf5NvyislJPB8RAFz4g8IuwofLy8k319fUP1EEouw7L7mC3kUTO1nn3sb02MTFxFpsz87FfJuaH4pu5fF+reDz+DEfxkI44Q0ScSbyOpDGe1RqMBN08o+ha0L0JdeKi/6msrGwj98uZMeon1AGaSj+elr9LwK9IkO33n8cN7Hl2vp1N3PcYbUXOBbDz9bwV1/wCmXoS3+B128OPD/l2LLg8l9APXVlZKZfzfDY7ehlQv0PPQDez6zW5JJdYOXdAwHK2dGIv7GH4YtHJIvEOvvunLCHPPzl3QOLKTkl0hPbKaDUvlTU988xtwfMqQBPQ3m/4mf0yBVlDCSr/CRW0CipAMnGzb9XU1NSRvIX7kSgo++Pg9B8wltxxbHKPZgAAAABJRU5ErkJggg=="); background-repeat: no-repeat; background-attachment: scroll; background-size: 16px 18px; background-position: 98% 50%; cursor: auto;'
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
                      name="confirmpassword"
                      type="password"
                      placeholder="Confirm Password"
                      id="field-:rf:"
                      required=""
                      aria-required="true"
                      className="chakra-input css-67vh0"
                      value={userInfo.confirmpassword}
                      onChange={handleOnInputChange}
                      // style='background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABKRJREFUWAnNl0tsVGUUxzvTTlslZUaCloZHY6BRFkp9sDBuqgINpaBp02dIDImwKDG6ICQ8jBYlhg0rxUBYEALTpulMgBlqOqHRDSikJkZdGG0CRqAGUuwDovQ1/s7NPTffnTu3zMxGvuT2vP7n8Z3vu+dOi4r+5xUoJH8sFquamZmpTqfTVeIfCARGQ6HQH83NzaP5xsu5gL6+vuVzc3NdJN1Kkhd8Ev1MMYni4uJjra2tt3wwLvUjCxgYGFg8Pj7+MV5dPOUub3/hX0zHIpFId0NDw6Q/jO4tZOzv76+Znp6+AOb5TBw7/YduWC2Hr4J/IhOD/GswGHy7vb39tyw2S+VbAC1/ZXZ29hKoiOE8RrIvaPE5WvyjoS8CX8sRvYPufYpZYtjGS0pKNoD/wdA5bNYCCLaMYMMEWq5IEn8ZDof3P6ql9pF9jp8cma6bFLGeIv5ShdISZUzKzqPIVnISp3l20caTJsaPtwvc3dPTIx06ziZkkyvY0FnoW5l+ng7guAWnpAI5w4MkP6yy0GQy+dTU1JToGm19sqKi4kBjY+PftmwRYn1ErEOq4+i2tLW1DagsNGgKNv+p6tj595nJxUbyOIF38AwipoSfnJyMqZ9SfD8jxlWV5+fnu5VX6iqgt7d3NcFeUiN0n8FbLEOoGkwdgY90dnbu7OjoeE94jG9wd1aZePRp5AOqw+9VMM+qLNRVABXKkLEWzn8S/FtbdAhnuVQE7LdVafBPq04pMYawO0OJ+6XHZkFcBQA0J1xKgyhlB0EChEWGX8RulsgjvOjEBu+5V+icWOSoFawuVwEordluG28oSCmXSs55SGSCHiXhmDzC25ghMHGbdwhJr6sAdpnyQl0FYIyoEX5CeYOuNHg/NhvGiUUxVgfV2VUAxjtqgPecp9oKoE4sNnbX9HcVgMH8nD5nAoWnKM/5ZmKyySRdq3pCmDncR4DxOwVC64eHh0OGLOcur1Vey46xUZ3IcVl5oa4OlJaWXgQwJwZyhUdGRjqE14VtSnk/mokhxnawiwUvsZmsX5u+rgKamprGMDoA5sKhRCLxpDowSpsJ8vpCj2AUPzg4uIiNfKIyNMkH6Z4hF3k+RgTYz6vVAEiKq2bsniZIC0nTtvMVMwBzoBT9tKkTHp8Ak1V8dTrOE+NgJs7VATESTH5WnVAgfHUqlXK6oHpJEI1G9zEZH/Du16leqHyS0UXBNKmeOMf5NvyislJPB8RAFz4g8IuwofLy8k319fUP1EEouw7L7mC3kUTO1nn3sb02MTFxFpsz87FfJuaH4pu5fF+reDz+DEfxkI44Q0ScSbyOpDGe1RqMBN08o+ha0L0JdeKi/6msrGwj98uZMeon1AGaSj+elr9LwK9IkO33n8cN7Hl2vp1N3PcYbUXOBbDz9bwV1/wCmXoS3+B128OPD/l2LLg8l9APXVlZKZfzfDY7ehlQv0PPQDez6zW5JJdYOXdAwHK2dGIv7GH4YtHJIvEOvvunLCHPPzl3QOLKTkl0hPbKaDUvlTU988xtwfMqQBPQ3m/4mf0yBVlDCSr/CRW0CipAMnGzb9XU1NSRvIX7kSgo++Pg9B8wltxxbHKPZgAAAABJRU5ErkJggg=="); background-repeat: no-repeat; background-attachment: scroll; background-size: 16px 18px; background-position: 98% 50%; cursor: auto;'
                    />
                    <br />
                 
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
                    {
                      userInfo.password !== userInfo.confirmpassword ? ("Password do not match.") : (null)
                    }
                <button  className="chakra-button css-4lvvxn" onClick = {handleOnSubmit}>
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="css-0">
          Have an account?{" "}
          <a className="chakra-link css-c6nly4" href="/login">
            Login
          </a>
        </div>
      </div>
    </>
  );
}
