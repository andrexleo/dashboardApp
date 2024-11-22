import React from "react";
import Logo from "../assets/images/logo.png";
import { useNavigate, Link } from "react-router-dom";
import { FaMoon } from "react-icons/fa";

import { Button, Navbar } from "flowbite-react";
const Menu = [
  {
    id: 1,
    name: "Principal",
    link: "/#principal",
  },
  {
    id: 2,
    name: "Acerca de",
    link: "/#services",
  },
  {
    id: 3,
    name: "funciones",
    link: "/#about",
  },
];

const Navbarcomponent = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/signup");
  };
  return (
    <Navbar className="border-b-2">
      {/* Logo section */}
      <div data-aos="fade-down" data-aos-once="true">
        <Link to="/">
          <img src={Logo} alt="Logo" className="w-52 " />
        </Link>
      </div>

      {/* Link section */}
      <div
        data-aos="fade-down"
        data-aos-once="true"
        data-aos-delay="300"
        className="flex justify-between items-center gap-4"
      >
        <ul className="hidden md:flex items-center gap-4">
          {Menu.map((menu) => (
            <li key={menu.id}>
              <a
                href={menu.link}
                className="inline-block text-x md:text-sm font-semibold py-4 px-4 hover:text-primary duration-200"
              >
                {menu.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-row gap-4 mr-2">
        <Button className="w-12 h-12 hidden sm:inline" color="gray" pill>
          <FaMoon />
        </Button>
        <Button
          onClick={handleNavigation}
          /*className=" bg-green-600 hover:bg-black duration-200 text-gray-900 px-4 py-2 rounded-md flex items-center gap-3"*/
          outline
            color="green"
            pill
          className="items-center"
        >
          Iniciar Sesion
        </Button>
        <Button
          onClick={handleNavigation}
          /*className=" bg-green-600 hover:bg-black duration-200 text-gray-900 px-4 py-2 rounded-md flex items-center gap-3"*/
          outline
            color="green"
            pill
          className="items-center"
        >
          Registrarse
        </Button>
      </div>
    </Navbar>
  );
};

export default Navbarcomponent;
