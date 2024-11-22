import React from "react";

import { Route, Router, Routes } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Dashboard from "./pages/Dashboard";
import Tablero from "./components/dashboard/tablero";
import Ventas from "./components/dashboard/Ventas";
import Home from "./pages/Home";
import Signup from "./pages/SingIn";
import Navbarcomponent from "./components/Navbar";

export default function App() {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 700,
      easing: "ease-in",
      delay: 100,
    });
    AOS.refresh();
  }, []);
  return (
    <div>
      <Navbarcomponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Tablero />} />
          <Route path="ventas" element={<Ventas />} />
        </Route>
      </Routes>
    </div>
  );
}
