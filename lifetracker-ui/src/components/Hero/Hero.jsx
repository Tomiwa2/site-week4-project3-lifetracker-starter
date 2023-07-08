import * as React from "react";
import "./Hero.css";
import { Link } from "react-router-dom";
import FeedTiles from "../FeedTiles/FeedTiles";

export default function Hero({appState}) {
  return (
    <>
      <div className="css-1561uet">
        <div className="chakra-stack css-18rb735">
          {appState.isAuthenticated? (<><h1 className="chakra-heading css-bgad6s">Welcome {appState.user.first_name}</h1> <h2 className="chakra-heading css-1la3ewl">
          
          To the one stop shop that helps you take back control of your world!
        </h2></>):
          (<><h1 className="chakra-heading css-bgad6s">LifeTracker</h1> 
          <h2 className="chakra-heading css-1la3ewl">
          
          Helping you take back control of your world.
        </h2>
          </> )}
          
          
          {/* <a href="/signup">
            <button type="button" className="chakra-button css-uybm84">
              Create your account now
            </button>
          </a> */}
        </div>
        <div className="css-jocq0n">
          <img
            src="https://lifetracker.up.railway.app/assets/tracker-2a96bfd0.jpg"
            className="css-incex5"
          />
        </div>
      </div>
      {<FeedTiles />}
    </>
  );
}
