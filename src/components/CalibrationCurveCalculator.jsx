import React, { useState } from 'react';
import { FaBookOpen } from "react-icons/fa";
import { BiMessageRoundedError } from "react-icons/bi";
import StndrdCurvePlotImage from '../assets/img/stndcurve.png';

const CalibrationCurveCalculator = () => {
  const [slope, setSlope] = useState('');
  const [intercept, setIntercept] = useState('');
  const [signal, setSignal] = useState('');
  const [unknownConcentration, setUnknownConcentration] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const calculateConcentration = () => {
    if (!slope || !intercept || !signal) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
    setErrorMessage('');

    const slopeValue = parseFloat(slope);
    const interceptValue = parseFloat(intercept);
    const signalValue = parseFloat(signal);
    const concentration = (signalValue - interceptValue) / slopeValue;
    setUnknownConcentration(concentration.toFixed(3).replace(/(\.[0-9]*[1-9])0+$/, '$1').replace(/(\.0+|(?<=\.\d+)0+)$/, '')); // Keep 3 decimal places
  };

  const handleClearFields = () => {
    setSlope('');
    setIntercept('');
    setSignal('');
    setUnknownConcentration('');
    setErrorMessage('');
  };

  return (
    <div className="flex flex-col lg:flex-row text-center text-white bg-slate-900 app-container font-sans">
      <div className="flex-1 p-4 bg-slate-100 text-gray-800 overflow-y-auto overflow-x-hidden text-left">
        <h2 className="w-screen flex text-2xl font-bold mb-4 bg-gray-300 text-left p-2">
          <FaBookOpen className="h-6 w-6 mt-2 mr-2" />
          Theory
        </h2>
        <div>
          <p className="mb-4">
            <strong>What is a Calibration Curve?</strong>
            <br />
            A calibration curve is a graphical representation that shows the relationship between the concentration of an analyte in a sample and the response from an analytical instrument. It is fundamental in analytical chemistry as it allows for the determination of unknown concentrations by relating them to known standards.
            <br /><br />
            The standard addition method is particularly useful when dealing with samples that have matrix effects—interferences that may affect the accuracy of the measurement. In this method, a known quantity of standard is added to the sample, and the change in signal is measured. This helps to account for the background signal from the matrix.
            <br /><br />
            The calibration curve is typically created by plotting the instrument's response against known concentrations and fitting a linear regression line. The equation of this line, given by y = ax + b, where y is the response, x is the concentration, a is the slope, and b is the intercept, allows for the calculation of unknown concentrations.
          </p>
          <img src={StndrdCurvePlotImage} alt="Michaelis-Menten Plot" className="mb-4 w-full rounded border border-slate-900 max-w-md lg:ml-12" title="Michaelis–Menten equation; Source: Wikipedia" />
        </div>
      </div>

      <div className="flex-1 p-6 bg-gray-700 flex flex-col">
        <h1 className="text-2xl font-bold mb-2">Calibration Curve Calculator</h1>
        <form className="space-y-8">
          <div className="flex flex-col">
            <label className="block mb-1 text-start">Slope (a):</label>
            <input
              type="number"
              value={slope}
              onChange={(e) => setSlope(e.target.value)}
              className="w-full p-2 border text-sm bg-gray-600 rounded"
              placeholder="Enter the slope"
            />
          </div>

          <div className="flex flex-col">
            <label className="block mb-1 text-start">Background (b):</label>
            <input
              type="number"
              value={intercept}
              onChange={(e) => setIntercept(e.target.value)}
              className="w-full p-2 border text-sm bg-gray-600 rounded"
              placeholder="Enter the intercept"
            />
          </div>

          <div className="flex flex-col">
            <label className="block mb-1 text-start">Signal (y):</label>
            <input
              type="number"
              value={signal}
              onChange={(e) => setSignal(e.target.value)}
              className="w-full p-2 border text-sm bg-gray-600 rounded"
              placeholder="Enter the signal"
            />
          </div>

          {unknownConcentration && (
            <div className="w-full p-2 rounded flex items-center justify-center bg-slate-900 text-green-400 text-lg">
              Unknown Concentration:&nbsp; <strong>{unknownConcentration}</strong>
            </div>
          )}

          {errorMessage && (
            <div className="flex w-full bg-slate-300 rounded items-center justify-center text-red-800 p-2 text-1xl">
              <BiMessageRoundedError className='w-6 h-6 mr-2' />
              {errorMessage}
            </div>
          )}

          <div className="flex justify-center mt-2">
            <button
              type="button"
              onClick={calculateConcentration}
              className="px-4 py-2 cursor-pointer mb-2 transition-all duration-200 ease-in-out hover:scale-110 font-semibold bg-green-300 text-black"
            >
              Calculate
            </button>
            <button
              type="button"
              onClick={handleClearFields}
              className="w-[100px] ml-2 px-4 py-2 cursor-pointer mb-2 transition-all duration-200 ease-in-out hover:scale-110 font-semibold bg-violet-300 text-black"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CalibrationCurveCalculator;
