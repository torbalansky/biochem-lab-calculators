import React, { useState, useEffect } from 'react';
import { FaBookOpen } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';

const ATOMIC_MASSES = {
    H: 1.008, He: 4.0026, Li: 6.94, Be: 9.0122, B: 10.81, C: 12.011, N: 14.007, O: 15.999, F: 18.998, Ne: 20.180,
    Na: 22.990, Mg: 24.305, Al: 26.982, Si: 28.085, P: 30.974, S: 32.06, Cl: 35.45, Ar: 39.948, K: 39.098, Ca: 40.078,
    Sc: 44.956, Ti: 47.867, V: 50.942, Cr: 51.996, Mn: 54.938, Fe: 55.845, Co: 58.933, Ni: 58.693, Cu: 63.546, Zn: 65.38,
    Ga: 69.723, Ge: 72.63, As: 74.922, Se: 78.971, Br: 79.904, Kr: 83.798, Rb: 85.468, Sr: 87.62, Y: 88.906, Zr: 91.224,
    Nb: 92.906, Mo: 95.95, Tc: 98.0, Ru: 101.07, Rh: 102.91, Pd: 106.42, Ag: 107.87, Cd: 112.41, In: 114.82, Sn: 118.71,
    Sb: 121.76, Te: 127.60, I: 126.90, Xe: 131.29, Cs: 132.91, Ba: 137.33, La: 138.91, Ce: 140.12, Pr: 140.91, Nd: 144.24,
    Pm: 145.0, Sm: 150.36, Eu: 151.96, Gd: 157.25, Tb: 158.93, Dy: 162.50, Ho: 164.93, Er: 167.26, Tm: 168.93, Yb: 173.04,
    Lu: 174.97, Hf: 178.49, Ta: 180.95, W: 183.84, Re: 186.21, Os: 190.23, Ir: 192.22, Pt: 195.08, Au: 196.97, Hg: 200.59,
    Tl: 204.38, Pb: 207.2, Bi: 208.98, Po: 209.0, At: 210.0, Rn: 222.0, Fr: 223.0, Ra: 226.0, Ac: 227.0, Th: 232.04,
    Pa: 231.04, U: 238.03, Np: 237.0, Pu: 244.0, Am: 243.0, Cm: 247.0, Bk: 247.0, Cf: 251.0, Es: 252.0, Fm: 257.0,
    Md: 258.0, No: 259.0, Lr: 262.0, Rf: 267.0, Db: 270.0, Sg: 271.0, Bh: 270.0, Hs: 277.0, Mt: 278.0, Ds: 281.0, Rg: 282.0,
    Cn: 285.0, Nh: 286.0, Fl: 289.0, Mc: 290.0, Lv: 293.0, Ts: 294.0, Og: 294.0
  };
 

const parseFormula = (formula) => {
  const elementRegex = /([A-Z][a-z]*)(\d*)/g;
  const elements = [];
  let match;
  while ((match = elementRegex.exec(formula)) !== null) {
    const element = match[1];
    const quantity = match[2] ? parseInt(match[2], 10) : 1;
    elements.push({ symbol: element, quantity });
  }
  return elements;
};

const FormulaWCalculator = () => {
  const [formula, setFormula] = useState('');
  const [atoms, setAtoms] = useState([]);
  const [totalMolecularWeight, setTotalMolecularWeight] = useState(0);
  const [error, setError] = useState('');

  const calculateMolecularWeight = () => {
    setError('');
        if (/[a-z]/.test(formula)) {
            setError('Please use capital letters for element symbols (e.g., H2O instead of h2o).');
            return;
    }

    const parsedAtoms = parseFormula(formula);
    let totalWeight = 0;
    let validFormula = true;

    const calculatedAtoms = parsedAtoms.map((atom) => {
      const molarMass = ATOMIC_MASSES[atom.symbol];
      if (!molarMass) {
        setError(`Unknown element: ${atom.symbol}`);
        validFormula = false;
        return null;
      }
      const subtotal = molarMass * atom.quantity;
      totalWeight += subtotal;
      return { ...atom, molarMass, subtotalMass: subtotal };
    });

    if (validFormula) {
      const atomsWithPercentages = calculatedAtoms.map((atom) => ({
        ...atom,
        percentage: ((atom.subtotalMass / totalWeight) * 100).toFixed(2),
      }));

      setAtoms(atomsWithPercentages);
      setTotalMolecularWeight(totalWeight.toFixed(2));
      setError('');
    }
  };

  const handleClearFields = () => {
    setFormula('');
    setAtoms([]);
    setTotalMolecularWeight(0);
    setError('');
  }
  
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="flex flex-col lg:flex-row text-center text-white bg-slate-900 app-container font-sans" data-aos="fade-right">
      <div className="flex-1 p-4 bg-slate-100 text-gray-800 overflow-y-auto overflow-x-hidden text-left">
        <h2 className="w-screen flex text-2xl font-bold mb-4 bg-gray-300 text-left p-2">
          <FaBookOpen className="h-6 w-6 mt-2 mr-2" />
          Theory
        </h2>
        <div>
          <p className="mb-4">
            <strong>What is Molecular Weight?</strong>
            <br /><br />
            Molecular weight (or molar mass) is the mass of a molecule of a substance. It's calculated as the sum of the atomic weights of the atoms in the molecular formula.
          </p>
          <p className="mb-4">
            The molecular weight of a chemical compound is typically expressed in units of grams per mole (g/mol), and is used to convert between moles of a compound and grams.
          </p>
          <p className="mb-4">
            The formula weight can be calculated by multiplying the number of atoms of each element by the molar mass of that element and summing the results for all the elements in the compound.
          </p>
          <p className="mb-4">
          Another commonly used unit of mass is the Dalton (Da), also known as the unified atomic mass unit (u),
           particularly when discussing atomic and molecular masses. This unit is defined as one-twelfth of the 
           mass of a carbon-12 atom and is sometimes referred to as "amu" in older literature. <br /><br />
          A significant concept in this area is Avogadro's number (NA), which is approximately 6.0221 x 10²³. 
          The term "mole" refers to the quantity of substance that has a mass equivalent to its molecular 
          (or atomic) weight in grams. For instance, one mole of a substance with a molecular mass of one (1)
          gram will contain Avogadro's number of molecules. Using this calculator, you can determine that, 
          for example, a pollution concentration of 1 gram of benzene in a specific volume of water equates to 
          approximately 7.7098 × 10²¹ molecules of benzene affecting that water!`
          </p>
        </div>
      </div>

      <div className="flex-1 p-6 bg-gray-700 flex flex-col">
        <h1 className="text-2xl font-bold mb-6">Formula Weight Calculator</h1>
        <div className="mb-4">
          <label className="block mb-1 text-left">Enter Chemical Formula:</label>
          <input
            type="text"
            value={formula}
            onChange={(e) => setFormula(e.target.value)}
            className="w-full p-2 border text-sm bg-gray-600 rounded"
            placeholder="E.g., C6H12O6 (Capital Letters)"
          />
        </div>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        <table className="w-full table-auto bg-gray-700 text-white mb-4">
        <thead>
            <tr className="bg-gray-600">
            <th className="p-2">#</th>
            <th className="p-2">Atom</th>
            <th className="p-2">Molar Mass (g/mol)</th>
            <th className="p-2">Quantity</th>
            <th className="p-2">Subtotal Mass (g/mol)</th>
            </tr>
        </thead>
        <tbody>
            {Array.isArray(atoms) && atoms.length > 0 ? (
            atoms.map((atom, index) => (
                <tr key={index}>
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{atom.symbol}</td>
                <td className="p-2 border">{atom.molarMass}</td>
                <td className="p-2 border">{atom.quantity}</td>
                <td className="p-2 border">{atom.subtotalMass.toFixed(2)}</td>
                </tr>
            ))
            ) : (
            <tr>
                <td colSpan="5" className="text-center p-2">No atoms to display</td>
            </tr>
            )}
        </tbody>
        </table>

        {totalMolecularWeight > 0 && (
          <div className="text-center text-lg text-green-400 mb-4">
            <strong>Total Molecular Weight: </strong>
            {totalMolecularWeight} g/mol
          </div>
        )}

        <div className="flex justify-center">
          <button
            type="button"
            onClick={calculateMolecularWeight}
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

export default FormulaWCalculator;
