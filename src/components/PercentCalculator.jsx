import React, { useState, useEffect } from 'react';
import { FaBookOpen } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';

const PercentCalculator = () => {
  const [wPercent, setWPercent] = useState(null);
  const [wVolume, setWVolume] = useState(null);
  const [wResult, setWResult] = useState(null);
  const [wError, setWError] = useState('');

  const [vStockPercent, setVStockPercent] = useState(null);
  const [vDesiredPercent, setVDesiredPercent] = useState(null);
  const [vFinalVolume, setVFinalVolume] = useState(null);
  const [vResult, setVResult] = useState(null);
  const [vError, setVError] = useState('');

  useEffect(() => {
    if (wPercent !== null && wVolume !== null) {
      if (wPercent > 0 && wVolume > 0) {
        const result = (wPercent / 100) * wVolume;
        setWResult(result.toFixed(2));
        setWError('');
      } else {
        setWError('Please enter positive values for both fields.');
        setWResult(null);
      }
    } else {
      setWResult(null);
    }
  }, [wPercent, wVolume]);

  useEffect(() => {
    if (vStockPercent !== null && vDesiredPercent !== null && vFinalVolume !== null) {
      if (vStockPercent > 0 && vDesiredPercent > 0 && vFinalVolume > 0) {
        if (vDesiredPercent >= vStockPercent) {
          setVError('Desired concentration must be less than the stock concentration.');
          setVResult(null);
        } else {
          const stockVolume = (vDesiredPercent / vStockPercent) * vFinalVolume;
          setVResult(stockVolume.toFixed(2));
          setVError('');
        }
      } else {
        setVError('Please enter positive values for all fields.');
        setVResult(null);
      }
    } else {
      setVResult(null);
    }
  }, [vStockPercent, vDesiredPercent, vFinalVolume]);

  const whandleClearFields = () => {
    setWPercent(null);
    setWVolume(null);
    setWResult(null);
    setWError('');
  };

  const vhandleClearFields = () => {
    setVStockPercent(null);
    setVDesiredPercent(null);
    setVFinalVolume(null);
    setVResult(null);
    setVError('');
  };
  
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="flex flex-col lg:flex-row text-center text-white bg-slate-900 app-container font-sans" data-aos="zoom-out-down">
      <div className="flex-1 p-4 bg-slate-100 text-gray-800 overflow-y-auto text-left">
        <h2 className="w-screen flex text-2xl font-bold mb-4 bg-gray-300 text-left p-2">
        <FaBookOpen className="h-6 w-6 mt-2 mr-2" />
            Theory
          </h2>
          <div>
            <p className="mb-4">
              <strong>What are Percent Solutions?</strong>
              <br />
              Percent solutions are a way to express the concentration of a solute in a solution. They describe the amount of solute present in a given amount of solution and are commonly used in both chemistry and biology for various preparations.
            </p>
            
            <p className="mb-4">
              <strong>Types of Percent Solutions:</strong>
              <br />
              There are two main types of percent solutions:
              <br />
              <strong>1. Weight/Volume (% w/v)</strong>: This indicates how many grams of solute are present in 100 mL of solution. It's commonly used when the solute is a solid and the solvent is a liquid.
              <br />
              <strong>2. Volume/Volume (% v/v)</strong>: This represents how many milliliters of solute are in 100 mL of solution. This type is used when both the solute and solvent are liquids.
            </p>
            <p className="mb-4">
              To use this app, simply input the desired percentage and volume, and the tool will calculate the exact amount of solute required to prepare the solution, whether you're working with weight/volume or volume/volume concentrations.
            </p>
        </div>
      </div>

      <div className="flex-1 p-6 bg-gray-700 flex flex-col">
        <h1 className="text-2xl font-bold mb-6">w/v Percent Calculator</h1>
        <form className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex-1">
              <label className="block mb-1 text-left">Enter Percent (% w/v):</label>
              <input
                type="number"
                value={wPercent !== null ? wPercent : ''}
                onChange={(e) => setWPercent(e.target.value !== '' ? parseFloat(e.target.value) : null)}
                className="w-full p-2 border text-sm bg-gray-600 rounded"
                placeholder="Enter %"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex-1">
              <label className="block mb-1 text-left">Enter Volume (mL):</label>
              <input
                type="number"
                value={wVolume !== null ? wVolume : ''}
                onChange={(e) => setWVolume(e.target.value !== '' ? parseFloat(e.target.value) : null)}
                className="w-full p-2 border text-sm bg-gray-600 rounded"
                placeholder="Enter volume in mL"
              />
            </div>
          </div>

          {wResult !== null ? (
            <>
              <p className="w-full p-2 rounded flex items-center justify-center bg-slate-900 text-green-400 text-lg">
                Weight needed: <strong>&nbsp;{wResult} g</strong>
              </p>
              <div className="mt-2 p-2 bg-gray-700 text-left rounded text-gray-200 text-sm">
                <p><strong>How to prepare:</strong></p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Measure out {wResult} g.</li>
                  <li>Add the compound to a volumetric flask.</li>
                  <li>Fill the flask with solvent up to {wVolume} mL.</li>
                </ol>
              </div>
            </>
          ) : wError && (
            <p className="flex w-full bg-slate-300 rounded items-center justify-center text-red-800 p-2 text-1xl">
              {wError}
            </p>
          )}

          <div className="flex justify-center">
            <button
              type="button"
              onClick={whandleClearFields}
              className="w-full px-4 py-2 cursor-pointer mb-2 transition-all duration-200 ease-in-out hover:scale-110 font-semibold bg-violet-300 text-black"
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>

      <div className="flex-1 p-6 bg-gray-800 flex flex-col">
        <h1 className="text-2xl font-bold mb-2">v/v Dilution Calculator</h1>
        <form className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex-1">
              <label className="block text-left">Enter Stock Percent (% v/v):</label>
              <input
                type="number"
                value={vStockPercent !== null ? vStockPercent : ''}
                onChange={(e) => setVStockPercent(e.target.value !== '' ? parseFloat(e.target.value) : null)}
                className="w-full p-2 border text-sm bg-gray-600 rounded"
                placeholder="Enter stock concentration (%)"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex-1">
              <label className="block text-left">Enter Desired Percent (% v/v):</label>
              <input
                type="number"
                value={vDesiredPercent !== null ? vDesiredPercent : ''}
                onChange={(e) => setVDesiredPercent(e.target.value !== '' ? parseFloat(e.target.value) : null)}
                className="w-full p-2 border text-sm bg-gray-600 rounded"
                placeholder="Enter desired concentration (%)"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex-1">
              <label className="block text-left">Enter Final Volume (mL):</label>
              <input
                type="number"
                value={vFinalVolume !== null ? vFinalVolume : ''}
                onChange={(e) => setVFinalVolume(e.target.value !== '' ? parseFloat(e.target.value) : null)}
                className="w-full p-2 border text-sm bg-gray-600 rounded"
                placeholder="Enter final volume in mL"
              />
            </div>
          </div>

          {vResult !== null ? (
            <>
              <p className="w-full p-1 rounded flex items-center justify-center bg-green-300 text-slate-900 text-lg">
                Stock volume needed: <strong>&nbsp;{vResult} mL</strong>
              </p>
              <div className="p-1 bg-gray-700 text-left rounded text-gray-200 text-sm">
                <p><strong>How to prepare:</strong></p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Measure out {vResult} mL of the {vStockPercent}% stock solution.</li>
                  <li>Add it to a volumetric flask.</li>
                  <li>Fill the flask with solvent up to {vFinalVolume} mL.</li>
                </ol>
              </div>
            </>
          ) : vError && (
            <p className="flex w-full bg-slate-300 rounded items-center justify-center text-red-800 p-2 text-1xl">
              {vError}
            </p>
          )}

          <div className="flex justify-center">
            <button
              type="button"
              onClick={vhandleClearFields}
              className="w-full px-4 py-2 cursor-pointer transition-all duration-200 ease-in-out hover:scale-110 font-semibold bg-violet-300 text-black"
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PercentCalculator;
