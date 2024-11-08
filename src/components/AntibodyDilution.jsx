import React, { useState, useEffect } from 'react';
import { FaBookOpen } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { IoBeakerOutline  } from "react-icons/io5";
import { TiPipette } from "react-icons/ti";
import { SiMoleculer } from "react-icons/si";
import { GiConcentricCrescents } from "react-icons/gi";

const AntibodyDilutionCalculator = () => {
  const [selectedDilution, setSelectedDilution] = useState('');
  const [selectedFinalVolume, setSelectedFinalVolume] = useState('');
  const [antibodyVolume, setAntibodyVolume] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isTheoryVisible, setIsTheoryVisible] = useState(false);

  const dilutions = [
    '1:100', '1:250', '1:500', '1:1000', '1:2000', 
    '1:2500', '1:3000', '1:5000', '1:10000', 
    '1:15000', '1:20000'
  ];

  const finalVolumes = [3.5, 10, 15, 20]; // in mL

// Calculate the volume of stock antibody based on the selected dilution and final volume
useEffect(() => {
    const calculateAntibodyVolume = () => {
      if (!selectedDilution || !selectedFinalVolume) {
        setErrorMessage('Please select both dilution and final volume.');
        setAntibodyVolume('');
        return;
      }
  
      const dilutionFactor = parseInt(selectedDilution.split(':')[1]);
      const finalVol = parseFloat(selectedFinalVolume);
  
      if (dilutionFactor > 0 && finalVol > 0) {
        let calculatedVolume = finalVol / dilutionFactor *1000;
        
        const formattedVolume = calculatedVolume.toFixed(3).replace(/(\.0+|(?<=\.\d+)0+)$/, '');
        setAntibodyVolume(formattedVolume);
        setErrorMessage('');
      } else {
        setAntibodyVolume('');
        setErrorMessage('Invalid inputs. Please try again.');
      }
    };
  
    calculateAntibodyVolume();
  }, [selectedDilution, selectedFinalVolume]); 

  const handleClearFields = () => {
    setSelectedDilution('');
    setSelectedFinalVolume('');
    setAntibodyVolume('');
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
          className={`lg:hidden w-full text-sm p-2 font-bold mb-2 ${isTheoryVisible ? 'bg-red-200' : 'bg-lime-200'} text-blue`}>
          {isTheoryVisible ? 'Hide' : 'Show'} Theory
          </button>
      <div className={`lg:block ${isTheoryVisible ? 'block' : 'hidden'}`}>
        <p className="mb-4">
          <strong>Western Blot Antibody Dilution</strong><br />
        </p>
        <p className="mb-4">
        Antibody dilutions are used in lab techniques like Western Blot to create solutions with the right concentration from a stock antibody. A dilution factor, written as X:Y, tells you how much stock solution you need to add to enough diluent to reach the total volume. For example, a 1:250 dilution means mixing 1 part antibody stock with 249 parts diluent. 
        </p>
        <p className="mb-4">
        To prepare a specific volume of a diluted solution, such as 10 mL (or 10,000 µL) at a 1:250 dilution, divide the total volume (10,000 µL) by the dilution factor (250). This gives 40 µL of antibody stock. The remaining volume, 9,960 µL, will come from the diluent.
        </p>
        <p className="mb-4">
        The calculation is done using the formula:<br />
        <strong>C1 × V1 = C2 × V2</strong><br />
        Where:<br />
        - C1 is the concentration of the stock solution,<br />
        - V1 is the volume of stock solution,<br />
        - C2 is the desired concentration,<br />
        - V2 is the final volume of the working solution.
        </p>
        <p className="mb-4">
        This calculator helps you figure out how much stock antibody to use based on the dilution ratio you choose and the final volume you want. Select both, and the tool calculates the correct stock volume for you.
        </p>
        <p className="mb-4">
        Note: Ensure that the concentration and volume units (e.g., µg/mL for concentration and µL or mL for volume) are consistent to make the calculation accurate. You may need to convert units as necessary.
        </p>
        </div>
      </div>

      <div className="flex-1 p-6 bg-gray-700 flex flex-col">
        <h1 className="text-2xl font-bold mb-6">Antibody Dilution Calculator</h1>
        <form className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex-1">
              <label className="block mb-1 text-left">Choose Desired Dilution:</label>
              <select
                value={selectedDilution}
                onChange={(e) => setSelectedDilution(e.target.value)}
                className="w-full p-2 border text-sm bg-gray-600 rounded"
              >
                <option value="">Select dilution</option>
                {dilutions.map((dilution) => (
                  <option key={dilution} value={dilution}>{dilution}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex-1">
              <label className="block mb-1 text-left">Choose Final Volume (mL):</label>
              <select
                value={selectedFinalVolume}
                onChange={(e) => setSelectedFinalVolume(e.target.value)}
                className="w-full p-2 border text-sm bg-gray-600 rounded"
              >
                <option value="">Select final volume</option>
                {finalVolumes.map((volume) => (
                  <option key={volume} value={volume}>{volume} mL</option>
                ))}
              </select>
            </div>
          </div>

          {antibodyVolume && !errorMessage && (
            <p className="w-full p-2 rounded flex items-center justify-center bg-slate-900 text-green-400 text-lg">
              Volume of Stock Antibody:&nbsp; <strong>{antibodyVolume} μl</strong>
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
          {antibodyVolume && !errorMessage && (
            <div className="steps">
              <div className="step flex items-center opacity-0 animate-fadeIn mb-4 text-sm" style={{ animationDelay: '0.2s' }}>
              <TiPipette className="mr-2 text-pink-400" />
                Pipette&nbsp; <strong>{antibodyVolume} μl</strong>&nbsp; of the stock antibody solution.
              </div>
              <div className="step flex items-center opacity-0 animate-fadeIn mb-4 text-sm" style={{ animationDelay: '0.4s' }}>
              <IoBeakerOutline className="mr-2 text-green-400" />
                Add it to the diluent to reach the final volume.
              </div>
              <div className="step flex items-center opacity-0 animate-fadeIn mb-4 text-sm" style={{ animationDelay: '0.8s' }}>
                <GiConcentricCrescents className="rotate-180 mr-2 text-purple-400" />
                Mix well.
              </div>
              <div className="step flex items-center opacity-0 animate-fadeIn mb-4 text-sm" style={{ animationDelay: '1s' }}>
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

export default AntibodyDilutionCalculator;
