import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TbSquareLetterM, TbRulerMeasure, TbSquareLetterA } from "react-icons/tb";
import { SiMoleculer, SiGithub, SiLinkedin, SiResearchgate } from "react-icons/si";
import { GiConcentrationOrb, GiDna2, GiConcentricCrescents, GiChemicalBolt } from "react-icons/gi";
import AOS from 'aos';
import 'aos/dist/aos.css';

const CalculatorHomePage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-slate-900 text-white font-sans" data-aos="zoom-in-up">
      <div className="w-11/12 max-w-screen-lg mt-8 mb-12 flex flex-col lg:flex-row lg:justify-between gap-12">
        <div className="lg:w-1/2 flex flex-col items-start lg:items-start text-center lg:text-left mt-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Welcome to the Scientific Calculators Hub
          </h1>
          <p className="text-lg md:text-xl mb-4">
            Explore a wide range of scientific calculators to assist with your research and experiments. Choose from mass molarity, dilution, formula weight calculations, and more.
          </p>
          <p className="text-lg md:text-xl">
            Whether you're a scientist, student, or researcher, our tools will help streamline your calculations with precision and ease.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:w-1/2">
          <Link to="/molarity" className="calculator-field">
            <span className="flex items-center justify-center text-lg font-semibold">
              <TbSquareLetterM className="h-10 w-10 mr-2 home-icon" />
              Mass Molarity Calculator
            </span>
          </Link>

          <Link to="/dilution" className="calculator-field">
            <span className="flex items-center justify-center text-lg font-semibold">
              <GiConcentrationOrb className="h-8 w-8 mr-2 home-icon" />
              Dilute a stock solution
            </span>
          </Link>

          <Link to="/percent" className="calculator-field">
            <span className="flex items-center justify-center text-lg font-semibold">
              <GiChemicalBolt className="h-8 w-8 mr-2 home-icon" />
              Percent (%) Solutions Calculator
            </span>
          </Link>

          <Link to="/formula" className="calculator-field">
            <span className="flex items-center justify-center text-lg font-semibold">
              <SiMoleculer className="h-8 w-8 mr-2 home-icon" />
              Formula Weight Calculator
            </span>
          </Link>

          <Link to="/absorbance" className="calculator-field">
            <span className="flex items-center justify-center text-lg font-semibold">
              <TbSquareLetterA className="h-10 w-10 mr-2 home-icon" />
              Beer-Lambert Law calculator
            </span>
          </Link>

          <Link to="/rcfrpm" className="calculator-field">
            <span className="flex items-center justify-center text-lg font-semibold">
              <GiConcentricCrescents className="h-8 w-8 mr-2 home-icon" />
              RCF to RPM Calculator
            </span>
          </Link>

          <Link to="/PCR" className="calculator-field">
            <span className="flex items-center justify-center text-lg font-semibold">
              <GiDna2 className="h-8 w-8 mr-2 home-icon" />
              PCR Master Mix Calculator
            </span>
          </Link>

          <Link to="/unitConversion" className="calculator-field">
            <span className="flex items-center justify-center text-lg font-semibold">
              <TbRulerMeasure className="h-8 w-8 mr-2 home-icon" />
              Unit Conversion tool
            </span>
          </Link>
        </div>
      </div>

      <footer className="w-full bg-slate-800 flex flex-col items-center py-4 mt-auto sticky bottom-0 footer">
        <div className="flex space-x-4 mb-2">
          <a href="https://github.com/torbalansky" target="_blank" rel="noopener noreferrer">
            <SiGithub className="h-6 w-6 text-gray-400 hover:text-white transition-all duration-200" />
          </a>
          <a href="https://www.linkedin.com/in/pacostathis/" target="_blank" rel="noopener noreferrer">
            <SiLinkedin className="h-6 w-6 text-gray-400 hover:text-white transition-all duration-200" />
          </a>
          <a href="https://www.researchgate.net/profile/Silviya-Stateva" target="_blank" rel="noopener noreferrer">
            <SiResearchgate className="h-6 w-6 text-gray-400 hover:text-white transition-all duration-200" />
          </a>
        </div>
        <p className="text-sm text-gray-400">
          Designed and Built by <a href="https://github.com/torbalansky" target="_blank" rel="noopener noreferrer" className="hover:underline text-lime-200">torbalansky</a>
        </p>
      </footer>
    </div>
  );
};

export default CalculatorHomePage;