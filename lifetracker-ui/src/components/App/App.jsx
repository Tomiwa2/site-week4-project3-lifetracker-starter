import * as React from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Overlay from "../Overlay/Overlay";
import Hero from "../Hero/Hero";
import Home from "../Home/Home"
import LoginPage from "../LoginPage/LoginPage";
import RegistrationPage from "../RegistrationPage/RegistrationPage";
import FeedTiles from "../FeedTiles/FeedTiles";
import ActivityPage from "../ActivityPage/ActivityPage";
import ExercisePage from "../ExercisePage/ExercisePage"
import NutritionPage from "../NutritionPage/NutritionPage"
import SleepPage from "../SleepPage/SleepPage"
import NutritionForm from "../NutritionForm/NutritionForm"


export default function App() {
  const [appState, setAppState] = useState({
    user: {},
    isAuthenticated: false,
    nutrition: [],
    sleep: [],
    exercise: [],
  });


  //use this function later to pass data from frontend to backend
  const loginData = async (email, password) => {};
console.log(appState)
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar appState = {appState} setAppState = {setAppState}/>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route
            path="/login"
            element={
              <LoginPage  appState = {appState} setAppState={setAppState}  />}/>
          <Route
            path="/register"
            element={<RegistrationPage setAppState={setAppState} />}/>

          <Route 
          path = "/activity"
          element = {<ActivityPage appState = {appState} setAppState = {setAppState}/>}/>

          <Route 
          path = "/exercise"
          element = {<ExercisePage  appState = {appState} setAppState = {setAppState}/>}/>

          <Route 
          path = "/nutrition"
          element = {<NutritionPage  appState = {appState} setAppState = {setAppState}/>}/>

         <Route 
          path = "/sleep"
          element = {<SleepPage  appState = {appState} setAppState = {setAppState}/>}/>

          {} 
          <Route 
          path = "/nutrition/create"
          element = {<NutritionForm  appState = {appState} setAppState = {setAppState}/>}/>
          <Route />

        </Routes>
        {/* <Hero />
          <FeedTiles /> */}
      </BrowserRouter>
    </div>
  );
}

// export default App
