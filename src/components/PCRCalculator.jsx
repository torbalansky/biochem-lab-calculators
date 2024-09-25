import React, { useState } from 'react';
import { FaPrint } from 'react-icons/fa';
import { IoConstructSharp } from "react-icons/io5";

const PCRCalculator = () => {
  const [templateDNA, setTemplateDNA] = useState('');
  const [pcrBuffer, setPcrBuffer] = useState('');
  const [forwardPrimer, setForwardPrimer] = useState('');
  const [reversePrimer, setReversePrimer] = useState('');
  const [dNTPmix, setDNTPmix] = useState('');
  const [dnaPolymerase, setDNApolymerase] = useState('');
  const [pcrGradeWater, setPcrGradeWater] = useState('');
  const [totalReactions, setTotalReactions] = useState(1);
  const [totalVolume, setTotalVolume] = useState('');

  const calculateTotalVolume = () => {
    const total = parseFloat(templateDNA) + parseFloat(pcrBuffer) + parseFloat(forwardPrimer) +
                  parseFloat(reversePrimer) + parseFloat(dNTPmix) + parseFloat(dnaPolymerase) +
                  parseFloat(pcrGradeWater);
    setTotalVolume(total);
  };

  const renderTheory = () => {
    return (
      <div className='font-sans'>
        <h3>Theory Behind PCR Master Mix</h3>
        <p>PCR (Polymerase Chain Reaction) is a technique used to amplify specific DNA sequences.</p>
        <p>Creating a PCR master mix allows for consistent and accurate preparation of reagents across multiple reactions.</p>
        <p>Typical components of a PCR master mix include template DNA, PCR buffer, primers, dNTPs, DNA polymerase, and water.</p>
        <p>By using this calculator, you can quickly determine the amounts of each component needed for your PCR setup.</p>
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row text-center text-white bg-slate-900 app-container content font-sans">

      
      <div className="flex-1 p-4 bg-slate-100 text-gray-800 overflow-y-auto text-left">
        {renderTheory()}
        <div className='flex flex-row justify-center text-center text-4xl font-bold mt-16 bg-red-300 p-4'>
            <IoConstructSharp className='h-20 w-20'/>
        <p className='mt-6 ml-4'>Under construction.</p>
        </div>
      </div>

      <div className="flex-1 p-6 bg-gray-700 flex flex-col">
        <h1 className="text-2xl font-bold mb-6">PCR Master Mix Calculator</h1>

        <div className="mb-4">
          <label className="block mb-1 text-left">Template DNA (µl):</label>
          <input
            type="number"
            value={templateDNA}
            onChange={(e) => setTemplateDNA(e.target.value)}
            className="w-full p-2 border text-sm bg-gray-600 rounded"
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-1 text-left">PCR Buffer (µl):</label>
          <input
            type="number"
            value={pcrBuffer}
            onChange={(e) => setPcrBuffer(e.target.value)}
            className="w-full p-2 border text-sm bg-gray-600 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-left">Forward Primer (µl):</label>
          <input
            type="number"
            value={forwardPrimer}
            onChange={(e) => setForwardPrimer(e.target.value)}
            className="w-full p-2 border text-sm bg-gray-600 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-left">Reverse Primer (µl):</label>
          <input
            type="number"
            value={reversePrimer}
            onChange={(e) => setReversePrimer(e.target.value)}
            className="w-full p-2 border text-sm bg-gray-600 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-left">dNTP Mix (µl):</label>
          <input
            type="number"
            value={dNTPmix}
            onChange={(e) => setDNTPmix(e.target.value)}
            className="w-full p-2 border text-sm bg-gray-600 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-left">DNA Polymerase (µl):</label>
          <input
            type="number"
            value={dnaPolymerase}
            onChange={(e) => setDNApolymerase(e.target.value)}
            className="w-full p-2 border text-sm bg-gray-600 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-left">PCR Grade Water (µl):</label>
          <input
            type="number"
            value={pcrGradeWater}
            onChange={(e) => setPcrGradeWater(e.target.value)}
            className="w-full p-2 border text-sm bg-gray-600 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-left">Total Number of Reactions:</label>
          <input
            type="number"
            value={totalReactions}
            onChange={(e) => setTotalReactions(e.target.value)}
            className="w-full p-2 border text-sm bg-gray-600 rounded"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={calculateTotalVolume}
            className="px-4 py-2 cursor-pointer mb-2 transition-all duration-200 ease-in-out hover:scale-110 font-semibold bg-blue-300 text-black"
          >
            Calculate Total Volume
          </button>
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Total Volume (µl): {totalVolume}</h2>
        </div>
      </div>
    </div>
  );
};

export default PCRCalculator;
