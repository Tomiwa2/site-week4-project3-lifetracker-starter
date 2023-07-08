import * as React from "react";
import { Link } from "react-router-dom";
import "./NutritionPage.css";
import { useEffect, useState } from "react";


export default function NutritionPage({ appState, setAppState }) {
  const [nutriForm, setNutriform] = useState(false);

  const handleNutrition = (event) => {
    event.preventDefault();
    setNutriform(true);
  };

  console.log(appState.nutrition)

  function timestamp(stamp){
    console.log(stamp)
    let time = new Date(stamp);
    return time.toLocaleTimeString();

  }

  return (
    <>
      {appState.isAuthenticated ? (
        <>
          <div className="NutritionPage css-1bpnzr3">
            <div className="css-1ef7k5z">
              <div className="chakra-stack css-1cgbrw5">
                <h2 className="chakra-heading css-b5coes">Nutrition</h2>
              </div>
            </div>
            <div className="css-vpbd2d">
              <div className="css-1qfrez2">
                <div className="css-uiodal">
                  <div className="nutrition-feed">
                    <div className="css-0">
                      <Link
                        to="/nutrition/create"
                        className="chakra-link button css-spn4bz"
                      >
                        <button
                          //onClick = {handleNutrition}
                          type="button"
                          className="chakra-button css-ez23ye"
                        >
                          Record Nutrition
                        </button>
                      </Link>
                      {appState.nutrition.length === 0 ? (
                        <div className="css-j7qwjs">
                          <h2 className="chakra-heading css-hzsul0">
                            Nothing here yet.
                          </h2>

                          <img
                            src="src/assets/empty-fridge.jpg"
                            className="chakra-image css-ni3ua3"
                          />
                        </div>
                      ) : (
                        appState.nutrition.nutrition?.map((info) => {
                          console.log("info: ", info)
                          return (
                         <>
                          <div> 
                            {/* <div>Today at {timestamp(info.created_at)}</div> */}
                             </div>
                            <div class="chakra-stack css-xixnl8"><span class="css-89mcmc">Today at {timestamp(info.created_at)}</span><div class="css-2plr3x"><div class="css-56yjmq"><span class="chakra-avatar css-64l6oh"><div role="img" aria-label="hello" class="chakra-avatar__initials css-1ebyn6"></div></span><div class="css-1kw2fa0"><h2 class="chakra-heading css-y5314g">{info.name}<span class="chakra-badge css-lvvibp">{info.category}</span></h2></div></div><div class="white css-1lekzkb"><div class="chakra-stat css-1mbo1ls"><dl><dt class="chakra-stat__label css-14go5ty">Calories</dt><dd class="chakra-stat__number css-1axeus7">{info.calories}</dd></dl></div><div class="chakra-stat css-1mbo1ls"><dl><dt class="chakra-stat__label css-14go5ty">Quantity</dt><dd class="chakra-stat__number css-1axeus7">{info.quantity}</dd></dl></div></div></div></div>
                            
                            </>
                        )
                      })
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h2 className="chakra-heading css-1dklj6k">Log in to see your data.</h2>
      )}
    </>
  );
}
