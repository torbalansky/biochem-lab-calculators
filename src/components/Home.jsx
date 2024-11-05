import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TbSquareLetterM, TbRulerMeasure, TbSquareLetterA, TbChartHistogram } from "react-icons/tb";
import { SiMoleculer, SiGithub, SiLinkedin, SiResearchgate, SiDwavesystems } from "react-icons/si";
import { GiConcentrationOrb, GiDna2, GiConcentricCrescents, GiChemicalBolt, GiAntibody } from "react-icons/gi";
import { GoGraph } from "react-icons/go";
import { TfiPencilAlt } from "react-icons/tfi";
import { LiaKeycdn } from "react-icons/lia";
import { PiChartScatter } from "react-icons/pi";
import AOS from 'aos';
import 'aos/dist/aos.css';

const CalculatorHomePage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-slate-900 text-white font-sans home-content" data-aos="zoom-in-up">
      <div className="w-11/12 max-w-screen-lg mt-8 mb-12 flex flex-col lg:flex-row lg:justify-between gap-12 home-content">
        <div className="lg:w-1/3 flex flex-col items-start lg:items-start text-center lg:text-left mt-4">
          <h1 className="text-xl md:text-3xl font-bold mb-4">
            Welcome to the Scientific Calculators Hub
          </h1>
          <p className="text-base md:text-xl mb-4">
            Explore a wide range of scientific calculators to assist with your research and experiments. Choose from mass molarity, dilution, formula weight calculations, and more.
          </p>
          <p className="text-lg md:text-xl">
            Whether you're a scientist, student, or researcher, our tools will help streamline your calculations with precision and ease.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4 lg:w-fit lg:h-2/3">
          <Link to="/molarity" className="calculator-field">
            <span className="flex items-center justify-center text-md font-semibold">
              <TbSquareLetterM className="h-8 w-8 mr-2 home-icon" />
              Mass Molarity
            </span>
          </Link>

          <Link to="/dilution" className="calculator-field">
            <span className="flex items-center justify-center text-md font-semibold">
              <GiConcentrationOrb className="h-8 w-8 mr-2 home-icon flex justify-start" />
              Dilute solution
            </span>
          </Link>

          <Link to="/percent" className="calculator-field">
            <span className="flex items-center justify-center text-md font-semibold">
              <GiChemicalBolt className="h-8 w-8 mr-2 home-icon" />
              Percent Solution
            </span>
          </Link>

          <Link to="/formula" className="calculator-field">
            <span className="flex items-center justify-center text-md font-semibold">
              <SiMoleculer className="h-8 w-8 mr-2 home-icon" />
              Formula Weight
            </span>
          </Link>

          <Link to="/absorbance" className="calculator-field">
            <span className="flex items-center justify-center text-md font-semibold">
              <TbSquareLetterA className="h-8 w-8 mr-2 home-icon" />
              Beer-Lambert
            </span>
          </Link>

          <Link to="/rcfrpm" className="calculator-field">
            <span className="flex items-center justify-center text-md font-semibold">
              <GiConcentricCrescents className="h-8 w-8 mr-2 home-icon" />
              RCF to RPM
            </span>
          </Link>

          <Link to="/PCR" className="calculator-field">
            <span className="flex items-center justify-center text-md font-semibold">
              <GiDna2 className="h-8 w-8 mr-2 home-icon" />
              PCR Master Mix
            </span>
          </Link>

          <Link to="/unitConversion" className="calculator-field">
            <span className="flex items-center justify-center text-md font-semibold">
              <TbRulerMeasure className="h-8 w-8 mr-2 home-icon" />
              Unit Conversion
            </span>
          </Link>

          <Link to="/antibody" className="calculator-field">
            <span className="flex items-center justify-center text-md font-semibold">
              <GiAntibody className="h-8 w-8 mr-2 home-icon" />
              Antibody Dilution
            </span>
          </Link>

          <Link to="/protein280" className="calculator-field">
            <span className="flex items-center justify-center text-md font-semibold">
              <SiDwavesystems  className="h-8 w-8 mr-2 home-icon" />
              ProteinQuant
            </span>
          </Link>

          <Link to="/kdcalculator" className="calculator-field">
            <span className="flex items-center justify-center text-md font-semibold">
              <GoGraph className="h-8 w-8 mr-2 home-icon" />
              Kd Calculator
            </span>
          </Link>

          <Link to="/calculator" className="calculator-field">
            <span className="flex items-center justify-center text-md font-semibold">
              <TfiPencilAlt className="h-8 w-8 mr-2 home-icon" />
              LabBook
            </span>
          </Link>

          <Link to="/enzyme" className="calculator-field">
            <span className="flex items-center justify-center text-md font-semibold">
              <LiaKeycdn className="h-8 w-8 mr-2 home-icon" />
              Enzyme Activity
            </span>
          </Link>

          <Link to="/michaelismenten" className="calculator-field">
            <span className="flex items-center justify-center text-md font-semibold">
              <TbChartHistogram className="h-8 w-8 mr-2 home-icon" />
              Reaction Rate
            </span>
          </Link>

          <Link to="/calibration" className="calculator-field">
            <span className="flex items-center justify-center text-md font-semibold">
              <PiChartScatter className="h-8 w-8 mr-2 home-icon" />
              CalibrationCurve
            </span>
          </Link>
        </div>
      </div>

      <footer className="w-full bg-slate-800 flex flex-col items-center py-4 mt-auto sticky bottom-0 footer">
        <div className="flex space-x-4 mb-2">
          <a href="https://github.com/torbalansky" target="_blank" rel="noopener noreferrer">
            <SiGithub className="h-6 w-6 mt-1 text-gray-400 hover:text-white transition-all duration-200" />
          </a>
          <a href="https://www.linkedin.com/in/pacostathis/" target="_blank" rel="noopener noreferrer">
            <SiLinkedin className="h-6 w-6 mt-1 text-gray-400 hover:text-white transition-all duration-200" />
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
