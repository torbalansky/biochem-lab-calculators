import React, { useState, useEffect, useMemo } from 'react';
import { BiMessageRoundedError } from "react-icons/bi";
import { FaWeight, FaBookOpen   } from "react-icons/fa";
import { SiMoleculer } from "react-icons/si";
import { GiConcentricCrescents } from "react-icons/gi";
import { IoBeakerOutline, IoBeaker  } from "react-icons/io5";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const MolarityCalculator = () => {
  const [formulaWeight, setFormulaWeight] = useState('');
  const [volume, setVolume] = useState('');
  const [volumeUnit, setVolumeUnit] = useState('L');
  const [concentration, setConcentration] = useState('');
  const [concentrationUnit, setConcentrationUnit] = useState('M');
  const [mass, setMass] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isTheoryVisible, setIsTheoryVisible] = useState(false);

  // Conversion factors for volume units to liters
  const volumeConversions = useMemo(() => ({
    L: 1,
    mL: 1e-3,
    μL: 1e-6,
  }), []);

  // Conversion factors for concentration units to molarity (M)
  const concentrationConversions = useMemo(() => ({
    M: 1,
    mM: 1e-3,
    μM: 1e-6,
    nM: 1e-9,
    pM: 1e-12,
    fM: 1e-15,
  }), []);

  // Format Number Function with Rounding
  const formatNumber = (number, decimalPlaces = 10) => {
    if (isNaN(number)) return '';

    // Handle very small or very large numbers with exponential notation
    if (Math.abs(number) < 1e-6 || Math.abs(number) > 1e6) {
      return number.toExponential(decimalPlaces).replace(/(\.[0-9]*[1-9])0+e/, '$1e');
    } else {
      // Round the number to the specified number of decimal places
      const factor = Math.pow(10, decimalPlaces);
      const roundedNumber = Math.round(number * factor) / factor;

      let formatted = roundedNumber
        .toFixed(decimalPlaces)
        .replace(/(\.[0-9]*[1-9])0+$/, '$1')
        .replace(/(\.0+|(?<=\.\d+)0+)$/, '');

      return formatted;
    }
  };

  // Handle Automatic Recalculation
  useEffect(() => {
    const parseInput = (value) => {
      const parsed = parseFloat(value);
      return isNaN(parsed) ? 0 : parsed;
    };

    const volumeInLiters = parseInput(volume) * volumeConversions[volumeUnit];
    const concentrationInMolar = parseInput(concentration) * concentrationConversions[concentrationUnit];

    // Calculate Mass: Mass = Concentration (mol/L) * Volume (L) * Formula Weight (g/mol)
    if (formulaWeight && volume && concentration) {
      if (concentrationInMolar <= 0 || volumeInLiters <= 0 || formulaWeight <= 0) {
        setErrorMessage('Please enter positive values for all fields.');
        setMass('');
        return;
      }

      const calculatedMass = concentrationInMolar * volumeInLiters * parseFloat(formulaWeight);
      setMass(calculatedMass);
      setErrorMessage('');
    } else {
      setMass('');
      setErrorMessage('');
    }
  }, [formulaWeight, volume, volumeUnit, concentration, concentrationUnit, concentrationConversions, volumeConversions ]);

  const handleClearFields = () => {
    setFormulaWeight('');
    setVolume('');
    setVolumeUnit('L');
    setConcentration('');
    setConcentrationUnit('M');
    setMass('');
    setErrorMessage('');
  };
   
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="flex flex-col lg:flex-row text-center text-white bg-slate-900 app-container content" data-aos="zoom-out-down">
      <div className="flex-1 p-6 text-gray-800 bg-slate-100 overflow-y-auto overflow-x-hidden text-left">
        <h2 className="w-screen flex text-2xl font-bold mb-4 bg-gray-300 text-left p-2"><FaBookOpen className='h-6 w-6 mt-2 mr-2'/>Theory</h2>
          <button
          onClick={() => setIsTheoryVisible(!isTheoryVisible)}
          className="lg:hidden w-full text-sm p-2 bg-lime-500 text-white font-bold mb-2">
          {isTheoryVisible ? 'Hide' : 'Show'} Theory
          </button>
      <div className={`lg:block ${isTheoryVisible ? 'block' : 'hidden'}`}>
          <p className="mb-4">
            <strong>What is Mass?</strong><br />
            Mass is the amount of matter in an object and is typically measured in grams (g). It is a fundamental property that quantifies the inertia of an object.
          </p>
          <p className="mb-4">
            <strong>What is Molar Concentration?</strong><br />
            Molar concentration, or molarity (M), indicates the number of moles of solute present in one liter of solution.
            Mass, molar concentration, volume, and formula weight are connected by the following equation:<br />
            <BlockMath>
               {`M (g) = C (mol/L) \\times V (L) \\times FW (g/mol)`}
            </BlockMath>
          </p>
          <p className="mb-4">
            <strong>How to Calculate Formula Weight (FW)?</strong><br />
            The formula weight (also known as molecular mass) is the sum of the atomic weights of all atoms in a molecule. It is usually expressed in grams per mole (g/mol).
            <br /><br />
            <strong>Formula:</strong><br />
            FW = Σ (Atomic Weight of Each Atom × Number of Atoms of that Element).
            To determine the FW, please use the: 
              <Link to="/formula" className='bg-black'>
              <span className="p-2 mt-2 flex rounded-full items-center justify-center text-sm font-semibold bg-green-300">
                <SiMoleculer className="h-6 w-4 mr-2" />
                Formula Weight Calculator
              </span>
            </Link>
          </p>
          <p className="mb-4">
              To use this app, simply input the FW, required Volume and desired concentration, and the tool will calculate the exact amount needed to prepare the solution.
            </p>
        </div>
      </div>

      <div className="flex-1 p-6 bg-gray-700 flex flex-col">
        <h1 className="text-2xl font-bold mb-6">Mass Molarity Calculator</h1>
        <form className="space-y-8">
          <div>
            <label className="block mb-1 text-left">Formula Weight (g/mol):</label>
            <input
              type="number"
              value={formulaWeight}
              onChange={(e) => setFormulaWeight(e.target.value)}
              className="w-full p-2 border text-sm bg-gray-600 rounded"
              placeholder="Enter formula weight"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex-1">
              <label className="block mb-1 text-left">Volume:</label>
              <input
                type="number"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="w-full p-2 border text-sm bg-gray-600 rounded"
                placeholder="Enter volume"
              />
            </div>
            <div className="mt-2 sm:mt-6 sm:ml-4">
              <select
                value={volumeUnit}
                onChange={(e) => setVolumeUnit(e.target.value)}
                className="w-full px-4 py-2 bg-gray-100 cursor-pointer text-slate-800 rounded text-sm"
              >
                <option value="L">Liters (L)</option>
                <option value="mL">milliL (mL)</option>
                <option value="μL">microL(μL)</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex-1">
              <label className="block mb-1 text-left">Desired Concentration:</label>
              <input
                type="number"
                value={concentration}
                onChange={(e) => setConcentration(e.target.value)}
                className="w-full p-2 border text-sm bg-gray-600 rounded"
                placeholder="Enter concentration"
              />
            </div>
            <div className="mt-2 sm:mt-6 sm:ml-4">
              <select
                value={concentrationUnit}
                onChange={(e) => setConcentrationUnit(e.target.value)}
                className="w-full p-2 bg-gray-100 cursor-pointer text-slate-800 rounded text-sm" 
              >
                <option value="M">Molar (M)</option>
                <option value="mM">milliM (mM)</option>
                <option value="μM">microM (μM)</option>
              </select>
            </div>
          </div>
          
          {errorMessage && (
            <p className="flex w-full bg-slate-300 rounded items-center justify-center text-red-800 p-2 text-1xl">
              <BiMessageRoundedError className='w-8 h-8 mr-1' />
              {errorMessage}
            </p>
          )}

          {mass && !errorMessage && (
            <p className="w-full p-2 rounded flex items-center justify-center bg-slate-900 text-green-400 text-lg">
              <SiMoleculer className="mr-2" />
              Mass:&nbsp; <strong>{formatNumber(mass)} g</strong>
            </p>
          )}
          
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleClearFields}
              className="w-full px-4 py-2 cursor-pointer mb-2 transition-all duration-200 ease-in-out hover:scale-110 font-semibold bg-violet-300 text-black"
            >
              Clear Fields
            </button>
          </div>
        </form>
      </div>

      <div className="flex-1 p-6 bg-gray-800 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Instructions</h2>
        <div className="space-y-4 text-lg">
          {mass && !errorMessage && (
            <div className="steps">
              <div className="step flex items-center opacity-0 animate-fadeIn mb-4" style={{ animationDelay: '0.2s' }}>
                <FaWeight className="mr-2 text-blue-400" />
                Measure&nbsp; <strong>{formatNumber(mass)}&nbsp;g&nbsp;</strong> of the substance.
              </div>
              <div className="step flex items-center opacity-0 animate-fadeIn mb-4" style={{ animationDelay: '0.4s' }}>
                <IoBeakerOutline className="mr-2 text-green-400" />
                Put it into a beaker.
              </div>
              <div className="step flex items-center opacity-0 animate-fadeIn mb-4" style={{ animationDelay: '0.6s' }}>
                <IoBeaker className="mr-2 text-yellow-400" />
                Add&nbsp; <strong>{formatNumber(volume)}&nbsp;{volumeUnit}</strong>&nbsp; of dilution solution.
              </div>
              <div className="step flex items-center opacity-0 animate-fadeIn mb-4" style={{ animationDelay: '0.8s' }}>
                <GiConcentricCrescents className="rotate-180 mr-2 text-purple-400" />
                Mix by stirring on a magnetic stirrer.
              </div>
              <div className="step flex items-center opacity-0 animate-fadeIn mb-4" style={{ animationDelay: '1s' }}>
                <SiMoleculer className="mr-2 text-pink-400" />
                The solution is ready!
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MolarityCalculator;
