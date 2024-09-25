import React, { useState, useEffect } from 'react';
import { FaCogs } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const GForceCalculator = () => {
  const [rpm, setRpm] = useState('');
  const [radius, setRadius] = useState('');
  const [rcf, setRcf] = useState('');
  const [error, setError] = useState('');

  const calculateValues = () => {
    const rpmValue = parseFloat(rpm);
    const radiusValue = parseFloat(radius);
    const rcfValue = parseFloat(rcf);
    let calculatedValue;

    if (rpm && radius) {
      calculatedValue = Math.pow(rpmValue, 2) * 1.118 * Math.pow(10, -5) * radiusValue;
      setRcf(calculatedValue.toFixed(2));
    }

    else if (rcf && radius) {
      calculatedValue = Math.sqrt(rcfValue / (radiusValue * 1.118)) * Math.pow(10, 5);
      setRpm(calculatedValue.toFixed(2));
    }

    else {
      setError('Please enter values for RPM and radius or RCF and radius.');
      return;
    }

    setError('');
  };

  const handleClearFields = () => {
    setRpm('');
    setRadius('');
    setRcf('');
    setError('');
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="flex flex-col lg:flex-row text-center text-white bg-slate-900 app-container" data-aos="fade-right">
      <div className="flex-1 p-4 bg-slate-100 text-gray-800 overflow-y-auto text-left">
        <h2 className="w-screen flex text-2xl font-bold mb-4 bg-gray-300 text-left p-2">
          <FaCogs className="h-6 w-6 mt-2 mr-2" />
          G Force Theory
        </h2>
        <div>
          <p className="mb-4"><strong>What is Relative Centrifugal Force (RCF)?</strong></p>
            <br />
            Relative Centrifugal Force (RCF) refers to the amount of force applied when using a centrifuge. It is calculated using the formula:
            <br />
            <strong>RCF = (RPM)² × 1.118 × 10<sup>-5</sup> × r</strong>
            <br />
            where:
            <br />
            <ul>
              <li><strong>RPM</strong> is the revolutions per minute of the rotor</li>
              <li><strong>r</strong> is the radius of the rotor in centimeters</li>
            </ul>
            <p>This calculator can convert between RCF and RPM to assist in achieving more precise experimental results that require centrifugation.</p>

        </div>
      </div>

      <div className="flex-1 p-6 bg-gray-700 flex flex-col">
        <h1 className="text-2xl font-bold mb-6">G Force Calculator — RCF to RPM</h1>

        <div className="mb-4">
          <label className="block mb-1 text-left">Revolutions per Minute (RPM):</label>
          <input
            type="number"
            value={rpm}
            onChange={(e) => setRpm(e.target.value)}
            className="w-full p-2 border text-sm bg-gray-600 rounded"
            placeholder="Enter RPM"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-left">Radius of Rotor (cm):</label>
          <input
            type="number"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            className="w-full p-2 border text-sm bg-gray-600 rounded"
            placeholder="Enter radius"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-left">Relative Centrifugal Force (RCF) or g force:</label>
          <input
            type="number"
            value={rcf}
            onChange={(e) => setRcf(e.target.value)}
            className="w-full p-2 border text-sm bg-gray-600 rounded"
            placeholder="Enter RCF"
          />
        </div>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        <div className="flex justify-center">
          <button
            type="button"
            onClick={calculateValues}
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

export default GForceCalculator;
