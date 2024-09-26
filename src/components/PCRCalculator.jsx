import React, { useState, useEffect } from 'react';
import { FaFlask } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const PCRCalculator = () => {
  const [templateDNA, setTemplateDNA] = useState('');
  const [pcrBuffer, setPcrBuffer] = useState('');
  const [forwardPrimer, setForwardPrimer] = useState('');
  const [reversePrimer, setReversePrimer] = useState('');
  const [dNTPmix, setDNTPmix] = useState('');
  const [dnaPolymerase, setDNApolymerase] = useState('');
  const [pcrGradeWater, setPcrGradeWater] = useState('');
  const [totalReactions, setTotalReactions] = useState(1);
  const [totalVolumes, setTotalVolumes] = useState({});

  const calculateTotalVolume = () => {
    const totalDNA = parseFloat(templateDNA || 0) * totalReactions;
    const totalBuffer = parseFloat(pcrBuffer || 0) * totalReactions;
    const totalFwdPrimer = parseFloat(forwardPrimer || 0) * totalReactions;
    const totalRevPrimer = parseFloat(reversePrimer || 0) * totalReactions;
    const totalDNTP = parseFloat(dNTPmix || 0) * totalReactions;
    const totalPolymerase = parseFloat(dnaPolymerase || 0) * totalReactions;
    const totalWater = parseFloat(pcrGradeWater || 0) * totalReactions;

    const totalVolume = totalDNA + totalBuffer + totalFwdPrimer + totalRevPrimer + totalDNTP + totalPolymerase + totalWater;

    setTotalVolumes({
      templateDNA: totalDNA,
      pcrBuffer: totalBuffer,
      forwardPrimer: totalFwdPrimer,
      reversePrimer: totalRevPrimer,
      dNTPmix: totalDNTP,
      dnaPolymerase: totalPolymerase,
      pcrGradeWater: totalWater,
      total: totalVolume,
    });
  };

  const handleClearFields = () => {
    setTemplateDNA('');
    setPcrBuffer('');
    setForwardPrimer('');
    setReversePrimer('');
    setDNTPmix('');
    setDNApolymerase('');
    setPcrGradeWater('');
    setTotalReactions('');
    setTotalVolumes({});
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="flex flex-col lg:flex-row text-center text-white bg-slate-900 app-container" data-aos="fade-right">
    <div className="w-full lg:w-1/3 p-4 bg-slate-100 text-gray-800 overflow-y-auto overflow-x-hidden text-left">
      <h2 className="w-screen text-2xl font-bold mb-4 bg-gray-300 p-2">
        <FaFlask className="h-6 w-6 mt-2 mr-2 inline-block" />
        PCR Master Mix Theory
      </h2>
      <p><strong>What is PCR?</strong></p>
      <p>
        Polymerase Chain Reaction (PCR) is a powerful and versatile molecular biology technique designed to 
        amplify specific DNA sequences, enabling researchers to generate millions of copies from a minimal 
        amount of DNA. This process is crucial for various applications, including genetic cloning, medical 
        diagnostics, forensic analysis, and research into genetic disorders.
      </p>
      <p>
        A typical PCR reaction consists of several key components, which are combined in a PCR Master Mix. 
        These components work synergistically to ensure the successful amplification of the target DNA. 
        The main components of a PCR Master Mix include:
      </p>
      <ul className="list-disc ml-6">
        <li><strong>Template DNA</strong></li>
        <li><strong>PCR Buffer</strong></li>
        <li><strong>Forward and Reverse Primers</strong></li>
        <li><strong>dNTP Mix</strong></li>
        <li><strong>DNA Polymerase</strong></li>
        <li><strong>PCR Grade Water</strong></li>
      </ul>
      <p>
        This calculator aids in determining the total volume of each component required for a specified number of PCR reactions. 
        By inputting the desired number of reactions and the volumes for each component, researchers can quickly and accurately prepare their PCR Master Mix, optimizing their workflow and ensuring reliable results.
      </p>
    </div>
      <div className="w-full lg:w-1/3 p-1 bg-gray-700 flex flex-col text-xs">
        <h1 className="text-lg font-bold mb-3">PCR Master Mix Calculator</h1>
        <div className="mb-2 text-sm">
          <label className="block mb-1 text-center">Template DNA (µl per reaction):</label>
          <input
            type="number"
            value={templateDNA}
            onChange={(e) => setTemplateDNA(e.target.value)}
            className="w-2/3 p-1 border text-sm bg-gray-600 rounded"
            placeholder="Enter volume"
          />
        </div>

        <div className="mb-1">
          <label className="block mb-1 text-center">PCR Buffer (µl per reaction):</label>
          <input
            type="number"
            value={pcrBuffer}
            onChange={(e) => setPcrBuffer(e.target.value)}
            className="w-2/3 p-1 border text-sm bg-gray-600 rounded"
            placeholder="Enter volume"
          />
        </div>

        <div className="mb-1">
          <label className="block mb-1 text-center">Forward Primer (µl per reaction):</label>
          <input
            type="number"
            value={forwardPrimer}
            onChange={(e) => setForwardPrimer(e.target.value)}
            className="w-2/3 p-1 border text-sm bg-gray-600 rounded"
            placeholder="Enter volume"
          />
        </div>

        <div className="mb-1">
          <label className="block mb-1 text-center">Reverse Primer (µl per reaction):</label>
          <input
            type="number"
            value={reversePrimer}
            onChange={(e) => setReversePrimer(e.target.value)}
            className="w-2/3 p-1 border text-sm bg-gray-600 rounded"
            placeholder="Enter volume"
          />
        </div>

        <div className="mb-1">
          <label className="block mb-1 text-center">dNTP Mix (µl per reaction):</label>
          <input
            type="number"
            value={dNTPmix}
            onChange={(e) => setDNTPmix(e.target.value)}
            className="w-2/3 p-1 border text-sm bg-gray-600 rounded"
            placeholder="Enter volume"
          />
        </div>

        <div className="mb-1">
          <label className="block mb-1 text-center">DNA Polymerase (µl per reaction):</label>
          <input
            type="number"
            value={dnaPolymerase}
            onChange={(e) => setDNApolymerase(e.target.value)}
            className="w-2/3 p-1 border text-sm bg-gray-600 rounded"
            placeholder="Enter volume"
          />
        </div>

        <div className="mb-1">
          <label className="block mb-1 text-center">PCR Grade Water (µl per reaction):</label>
          <input
            type="number"
            value={pcrGradeWater}
            onChange={(e) => setPcrGradeWater(e.target.value)}
            className="w-2/3 p-1 border text-sm bg-gray-600 rounded"
            placeholder="Enter volume"
          />
        </div>

        <div className="mb-1">
          <label className="block mb-1 text-center">Total Number of Reactions:</label>
          <input
            type="number"
            value={totalReactions}
            onChange={(e) => setTotalReactions(e.target.value)}
            className="w-2/3 p-1 border text-sm bg-gray-600 rounded"
            placeholder="Enter number of reactions"
          />
        </div>

        <div className="flex justify-center mt-2 mb-2">
          <button
            type="button"
            onClick={calculateTotalVolume}
            className="w-[100px] px-4 py-2 mb-2 cursor-pointer transition-all duration-200 ease-in-out hover:scale-110 font-semibold bg-green-300 text-black"
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
        <div className="w-full lg:w-1/3 p-2 bg-gray-900 flex flex-col">  
          <h1 className="text-lg font-bold mb-6">PCR MasterMix Formulation for {totalReactions} Reactions:</h1>
          
          <table className="w-full text-white">
            <thead>
              <tr>
                <th className="border-b-2 border-gray-700 py-2">Component</th>
                <th className="border-b-2 border-gray-700 py-2">Volume (µl)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2">Template DNA</td>
                <td className="py-2">{totalVolumes.templateDNA || 0}</td>
              </tr>
              <tr>
                <td className="py-2">PCR Buffer</td>
                <td className="py-2">{totalVolumes.pcrBuffer || 0}</td>
              </tr>
              <tr>
                <td className="py-2">Forward Primer</td>
                <td className="py-2">{totalVolumes.forwardPrimer || 0}</td>
              </tr>
              <tr>
                <td className="py-2">Reverse Primer</td>
                <td className="py-2">{totalVolumes.reversePrimer || 0}</td>
              </tr>
              <tr>
                <td className="py-2">dNTP Mix</td>
                <td className="py-2">{totalVolumes.dNTPmix || 0}</td>
              </tr>
              <tr>
                <td className="py-2">DNA Polymerase</td>
                <td className="py-2">{totalVolumes.dnaPolymerase || 0}</td>
              </tr>
              <tr>
                <td className="py-2">PCR Grade Water</td>
                <td className="py-2">{totalVolumes.pcrGradeWater || 0}</td>
              </tr>
            </tbody>
          </table>
          
          <h3 className="font-bold mt-4 mb-4 bg-slate-950 text-lime-200 p-2">Total Volume: {totalVolumes.total || 0} µl</h3>
        </div>
      </div>
  );
};

export default PCRCalculator;
