import * as React from "react";
import "./ExercisePage.css";

export default function ExercisePage({ appState, setAppState }) {
  return (
    <>
      {appState.isAuthenticated ? (
        <>
          <div className="ExercisePage css-1bpnzr3">
            <div className="css-19cns6y">
              <div className="chakra-stack css-1cgbrw5">
                <h2 className="chakra-heading css-b5coes">Exercise</h2>
              </div>
            </div>
            <div className="css-vpbd2d">
              <div className="css-1qfrez2">
                <div className="css-uiodal">
                  <div className="exercise-feed">
                    <div className="css-0">
                      <div className="css-j7qwjs">
                        <h2 className="chakra-heading css-hzsul0">
                          Nothing here yet.
                        </h2>
                        <a
                          className="chakra-link button css-spn4bz"
                          href="/exercise/create"
                        >
                          <button
                            type="button"
                            className="chakra-button css-ez23ye"
                          >
                            Add Exercise
                          </button>
                        </a>
                        <img
                          src="/src/assets/bikepath.jpg"
                          className="chakra-image css-ni3ua3"
                        />
                      </div>
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
