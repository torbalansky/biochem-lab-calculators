import React, { useState, useEffect } from 'react';
import { BiMessageRoundedError } from "react-icons/bi";
import { FaBookOpen } from "react-icons/fa";
import { TbSquareLetterA } from "react-icons/tb";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { Link } from 'react-router-dom';

const OligoCalculator = () => {
  const [sequence, setSequence] = useState('');
  const [extCoeff, setExtCoeff] = useState(null);
  const [concentration, setConcentration] = useState(null);
  const [gcContent, setGcContent] = useState(null);
  const [tm, setTm] = useState(null);
  const [molecularWeight, setMolecularWeight] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isRNA, setIsRNA] = useState(false);
  const [isTheoryVisible, setIsTheoryVisible] = useState(false);
  const [sequenceLength, setSequenceLength] = useState(null); 
  const baseMolecularWeights = {
    A: 313.21,
    T: 304.2,
    G: 329.21,
    C: 289.18,
    U: 290.18,
  };

  const dnaExtinctionCoefficients = {
    AA: 27400, AT: 22800, AG: 25000, AC: 21200,
    TT: 16800, TA: 23400, TG: 19000, TC: 16200,
    GG: 21600, GA: 25200, GT: 20000, GC: 17600,
    CC: 14600, CA: 21200, CT: 15200, CG: 18000
  };

  const rnaExtinctionCoefficients = {
    AA: 27400, AU: 24000, AG: 25000, AC: 21000,
    UU: 19600, UA: 24600, UG: 20000, UC: 17200,
    GG: 21600, GA: 25200, GU: 21200, GC: 17400,
    CC: 14200, CA: 21000, CU: 16200, CG: 17800
  };

  const individualBaseCoefficients = {
    A: 15400, T: 8700, G: 11500, C: 7400, U: 9900
  };

  const calculateMolecularWeight = (sequence) => {
    let totalWeight = 0;
    for (let i = 0; i < sequence.length; i++) {
      const base = sequence[i].toUpperCase();
      totalWeight += baseMolecularWeights[base] || 0;
    }
    return totalWeight - (isRNA ? 0 : 61.96);
  };

  const calculateExtinctionCoefficient = (sequence) => {
    const coefficients = isRNA ? rnaExtinctionCoefficients : dnaExtinctionCoefficients;
    let nearestNeighborSum = 0;
    let individualBaseSum = 0;

    for (let i = 0; i < sequence.length - 1; i++) {
      const pair = sequence.slice(i, i + 2).toUpperCase();
      nearestNeighborSum += coefficients[pair] || 0;
    }

    for (let i = 1; i < sequence.length - 1; i++) {
      const base = sequence[i].toUpperCase();
      individualBaseSum += individualBaseCoefficients[base] || 0;
    }
    return nearestNeighborSum - individualBaseSum;
  };

  const calculateTm = (countA, countT, countG, countC, countU, length) => {
    if (isRNA) {
      return length < 14
        ? (countA + countU) * 2 + (countG + countC) * 4
        : 78.5 + 0.7 * length + 41 * ((countG + countC) / length) - (500 / length);
    } else {
      return length < 14
        ? (countA + countT) * 2 + (countG + countC) * 4
        : 64.9 + 41 * ((countG + countC - 16.4) / (countA + countT + countG + countC));
    }
  };

  const validateSequence = () => {
    if (sequence.length > 200) {
      setErrorMessage("Sequence must be 200 bases or fewer.");
      return false;
    }

    const hasU = /U/.test(sequence.toUpperCase());
    const hasT = /T/.test(sequence.toUpperCase());

    if (isRNA && hasT) {
      setErrorMessage("RNA sequences should not contain 'T'.");
      return false;
    }
    if (!isRNA && hasU) {
      setErrorMessage("DNA sequences should not contain 'U'.");
      return false;
    }

    return true;
  };

  const calculate = () => {
    if (!sequence) {
        setErrorMessage("Please enter a sequence");
        return;
    }

    if (!validateSequence()) return;

    setErrorMessage("");

    const length = sequence.length;
    setSequenceLength(length);

    let countA = 0, countT = 0, countG = 0, countC = 0, countU = 0;

    for (let i = 0; i < length; i++) {
      const base = sequence[i].toUpperCase();
      if (base === 'A') countA++;
      if (base === 'T') countT++;
      if (base === 'G') countG++;
      if (base === 'C') countC++;
      if (base === 'U') countU++;
    }

    const molecularWeightValue = calculateMolecularWeight(sequence);
    setMolecularWeight(molecularWeightValue.toFixed(2));

    const extinctionCoefficientValue = calculateExtinctionCoefficient(sequence);
    setExtCoeff(extinctionCoefficientValue);

    const gcContentValue = ((countG + countC) / length) * 100;
    setGcContent(gcContentValue.toFixed(2));

    const tmValue = isRNA
        ? calculateTm(countA, 0, countG, countC, countU, length)
        : calculateTm(countA, countT, countG, countC, 0, length);
    setTm(tmValue.toFixed(1));

    const concentrationInM = 1 / extinctionCoefficientValue;
    const concentrationInNMolPerML = concentrationInM * 1e6;
    const concentrationInUGPerML = (concentrationInM * molecularWeightValue * 1e6) / 1000;

    setConcentration({
      microgramPerML: concentrationInUGPerML.toFixed(2),
      nmolePerML: concentrationInNMolPerML.toFixed(2),
    });
  };  

  const handleClearFields = () => {
    setSequence('');
    setErrorMessage('');
    setExtCoeff(null);
    setConcentration(null);
    setGcContent(null);
    setTm(null);
    setMolecularWeight(null);
    setSequenceLength(null);
  };

  const handleSequenceTypeChange = (e) => {
    setIsRNA(e.target.value === "RNA");
  };

  const handleSequenceInputChange = (e) => {
    setSequence(e.target.value.toUpperCase());
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

      <h3 className="text-xl font-semibold mb-2 mt-2">How to Calculate the Extinction Coefficients, Melting Temperature (Tm), and Molecular Weight (MW) for Oligos</h3>
      <p className="mb-2">
      This tool calculates the <strong>extinction coefficient (OD/μmol, μg/OD)</strong>, <strong>melting temperature (Tm)</strong>, and <strong>molecular weight (MW)</strong> for oligonucleotides. Understanding these parameters is crucial for designing and analyzing custom DNA and RNA sequences.
        </p>
      
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

      <h3 className="text-xl font-semibold mb-2 mt-2">Nearest Neighbor Extinction Coefficients (in M<sup>-1</sup>cm<sup>-1</sup>)</h3>
      <p className="mb-2">
        The following table shows the nearest neighbor extinction coefficients for DNA and RNA sequences at 260 nm, for the 5'/3' position:
      </p>
      <table className="table-auto w-full text-left border-collapse mb-4">
        <thead>
            <tr className="bg-gray-300">
            <th className="border px-4 py-2">DNA</th>
            <th className="border px-4 py-2">ε</th>
            <th className="border px-4 py-2">RNA</th>
            <th className="border px-4 py-2">ε</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td className="border px-4 py-2">pdA</td>
            <td className="border px-4 py-2">15400</td>
            <td className="border px-4 py-2">pA</td>
            <td className="border px-4 py-2">15400</td>
            </tr>
            <tr>
            <td className="border px-4 py-2">pdC</td>
            <td className="border px-4 py-2">7400</td>
            <td className="border px-4 py-2">pC</td>
            <td className="border px-4 py-2">7200</td>
            </tr>
            <tr>
            <td className="border px-4 py-2">pdG</td>
            <td className="border px-4 py-2">11500</td>
            <td className="border px-4 py-2">pG</td>
            <td className="border px-4 py-2">11500</td>
            </tr>
            <tr>
            <td className="border px-4 py-2">pdT</td>
            <td className="border px-4 py-2">8700</td>
            <td className="border px-4 py-2">pU</td>
            <td className="border px-4 py-2">9900</td>
            </tr>
            <tr>
            <td className="border px-4 py-2">dApdA</td>
            <td className="border px-4 py-2">27400</td>
            <td className="border px-4 py-2">ApA</td>
            <td className="border px-4 py-2">27400</td>
            </tr>
            <tr>
            <td className="border px-4 py-2">dApdC</td>
            <td className="border px-4 py-2">21200</td>
            <td className="border px-4 py-2">ApC</td>
            <td className="border px-4 py-2">21000</td>
            </tr>
            <tr>
            <td className="border px-4 py-2">dApdG</td>
            <td className="border px-4 py-2">25000</td>
            <td className="border px-4 py-2">ApG</td>
            <td className="border px-4 py-2">25000</td>
            </tr>
            <tr>
            <td className="border px-4 py-2">dApdT</td>
            <td className="border px-4 py-2">22800</td>
            <td className="border px-4 py-2">ApU</td>
            <td className="border px-4 py-2">24000</td>
            </tr>
            <tr>
            <td className="border px-4 py-2">dCpdA</td>
            <td className="border px-4 py-2">21200</td>
            <td className="border px-4 py-2">CpA</td>
            <td className="border px-4 py-2">21000</td>
            </tr>
            <tr>
            <td className="border px-4 py-2">dCpdC</td>
            <td className="border px-4 py-2">14600</td>
            <td className="border px-4 py-2">CpC</td>
            <td className="border px-4 py-2">14200</td>
            </tr>
            <tr>
            <td className="border px-4 py-2">dCpdG</td>
            <td className="border px-4 py-2">18000</td>
            <td className="border px-4 py-2">CpG</td>
            <td className="border px-4 py-2">17800</td>
            </tr>
            <tr>
            <td className="border px-4 py-2">dCpdT</td>
            <td className="border px-4 py-2">15200</td>
            <td className="border px-4 py-2">CpU</td>
            <td className="border px-4 py-2">16200</td>
            </tr>
            <tr>
            <td className="border px-4 py-2">dGpdA</td>
            <td className="border px-4 py-2">25200</td>
            <td className="border px-4 py-2">GpA</td>
            <td className="border px-4 py-2">25200</td>
            </tr>
            <tr>
            <td className="border px-4 py-2">dGpdC</td>
            <td className="border px-4 py-2">17600</td>
            <td className="border px-4 py-2">GpC</td>
            <td className="border px-4 py-2">17400</td>
            </tr>
            <tr>
            <td className="border px-4 py-2">dGpdG</td>
            <td className="border px-4 py-2">21600</td>
            <td className="border px-4 py-2">GpG</td>
            <td className="border px-4 py-2">21600</td>
            </tr>
            <tr>
            <td className="border px-4 py-2">dGpdT</td>
            <td className="border px-4 py-2">20000</td>
            <td className="border px-4 py-2">GpU</td>
            <td className="border px-4 py-2">21200</td>
            </tr>
            <tr>
            <td className="border px-4 py-2">dTpdA</td>
            <td className="border px-4 py-2">23400</td>
            <td className="border px-4 py-2">UpA</td>
            <td className="border px-4 py-2">24600</td>
            </tr>
            <tr>
            <td className="border px-4 py-2">dTpdC</td>
            <td className="border px-4 py-2">16200</td>
            <td className="border px-4 py-2">UpC</td>
            <td className="border px-4 py-2">17200</td>
            </tr>
            <tr>
            <td className="border px-4 py-2">dTpdG</td>
            <td className="border px-4 py-2">19000</td>
            <td className="border px-4 py-2">UpG</td>
            <td className="border px-4 py-2">20000</td>
            </tr>
            <tr>
            <td className="border px-4 py-2">dTpdT</td>
            <td className="border px-4 py-2">16800</td>
            <td className="border px-4 py-2">UpU</td>
            <td className="border px-4 py-2">19600</td>
            </tr>
        </tbody>
        </table>
        <h4 className="text-lg font-semibold mb-2 mt-2">Melting Temperature (Tm) Calculations</h4>
            <p className="mb-2">
            The melting temperature (Tm) of an oligonucleotide is a key property that determines its stability. It can be calculated using different formulas depending on the sequence length:
            </p>
            <ul className="list-disc ml-5">
            <li><strong>For sequences shorter than 14 nucleotides:</strong></li>
            </ul>
            <BlockMath>{`\\scriptsize T_m = (n_A + n_T) \\times 2 + (n_G + n_C) \\times 4`}</BlockMath>
            <p className="mb-2">Where:</p>
            <ul className="list-disc ml-5">
            <li><strong>nA</strong>, <strong>nT</strong>, <strong>nG</strong>, <strong>nC</strong> are the counts of adenine (A), thymine (T), guanine (G), and cytosine (C) in the sequence.</li>
            </ul>

            <ul className="list-disc ml-5">
            <li><strong>For sequences longer than 13 nucleotides:</strong></li>
            </ul>
            <BlockMath>{`\\scriptsize T_m = 64.9 + 41 \\times \\left( \\frac{(n_G + n_C) - 16.4}{n_A + n_T + n_G + n_C} \\right)`}</BlockMath>

            <h4 className="text-lg font-semibold mb-2 mt-2">Molecular Weight Calculations</h4>
            <p className="mb-2">
            The molecular weight (MW) of a DNA oligo can be calculated using the following formula, assuming there is no 5' monophosphate:<br/><br/>
            Mw = (An × 313.21) + (Tn × 304.2) + (Cn × 289.18) + (Gn × 329.21) - 61.96
            </p>
           
            <p className="mb-2">Where:</p>
            <ul className="list-disc ml-5">
            <li><strong>An</strong>, <strong>Tn</strong>, <strong>Cn</strong>, and <strong>Gn</strong> represent the number of adenine, thymine, cytosine, and guanine bases in the sequence.</li>
            </ul>
            <p className="mb-2">
            The subtraction of 61.96 g/mol accounts for the removal of a phosphate group and the addition of a hydroxyl group at the 5' and 3' ends of the oligonucleotide.
            </p>
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
      </div>
      </div>
      <div className="flex-1 p-4 bg-gray-700 flex flex-col">
        <h1 className="text-xl font-bold mb-6 mt-2">DNA/RNA Oligo Calculation Tool</h1>

        <div className="mb-2 flex flex-row justify-center">
          <label className="block m-1 text-left text-md"> Select Type:</label>
          <select onChange={handleSequenceTypeChange} className="w-60 p-2 border text-sm bg-cyan-800 rounded">
            <option value="DNA">DNA</option>
            <option value="RNA">RNA</option>
          </select>
        </div>

        <div className="mb-2">
          <label className="block mb-1 text-left text-md">Enter Sequence:</label>
          <textarea
            value={sequence}
            onChange={handleSequenceInputChange}
            rows="2"
            className="w-full p-2 border text-xs bg-gray-600 rounded"
            placeholder="Enter sequence (max. 200 bases)"
          />
        </div>

        {errorMessage && (
          <p className="flex w-full mb-2 bg-slate-300 rounded items-center justify-center text-red-800 p-2 text-1xl">
            <BiMessageRoundedError className="w-8 h-8 mr-1" />
            {errorMessage}
          </p>
        )}

        {sequenceLength !== null && (
          <div className="mt-2 flex justify-center">
            <table className="table-auto w-[70%] text-left border-collapse mb-2 text-xs text-white">
              <tbody>
                <tr><td className="px-2 py-1 border">Length</td><td className="px-2 py-1 border">{sequenceLength}</td></tr>
                <tr><td className="px-2 py-1 border">GC Content (%)</td><td className="px-2 py-1 border">{gcContent}</td></tr>
                <tr><td className="px-2 py-1 border">Molecular Weight (g/mol)</td><td className="px-2 py-1 border">{molecularWeight}</td></tr>
                <tr><td className="px-2 py-1 border">Extinction Coefficient (M⁻¹cm⁻¹)</td><td className="px-2 py-1 border">{extCoeff}</td></tr>
                <tr><td className="px-2 py-1 border">Melting Temperature (Tm, °C)</td><td className="px-2 py-1 border">{tm}</td></tr>
                <tr><td className="px-2 py-1 border">Concentration (μg/mL)</td><td className="px-2 py-1 border">{concentration?.microgramPerML}</td></tr>
                <tr><td className="px-2 py-1 border">Concentration (nmole/mL)</td><td className="px-2 py-1 border">{concentration?.nmolePerML}</td></tr>
              </tbody>
            </table>
          </div>
        )}
        <div className="flex justify-center">
            <button
                type="button"
                onClick={calculate}
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

export default OligoCalculator;