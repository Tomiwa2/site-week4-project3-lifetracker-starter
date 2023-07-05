import * as React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Hero from "../Hero/Hero";

export default function Overlay() {
  return (
    <main>
      <Navbar />

      <Outlet />
    </main>
  );
}
