/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import Logo from "../../assets/images/logo.png";
import {
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
  DASHBOARD_SIDEBAR_LINKS,
} from "../../lib/constants/navigation";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { HiOutlineLogout } from "react-icons/hi";

const linkClasses =
  "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base hover:text-green-100"

// eslint-disable-next-line react/prop-types
function Sliderbar({ isSidebarOpen }) {
  return (
    <div
      className={`bg-white top-0 z-40 left-0 p-3 flex-col flex sm:w-60 shadow-lg h-screen transition-all duration-300  ${
        isSidebarOpen ? "w-0 px-0" : "w-60 fixed"
      }`}
      style={{ overflow: "hidden" }} // Evitar que el contenido del slider se desborde
    >
      <div className="mb-3 mt-1">
        <a
          href="#"
          className="flex justify-center items-center tracking-wider font-cursive"
        >
          <img src={Logo} alt="Logo" className="w-50 " />
        </a>
      </div>
      <div className="flex-1 py-8 flex flex-col gap-2">
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SiderbarLink key={item.key} item={item} />
        ))}
      </div>
      <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
          <SiderbarLink key={item.key} item={item} />
        ))}
        <div className={classNames("text-red-500 cursor-pointer", linkClasses)}>
          <span>
            <HiOutlineLogout />
          </span>
          Cerrar Sesion
        </div>
      </div>
    </div>
  );
}

export default Sliderbar;

// eslint-disable-next-line react/prop-types
function SiderbarLink({ item }) {
  const { pathname } = useLocation();
  return (
    <Link
      // eslint-disable-next-line react/prop-types
      to={item.path}
      className={classNames(
        pathname === item.path ? "bg-green-600 text-white" : "text-neutral-800",
        linkClasses
      )}
    >
      <span className="text-xl">{item.icon}</span>
      {item.label}
    </Link>
  );
}
