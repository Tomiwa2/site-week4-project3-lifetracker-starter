import * as React from "react";
import "./Hero.css";
import { Link } from "react-router-dom";
import FeedTiles from "../FeedTiles/FeedTiles";

export default function Hero() {
  return (
    <>
      <div className="css-1561uet">
        <div className="chakra-stack css-18rb735">
          <h1 className="chakra-heading css-bgad6s">LifeTracker</h1>
          <h2 className="chakra-heading css-1la3ewl">
            Helping you take back control of your world.
          </h2>
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
