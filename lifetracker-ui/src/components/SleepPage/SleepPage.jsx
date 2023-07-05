import * as React from "react";
import "./SleepPage.css";

export default function SleepPage({ appState, setAppState }) {
  return (
    <>
      {appState.isAuthenticated ? (
        <>
          <div className="SleepPage css-1bpnzr3">
            <div className="css-k2eq80">
              <div className="chakra-stack css-1cgbrw5">
                <h2 className="chakra-heading css-b5coes">Sleep</h2>
              </div>
            </div>
            <div className="css-vpbd2d">
              <div className="css-1qfrez2">
                <div className="css-uiodal">
                  <div className="sleep-feed">
                    <div className="css-0">
                      <div className="css-j7qwjs">
                        <h2 className="chakra-heading css-hzsul0">
                          Nothing here yet.
                        </h2>
                        <a
                          className="chakra-link button css-spn4bz"
                          href="/sleep/create"
                        >
                          <button
                            type="button"
                            className="chakra-button css-ez23ye"
                          >
                            Add Sleep
                          </button>
                        </a>
                        <img
                          src="src/assets/empty-bed.jpg"
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
