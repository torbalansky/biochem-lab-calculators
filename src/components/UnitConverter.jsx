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

  const [molarity, setMolarity] = useState('');
  const [moles, setMoles] = useState('');
  const [volumeInLiters, setVolumeInLiters] = useState('');

  const [energyJoules, setEnergyJoules] = useState('');
  const [energyKilojoules, setEnergyKilojoules] = useState('');
  const [energyGramCalories, setEnergyGramCalories] = useState('');
  const [energyKilocalories, setEnergyKilocalories] = useState('');
  const CALORIES_PER_JOULE = 0.239006;
  const KILOCALORIES_PER_JOULE = 0.000239006;

  const [wattMilliWattHours, setWattMilliWattHours] = useState('');
  const [wattWattHours, setWattWattHours] = useState('');
  const [wattKilowattHours, setWattKilowattHours] = useState('');
  const KWATTS_PER_WATT = 0.001;
  const MILLIWATTS_PER_WATT = 1000;

  const [amps, setAmps] = useState('');
  const [ohms, setOhms] = useState('');
  const [watts, setWatts] = useState('');
  const [volts, setVolts] = useState('');
  const [calculationType, setCalculationType] = useState('ohms');

  const handleCalculateVolts = () => {
    const ampsValue = parseFloat(amps);
    let calculatedVolts;

    if (calculationType === 'ohms') {
      const ohmsValue = parseFloat(ohms);
      if (!isNaN(ampsValue) && !isNaN(ohmsValue)) {
        calculatedVolts = ampsValue * ohmsValue;
      }
    } else if (calculationType === 'watts') {
      const wattsValue = parseFloat(watts);
      if (!isNaN(ampsValue) && !isNaN(wattsValue) && ampsValue !== 0) {
        calculatedVolts = wattsValue / ampsValue;
      } else if (ampsValue === 0) {
        alert("Current (Amps) cannot be zero when calculating volts using Watts.");
        return;
      }
    }

    if (calculatedVolts !== undefined) {
      setVolts(calculatedVolts.toFixed(4).replace(/\.?0+$/, ''));
    }
  };

  const handleWattConversion = () => {
    const wattHours = parseFloat(wattWattHours);
    const kilowattHours = parseFloat(wattKilowattHours);
    const milliWattHours = parseFloat(wattMilliWattHours);
  
    if (!isNaN(wattHours)) {
      setWattKilowattHours((wattHours * KWATTS_PER_WATT).toFixed(4).replace(/\.?0+$/, ''));
      setWattMilliWattHours((wattHours * MILLIWATTS_PER_WATT).toFixed(4).replace(/\.?0+$/, ''));
    } else if (!isNaN(kilowattHours)) {
      setWattWattHours((kilowattHours / KWATTS_PER_WATT).toFixed(4).replace(/\.?0+$/, ''));
      setWattMilliWattHours((kilowattHours / KWATTS_PER_WATT * MILLIWATTS_PER_WATT).toFixed(4).replace(/\.?0+$/, ''));
    } else if (!isNaN(milliWattHours)) {
      setWattWattHours((milliWattHours / MILLIWATTS_PER_WATT).toFixed(4).replace(/\.?0+$/, ''));
      setWattKilowattHours((milliWattHours / MILLIWATTS_PER_WATT * KWATTS_PER_WATT).toFixed(4).replace(/\.?0+$/, ''));
    }
  };

  const handleEnergyConversion = () => {
    const joules = parseFloat(energyJoules);
    const kilojoules = parseFloat(energyKilojoules);
    const gramCalories = parseFloat(energyGramCalories);

    if (energyJoules) {
      setEnergyKilojoules(joules / 1000);
      setEnergyGramCalories(joules * CALORIES_PER_JOULE);
      setEnergyKilocalories(joules * KILOCALORIES_PER_JOULE);
    } else if (energyKilojoules) {
      setEnergyJoules(kilojoules * 1000);
      setEnergyGramCalories(kilojoules * 1000 * CALORIES_PER_JOULE);
      setEnergyKilocalories(kilojoules * KILOCALORIES_PER_JOULE);
    } else if (energyGramCalories) {
      setEnergyJoules(gramCalories / CALORIES_PER_JOULE);
      setEnergyKilojoules(gramCalories / CALORIES_PER_JOULE / 1000);
      setEnergyKilocalories(gramCalories * 0.001);
    }
  };

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

    setMolarity('');
    setMoles('');
    setVolumeInLiters('');

    setEnergyJoules('');
    setEnergyKilojoules('');
    setEnergyGramCalories('');
    setEnergyKilocalories('');

    setWattMilliWattHours('');
    setWattWattHours('');
    setWattKilowattHours('');

    setAmps('');
    setVolts('');
    setOhms('');
    setWatts('');
  };

  const handleMolarityConversion = () => {
    const m = parseFloat(molarity);
    const n = parseFloat(moles);
    const V = parseFloat(volumeInLiters);
  
    if (m && V) {
      setMoles(m * V);
    } else if (n && V) {
      setMolarity(n / V);
    } else if (m && n) {
      setVolumeInLiters(n / m);
    }
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

        {selectedConversion === 'molarity' && (
          <div><br />
            <p><strong>Molarity Conversion</strong></p><br />
            <p>Molarity (M) is a way to express the concentration of a solution. It is defined as the number of moles of solute per liter of solution:</p><br />
            <p><strong>Formula:</strong></p>
            <p><strong>Molarity (M) = Moles of Solute / Volume of Solution (L)</strong></p><br />
            <p>Where:</p>
            <ul>
              <li><strong>Moles of Solute</strong>: The amount of substance present in the solution, measured in moles.</li><br />
              <li><strong>Volume of Solution</strong>: The total volume of the solution in liters.</li><br />
            </ul>
            <p>Common conversions involving molarity include:</p><br />
            <ul>
              <li>1 M solution contains 1 mole of solute in 1 liter of solution.</li><br />
              <li>0.5 M solution contains 0.5 moles of solute in 1 liter of solution.</li><br />
              <li>To convert from moles to molarity, use the formula: <strong>M = n / V</strong>.</li><br />
              <li>To convert from molarity to moles, use the formula: <strong>n = M × V</strong>.</li><br />
              <li>To find the volume from moles and molarity, use the formula: <strong>V = n / M</strong>.</li><br />
            </ul>
          </div>
        )}

        {selectedConversion === 'energy' && (
          <div><br />
          <p><strong>Energy Conversion</strong></p><br />
            <p>Common units for energy include:</p>
            <ul>
              <li><strong>Joule (J)</strong>: The SI unit of energy. A joule is defined as the work required to move an object one meter against a force of one newton. It is also the energy transferred when one watt of power is applied for one second. Joules measure many forms of energy, including mechanical, thermal, and electrical energy, making them versatile for scientific calculations. 
              </li><br />
              <li><strong>Calorie (cal)</strong>: A calorie is the amount of energy needed to raise the temperature of one gram of water by one degree Celsius. This measurement was historically used in thermodynamics and is still widely used in nutrition, where "calories" typically refer to kilocalories (kcal), or the energy needed to heat one kilogram of water by one degree Celsius. 1 calorie is equivalent to approximately 4.184 joules. Calories are a practical unit in fields like chemistry and biology when measuring thermal energy.</li><br />
            </ul>
            <p>Energy can be converted between these units:</p>
            <ul>
              <li><strong>1 Joule ≈ 0.239 Calories</strong></li>
              <li><strong>1 Calorie ≈ 4.184 Joules</strong></li>
            </ul>
          </div>
        )}

        {selectedConversion === 'watt' && (
          <div><br />
            <p><strong>Energy Conversion</strong></p><br />
            <p>Common units for energy include:</p>
            <ul>
              <li><strong>Watt-hour (Wh)</strong>: A watt-hour is the amount of energy consumed or produced when a power of one watt is applied for one hour. It is commonly used to measure electricity consumption, where household appliances and electric bills often refer to energy usage in kilowatt-hours (kWh), or 1,000 watt-hours. One watt-hour is equivalent to 3,600 joules, as 1 watt equals 1 joule per second.</li><br />
              
              <li><strong>Kilowatt-hour (kWh)</strong>: This is a larger unit of energy, commonly used in household electricity consumption and power generation. One kilowatt-hour is the amount of energy used when a device consumes 1,000 watts (1 kW) over one hour. It is equal to 1,000 watt-hours or 3.6 million joules, and it is the standard measurement on most electric utility bills.</li><br />

            </ul>
            <p>Energy can be converted between these units:</p>
            <ul>
              <li><strong>1 Watt-hour ≈ 3,600 Joules</strong></li>
              <li><strong>1 Kilowatt-hour = 1,000 Watt-hours = 3.6 million Joules</strong></li>
              <li><strong>1 Watt-hour ≈ 2.247 × 10²² Electron Volts</strong></li>
            </ul>
          </div>
        )}

        {selectedConversion === 'ampsToVolts' && (
        <div><br />
          <p><strong>Amps to Volts Conversion</strong></p><br />
          <p>The conversion from Amps (A) to Volts (V) can be done using two primary formulas, depending on whether you know the resistance (in ohms) or the power (in watts):</p><br />
          <ul>
            <li>
              <strong>Using Ohm’s Law:</strong> 
              <p>The voltage (V) is equal to the current (I) in amps multiplied by the resistance (R) in ohms.</p>
              <p>This formula is derived from Ohm's Law, which states that the voltage across a conductor is directly proportional to the current flowing through it, given a constant resistance.</p><br />
            </li>
            <li>
              <strong>Using Power:</strong> 
              <p>The voltage (V) can also be calculated if the power (P) in watts and the current (I) in amps are known.</p>
              <p>This formula is derived from the relationship between power, current, and voltage, where power is the product of voltage and current.</p><br />
            </li>
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
            <option value="molarity">Molarity</option>
            <option value="energy">Energy (J, cal)</option>
            <option value="watt">Power (watt)</option>
            <option value="ampsToVolts">Amps to Volts</option>
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

          {selectedConversion === 'molarity' && (
            <>
              <div className="mb-4">
                <label className="block mb-1 text-left">Molarity (M):</label>
                <input
                  type="number"
                  value={molarity}
                  onChange={(e) => setMolarity(e.target.value)}
                  className="w-full p-2 border text-sm bg-gray-600 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-left">Moles (mol):</label>
                <input
                  type="number"
                  value={moles}
                  onChange={(e) => setMoles(e.target.value)}
                  className="w-full p-2 border text-sm bg-gray-600 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-left">Volume (L):</label>
                <input
                  type="number"
                  value={volumeInLiters}
                  onChange={(e) => setVolumeInLiters(e.target.value)}
                  className="w-full p-2 border text-sm bg-gray-600 rounded"
                />
              </div>
            </>
          )}

          {selectedConversion === 'energy' && (
          <>
            <div className="mb-4">
              <label className="block mb-1 text-left">Joules:</label>
              <input
                type="number"
                value={energyJoules}
                onChange={(e) => setEnergyJoules(e.target.value)}
                className="w-full p-2 border text-sm bg-gray-600 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-left">Kilojoules:</label>
              <input
                type="number"
                value={energyKilojoules}
                onChange={(e) => setEnergyKilojoules(e.target.value)}
                className="w-full p-2 border text-sm bg-gray-600 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-left">Gram Calories:</label>
              <input
                type="number"
                value={energyGramCalories}
                onChange={(e) => setEnergyGramCalories(e.target.value)}
                className="w-full p-2 border text-sm bg-gray-600 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-left">Kilocalories:</label>
              <input
                type="number"
                value={energyKilocalories}
                onChange={(e) => setEnergyKilocalories(e.target.value)}
                className="w-full p-2 border text-sm bg-gray-600 rounded"
              />
            </div>
            </>
          )}

            {selectedConversion === 'watt' && (
              <>
              <div className="mb-4">
                <label className="block mb-1 text-left">Milliwatt (mWh):</label>
                <input
                  type="number"
                  value={wattMilliWattHours}
                  onChange={(e) => setWattMilliWattHours(e.target.value)}
                  className="w-full p-2 border text-sm bg-gray-600 rounded"
                />
              </div>
                <div className="mb-4">
                  <label className="block mb-1 text-left">Watts (W):</label>
                  <input
                    type="number"
                    value={wattWattHours}
                    onChange={(e) => setWattWattHours(e.target.value)}
                    className="w-full p-2 border text-sm bg-gray-600 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-left">Kilowatts (kW):</label>
                  <input
                    type="number"
                    value={wattKilowattHours}
                    onChange={(e) => setWattKilowattHours(e.target.value)}
                    className="w-full p-2 border text-sm bg-gray-600 rounded"
                  />
                </div>
              </>
            )}


        {selectedConversion === 'ampsToVolts' && (
          <>
              <div className="mb-4">
              <label className="mb-1 mr-2 text-start">Select Type:</label>
              <select
                value={calculationType}
                onChange={(e) => setCalculationType(e.target.value)}
                className="w-60 p-2 border text-sm bg-cyan-800 rounded"
              >
                <option value="ohms">Using Ohms (Ω)</option>
                <option value="watts">Using Watts (W)</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-left">Amps (A):</label>
              <input
                type="number"
                value={amps}
                onChange={(e) => setAmps(e.target.value)}
                className="w-full p-2 border text-sm bg-gray-600 rounded"
              />
            </div>

            {calculationType === 'ohms' ? (
              <div className="mb-4">
                <label className="block mb-1 text-left">Ohms (Ω):</label>
                <input
                  type="number"
                  value={ohms}
                  onChange={(e) => setOhms(e.target.value)}
                  className="w-full p-2 border text-sm bg-gray-600 rounded"
                />
              </div>
            ) : (
              <div className="mb-4">
                <label className="block mb-1 text-left">Watts (W):</label>
                <input
                  type="number"
                  value={watts}
                  onChange={(e) => setWatts(e.target.value)}
                  className="w-full p-2 border text-sm bg-gray-600 rounded"
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block mb-1 text-left">Volts (V):</label>
              <input
                type="text"
                value={volts}
                readOnly
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
                  case 'molarity':
                  handleMolarityConversion();
                  break;
                case 'energy':
                  handleEnergyConversion();
                  break;
                case 'watt':
                  handleWattConversion();
                  break;
                case 'ampsToVolts':
                  handleCalculateVolts();
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
