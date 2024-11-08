import React, { useState, useEffect } from 'react';
import { FaBookOpen } from "react-icons/fa";
import { BiMessageRoundedError } from "react-icons/bi";
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const EnzymeCalculator = () => {
  const [desiredActivity, setDesiredActivity] = useState('');
  const [stockActivity, setStockActivity] = useState('');
  const [finalVolume, setFinalVolume] = useState('');
  const [result, setResult] = useState('');
  const [desiredUnit, setDesiredUnit] = useState('mL');
  const [stockUnit, setStockUnit] = useState('mg');
  const [volumeUnit, setVolumeUnit] = useState('mL');
  const [errorMessage, setErrorMessage] = useState('');
  const [isTheoryVisible, setIsTheoryVisible] = useState(false);

  const volumeConversions = {
    L: 1,
    mL: 1e-3,
    μL: 1e-6,
  };

  const weightConversions = {
    g: 1,
    mg: 1e-3,
    μg: 1e-6,
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const calculateEnzymeMass = () => {
    if (!desiredActivity || !stockActivity || !finalVolume) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    setResult('');
    setErrorMessage('');
  
    const convertedDesiredActivity = parseFloat(desiredActivity) * volumeConversions[desiredUnit];
    const convertedStockActivity = parseFloat(stockActivity) * weightConversions[stockUnit];
    const convertedVolume = parseFloat(finalVolume) * volumeConversions[volumeUnit];
  
    if (convertedStockActivity === 0) {
      setErrorMessage('Please enter valid values.');
      return;
    }
  
    const enzymeMass = (convertedDesiredActivity * convertedVolume) / convertedStockActivity;
    const resultInMg = enzymeMass / weightConversions['mg'];
  
    setResult(resultInMg.toFixed(3).replace(/(\.[0-9]*[1-9])0+$/, '$1').replace(/(\.0+|(?<=\.\d+)0+)$/, ''));
  };
  
  const handleClearFields = () => {
    setDesiredActivity('');
    setStockActivity('');
    setFinalVolume('');
    setResult('');
    setErrorMessage('');
  }

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
        <strong>What is Enzyme Activity?</strong>
        </p>
        <p className="mb-4">
        Enzyme activity refers to the catalytic efficiency of an enzyme, allowing us to measure how effectively it converts a substrate into a product. It serves as an essential metric in biochemistry for understanding enzyme performance.
        </p>
        <p className="mb-4">
        Think of enzyme activity as a gauge of productivity, crucial for determining the enzyme quantity required to achieve a specified activity per unit volume of buffer solution—precisely what our tool is designed to help with.
        </p>
        <p className="mb-4">
        <strong>Using the Enzyme Activity Calculator</strong>
        </p>
        <p className="mb-4">
        Despite its importance, measuring enzyme activity doesn't need to be complex. Our tool simplifies the process:
        </p>
        <ul className="list-disc pl-6 mb-4">
        <li>Input the desired enzyme activity (default units: units/ml).</li>
        <li>Enter the stock enzyme activity (default units: units/mg).</li>
        <li>Provide the desired final volume (default units: ml, adjustable as needed).</li>
        <li>The tool calculates the required enzyme mass (in mg).</li>
        </ul>
        <p className="mb-4">
        <strong>Example Calculation:</strong> If the desired enzyme activity is 10 units/ml, the stock enzyme activity is 5 units/mg, and the final volume is 20 ml, the tool will calculate the enzyme mass needed as 40 mg.
        </p>
        <p className="mb-4">
        <strong>Enzyme Activity Formula</strong>
        </p>
        <p className="mb-4">
        The formula for calculating enzyme activity is:
        </p>
        <pre className="bg-gray-200 p-2 mb-4">
        <BlockMath>{`E_{mass} = \\frac{E_{desired} \\times V_{final}}{E_{stock}}`}</BlockMath>
        </pre>
        <p className="mb-4">
        <strong>Where:</strong></p>
        <ul className="list-disc pl-6">
            <li>E<sub>mass</sub> – Required enzyme mass in mg.</li>
            <li>E<sub>desired</sub> – Desired enzyme activity (units/ml).</li>
            <li>V<sub>final</sub> – Final volume (ml).</li>
            <li>E<sub>stock</sub> – Stock enzyme activity (units/mg).</li>
        </ul>
        <p className="mb-4">
        <strong>Example:</strong> For E<sub>desired</sub> = 2 units/ml, V<sub>final</sub> = 5 ml, and E<sub>stock</sub> = 10 units/mg:
        </p>
        <pre className="bg-gray-200 p-2 mb-4">
        <BlockMath>{`E_{mass} = \\frac{2 \\times 5}{10} = 1 \\text{ mg}`}</BlockMath>
        </pre>
        <p className="mb-4">
        <strong>Importance of Measuring Enzyme Activity</strong>
        </p>
        <p className="mb-4">
        Understanding enzyme activity is vital for:
        </p>
        <ul className="list-disc pl-6 mb-4">
        <li><strong>Biochemical Insight:</strong> Reveals enzyme efficiency in catalysis.</li>
        <li><strong>Medical Applications:</strong> Essential for diagnostics, treatment monitoring, and therapeutic evaluations.</li>
        <li><strong>Industrial Processes:</strong> Supports process optimization and precise control.</li>
        <li><strong>Innovation:</strong> Drives advancements in research, biotechnology, and healthcare.</li>
        </ul>
        </div>
      </div>

      <div className="flex-1 p-4 bg-gray-700 flex flex-col">
        <h1 className="text-2xl font-bold mb-4">Enzyme Activity Calculator</h1>
        <form className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex-1">
              <label className="block text-center lg:mr-24 text-sm">Enter Desired Enzyme Activity:</label>
              <input
                type="number"
                value={desiredActivity}
                onChange={(e) => setDesiredActivity(e.target.value)}
                className="w-[50%] p-2 border text-sm bg-gray-600 rounded"
                placeholder="Enter enzyme activity"
              />
              <select onChange={(e) => setDesiredUnit(e.target.value)} className="m-2 text-center px-4 py-2 bg-gray-100 cursor-pointer text-slate-800 rounded text-sm">
                <option value="mL">units/mL</option>
                <option value="L">units/L</option>
                <option value="μL">units/μL</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex-1">
              <label className="block text-center lg:mr-24 text-sm">Stock Enzyme Activity:</label>
              <input
                type="number"
                value={stockActivity}
                onChange={(e) => setStockActivity(e.target.value)}
                className="w-[50%] p-2 border text-sm bg-gray-600 rounded"
                placeholder="Enter stock activity"
              />
              <select onChange={(e) => setStockUnit(e.target.value)} className="m-2 text-center px-4 py-2 bg-gray-100 cursor-pointer text-slate-800 rounded text-sm">
                <option value="mg">units/mg</option>
                <option value="g">units/g</option>
                <option value="μg">units/μg</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex-1">
              <label className="block text-center lg:mr-24 text-sm">Enter Final Volume:</label>
              <input
                type="number"
                value={finalVolume}
                onChange={(e) => setFinalVolume(e.target.value)}
                className="w-[50%] p-2 border text-sm bg-gray-600 rounded"
                placeholder="Enter final volume"
              />
              <select onChange={(e) => setVolumeUnit(e.target.value)} className="m-2 w-28 text-center px-4 py-2 bg-gray-100 cursor-pointer text-slate-800 rounded text-sm">
                <option value="mL">mL</option>
                <option value="L">L</option>
                <option value="μL">μL</option>
              </select>
            </div>
          </div>

          {result && (
            <div className="w-full p-2 rounded flex items-center justify-center bg-slate-900 text-green-400 text-lg">
              <p>Required Enzyme Mass: <strong>{result} mg</strong></p>
            </div>
          )}

          {errorMessage && (
            <p className="flex w-full bg-slate-300 rounded items-center justify-center text-red-800 p-1 text-1xl">
              <BiMessageRoundedError className='w-8 h-8 mr-1' />
              {errorMessage}
            </p>
          )}

          <div className="flex justify-center">
            <button
              type="button"
              onClick={calculateEnzymeMass}
              className="px-4 py-2 cursor-pointer mb-1 transition-all duration-200 ease-in-out hover:scale-110 font-semibold bg-green-300 text-black"
            >
              Calculate
            </button>
            <button
              type="button"
              onClick={handleClearFields}
              className="w-[100px] ml-2 px-4 py-2 cursor-pointer mb-1 transition-all duration-200 ease-in-out hover:scale-110 font-semibold bg-violet-300 text-black"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnzymeCalculator;
