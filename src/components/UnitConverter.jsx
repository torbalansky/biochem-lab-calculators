import React, { useState } from 'react';
import { FaExchangeAlt } from 'react-icons/fa';
import { IoConstructSharp } from "react-icons/io5";

const UnitConverter = () => {
  const [selectedConversion, setSelectedConversion] = useState('temperature');
  const [tempCelsius, setTempCelsius] = useState('');
  const [tempFahrenheit, setTempFahrenheit] = useState('');
  const [tempKelvin, setTempKelvin] = useState('');
  
  const [lengthMeters, setLengthMeters] = useState('');
  const [lengthCentimeters, setLengthCentimeters] = useState('');

  // Other states...

  const handleTempConversion = () => {
    const celsius = parseFloat(tempCelsius);
    const fahrenheit = parseFloat(tempFahrenheit);
    const kelvin = parseFloat(tempKelvin);

    if (tempCelsius) {
      setTempFahrenheit((celsius * 9 / 5) + 32);
      setTempKelvin(celsius + 273.15);
    } else if (tempFahrenheit) {
      setTempCelsius((fahrenheit - 32) * 5 / 9);
      setTempKelvin((fahrenheit - 32) * 5 / 9 + 273.15);
    } else if (tempKelvin) {
      setTempCelsius(kelvin - 273.15);
      setTempFahrenheit((kelvin - 273.15) * 9 / 5 + 32);
    }
  };

  const handleLengthConversion = () => {
   
  };

  const handleDensityConversion = () => {
    
  };

  const handleWeightConversion = () => {
    
  };

  const handleVolumeConversion = () => {
    
  };

  const renderTheory = () => {
    return (
      <div>
        <h3>Theory of Unit Conversions</h3>
        <p>Unit conversions are essential in science and engineering to ensure consistency and accuracy in measurements.</p>
        {selectedConversion === 'temperature' && (
          <p>Temperature can be measured in Celsius, Fahrenheit, and Kelvin.</p>
        )}
        {selectedConversion === 'length' && (
          <p>Length can be measured in meters, centimeters, inches, and more.</p>
        )}
        <div className='flex flex-row justify-center text-center text-4xl font-bold mt-16 bg-red-300 p-4'>
        <IoConstructSharp className='h-20 w-20'/>
        <p className='mt-6 ml-4'>Under construction.</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row text-center text-white bg-slate-900 app-container">
      <div className="flex-1 p-4 bg-slate-100 text-gray-800 overflow-y-auto text-left">
        <h2 className="w-screen flex text-2xl font-bold mb-4 bg-gray-300 text-left p-2">
          <FaExchangeAlt className="h-6 w-6 mt-2 mr-2" />
          Unit Converter
        </h2>
        {renderTheory()}
      </div>

      <div className="flex-1 p-6 bg-gray-700 flex flex-col">
        <h1 className="text-2xl font-bold mb-6">Convert Units</h1>

        <div className="mb-4">
          <label className="block mb-1 text-left">Select Conversion Type:</label>
          <select
            value={selectedConversion}
            onChange={(e) => setSelectedConversion(e.target.value)}
            className="w-full p-2 border text-sm bg-gray-600 rounded"
          >
            <option value="temperature">Temperature</option>
            <option value="length">Length</option>
            <option value="density">Density</option>
            <option value="weight">Weight</option>
            <option value="volume">Volume</option>
          </select>
        </div>

        {selectedConversion === 'temperature' && (
          <>
            <div className="mb-4">
              <label className="block mb-1 text-left">Temperature (°C):</label>
              <input
                type="number"
                value={tempCelsius}
                onChange={(e) => setTempCelsius(e.target.value)}
                className="w-full p-2 border text-sm bg-gray-600 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-left">Temperature (°F):</label>
              <input
                type="number"
                value={tempFahrenheit}
                onChange={(e) => setTempFahrenheit(e.target.value)}
                className="w-full p-2 border text-sm bg-gray-600 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-left">Temperature (K):</label>
              <input
                type="number"
                value={tempKelvin}
                onChange={(e) => setTempKelvin(e.target.value)}
                className="w-full p-2 border text-sm bg-gray-600 rounded"
              />
            </div>
          </>
        )}

        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => {
              switch (selectedConversion) {
                case 'temperature':
                  handleTempConversion();
                  break;
                case 'length':
                  handleLengthConversion();
                  break;
                case 'density':
                  handleDensityConversion();
                  break;
                case 'weight':
                  handleWeightConversion();
                  break;
                case 'volume':
                  handleVolumeConversion();
                  break;
                default:
                  break;
              }
            }}
            className="px-4 py-2 cursor-pointer mb-2 transition-all duration-200 ease-in-out hover:scale-110 font-semibold bg-green-300 text-black"
          >
            Calculate
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;
