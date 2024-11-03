import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoMenuSharp, IoCloseSharp } from "react-icons/io5";
import { TbSquareLetterB, TbSquareLetterI, TbSquareLetterC, TbSquareLetterA, TbSquareLetterL, TbAtom2 } from "react-icons/tb";
import { HiOutlineHome } from "react-icons/hi2";
import { TfiPencilAlt } from "react-icons/tfi";
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

   const handleClickOutsideMenu = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  const handleClickOutsideDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideMenu);
    document.addEventListener('mousedown', handleClickOutsideDropdown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideMenu);
      document.removeEventListener('mousedown', handleClickOutsideDropdown);
    };
  }, []);

  const calculators = [
    { name: "Mass Molarity Calculator", path: "/molarity" },
    { name: "Dilution Calculator", path: "/dilution" },
    { name: "Formula Weight Calculator", path: "/formula" },
    { name: "Percent Solution Calculator", path: "/percent" },
    { name: "Beer-Lambert Law", path: "/absorbance" },
    { name: "RCF to RPM Calculator", path: "/rcfrpm" },
    { name: "Unit Conversion", path: "/unitConversion" },
    { name: "PCR Master Mix", path: "/PCR" },
    { name: "Antibody Dilution Calculator", path: "/antibody" },
    { name: "Protein Concentration Calculator", path: "/protein280" },
    {name: "Lab Book and Calculator", path: "/calculator" },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleNavigation = (path) => {
    navigate(path);
    setDropdownOpen(false);
    setMenuOpen(false);
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <nav className="p-4 text-neonBlue bg-slate-900 flex justify-between items-center font-sans top-0 z-50 sticky tablet-content">
      <div className="container flex justify-between items-center w-full">
        <button className='flex items-center gap-2 font-semibold text-3xl' onClick={() => handleNavigation('/')} data-aos="fade-right">
          <TbSquareLetterB className="rotate-360 cursor-pointer" />
          <TbSquareLetterI className="rotate-360 cursor-pointer" />
          <TbAtom2 className="rotate-360 cursor-pointer text-white" />
          <TbSquareLetterC className="rotate-360 cursor-pointer" />
          <TbSquareLetterA className="rotate-360 cursor-pointer" />
          <TbSquareLetterL className="rotate-360 cursor-pointer" />
        </button>
        <button
          className="md:hidden p-2 text-2xl"
          onClick={toggleMenu}
        >
          {menuOpen ? <IoCloseSharp /> : <IoMenuSharp className='w-10 h-10' />}
        </button>
        <div className="hidden md:flex navbar" data-aos="fade-left">
          <ul className="flex space-x-4">
            <li>
              <button
                onClick={() => handleNavigation("/")}
                className={`text-white hover:text-neonBlue ${isActive('/') ? 'bg-transparent' : ''}`}
                title='Back to Home'
              >
                <HiOutlineHome className='w-8 h-8 mt-2'/>
              </button>
            </li>
            <Link to="/calculator" className="mt-2 text-white hover:text-neonBlue" title="LabBook and Calculator">
            <TfiPencilAlt className="h-8 w-6 mr-2"/>
            </Link>
            <li className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="w-64 bg-gray-700 p-3 text-neonBlue hover:bg-gray-600"
              >
                Calculators
              </button>
              {dropdownOpen && (
                <ul className="w-full absolute left-0 mt-2 bg-gray-700 p-2 shadow-lg">
                  {calculators.map((calc, index) => (
                    <li key={index} className="my-1">
                      <button
                        className={`block px-4 py-2 text-left hover:bg-gray-600 ${isActive(calc.path) ? 'bg-gray-600' : ''}`}
                        onClick={() => handleNavigation(calc.path)}
                      >
                        {calc.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </div>
       <div
          ref={menuRef}
          className={`md:hidden fixed top-0 right-0 w-64 bg-gray-800 text-white h-full transition-transform transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'} ease-in-out duration-300`}
        >
          <button
            className="p-2 flex justify-end text-2xl w-full"
            onClick={toggleMenu}
          >
            <IoCloseSharp className='w-8 h-8'/>
          </button>
          <ul className="p-4 flex flex-col gap-4">
            <li>
              <button
                onClick={() => handleNavigation("/")}
                className={`p-2 text-left hover:bg-gray-600 ${isActive('/') ? 'bg-transparent' : ''}`}
              >
                <HiOutlineHome className='w-12 h-10'/>
              </button>
            </li>
            {calculators.map((calc, index) => (
              <li key={index}>
                <button
                  className={`p-2 text-left hover:bg-gray-600 w-full ${isActive(calc.path) ? 'bg-gray-600' : ''}`}
                  onClick={() => handleNavigation(calc.path)}
                >
                  {calc.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};


export default Navbar;
