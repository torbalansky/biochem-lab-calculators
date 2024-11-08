import React, { useState, useEffect } from 'react';
import { FaBookOpen } from "react-icons/fa";
import { BiMessageRoundedError } from "react-icons/bi";
import KmPlotImage from '../assets/img/Km.jpg';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const MichaelisMentenCalculator = () => {
  const [Km, setKm] = useState('');
  const [reactionSpeed, setReactionSpeed] = useState('');
  const [substrateConcentration, setSubstrateConcentration] = useState('');
  const [result, setResult] = useState('');
  const [concentrationUnit, setConcentrationUnit] = useState('M');
  const [substrateUnit, setSubstrateUnit] = useState('M');
  const [timeUnit, setTimeUnit] = useState('s');
  const [errorMessage, setErrorMessage] = useState('');
  const [isTheoryVisible, setIsTheoryVisible] = useState(false);

  const concentrationConversions = {
    M: 1,
    mM: 1e-3,
    μM: 1e-6,
    nM: 1e-9,
    pM: 1e-12,
    fM: 1e-15,
  };

  const timeConversions = {
    s: 1,
    min: 1 / 60,
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const calculateMichaelisMenten = () => {
    if (!Km || !reactionSpeed || !substrateConcentration) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
    setErrorMessage('');

    const KmValue = parseFloat(Km) * concentrationConversions[concentrationUnit];
    const SValue = parseFloat(substrateConcentration) * concentrationConversions[substrateUnit];
    const VmaxValue = parseFloat(reactionSpeed);

    const rate = (VmaxValue * SValue) / (KmValue + SValue);
    const finalRate = rate * timeConversions[timeUnit];

    setResult(finalRate.toFixed(6).replace(/(\.[0-9]*[1-9])0+$/, '$1').replace(/(\.0+|(?<=\.\d+)0+)$/, '') + ` M/${timeUnit}`);
  };

  const handleClearFields = () => {
    setKm('');
    setReactionSpeed('');
    setSubstrateConcentration('');
    setResult('');
    setErrorMessage('');
  };

  return (
    <div className="flex flex-col lg:flex-row text-center text-white bg-slate-900 app-container font-sans" data-aos="zoom-out-down">
      <div className="flex-1 p-4 bg-slate-100 text-gray-800 overflow-y-auto overflow-x-hidden text-left">
        <h2 className="w-screen flex text-2xl font-bold mb-4 bg-gray-300 text-left p-2">
          <FaBookOpen className="h-6 w-6 mt-2 mr-2" />
          Theory
        </h2>
          <button
          onClick={() => setIsTheoryVisible(!isTheoryVisible)}
          className={`lg:hidden w-full text-sm p-2 font-bold mb-2 ${isTheoryVisible ? 'bg-red-200' : 'bg-lime-200'} text-blue`}>
          {isTheoryVisible ? 'Hide' : 'Show'} Theory
          </button>
      <div className={`lg:block ${isTheoryVisible ? 'block' : 'hidden'}`}>
          <p className="mb-4">
            <strong>What is the Michaelis-Menten equation used for?</strong>
          </p>
          <p className="mb-4">
            The Michaelis-Menten equation describes the kinetics of enzyme-catalyzed reactions. It allows for the calculation of the reaction rate V based on the substrate concentration [S], the Michaelis constant Km, and the maximum reaction rate Vmax.
          </p>
          <p className="mb-4">
            The equation is represented as follows:
          </p>
          <BlockMath>
            {`V = \\frac{V_{\\text{max}} \\cdot [S]}{K_m + [S]}`}
          </BlockMath>
          <p className="mb-4">
            This equation indicates that at low substrate concentrations, the reaction rate is directly proportional to [S]. As the substrate concentration increases and approaches Vmax, the reaction rate becomes independent of [S].
          </p>
          <p className="mb-4">
            <strong>Estimating Km:</strong>
            <br />
            Below is a typical representation of an enzyme kinetics plot where Km is defined as the substrate concentration at which the reaction rate is half of Vmax.
          </p>
          <img src={KmPlotImage} alt="Michaelis-Menten Plot" className="mb-4 w-full rounded border border-slate-900 max-w-md lg:ml-12" title="Michaelis–Menten equation; Source: Wikipedia" />
          <p className="mb-4">
            Additionally, Km can be calculated using the rate constants of the reaction as follows:
          </p>
          <BlockMath>
            {`K_m = \\frac{k_2 + k_3}{k_1}`}
          </BlockMath>
        </div>
      </div>

      <div className="flex-1 p-6 bg-gray-700 flex flex-col">
        <h1 className="text-2xl font-bold mb-6">Reaction rate (V) Calculator</h1>
        <form className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex-1">
              <label className="block mb-1 text-center lg:mr-24">Enter Michaelis constant (Km)</label>
              <input
                type="number"
                value={Km}
                onChange={(e) => setKm(e.target.value)}
                className="w-[50%] p-2 border text-sm bg-gray-600 rounded"
                placeholder="Michaelis constant (Km)"
              />
              <select onChange={(e) => setConcentrationUnit(e.target.value)} className="m-2 text-center px-4 py-2 bg-gray-100 cursor-pointer text-slate-800 rounded text-sm">
                <option value="M">M</option>
                <option value="mM">mM</option>
                <option value="μM">μM</option>
                <option value="nM">nM</option>
                <option value="pM">pM</option>
                <option value="fM">fM</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex-1">
              <label className="block mb-1 text-center lg:mr-24">Max reaction speed (Vmax)</label>
              <input
                type="number"
                value={reactionSpeed}
                onChange={(e) => setReactionSpeed(e.target.value)}
                className="w-[50%] p-2 border text-sm bg-gray-600 rounded"
                placeholder="Enter max reaction speed"
              />
              <select onChange={(e) => setTimeUnit(e.target.value)} className="m-2 text-center px-4 py-2 bg-gray-100 cursor-pointer text-slate-800 rounded text-sm">
                <option value="s">sec.</option>
                <option value="min">min</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex-1">
              <label className="block mb-1 text-center lg:mr-24">Substrate concentration [S]</label>
              <input
                type="number"
                value={substrateConcentration}
                onChange={(e) => setSubstrateConcentration(e.target.value)}
                className="w-[50%] p-2 border text-sm bg-gray-600 rounded"
                placeholder="Enter substrate concentration"
              />
              <select onChange={(e) => setSubstrateUnit(e.target.value)} className="m-2 text-center px-4 py-2 bg-gray-100 cursor-pointer text-slate-800 rounded text-sm">
                <option value="M">M</option>
                <option value="mM">mM</option>
                <option value="μM">μM</option>
                <option value="nM">nM</option>
                <option value="pM">pM</option>
                <option value="fM">fM</option>
              </select>
            </div>
          </div>

          {result && (
            <div className="w-full p-2 rounded flex items-center justify-center bg-slate-900 text-green-400 text-lg">
              <p>Reaction rate: <strong>{result}</strong></p>
            </div>
          )}

          {errorMessage && (
            <p className="flex w-full bg-slate-300 rounded items-center justify-center text-red-800 p-2 text-1xl">
              <BiMessageRoundedError className='w-8 h-8 mr-1' />
              {errorMessage}
            </p>
          )}

          <div className="flex justify-center">
            <button
              type="button"
              onClick={calculateMichaelisMenten}
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

export default MichaelisMentenCalculator;
