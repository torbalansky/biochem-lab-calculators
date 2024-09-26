import React, { useState, useEffect } from 'react';
import { FaBeer } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const BeerLambertCalculator = () => {
  const [extinctionCoefficient, setExtinctionCoefficient] = useState('');
  const [pathLength, setPathLength] = useState('');
  const [concentration, setConcentration] = useState('');
  const [absorbance, setAbsorbance] = useState('');
  const [error, setError] = useState('');

  const calculateMissingValue = () => {
    const coeff = parseFloat(extinctionCoefficient);
    const path = parseFloat(pathLength);
    const conc = parseFloat(concentration);
    const abs = parseFloat(absorbance);
  
    let calculatedValue;

    if (!absorbance && coeff && path && conc) {
      calculatedValue = coeff * path * conc;
      setAbsorbance(calculatedValue.toFixed(2));
    }
    else if (!concentration && coeff && path && abs) {
      calculatedValue = abs / (coeff * path);
      setConcentration(Number(calculatedValue.toPrecision(10))); 
    }
    else if (!pathLength && coeff && conc && abs) {
      calculatedValue = abs / (coeff * conc);
      setPathLength(calculatedValue.toFixed(2));
    }
    else if (!extinctionCoefficient && path && conc && abs) {
      calculatedValue = abs / (path * conc);
      setExtinctionCoefficient(Number(calculatedValue.toPrecision(10))); 
    }
    else {
      setError('Please enter values for any three of the four parameters.');
      return;
    }
  
    setError('');
  };  

  const handleClearFields = () => {
    setExtinctionCoefficient('');
    setPathLength('');
    setConcentration('');
    setAbsorbance('');
    setError('');
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="flex flex-col lg:flex-row text-center text-white bg-slate-900 app-container" data-aos="fade-right">
      <div className="flex-1 p-4 bg-slate-100 text-gray-800 overflow-y-auto overflow-x-hidden text-left">
        <h2 className="w-screen flex text-2xl font-bold mb-4 bg-gray-300 text-left p-2">
          <FaBeer className="h-6 w-6 mt-2 mr-2" />
          Beer Lambert Law Theory
        </h2>
        <div>
          <p className="mb-4"><strong>What is the Beer-Lambert Law?</strong></p>
            The Beer-Lambert Law relates the absorbance of light to the properties of the material through which the light is traveling.
            The formula is given by:
            <br /><br />
            <strong>A = ε * c * l</strong>
            <br /><br />
            where:
            <ul>
              <li><strong>A</strong> is the absorbance (no units)</li>
              <li><strong>ε</strong> is the extinction coefficient (molar absorptivity) in M<sup>-1</sup>cm<sup>-1</sup></li>
              <li><strong>c</strong> is the concentration in moles per liter (M)</li>
              <li><strong>l</strong> is the path length in centimeters (cm)</li>
            </ul>   <br />
            <p><strong>How to use?</strong></p>
            <p>You can use this calculator to find any one of these values if the other three are known.
            Enter the absorbance, concentration, and path length into the calculator to determine the molar 
            absorptivity constant. This calculator helps in analyzing the results of spectrophotometric 
            experiments.
            </p> <br /> <br />
            <p><strong>Example:</strong></p>
            <p>
            Use the following variables:
              <br />
              Absorbance (A) = 0.5 (unitless)
              <br />
              Concentration (c) = 0.1 M
              <br />
              Path Length (l) = 1 cm
            </p>
            <p className="mb-4"><strong>The result is ε = 5.</strong></p>
        </div>
      </div>

      <div className="flex-1 p-6 bg-gray-700 flex flex-col">
        <h1 className="text-2xl font-bold mb-6">Beer-Lambert Law Calculator</h1>

        <div className="mb-4">
          <label className="block mb-1 text-left">Extinction Coefficient (M<sup>-1</sup> cm<sup>-1</sup>):</label>
          <input
            type="number"
            value={extinctionCoefficient}
            onChange={(e) => setExtinctionCoefficient(e.target.value)}
            className="w-full p-2 border text-sm bg-gray-600 rounded"
            placeholder="Enter value"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-left">Path Length (cm):</label>
          <input
            type="number"
            value={pathLength}
            onChange={(e) => setPathLength(e.target.value)}
            className="w-full p-2 border text-sm bg-gray-600 rounded"
            placeholder="Enter value"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-left">Concentration (M):</label>
          <input
            type="number"
            value={concentration}
            onChange={(e) => setConcentration(e.target.value)}
            className="w-full p-2 border text-sm bg-gray-600 rounded"
            placeholder="Enter value"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-left">Absorbance:</label>
          <input
            type="number"
            value={absorbance}
            onChange={(e) => setAbsorbance(e.target.value)}
            className="w-full p-2 border text-sm bg-gray-600 rounded"
            placeholder="Enter value"
          />
        </div>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        <div className="flex justify-center">
          <button
            type="button"
            onClick={calculateMissingValue}
            className="px-4 py-2 cursor-pointer mb-2 transition-all duration-200 ease-in-out hover:scale-110 font-semibold bg-green-300 text-black"
          >
            Calculate
          </button>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleClearFields}
              className="w-[100px] ml-2 px-4 py-2 cursor-pointer mb-2 transition-all duration-200 ease-in-out hover:scale-110 font-semibold bg-violet-300 text-black"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeerLambertCalculator;
