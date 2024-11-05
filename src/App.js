import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import MolarityCalculator from './components/MolarityCalculator';
import DilutionCalculator from './components/DilutionCalculator';
import PercentCalculator from './components/PercentCalculator';
import FormulaWCalculator from './components/FormulaWCalculator';
import BeerLambertCalculator from './components/BeerLambertCalculator';
import GForceCalculator from './components/GForceCalculator';
import UnitConverter from './components/UnitConverter';
import PCRCalculator from './components/PCRCalculator';
import Calculator from './components/Calculator';
import AntibodyCalulator from './components/AntibodyDilution';
import ProteinAbs280Calculator from './components/ProteinAbs280Calculator';
import KdCalculator from './components/kdcalculator';

function App() {
  return (
    <div className="app-container font-sans">
      <Router>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} className='max-w-full'/>
            <Route path="/molarity" element={<MolarityCalculator />} />
            <Route path="/dilution" element={<DilutionCalculator />} />
            <Route path="/percent" element={<PercentCalculator />} />
            <Route path="/formula" element={<FormulaWCalculator />} />
            <Route path="/absorbance" element={<BeerLambertCalculator />} />
            <Route path="/rcfrpm" element={<GForceCalculator />} />
            <Route path="/unitConversion" element={<UnitConverter />} />
            <Route path="/pcr" element={<PCRCalculator />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/antibody" element={<AntibodyCalulator />} />
            <Route path="/protein280" element={< ProteinAbs280Calculator />} />
            <Route path="kdcalculator" element={<KdCalculator />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
