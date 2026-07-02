import { useState, useRef, useEffect } from 'react';
import { useProgress } from './hooks/useProgress';
import { CARS } from './data/cars';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import CarCard from './components/CarCard';
import InterestRatesPage from './components/InterestRatesPage';
import './App.css';

export default function App() {
  const { cur, go } = useProgress();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mainRef = useRef(null);

  const activeCar = CARS[cur] || CARS['yarisativ'] || Object.values(CARS)[0];

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.focus();
    }
  }, [cur]);

  return (
    <div className="app-layout">
      <a className="skip-link" href="#main-content" onClick={e => { e.preventDefault(); mainRef.current?.focus(); }}>
        ข้ามไปยังเนื้อหา
      </a>
      <TopBar
        onToggleSidebar={() => setSidebarOpen(o => !o)}
        sidebarOpen={sidebarOpen}
      />
      <div className="app-body">
        <Sidebar
          open={sidebarOpen}
          currentId={cur}
          onSelect={(code) => { go(code); setSidebarOpen(false); }}
        />
        <main className="app-content" id="main-content" ref={mainRef} tabIndex={-1}>
          <div key={cur} style={{ animation: 'fadeIn 400ms cubic-bezier(0.16, 1, 0.3, 1)' }}>
            {cur === 'interest_rates' ? (
              <InterestRatesPage />
            ) : (
              <CarCard code={cur} car={activeCar} onSelectVariant={go} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
