import React, { useState, useEffect } from 'react';
import { FaBookOpen } from "react-icons/fa";
import { BiMessageRoundedError } from "react-icons/bi";
import { TbSquareLetterA, TbCircleLetterEFilled } from "react-icons/tb";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { Link } from 'react-router-dom';

const DnaRnaCalculator = () => {
  const [sampleType, setSampleType] = useState('dsDNA');
  const [absorbance, setAbsorbance] = useState('');
  const [dilutionFactor, setDilutionFactor] = useState(1);
  const [pathLength, setPathLength] = useState(1);
  const [concentration, setConcentration] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isTheoryVisible, setIsTheoryVisible] = useState(false);

  const conversionFactors = {
    dsDNA: 50,
    ssDNA: 33,
    RNA: 40,
  };

  const handleCalculate = () => {
    const abs = parseFloat(absorbance);
    const df = parseFloat(dilutionFactor);
    const pl = parseFloat(pathLength);

    if (!isNaN(abs) && !isNaN(df) && !isNaN(pl)) {
      const CF = conversionFactors[sampleType] || 50;
      const conc = (abs / pl) * CF * df;
      setConcentration(conc.toFixed(4).replace(/(\.[0-9]*[1-9])0+$/, '$1').replace(/(\.0+|(?<=\.\d+)0+)$/, ''));
      setErrorMessage('');
    } else {
      setErrorMessage('Please ensure all inputs are valid.');
    }
  };

  const handleClearFields = () => {
    setSampleType('dsDNA');
    setAbsorbance('');
    setDilutionFactor(1);
    setPathLength(1);
    setConcentration(null);
    setErrorMessage('');
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="flex flex-col lg:flex-row text-center text-white bg-slate-900 app-container" data-aos="fade-right">
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
      <p className={`lg:block ${isTheoryVisible ? 'block' : 'hidden'}`}>
        This calculator estimates the concentration of nucleic acids (DNA or RNA) in a sample using the Beer-Lambert Law, which relates absorbance to concentration. For nucleic acids, absorbance at 260 nm is commonly used.
      </p>

      <h3 className="text-xl font-semibold mb-2 mt-2">How It Works: Beer-Lambert Law</h3>
      <p className="mb-2">
        The concentration (C) of nucleic acids can be calculated using the following formula:
      </p>
      <BlockMath>{`C = \\frac{A_{260}}{l} \\times CF \\times DF`}</BlockMath>
      <p className="mb-2">Where:</p>
      <ul className="list-disc ml-5">
        <li><strong>A:</strong> Absorbance at 260 nm (unitless)</li>
        <li><strong>l:</strong> Path length of the cuvette (cm)</li>
        <li><strong>CF:</strong> Conversion factor based on sample type (µg/mL for DNA/RNA)</li>
        <li><strong>DF:</strong> Dilution factor, if the sample was diluted before measurement</li>
      </ul>

      <h3 className="text-xl font-semibold mb-2 mt-2">Conversion Factors</h3>
      <ul className="list-disc ml-5 mb-2">
        <li><strong>dsDNA:</strong> 50 µg/mL</li>
        <li><strong>ssDNA:</strong> 33 µg/mL</li>
        <li><strong>RNA:</strong> 40 µg/mL</li>
      </ul>

      <h3 className="text-xl font-semibold mb-2 mt-2">How to Estimate the Concentration of Custom DNA and RNA Oligo Sequences</h3>
      <p className="mb-2">
        To calculate DNA/RNA concentration using the Beer-Lambert Law, you can use the Beer-Lambert calculator to estimate the concentration of your custom oligo sequence. Access the calculator below:
      </p>
      <Link to="/absorbance" className="flex justify-center">
        <span className="p-2 mt-2 lg:w-[50%] flex rounded-full items-center justify-center text-sm font-semibold bg-green-300 transition-all duration-200 ease-in-out hover:scale-110">
          <TbSquareLetterA className="h-6 w-4 mr-2" />
          Beer-Lambert Calculator
        </span>
      </Link>
      <p className="mb-2 mt-4">
        To use the calculator, you will need to determine the extinction coefficients of your custom DNA/RNA oligos.
      </p>

      <h3 className="text-xl font-semibold mb-2 mt-2">How to Calculate the Extinction Coefficients of Custom DNA and RNA Oligo Sequences</h3>
      <p className="mb-2">
        The extinction coefficient of a material describes how strongly it absorbs light. Although this is conceptually simple, calculating the extinction coefficient can be tricky because it depends not only on the nucleotides present but also on their order. 
        To calculate the extinction coefficient of your oligo sequence, use the nearest neighbor model:
      </p>
      <BlockMath>{`\\varepsilon_{260} = \\sum_{i=1}^{N-1} \\varepsilon_{nearest neighbor} - \\sum_{i=2}^{N-1} \\varepsilon_{individual bases}`}</BlockMath>

      <p className="mb-2">Where:</p>
      <ul className="list-disc ml-5">
        <li><strong>ε260:</strong> Extinction coefficient of the oligo sequence at 260 nm</li>
        <li><strong>εnearest neighbor:</strong> Sum of the extinction coefficients of all adjacent pairs of nucleotides</li>
        <li><strong>εindividual bases:</strong> Sum of the extinction coefficients of individual nucleotides, excluding the first and last ones</li>
      </ul>

      <h3 className="text-xl font-semibold mb-2 mt-2">Individual Base Extinction Coefficients (in M<sup>-1</sup>cm<sup>-1</sup>)</h3>
      <p className="mb-2">The following table lists the extinction coefficients for individual nucleotides:</p>
      <table className="table-auto w-full text-left border-collapse mb-4">
        <thead>
          <tr className="bg-gray-300">
            <th className="border px-4 py-2">Base</th>
            <th className="border px-4 py-2">Extinction Coefficient</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">Adenine</td>
            <td className="border px-4 py-2">15,400</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Guanine</td>
            <td className="border px-4 py-2">11,500</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Cytosine</td>
            <td className="border px-4 py-2">7,400</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Thymine</td>
            <td className="border px-4 py-2">8,700</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Uracil</td>
            <td className="border px-4 py-2">9,900</td>
          </tr>
        </tbody>
      </table>

      <p>However, as already mentioned to determine the extinction coefficients of your custom DNA/RNA oligos can be tricky, hence, we advice you to use our calculation tool:</p>
      <Link to="/dnaoligos" className="flex justify-center">
        <span className="p-2 mt-2 mb-4 lg:w-[50%] flex rounded-full items-center justify-center text-sm font-semibold bg-green-300 transition-all duration-200 ease-in-out hover:scale-110">
          <TbCircleLetterEFilled className="h-6 w-4 mr-2" />
          DNA/RNA oligo Calculation Tool
        </span>
      </Link>
      </div>
      </div>

      <div className="flex-1 p-2 bg-gray-700 flex flex-col">
        <h1 className="text-xl font-bold mb-1">DNA/RNA Concentration Calculator</h1>

        <div className="mb-2">
          <label className="block mb-1 text-left text-sm">Select Sample Type:</label>
          <select 
            value={sampleType} 
            onChange={(e) => setSampleType(e.target.value)}
            className="w-full p-2 border text-xs bg-gray-600 rounded"
          >
            <option value="dsDNA">Double-stranded DNA</option>
            <option value="ssDNA">Single-stranded DNA</option>
            <option value="RNA">RNA</option>
          </select>
        </div>

        <div className="mb-2">
          <label className="block mb-1 text-left text-sm">Absorbance at 260 nm:</label>
          <input 
            type="number" 
            value={absorbance} 
            onChange={(e) => setAbsorbance(e.target.value)} 
            className="w-full p-2 border text-xs bg-gray-600 rounded"
            placeholder="Enter absorbance"
          />
        </div>

        <div className="mb-2">
          <label className="block mb-1 text-left text-sm">Dilution Factor:</label>
          <input 
            type="number" 
            value={dilutionFactor} 
            onChange={(e) => setDilutionFactor(e.target.value)} 
            className="w-full p-2 border text-xs bg-gray-600 rounded"
            placeholder="Enter dilution factor"
          />
        </div>

        <div className="mb-2">
          <label className="block mb-1 text-left text-sm">Path Length (cm):</label>
          <input 
            type="number" 
            value={pathLength} 
            onChange={(e) => setPathLength(e.target.value)} 
            className="w-full p-2 border text-xs bg-gray-600 rounded"
            placeholder="Enter path length"
          />
        </div>

        {errorMessage && (
            <p className="flex w-full mb-2 bg-slate-300 rounded items-center justify-center text-red-800 p-2 text-1xl">
              <BiMessageRoundedError className='w-8 h-8 mr-1' />
              {errorMessage}
            </p>
          )}
        
        {concentration && (
          <div className="w-full p-2 mb-2 rounded flex items-center justify-center bg-slate-900 text-green-400 text-lg">
            <h3>Concentration: {concentration} µg/mL</h3>
          </div>
        )}

        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleCalculate}
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
      </div>
    </div>
  );
};

export default DnaRnaCalculator;
