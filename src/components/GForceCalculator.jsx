import React, { useState, useEffect } from 'react';
import { FaCogs } from 'react-icons/fa';
import { BiMessageRoundedError } from "react-icons/bi";
import { GoArrowSwitch } from "react-icons/go";
import AOS from 'aos';
import 'aos/dist/aos.css';

const GForceCalculator = () => {
  const [rpm, setRpm] = useState('');
  const [radius, setRadius] = useState('');
  const [rcf, setRcf] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isTheoryVisible, setIsTheoryVisible] = useState(false);

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
      setErrorMessage('Please enter values for RPM and radius or RCF and radius.');
      return;
    }

    setErrorMessage('');
  };

  const handleClearFields = () => {
    setRpm('');
    setRadius('');
    setRcf('');
    setErrorMessage('');
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="flex flex-col lg:flex-row text-center text-white bg-slate-900 app-container" data-aos="fade-right">
      <div className="flex-1 p-4 bg-slate-100 text-gray-800 overflow-y-auto overflow-x-hidden text-left">
        <h2 className="w-screen flex text-2xl font-bold mb-4 bg-gray-300 text-left p-2">
          <FaCogs className="h-6 w-6 mt-2 mr-2" />
          G Force Theory
        </h2>
          <button
          onClick={() => setIsTheoryVisible(!isTheoryVisible)}
          className={`lg:hidden w-full text-sm p-2 font-bold mb-2 ${isTheoryVisible ? 'bg-red-200' : 'bg-lime-200'} text-blue`}>
          {isTheoryVisible ? 'Hide' : 'Show'} Theory
          </button>
      <div className={`lg:block ${isTheoryVisible ? 'block' : 'hidden'}`}>
        <p className="mb-4"><strong>What is Relative Centrifugal Force (RCF)?</strong></p>
          <p className="mb-4">
            Relative Centrifugal Force (RCF), often referred to as the "g-force" in the context of centrifugation, quantifies the force exerted on a sample during the spinning process in a centrifuge. This force is crucial for separating components based on their density, allowing for effective sedimentation of particles in solution.
          </p>
          <p className="mb-4">
            The RCF is calculated using the formula:
            <br />
            <strong>RCF = (RPM)² × 1.118 × 10<sup>-5</sup> × r</strong><br /><br />          
            </p>
            where:
            <ul><br />
              <li><strong>RPM</strong> represents the revolutions per minute of the centrifuge rotor, indicating the speed at which the rotor spins.</li><br />
              <li><strong>r</strong> denotes the radius of the rotor in centimeters, which is the distance from the center of rotation to the sample.</li><br />
            </ul>

          <p className="mb-4">
            This calculator facilitates the conversion between RCF and RPM, allowing researchers and laboratory personnel to optimize their centrifugation protocols. By knowing the RCF, one can ensure that samples are subjected to the appropriate forces for effective separation without damaging sensitive biological materials.
          </p>
          <p className="mb-4">
            Understanding RCF is essential for various applications, including cell pelleting, protein precipitation, and nucleic acid purification. By utilizing this tool, users can achieve more precise and reliable experimental outcomes that are critical in research and diagnostic settings.
          </p>
        </div>
      </div>

      <div className="flex-1 p-6 bg-gray-700 flex flex-col">
        <h1 className="text-2xl flex flex-row justify-center font-bold mb-6">G Force Calculator: RPM <GoArrowSwitch className='h-6 w-6 mt-1'/> RCF</h1>

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

        {errorMessage && (
            <div className="flex w-full bg-slate-300 rounded items-center justify-center text-red-800 p-2 text-1xl mb-2">
              <BiMessageRoundedError className='w-6 h-6 mr-2' />
              {errorMessage}
            </div>
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
