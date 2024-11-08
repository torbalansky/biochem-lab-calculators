import React, { useState, useEffect } from 'react';
import { FaBookOpen } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const ProteinAbs280Calculator = () => {
  const [proteinType, setProteinType] = useState('IgG');
  const [customSequence, setCustomSequence] = useState('');
  const [uniprotId, setUniprotId] = useState('');
  const [absorbance, setAbsorbance] = useState('');
  const [dilutionFactor, setDilutionFactor] = useState(1);
  const [pathLength, setPathLength] = useState(1);
  const [concentration, setConcentration] = useState(null);
  const [error, setError] = useState('');
  const [customMolWeight, setCustomMolWeight] = useState(null);
  const [customExtCoeff, setCustomExtCoeff] = useState(null);
  const [pI, setPI] = useState(null);
  const [isTheoryVisible, setIsTheoryVisible] = useState(false);

  const pKaValues = {
    N_term: 9.6,
    C_term: 2.1,
    R: 12.5,
    H: 6.0,
    K: 10.5,
    D: 3.9,
    E: 4.1,
    C: 8.3,
    Y: 10.1
  };

  const calculateNetCharge = (sequence, pH) => {
    let charge = 0;

    charge += Math.pow(10, pKaValues.N_term) / (Math.pow(10, pKaValues.N_term) + Math.pow(10, pH));
    charge -= Math.pow(10, pH) / (Math.pow(10, pKaValues.C_term) + Math.pow(10, pH));

    for (let aa of sequence) {
      if (aa === 'R') charge += Math.pow(10, pKaValues.R) / (Math.pow(10, pKaValues.R) + Math.pow(10, pH));
      if (aa === 'H') charge += Math.pow(10, pKaValues.H) / (Math.pow(10, pKaValues.H) + Math.pow(10, pH));
      if (aa === 'K') charge += Math.pow(10, pKaValues.K) / (Math.pow(10, pKaValues.K) + Math.pow(10, pH));
      if (aa === 'D') charge -= Math.pow(10, pH) / (Math.pow(10, pKaValues.D) + Math.pow(10, pH));
      if (aa === 'E') charge -= Math.pow(10, pH) / (Math.pow(10, pKaValues.E) + Math.pow(10, pH));
      if (aa === 'C') charge -= Math.pow(10, pH) / (Math.pow(10, pKaValues.C) + Math.pow(10, pH));
      if (aa === 'Y') charge -= Math.pow(10, pH) / (Math.pow(10, pKaValues.Y) + Math.pow(10, pH));
    }

    return charge;
  };

  const calculatePI = (sequence) => {
    let pH = 7.0;
    let increment = 0.1;
    let charge = calculateNetCharge(sequence, pH);

    while (Math.abs(charge) > 0.01 && increment > 0.0001) {
      if (charge > 0) pH += increment;
      else pH -= increment;
      charge = calculateNetCharge(sequence, pH);

      if ((charge > 0 && calculateNetCharge(sequence, pH + increment) < 0) || (charge < 0 && calculateNetCharge(sequence, pH - increment) > 0)) {
        increment /= 2;
      }
    }

    setPI(pH.toFixed(2));
  };


  const proteinPresets = {
    IgG: { molWeight: 150000, extCoeff: 210000 },
    BSA: { molWeight: 66400, extCoeff: 43824 },
    PE: { molWeight: 240000, extCoeff: 196000 },
    APC: { molWeight: 104000, extCoeff: 70000 },
    Streptavidin: { molWeight: 52000, extCoeff: 32420 }
  };

  const aminoAcidWeights = { 
    A: 89.09, R: 174.20, N: 132.12, D: 133.10, C: 121.16,
    E: 147.13, Q: 146.15, G: 75.07, H: 155.16, I: 131.18,
    L: 131.18, K: 146.19, M: 149.21, F: 165.19, P: 115.13,
    S: 105.09, T: 119.12, W: 204.23, Y: 181.19, V: 117.15
  };

  const calculateCustomProperties = (sequence) => {
    const sequenceLength = sequence.length;
    const rawMolWeight = Array.from(sequence).reduce((sum, aa) => {
        return sum + (aminoAcidWeights[aa] || 0);
    }, 0);
    
    const adjustedMolWeight = rawMolWeight - (18.015 * (sequenceLength - 1));
    setCustomMolWeight((adjustedMolWeight / 1000).toFixed(2));

    const tyrosineCount = (sequence.match(/Y/g) || []).length;
    const tryptophanCount = (sequence.match(/W/g) || []).length;
    const cystineCount = (sequence.match(/C/g) || []).length;
    const extCoeff = (tyrosineCount * 1490) + (tryptophanCount * 5500) + (cystineCount * 125);
    setCustomExtCoeff(extCoeff.toFixed(0));

    calculatePI(sequence);
  };


  const fetchFastaSequence = async () => {
    if (!uniprotId) return;

    try {
      const response = await fetch(`https://rest.uniprot.org/uniprotkb/${uniprotId}.fasta`);
      if (!response.ok) throw new Error(`Unable to fetch data for UniProt ID: ${uniprotId}`);
      
      const fastaData = await response.text();
      const sequence = fastaData.split('\n').slice(1).join('').trim();
      
      setCustomSequence(sequence);
      calculateCustomProperties(sequence);
      
      setError('');
    } catch (err) {
      setError(err.message);
      setCustomSequence('');
      setCustomMolWeight(null);
      setCustomExtCoeff(null);
    }
  };

  const handleCalculate = () => {
    let molWeight, extCoeff;
    
    if (proteinType === 'custom') {
        molWeight = customMolWeight ? customMolWeight * 1000 : null;
        extCoeff = customExtCoeff ? customExtCoeff : null;
    } else {
        molWeight = proteinPresets[proteinType].molWeight;
        extCoeff = proteinPresets[proteinType].extCoeff;
    }

    const abs = parseFloat(absorbance);
    const df = parseFloat(dilutionFactor);
    const pl = parseFloat(pathLength);

    if (!isNaN(abs) && extCoeff && molWeight && !isNaN(df) && !isNaN(pl)) {
        const conc = (abs * df * molWeight) / (extCoeff * pl);
        setConcentration(conc.toFixed(4));
    } else {
        setError('Please ensure all inputs are valid and sequence has been loaded.');
    }
  };

  const handleClearFields = () => {
    setProteinType('IgG');
    setUniprotId('');
    setAbsorbance('');
    setDilutionFactor(1);
    setPathLength(1);
    setCustomSequence('');
    setCustomMolWeight(null);
    setCustomExtCoeff(null);
    setConcentration(null);
    setError('');
};

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="flex flex-col lg:flex-row text-center text-white bg-slate-900 app-container" data-aos="fade-right">
      <div className="flex-1 p-4 bg-slate-100 text-gray-800 overflow-y-auto overflow-x-hidden text-left">
      <h2 className="w-screen flex text-2xl font-bold mb-4 bg-gray-300 text-left p-2">
        <FaBookOpen className="h-6 w-6 mt-2 mr-2" />
        Protein Absorbance at 280 nm
        </h2>
          <button
          onClick={() => setIsTheoryVisible(!isTheoryVisible)}
          className={`lg:hidden w-full text-sm p-2 font-bold mb-2 ${isTheoryVisible ? 'bg-red-200' : 'bg-lime-200'} text-blue`}>
          {isTheoryVisible ? 'Hide' : 'Show'} Theory
          </button>
      <div className={`lg:block ${isTheoryVisible ? 'block' : 'hidden'}`}>
        <p className="mb-2">
        This calculator determines protein concentration based on absorbance at 280 nm, using the Beer-Lambert Law—a key principle in biochemistry and analytical chemistry. Absorbance at 280 nm is particularly useful for protein quantification because certain amino acids (notably tryptophan, tyrosine, and cysteine) absorb ultraviolet light strongly at this wavelength. This property allows us to estimate the concentration of a protein solution without modifying or damaging the protein.
        </p>

        <h3 className="text-xl font-semibold mb-2">How It Works: The Beer-Lambert Law</h3>
        <p className="mb-2">
        The Beer-Lambert Law states that the absorbance (A) of a solution is proportional to the concentration (C) of the absorbing species in the solution, as expressed by the formula:
        </p>
        <p className="mb-2 font-mono text-sm bg-gray-100 p-2 rounded">
        A = ε × C × l
        </p>
        <p className="mb-2">Where:</p>
        <ul className="list-disc ml-5">
            <li><strong>A:</strong> Absorbance at 280 nm (unitless)</li>
            <li><strong>ε:</strong> Molar extinction coefficient of the protein (M⁻¹ cm⁻¹)</li>
            <li><strong>C:</strong> Concentration of the protein in solution (M)</li>
            <li><strong>l:</strong> Path length of the cuvette or container (cm)</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2 mt-2">Practical Application</h3>
        <p className="mb-2">
        For convenience, the formula is often rearranged to calculate protein concentration:
        </p>
        <p className="mb-2 font-mono text-sm bg-gray-100 p-2 rounded">
        </p>
        <BlockMath>{`C = \\frac{A}{\\varepsilon \\times l}`}</BlockMath>
        <p className="mb-2">
        This calculator adapts the formula to output concentration in mg/mL, a common unit in biochemical applications, by incorporating the protein’s molecular weight.
        </p>

        <h3 className="text-xl font-semibold mb-2">Why the Parameters Matter</h3>
        <ul className="list-disc ml-5 mb-2">
        <li><strong>Extinction Coefficient (ε):</strong> The extinction coefficient is specific to each protein and represents how strongly it absorbs light at 280 nm. It depends on the number of tryptophan, tyrosine, and cysteine residues in the protein structure.</li>
        <li><strong>Path Length (l):</strong> This is the distance the light travels through the sample, typically 1 cm in standard cuvettes. A longer path length would mean more absorbance for the same concentration.</li>
        <li><strong>Dilution Factor:</strong> If the sample has been diluted before measurement, the dilution factor accounts for this adjustment, allowing accurate calculation of the original concentration.</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Summary</h3>
        <p className="mb-2">
        This method provides a non-destructive and efficient means of quantifying proteins, essential in protein biochemistry for tasks ranging from enzyme assays to protein purification monitoring.
        </p>
     </div>
    </div>

      <div className="flex-1 p-2 bg-gray-700 flex flex-col">
        <h1 className="text-xl font-bold mb-1">Protein Concentration Calculator</h1>

        <div className="mb-">
          <label className="block mb-1 text-left text-sm">Select Protein Type:</label>
          <select 
            value={proteinType} 
            onChange={(e) => setProteinType(e.target.value)}
            className="w-full p-2 border text-xs bg-gray-600 rounded"
          >
            <option value="IgG">IgG</option>
            <option value="BSA">BSA</option>
            <option value="PE">PE</option>
            <option value="APC">APC</option>
            <option value="streptavidin">Streptavidin</option>
            <option value="custom">Custom Sequence</option>
          </select>
        </div>

        {proteinType === 'custom' && (
          <>
            <div className="flex justify-center flex-row mb-1 mt-1">
              <label className="mt-2 mr-2 text-sm">Enter UniProt ID:</label>
              <input 
                type="text" 
                value={uniprotId} 
                onChange={(e) => setUniprotId(e.target.value.toUpperCase())} 
                className="w-32 h-7 mt-1 p-1 border text-xs bg-gray-600 rounded"
                placeholder="e.g., P12345"
              />
              <button onClick={fetchFastaSequence} className="m-1 px-2 py-1 text-sm bg-blue-300 text-black transition-all duration-200 ease-in-out hover:scale-105 font-semibold">
                Get Sequence
              </button>
            </div>

            <div className="mb-1">
              <label className="block mb-1 text-left text-sm">Amino Acid Sequence:</label>
              <input 
                type="text" 
                value={customSequence} 
                onChange={(e) => {
                  const sequence = e.target.value.toUpperCase();
                  setCustomSequence(sequence);
                  calculateCustomProperties(sequence);
                }}
                className="w-full p-2 border text-xs bg-gray-600 rounded"
                placeholder="e.g., YYYWWTTRRR"
              />
            </div>

            {customMolWeight && customExtCoeff && (
              <div className="text-left text-xs mb-1 p-1 bg-gray-600 rounded">
                <p><strong>Molecular Weight:</strong> {customMolWeight} kDa</p>
                <p><strong>Extinction Coefficient:</strong> {customExtCoeff} M<sup>-1</sup> cm<sup>-1</sup></p>
                {pI && <p><strong>Isoelectric Point (pI):</strong> {pI}</p>}
              </div>
            )}
          </>
        )}

        <div className="mb-1">
          <label className="block mb-1 text-left text-sm">Absorbance at λmax:</label>
          <input 
            type="number" 
            value={absorbance} 
            onChange={(e) => setAbsorbance(e.target.value)} 
            className="w-full p-2 border text-xs bg-gray-600 rounded"
            placeholder="Enter absorbance"
          />
        </div>

        <div className="mb-1">
          <label className="block mb-1 text-left text-sm">Dilution Factor:</label>
          <input 
            type="number" 
            value={dilutionFactor} 
            onChange={(e) => setDilutionFactor(e.target.value)} 
            className="w-full p-2 border text-xs bg-gray-600 rounded"
            placeholder="Enter dilution factor"
          />
        </div>

        <div className="mb-1">
          <label className="block mb-1 text-left text-sm">Path Length (cm):</label>
          <input 
            type="number" 
            value={pathLength} 
            onChange={(e) => setPathLength(e.target.value)} 
            className="w-full p-2 border text-xs bg-gray-600 rounded"
            placeholder="Enter path length"
          />
        </div>

        {error && <p className="text-red-500 text-center mb-1">{error}</p>}

        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleCalculate}
            className="px-4 py-1 cursor-pointer mb-1 transition-all duration-200 ease-in-out hover:scale-110 font-semibold bg-green-300 text-black"
          >
            Calculate
          </button>
          <button
            type="button"
            onClick={handleClearFields}
            className="w-[100px] ml-2 px-4 py-1 cursor-pointer mb-1 transition-all duration-200 ease-in-out hover:scale-110 font-semibold bg-violet-300 text-black"
          >
            Clear
          </button>
        </div>

        {concentration && (
          <div className="text-center mt-1 bg-green-100 p-2 rounded text-green-800 font-semibold">
            <h3>Concentration: {concentration} mg/mL</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProteinAbs280Calculator;