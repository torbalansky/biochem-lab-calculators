import React, { useState, useEffect } from 'react';
import { BiMessageRoundedError } from "react-icons/bi";
import { FaBookOpen } from "react-icons/fa";
import { SiMoleculer } from "react-icons/si";
import { GiConcentricCrescents, GiThermometerScale  } from "react-icons/gi";
import { IoBeakerOutline, IoBeaker } from "react-icons/io5";
import AOS from 'aos';
import 'aos/dist/aos.css';

  // Conversion Factors for Volume and Concentration
  const volumeConversions = {
    L: 1,
    mL: 1e-3,
    μL: 1e-6,
  };

  const concentrationConversions = {
    M: 1,
    mM: 1e-3,
    μM: 1e-6,
    nM: 1e-9,
    pM: 1e-12,
    fM: 1e-15,
  };

const DilutionCalculator = () => {
  const [stockConcentration, setStockConcentration] = useState(null);
  const [stockConcentrationUnit, setStockConcentrationUnit] = useState('M');
  const [finalVolume, setFinalVolume] = useState(null);
  const [finalVolumeUnit, setFinalVolumeUnit] = useState('L');
  const [desiredConcentration, setDesiredConcentration] = useState(null);
  const [desiredConcentrationUnit, setDesiredConcentrationUnit] = useState('M');
  const [stockVolume, setStockVolume] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isTheoryVisible, setIsTheoryVisible] = useState(false);

  // Format Number Function with Rounding and Exponential Notation Handling
  const formatNumber = (number, decimalPlaces = 10) => {
    if (typeof number !== 'number' || isNaN(number)) {
      return ''; // Return an empty string for invalid numbers
    }

    // Handle very small or very large numbers with exponential notation
    if (Math.abs(number) < 1e-40 || Math.abs(number) > 1e40) {
      return number.toExponential(decimalPlaces).replace(/(\.[0-9]*[1-9])0+e/, '$1e');
    } else {
      // Round the number to the specified number of decimal places
      const factor = Math.pow(10, decimalPlaces);
      const roundedNumber = Math.round(number * factor) / factor;

      return roundedNumber
        .toFixed(decimalPlaces)
        .replace(/(\.[0-9]*[1-9])0+$/, '$1')
        .replace(/(\.0+|(?<=\.\d+)0+)$/, '');
    }
  };

  // Convert Volume to Selected Unit
  const convertVolumeToUnit = (volumeInLiters, unit) => {
    return volumeInLiters / volumeConversions[unit];
  };

  // Handle Automatic Recalculation
  useEffect(() => {
    // Check if all necessary fields are filled and valid
    if (
      stockConcentration !== null &&
      finalVolume !== null &&
      desiredConcentration !== null &&
      !isNaN(stockConcentration) &&
      !isNaN(finalVolume) &&
      !isNaN(desiredConcentration)
    ) {
      // Validate positive values
      if (
        stockConcentration <= 0 ||
        finalVolume <= 0 ||
        desiredConcentration <= 0
      ) {
        setErrorMessage('Please enter positive values for all fields.');
        setStockVolume(null);
        return;
      }

      // Convert volumes and concentrations to base units (liters and molarity)
      const finalVolumeInLiters = finalVolume * volumeConversions[finalVolumeUnit];
      const stockConcentrationInMolar =
        stockConcentration * concentrationConversions[stockConcentrationUnit];
      const desiredConcentrationInMolar =
        desiredConcentration * concentrationConversions[desiredConcentrationUnit];

      // Validate that desired concentration is not greater than stock concentration
      if (desiredConcentrationInMolar > stockConcentrationInMolar) {
        setErrorMessage('Ups! Desired concentration cannot exceed stock concentration.');
        setStockVolume(null);
        return;
      }

      // Calculate Stock Volume Needed: V1 = (C2 * V2) / C1
      const calculatedStockVolume = (desiredConcentrationInMolar * finalVolumeInLiters) / stockConcentrationInMolar;

      if (!isNaN(calculatedStockVolume) && calculatedStockVolume >= 0) {
        const stockVolumeInSelectedUnit = convertVolumeToUnit(calculatedStockVolume, finalVolumeUnit);
        setStockVolume(`${formatNumber(stockVolumeInSelectedUnit)} ${finalVolumeUnit}`);
        setErrorMessage('');
      } else {
        setErrorMessage('Calculated stock volume is negative or invalid. Please, check your inputs.');
        setStockVolume(null);
      }
    } else {
      setStockVolume(null);
      setErrorMessage('');
    }
  }, [
    stockConcentration,
    finalVolume,
    stockConcentrationUnit,
    desiredConcentration,
    desiredConcentrationUnit,
    finalVolumeUnit,
  ]);

  const handleClearFields = () => {
    setStockConcentration(null);
    setFinalVolume(null);
    setStockConcentrationUnit('M');
    setFinalVolumeUnit('L');
    setDesiredConcentration(null);
    setDesiredConcentrationUnit('M');
    setStockVolume(null);
    setErrorMessage('');
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="flex flex-col lg:flex-row text-center text-white bg-slate-900 app-container font-sans" data-aos="zoom-out-down">
      <div className="flex-1 p-4 bg-slate-100 text-gray-800 overflow-y-auto overflow-x-hidden text-left">
        <h2 className="w-screen flex text-2xl font-bold mb-4 bg-gray-300 text-left p-2"><FaBookOpen className='h-6 w-6 mt-2 mr-2' />Theory
        </h2>
          <button
          onClick={() => setIsTheoryVisible(!isTheoryVisible)}
          className={`lg:hidden w-full text-sm p-2 font-bold mb-2 ${isTheoryVisible ? 'bg-red-200' : 'bg-lime-200'} text-blue`}>
          {isTheoryVisible ? 'Hide' : 'Show'} Theory
          </button>
      <div className={`lg:block ${isTheoryVisible ? 'block' : 'hidden'}`}>
          <p className="mb-4">
            <strong>What is Dilution?</strong><br /><br />
            Dilution refers to the process of lowering the concentration of a solution with known molarity. 
            This is typically achieved by adding more solvent.
          </p>
          <p className="mb-4">
            <strong>How are Concentrations and Volumes Related?</strong><br /><br />
            The formula used is:<br /><br />
            <strong>C1 × V1 = C2 × V2</strong><br /><br />
            Where <strong>C1</strong> is the concentration of the stock solution, <strong>V1</strong> is the volume of stock solution required, <strong>C2</strong> is the desired concentration, and <strong>V2</strong> is the final volume.
          </p>
          <br />
            <p><strong>Example:</strong></p><br />
            <p>
            Use the following variables:
              <br /><br />
              Stock concentration (C1) = 0.5 (M)
              <br /><br />
              Desired concentration (C2) = 0.1 (M)
              <br /><br />
              Final Volume (V2) = 1 (L)
            </p><br />
            <p className="mb-4"><strong>The result is V1 = 0.2 (L)</strong></p>
        </div>
      </div>

      <div className="flex-1 p-6 bg-gray-700 flex flex-col">
        <h1 className="text-2xl font-bold mb-6">Dilution Calculator</h1>
        <form className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex-1">
            <label className="block mb-1 text-left">Stock Concentration (C1):</label>
            <input
              type="number"
              value={stockConcentration !== null ? stockConcentration : ''}
              onChange={(e) => setStockConcentration(e.target.value !== '' ? parseFloat(e.target.value) : null)}
              className="w-full p-2 border text-sm bg-gray-600 rounded"
              placeholder="Enter stock concentration"
            />
            </div>
            <div className="mt-2 sm:mt-6 sm:ml-4">
            <select
              value={stockConcentrationUnit}
              onChange={(e) => setStockConcentrationUnit(e.target.value)}
              className="w-full px-4 py-2 bg-gray-100 cursor-pointer text-slate-800 rounded text-sm"
            >
              <option value="M">Molar (M)</option>
              <option value="mM">milliM (mM)</option>
              <option value="μM">microM (μM)</option>
              <option value="nM">nanoM (nM)</option>
              <option value="pM">picoM (pM)</option>
              <option value="fM">femtoM (fM)</option>
            </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex-1">
              <label className="block mb-1 text-left">Desired Concentration (C2):</label>
              <input
                type="number"
                value={desiredConcentration !== null ? desiredConcentration : ''}
                onChange={(e) => setDesiredConcentration(e.target.value !== '' ? parseFloat(e.target.value) : null)}
                className="w-full p-2 border text-sm bg-gray-600 rounded"
                placeholder="Enter desired concentration"
              />
            </div>
            <div className="mt-2 sm:mt-6 sm:ml-4">
              <select
                value={desiredConcentrationUnit}
                onChange={(e) => setDesiredConcentrationUnit(e.target.value)}
                className="w-full px-4 py-2 bg-gray-100 cursor-pointer text-slate-800 rounded text-sm"
              >
                <option value="M">Molar (M)</option>
                <option value="mM">milliM (mM)</option>
                <option value="μM">microM (μM)</option>
                <option value="nM">nanoM (nM)</option>
                <option value="pM">picoM (pM)</option>
                <option value="fM">femtoM (fM)</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex-1">
              <label className="block mb-1 text-left">Final Volume (V2):</label>
              <input
                type="number"
                value={finalVolume !== null ? finalVolume : ''}
                onChange={(e) => setFinalVolume(e.target.value !== '' ? parseFloat(e.target.value) : null)}
                className="w-full p-2 border text-sm bg-gray-600 rounded"
                placeholder="Enter final volume"
              />
            </div>
            <div className="mt-2 sm:mt-6 sm:ml-4">
              <select
                value={finalVolumeUnit}
                onChange={(e) => setFinalVolumeUnit(e.target.value)}
                className="w-full px-4 py-2 bg-gray-100 cursor-pointer text-slate-800 rounded text-md"
              >
                <option value="L">Liter/s (L)</option>
                <option value="mL">milliL (mL)</option>
                <option value="μL">microL (μL)</option>
              </select>
            </div>
          </div>
          {errorMessage && (
            <p className="flex w-full bg-slate-300 rounded items-center justify-center text-red-800 p-2 text-1xl">
              <BiMessageRoundedError className="w-8 h-8 mr-1" />
              {errorMessage}
            </p>
          )}

          {stockVolume !== null && !errorMessage && (
            <p className="w-full p-2 rounded flex items-center justify-center bg-slate-900 text-green-400 text-lg">
              <SiMoleculer className="mr-2" />
              Stock Volume (V1):&nbsp; <strong>{stockVolume}</strong>
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

      <div className="flex-1 p-4 bg-gray-800 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Instructions</h2>
        <div className="space-y-4 text-md">
          {stockVolume !== null && !errorMessage && (
            <div className="steps">
              <div className="step flex items-center opacity-0 animate-fadeIn mb-4" style={{ animationDelay: '0.2s' }}>
                <GiThermometerScale className="h-6 w-6 ml-0 text-blue-400" />
                Measure&nbsp; <strong>{formatNumber(stockVolume)} {stockVolume}&nbsp;</strong> of the stock solution.
              </div>
              <div className="step flex items-center opacity-0 animate-fadeIn mb-4" style={{ animationDelay: '0.4s' }}>
                <IoBeakerOutline className="mr-2 text-green-400" />
                Pour it into a clean beaker.
              </div>
              <div className="step flex items-center opacity-0 animate-fadeIn mb-4" style={{ animationDelay: '0.6s' }}>
                <IoBeaker className="mr-2 text-yellow-400" />
                Add dilution solvent up to &nbsp; <strong>{formatNumber(finalVolume)} {finalVolumeUnit}</strong>&nbsp;.
              </div>
              <div className="step flex items-center opacity-0 animate-fadeIn mb-4" style={{ animationDelay: '0.8s' }}>
                <GiConcentricCrescents className="rotate-180 mr-2 text-purple-400" />
                Mix thoroughly using a magnetic stirrer.
              </div>
              <div className="step flex items-center opacity-0 animate-fadeIn mb-4" style={{ animationDelay: '1s' }}>
                <SiMoleculer className="mr-2 text-pink-400" />
                Your diluted solution is now ready!
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DilutionCalculator;
