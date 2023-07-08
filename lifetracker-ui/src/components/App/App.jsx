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
import apiClient from "../../Services/apiClient";


export default function App() {
  const [appState, setAppState] = useState({
    user: {},
    isAuthenticated: false,
    nutrition: [],
    sleep: [],
    exercise: [],
  });

  useEffect(() => {
    const token = localStorage.getItem("Lifetracker_Token")
    apiClient.setToken(token);
    async function fetchUser(){
      if (token) {
        try {
          const { data, error, message } = await apiClient.me();
          console.log(data)
          
          if (error) {
            setAppState((prevState) => ({
              ...prevState,
              isAuthenticated: false
            }));
            localStorage.setItem("LifeTracker_Token", null);
            // navigate("/login")
            return;
          }
          setAppState((prevState) => ({
            ...prevState,
            user: data.user,
            isAuthenticated: true,
            nutrition: data.nutrition,
            sleep: data.sleep,
            exercise: data.exercise,
          }));
        } catch (err) {
          console.error(err);
        }
      } else {
        localStorage.setItem("LifeTracker_Token", null);
      }
   
    }
    fetchUser()
  }, [appState.isAuthenticated]
  )



  //use this function later to pass data from frontend to backend
  const loginData = async (email, password) => {};
console.log(appState)
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar appState = {appState} setAppState = {setAppState}/>
        <Routes>
          <Route path="/" element={<Hero appState = {appState}/>} />
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
