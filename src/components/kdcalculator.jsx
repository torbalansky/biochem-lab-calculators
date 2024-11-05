import React, { useState, useEffect } from 'react';
import { FaBookOpen } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';

const KdCalculator = () => {
  const [deltaG, setDeltaG] = useState('');
  const [temperature, setTemperature] = useState(298);
  const [kd, setKd] = useState('');
  const [error, setError] = useState('');

  const calculateKd = () => {
    const deltaGValue = parseFloat(deltaG);
    const tempValue = parseFloat(temperature);

    if (!isNaN(deltaGValue) && !isNaN(tempValue) && tempValue > 0) {
      const R = 0.001987;
      const kdValue = Math.exp(deltaGValue / (R * tempValue));
      setKd(kdValue.toExponential(2));
      setError('');
    } else {
      setError('Please enter valid values for ΔG and temperature.');
      setKd('');
    }
  };

  const handleClearFields = () => {
    setDeltaG('');
    setKd('');
    setTemperature(298);
    setError('');
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="flex flex-col lg:flex-row text-white bg-slate-900 app-container" data-aos="fade-right">
      <div className="flex-1 p-4 bg-slate-100 text-gray-800 overflow-y-auto overflow-x-hidden text-left">
        <h2 className="flex items-center text-2xl font-bold mb-4 bg-gray-300 p-2">
          <FaBookOpen className="h-6 w-6 mr-2" />
          Theory
        </h2>
        <p>
          The binding constant can be understood through the equilibrium reaction between a receptor 
          R and a ligand L, represented as 
          R + L ⇌ RL. In this reaction, the rate at which the receptor and ligand combine (association) is denoted as K<sub>on</sub>, while the rate at which the complex RL dissociates back into R and L is represented as K<sub>off</sub>. The relationship between these rates can be expressed as:
        </p>
        <p>
          K<sub>on</sub>[R][L] = K<sub>off</sub>[RL]
        </p>
        <p>
          From this, we derive the equilibrium association constant K<sub>a</sub> defined as:
        </p>
        <p>
          K<sub>a</sub> = K<sub>on</sub> / K<sub>off</sub>
        </p>
        <p>
          The equilibrium dissociation constant K<sub>d</sub> is simply the reciprocal of the association constant:
        </p>
        <p>
          K<sub>d</sub> = 1 / K<sub>a</sub>
        </p>
        <p>
          This constant is a critical measure of binding affinity, often used to indicate the strength of the interaction between a receptor and its ligand.
        </p>
        <p>
          Furthermore, the dissociation constant K<sub>d</sub> is quantitatively related to the Gibbs free energy change ΔG of the reaction by the equation:
        </p>
        <p>
          ΔG = RT ln K<sub>d</sub>
        </p>
        <p>Where:</p>
          <ul>
            <li><strong>R</strong> is the gas constant,</li>
            <li><strong>T</strong> is the absolute temperature in Kelvin.</li>
          </ul>

        <p>
          At a standard temperature of 298 K (25 °C), the relationship between ΔG and K<sub>d</sub> is illustrated in the following table:
        </p>
        <table className="w-full text-center bg-gray-200 rounded">
          <thead>
            <tr>
              <th className="p-2">ΔG (kcal/mol)</th>
              <th className="p-2">K<sub>d</sub> (mol/L)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>-12</td><td>1.56E-09</td></tr>
            <tr><td>-11.5</td><td>3.64E-09</td></tr>
            <tr><td>-11</td><td>8.47E-09</td></tr>
            <tr><td>-10.5</td><td>1.97E-08</td></tr>
            <tr><td>-10</td><td>4.59E-08</td></tr>
            <tr><td>-9.5</td><td>1.07E-07</td></tr>
            <tr><td>-9</td><td>2.49E-07</td></tr>
            <tr><td>-8.5</td><td>5.79E-07</td></tr>
            <tr><td>-8</td><td>1.35E-06</td></tr>
            <tr><td>-7.5</td><td>3.14E-06</td></tr>
            <tr><td>-7</td><td>7.30E-06</td></tr>
            <tr><td>-6.5</td><td>1.70E-05</td></tr>
            <tr><td>-6</td><td>3.95E-05</td></tr>
            <tr><td>-5.5</td><td>9.20E-05</td></tr>
            <tr><td>-5</td><td>2.14E-04</td></tr>
            <tr><td>-4.5</td><td>4.99E-04</td></tr>
            <tr><td>-4</td><td>1.16E-03</td></tr>
          </tbody>
        </table>
      </div>
      
      <div className="flex-1 p-4 bg-gray-700">
        <h1 className="text-2xl font-bold mb-6 text-center">Dissociation Constant Calculator</h1>
        <div className="mb-4">
          <label className="block mb-1 text-left">Enter ΔG (kcal/mol):</label>
          <input
            type="number"
            value={deltaG}
            onChange={(e) => setDeltaG(e.target.value)}
            className="w-full p-2 border text-sm bg-gray-600 rounded"
            placeholder="Enter ΔG"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-left">Enter Temperature (K):</label>
          <input
            type="number"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            className="w-full p-2 border text-sm bg-gray-600 rounded"
            placeholder="Enter Temperature"
          />
        </div>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        <div className="flex justify-center mb-4">
          <button
            type="button"
            onClick={calculateKd}
            className="px-4 py-2 cursor-pointer transition-all duration-200 ease-in-out hover:scale-110 font-semibold bg-green-300 text-black"
          >
            Calculate
          </button>
          <button
            type="button"
            onClick={handleClearFields}
            className="w-[100px] ml-2 px-4 py-2 cursor-pointer transition-all duration-200 ease-in-out hover:scale-110 font-semibold bg-violet-300 text-black"
          >
            Clear
          </button>
        </div>

        {kd && (
          <div className="text-center text-lg">
            <strong>Calculated K<sub>d</sub>:</strong> {kd} mol/L
          </div>
        )}
      </div>
    </div>
  );
};

export default KdCalculator;
