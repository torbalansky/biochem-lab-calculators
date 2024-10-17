import React, { useState, useEffect } from 'react';
import { FaExchangeAlt } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const UnitConverter = () => {
  const [selectedConversion, setSelectedConversion] = useState('temperature');
  const [tempCelsius, setTempCelsius] = useState('');
  const [tempFahrenheit, setTempFahrenheit] = useState('');
  const [tempKelvin, setTempKelvin] = useState('');

  const [lengthMeters, setLengthMeters] = useState('');
  const [lengthCentimeters, setLengthCentimeters] = useState('');
  const [lengthMillimeters, setLengthMillimeters] = useState('');
  const [lengthMicrometers, setLengthMicrometers] = useState('');
  const [lengthNanometers, setLengthNanometers] = useState('');

  const [densityKgPerM3, setDensityKgPerM3] = useState('');
  const [densityGPerCm3, setDensityGPerCm3] = useState('');

  const [weightKg, setWeightKg] = useState('');
  const [weightGrams, setWeightGrams] = useState('');
  const [weightMg, setWeightMg] = useState('');
  const [weightLbs, setWeightLbs] = useState('');

  const [volumeLiters, setVolumeLiters] = useState('');
  const [volumeMilliliters, setVolumeMilliliters] = useState('');
  const [volumeCubicMeters, setVolumeCubicMeters] = useState('');
  const [volumeCubicCentimeters, setVolumeCubicCentimeters] = useState('');

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
    const meters = parseFloat(lengthMeters);
    if (lengthMeters) {
      setLengthCentimeters(meters * 100);
      setLengthMillimeters(meters * 1000);
      setLengthMicrometers(meters * 1e6);
      setLengthNanometers(meters * 1e9);
    } else if (lengthCentimeters) {
      const cm = parseFloat(lengthCentimeters);
      setLengthMeters(cm / 100);
      setLengthMillimeters(cm * 10);
      setLengthMicrometers(cm * 1e4);
      setLengthNanometers(cm * 1e7);
    }
  };

  const handleDensityConversion = () => {
    const kgPerM3 = parseFloat(densityKgPerM3);
    if (densityKgPerM3) {
      setDensityGPerCm3(kgPerM3 / 1000);
    } else if (densityGPerCm3) {
      setDensityKgPerM3(parseFloat(densityGPerCm3) * 1000);
    }
  };

  const handleWeightConversion = () => {
    const kg = parseFloat(weightKg);
    if (weightKg) {
      setWeightGrams(kg * 1000);
      setWeightMg(kg * 1e6);
      setWeightLbs(kg * 2.20462);
    } else if (weightGrams) {
      const grams = parseFloat(weightGrams);
      setWeightKg(grams / 1000);
      setWeightMg(grams * 1000);
      setWeightLbs(grams / 453.592);
    }
  };

  const handleVolumeConversion = () => {
    const liters = parseFloat(volumeLiters);
    if (volumeLiters) {
      setVolumeMilliliters(liters * 1000);
      setVolumeCubicMeters(liters / 1000);
      setVolumeCubicCentimeters(liters * 1000);
    } else if (volumeMilliliters) {
      const milliliters = parseFloat(volumeMilliliters);
      setVolumeLiters(milliliters / 1000);
      setVolumeCubicCentimeters(milliliters);
      setVolumeCubicMeters(milliliters / 1e6);
    }
  };

  const handleClearFields = () => {
    setTempCelsius('');
    setTempFahrenheit('');
    setTempKelvin('');

    setLengthMeters('');
    setLengthCentimeters('');
    setLengthMillimeters('');
    setLengthMicrometers('');
    setLengthNanometers('');

    setDensityKgPerM3('');
    setDensityGPerCm3('');

    setWeightKg('');
    setWeightGrams('');
    setWeightMg('');
    setWeightLbs('');

    setVolumeLiters('');
    setVolumeMilliliters('');
    setVolumeCubicMeters('');
    setVolumeCubicCentimeters('');
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const renderTheory = () => {
    return (
      <div data-aos="fade-right">
        <p><strong>Theory of Unit Conversions</strong></p> <br />
        <p>Unit conversions are essential in science and engineering to ensure consistency and accuracy in measurements.</p>
        
        {selectedConversion === 'temperature' && (
          <div><br />
            <p><strong>Temperature Conversion</strong></p><br />
            <p>Temperature is a measure of the thermal energy of a system and can be expressed in three primary units:</p>
            <ul><br />
              <li><strong>Celsius (°C)</strong>: Widely used in most parts of the world. Water freezes at 0°C and boils at 100°C under standard conditions.</li><br />
              <li><strong>Fahrenheit (°F)</strong>: Commonly used in the United States. Water freezes at 32°F and boils at 212°F.</li><br />
              <li><strong>Kelvin (K)</strong>: Used in scientific contexts, particularly in physics. The Kelvin scale starts at absolute zero, the theoretical point where all molecular motion stops, with 0K equivalent to -273.15°C. Water freezes at 273.15K and boils at 373.15K.</li><br />
            </ul>
            <p>Conversions between these units can be done using the following formulas:</p><br />
            <ul>
              <li>From Celsius to Fahrenheit: \( F = (C \times \frac{9}{5}) + 32 \)</li><br />
              <li>From Fahrenheit to Celsius: \( C = (F - 32) \times \frac{5}{9} \)</li><br />
              <li>From Celsius to Kelvin: \( K = C + 273.15 \)</li><br />
              <li>From Kelvin to Celsius: \( C = K - 273.15 \)</li><br />
            </ul>
          </div>
        )}
  
        {selectedConversion === 'length' && (
          <div><br />
            <h4><strong>Length Conversion</strong></h4><br />
            <p>Length is a measure of distance and can be expressed in various units, depending on the scale of measurement. Common units of length include:</p>
            <ul><br />
              <li><strong>Meters (m)</strong>: The base unit of length in the International System of Units (SI).</li><br />
              <li><strong>Centimeters (cm)</strong>: Equal to one-hundredth of a meter (1 m = 100 cm).</li><br />
              <li><strong>Millimeters (mm)</strong>: Equal to one-thousandth of a meter (1 m = 1000 mm).</li><br />
              <li><strong>Micrometers (µm)</strong>: Equal to one-millionth of a meter (1 m = 1,000,000 µm).</li><br />
              <li><strong>Nanometers (nm)</strong>: Equal to one-billionth of a meter (1 m = 1,000,000,000 nm).</li><br />
            </ul>
            <p>Conversions between these units are based on powers of ten:</p>
            <ul>
              <li>1 meter = 100 centimeters = 1000 millimeters = 1,000,000 micrometers = 1,000,000,000 nanometers</li>
            </ul>
          </div>
        )}
  
        {selectedConversion === 'density' && (
          <div><br />
            <p><strong>Density Conversion</strong></p>
            <p>Density is defined as mass per unit volume and is commonly expressed in:</p><br />
            <ul><br />
              <li><strong>kg/m³</strong>: Kilograms per cubic meter, the SI unit for density.</li><br />
              <li><strong>g/cm³</strong>: Grams per cubic centimeter, often used for smaller objects or substances.</li><br />
            </ul><br />
            <p>To convert between these units, the following relationship is used:</p><br />
            <ul>
              <li>1 g/cm³ = 1000 kg/m³</li><br />
            </ul>
          </div>
        )}
  
        {selectedConversion === 'weight' && (
          <div><br />
            <p><strong>Weight Conversion</strong></p><br />
            <p>Weight refers to the mass of an object and can be measured in several units:</p><br />
            <ul>
              <li><strong>Kilograms (kg)</strong>: The base unit of mass in the SI system.</li><br />
              <li><strong>Grams (g)</strong>: One-thousandth of a kilogram (1 kg = 1000 g).</li><br />
              <li><strong>Milligrams (mg)</strong>: One-thousandth of a gram (1 g = 1000 mg).</li><br />
              <li><strong>Pounds (lbs)</strong>: A unit commonly used in the United States, where 1 kg ≈ 2.20462 lbs.</li>
            </ul><br />
            <p>Conversions between these units follow the relationships:</p><br />
            <ul>
              <li>1 kilogram = 1000 grams = 1,000,000 milligrams</li><br />
              <li>1 kilogram ≈ 2.20462 pounds</li>
            </ul>
          </div>
        )}
  
        {selectedConversion === 'volume' && (
          <div><br />
            <p><strong>Volume Conversion</strong></p><br />
            <p>Volume refers to the amount of space an object or substance occupies and can be measured in different units:</p><br />
            <ul>
              <li><strong>Liters (L)</strong>: A metric unit of volume, commonly used for liquids.</li><br />
              <li><strong>Milliliters (mL)</strong>: One-thousandth of a liter (1 L = 1000 mL).</li><br />
              <li><strong>Cubic Meters (m³)</strong>: The SI unit for volume, often used for larger volumes (1 m³ = 1000 L).</li><br />
              <li><strong>Cubic Centimeters (cm³)</strong>: A metric unit equal to one-thousandth of a liter (1 cm³ = 1 mL).</li><br />
            </ul>
            <p>Common volume conversions include:</p><br />
            <ul><br />
              <li>1 liter = 1000 milliliters = 1000 cubic centimeters</li><br />
              <li>1 cubic meter = 1000 liters</li>
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row text-center text-white bg-slate-900 app-container" data-aos="fade-right">
      <div className="flex-1 p-4 bg-slate-100 text-gray-800 overflow-y-auto overflow-x-hidden text-left">
        <h2 className="w-screen flex text-2xl font-bold mb-4 bg-gray-300 text-left p-2">
          <FaExchangeAlt className="h-6 w-6 mt-2 mr-2" />
          Unit Converter
        </h2>
        {renderTheory()}
      </div>
  
      <div className="flex-1 p-6 bg-gray-700 flex flex-col">
        <h1 className="text-2xl font-bold mb-1">Convert Units</h1>
  
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
  
        {selectedConversion === 'length' && (
          <>
            <div className="mb-1">
              <label className="block mb-1 text-left">Meters (m):</label>
              <input
                type="number"
                value={lengthMeters}
                onChange={(e) => setLengthMeters(e.target.value)}
                className="w-full p-2 border text-sm bg-gray-600 rounded"
              />
            </div>
            <div className="mb-1">
              <label className="block mb-1 text-left">Centimeters (cm):</label>
              <input
                type="number"
                value={lengthCentimeters}
                onChange={(e) => setLengthCentimeters(e.target.value)}
                className="w-full p-2 border text-sm bg-gray-600 rounded"
              />
            </div>
            <div className="mb-1">
              <label className="block mb-1 text-left">Millimeters (mm):</label>
              <input
                type="number"
                value={lengthMillimeters}
                onChange={(e) => setLengthMillimeters(e.target.value)}
                className="w-full p-2 border text-sm bg-gray-600 rounded"
              />
            </div>
            <div className="mb-1">
              <label className="block mb-1 text-left">Micrometers (µm):</label>
              <input
                type="number"
                value={lengthMicrometers}
                onChange={(e) => setLengthMicrometers(e.target.value)}
                className="w-full p-2 border text-sm bg-gray-600 rounded"
              />
            </div>
            <div className="mb-1">
              <label className="block mb-1 text-left">Nanometers (nm):</label>
              <input
                type="number"
                value={lengthNanometers}
                onChange={(e) => setLengthNanometers(e.target.value)}
                className="w-full p-2 border text-sm bg-gray-600 rounded"
              />
            </div>
          </>
        )}
  
        {selectedConversion === 'density' && (
          <>
            <div className="mb-4">
              <label className="block mb-1 text-left">Density (kg/m³):</label>
              <input
                type="number"
                value={densityKgPerM3}
                onChange={(e) => setDensityKgPerM3(e.target.value)}
                className="w-full p-2 border text-sm bg-gray-600 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-left">Density (g/cm³):</label>
              <input
                type="number"
                value={densityGPerCm3}
                onChange={(e) => setDensityGPerCm3(e.target.value)}
                className="w-full p-2 border text-sm bg-gray-600 rounded"
              />
            </div>
          </>
        )}
  
        {selectedConversion === 'weight' && (
          <>
            <div className="mb-4">
              <label className="block mb-1 text-left">Weight (kg):</label>
              <input
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                className="w-full p-2 border text-sm bg-gray-600 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-left">Weight (g):</label>
              <input
                type="number"
                value={weightGrams}
                onChange={(e) => setWeightGrams(e.target.value)}
                className="w-full p-2 border text-sm bg-gray-600 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-left">Weight (mg):</label>
              <input
                type="number"
                value={weightMg}
                onChange={(e) => setWeightMg(e.target.value)}
                className="w-full p-2 border text-sm bg-gray-600 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-left">Weight (lbs):</label>
              <input
                type="number"
                value={weightLbs}
                onChange={(e) => setWeightLbs(e.target.value)}
                className="w-full p-2 border text-sm bg-gray-600 rounded"
              />
            </div>
          </>
        )}
  
        {selectedConversion === 'volume' && (
          <>
            <div className="mb-4">
              <label className="block mb-1 text-left">Volume (liters):</label>
              <input
                type="number"
                value={volumeLiters}
                onChange={(e) => setVolumeLiters(e.target.value)}
                className="w-full p-2 border text-sm bg-gray-600 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-left">Volume (milliliters):</label>
              <input
                type="number"
                value={volumeMilliliters}
                onChange={(e) => setVolumeMilliliters(e.target.value)}
                className="w-full p-2 border text-sm bg-gray-600 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-left">Volume (cubic meters):</label>
              <input
                type="number"
                value={volumeCubicMeters}
                onChange={(e) => setVolumeCubicMeters(e.target.value)}
                className="w-full p-2 border text-sm bg-gray-600 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-left">Volume (cubic centimeters):</label>
              <input
                type="number"
                value={volumeCubicCentimeters}
                onChange={(e) => setVolumeCubicCentimeters(e.target.value)}
                className="w-full p-2 border text-sm bg-gray-600 rounded"
              />
            </div>
          </>
        )}
  
        <div className="flex justify-center mt-2">
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

export default UnitConverter;
