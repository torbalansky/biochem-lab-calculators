import React, { useState, useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { create, all } from 'mathjs';

const LabBook = () => {
    const [protocolName, setProtocolName] = useState('');
    const [analysis, setAnalysis] = useState('');
    const [notes, setNotes] = useState('');
    const [dateTime, setDateTime] = useState(new Date());
    const analysisRef = useRef(null);
    const notesRef = useRef(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setDateTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (analysisRef.current) {
            analysisRef.current.style.height = 'auto';
            analysisRef.current.style.height = `${analysisRef.current.scrollHeight}px`;
        }
        if (notesRef.current) {
            notesRef.current.style.height = 'auto';
            notesRef.current.style.height = `${notesRef.current.scrollHeight}px`;
        }
    }, [analysis, notes]);

    const handlePrint = () => {
        window.print();
    };

    const clearNotes = () => {
        setProtocolName('');
        setAnalysis('');
        setNotes('');
    };

    useEffect(() => {
        AOS.init({ duration: 1000 });
      }, []);    

    return (
        <div className="labbook p-4 text-gray-800 bg-slate-100 overflow-y-auto overflow-x-hidden text-left mb-4 h-full max-h-[calc(100vh-100px)]" data-aos="fade-right">
            <h2 className="text-2xl font-bold mb-2">Lab Book</h2>
            <div className="text-gray-700 mb-4">
                <strong>Date:</strong> {dateTime.toLocaleDateString()} <br />
                <strong>Time:</strong> {dateTime.toLocaleTimeString()}
            </div>
            <div className="mb-4">
                <label className="block font-semibold mb-2">Protocol Name:</label>
                <input
                    type="text"
                    value={protocolName}
                    onChange={(e) => setProtocolName(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
            </div>
            <div className="mb-4">
                <label className="block font-semibold mb-2">Analysis:</label>
                <textarea
                    ref={analysisRef}
                    value={analysis}
                    onChange={(e) => setAnalysis(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    rows="6"
                ></textarea>
            </div>
            <div className="mb-4">
                <label className="block font-semibold mb-2">Notes:</label>
                <textarea
                    ref={notesRef}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    rows="12"
                ></textarea>
            </div>
            <button
                onClick={handlePrint}
                className="bg-lime-300 text-black px-4 py-2 rounded shadow hover:bg-lime-500 no-print"
            >
                Print
            </button>
            <button 
                className="bg-pink-300 text-black px-4 py-2 rounded ml-2 hover:bg-red-500 no-print shadow-md hover:text-white" 
                onClick={clearNotes}>
                Clear
            </button>
        </div>
    );
};

const math = create(all);

const Calculator = () => {
    const [cal, setCal] = useState('');
    const [result, setResult] = useState('');

    const updateCal = (e) => {
        setCal(cal.concat(e.target.name));
    };

    const clear = () => {
        setCal('');
        setResult('');
    };

    const results = () => {
        try {
            setResult(math.evaluate(cal).toString());
        } catch (error) {
            setResult('Error');
        }
    };

    return (
        <div className="calculator mx-auto shadow-xl h-full no-print mt-4" data-aos="fade-right">
            <div>
                <div className="p-4 text-white text-right border border-gray-50 text-3xl bg-gray-900">
                    {cal || 0}
                </div>
                <div className="px-4 text-white text-right text-3xl bg-gray-700 border-x-2 border-b-2">
                    <span className="text-lime-300">{result || ''}</span>
                </div>
                <div className="grid grid-cols-4 p-2 gap-2 bg-gray-600 mt-2">
                    <button className="rounded h-14 flex items-center justify-center bg-neonOrange text-black text-xl shadow-md hover:bg-blue-100" name="%" onClick={updateCal}>%</button>
                    <button className="rounded h-14 flex items-center justify-center bg-neonOrange text-black text-xl shadow-md hover:bg-blue-100" name="(" onClick={updateCal}>(</button>
                    <button className="rounded h-14 flex items-center justify-center bg-neonOrange text-black text-xl shadow-md hover:bg-blue-100" name=")" onClick={updateCal}>)</button>
                    <button className="rounded h-14 flex items-center justify-center bg-neonOrange text-black text-xl shadow-md hover:bg-blue-100" name="/" onClick={updateCal}>÷</button>

                    <button className="rounded-full h-16 flex items-center justify-center bg-slate-200 text-black text-lg shadow-md hover:bg-pink-100" name="7" onClick={updateCal}>7</button>
                    <button className="rounded-full h-16 flex items-center justify-center bg-slate-200 text-black text-lg shadow-md hover:bg-pink-100" name="8" onClick={updateCal}>8</button>
                    <button className="rounded-full h-16 flex items-center justify-center bg-slate-200 text-black text-lg shadow-md hover:bg-pink-100" name="9" onClick={updateCal}>9</button>
                    <button className="rounded h-16 flex items-center justify-center bg-neonOrange text-black text-lg shadow-md hover:bg-blue-100" name="*" onClick={updateCal}>×</button>

                    <button className="rounded-full h-16 flex items-center justify-center bg-slate-200 text-black text-lg shadow-md hover:bg-pink-100" name="4" onClick={updateCal}>4</button>
                    <button className="rounded-full h-16 flex items-center justify-center bg-slate-200 text-black text-lg shadow-md hover:bg-pink-100" name="5" onClick={updateCal}>5</button>
                    <button className="rounded-full h-16 flex items-center justify-center bg-slate-200 text-black text-lg shadow-md hover:bg-pink-100" name="6" onClick={updateCal}>6</button>
                    <button className="rounded h-16 flex items-center justify-center bg-neonOrange text-black text-lg shadow-md hover:bg-blue-100" name="-" onClick={updateCal}>-</button>

                    <button className="rounded-full h-16 flex items-center justify-center bg-slate-200 text-black text-lg shadow-md hover:bg-pink-100" name="1" onClick={updateCal}>1</button>
                    <button className="rounded-full h-16 flex items-center justify-center bg-slate-200 text-black text-lg shadow-md hover:bg-pink-100" name="2" onClick={updateCal}>2</button>
                    <button className="rounded-full h-16 flex items-center justify-center bg-slate-200 text-black text-lg shadow-md hover:bg-pink-100" name="3" onClick={updateCal}>3</button>
                    <button className="rounded h-16 flex items-center justify-center bg-neonOrange text-black text-lg shadow-md hover:bg-blue-100" name="+" onClick={updateCal}>+</button>

                    <button className="rounded-full h-16 flex items-center justify-center bg-white text-neonOrange text-lg shadow-md hover:bg-red-800 hover:text-white" onClick={clear}>AC</button>
                    <button className="rounded-full h-16 flex items-center justify-center bg-slate-200 text-black text-lg shadow-md hover:bg-pink-100" name="0" onClick={updateCal}>0</button>
                    <button className="rounded-full h-16 flex items-center justify-center bg-slate-200 text-black text-lg shadow-md hover:bg-pink-100" name="." onClick={updateCal}>.</button>
                    <button className="rounded h-16 flex items-center justify-center bg-green-300 text-black text-lg shadow-md hover:bg-green-400" onClick={results}>=</button>
                </div>
            </div>
        </div>
    );
};

const LabBookCalculator = () => {
    return (
        <div className="flex flex-col sm:flex-row h-screen app-container content">
            <div className="w-full sm:w-[70%] p-2">
                <LabBook />
            </div>
            <div className="w-full sm:w-[30%] h-full p-2">
                <Calculator />
            </div>
        </div>
    );
};

export default LabBookCalculator;
