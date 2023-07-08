import * as React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ appState, setAppState }) {
  function handleSubmit(e){
    e.preventDefault()
    setAppState((prev) => ({
      ...prev, 
      isAuthenticated:false
    }))
    localStorage.setItem("Lifetracker_Token", null)
  }
  return (
    <>
      <div className="Navbar css-15bu2in">
        <div className="css-70qvj9">
          <a className="chakra-link css-14rj303" href="/">
            <img
              src="https://lifetracker.up.railway.app/assets/codepath-f1b3e41a.svg"
              alt="logo"
            />
          </a>

          
              <Link to="/activity" className="chakra-link css-74uit1">
                Activity
              </Link>
           

          <Link to="/exercise" className="chakra-link css-74uit1">
            Exercise
          </Link>
          <Link to="/nutrition" className="chakra-link css-74uit1">
            Nutrition
          </Link>
          <Link to="/sleep" className="chakra-link css-74uit1">
            Sleep
          </Link>
        </div>

        <div className="css-70qvj9">
          {appState.isAuthenticated ? (
            <a href="/" className="chakra-link css-spn4bz">
              <button onClick = {handleSubmit} type="button" className="chakra-button css-1t9i4zo">
                Sign Out
              </button>
            </a>
          ) : (
            <>
              <Link to="/login" className="chakra-link css-spn4bz">
                <button type="button" className="chakra-button css-1t9i4zo">
                  Sign In
                </button>
              </Link>
              <Link
                to="/register"
                className="chakra-link css-spn4bz"
                href="/register"
              >
                <button type="button" className="chakra-button css-td8gbm">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
