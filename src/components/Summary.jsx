import { useState } from 'react';
import { TECH_LABELS, TECH_ORDER, TECH_DESC } from '../data/tech';
import { CARS } from '../data/cars';
import { QUIZ } from '../data/quiz';
import Quiz from './Quiz';
import TechDetail from './TechDetail';
import './Summary.css';

function fmtPrice(n) {
  return (n / 1000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'K';
}

function fuelTag(f) {
  const cls = { Gasoline: 'fuel-gas', Hybrid: 'fuel-hev', EV: 'fuel-ev', Diesel: 'fuel-diesel' };
  return `<span class="fuel-tag ${cls[f] || ''}">${f}</span>`;
}

export default function Summary({ mod, cur, ans, res, onPick, onGo, onReset, totalQuestions, correctQuestions }) {
  const [techPopup, setTechPopup] = useState(null);

  const quiz = QUIZ[6] || [];
  const allAnswered = quiz.every((_, i) => ans['6-' + i] !== undefined);

  return (
    <div className="summary" style={{ animation: 'fadeIn 0.4s ease' }}>
      {/* Tech Overview */}
      <div className="summary-card">
        <h2 className="summary-title">🔧 เทคโนโลยีหลักของ Toyota</h2>
        <div className="summary-tech-grid">
          {TECH_ORDER.map(id => {
            const t = TECH_LABELS[id];
            if (!t) return null;
            return (
              <button
                key={id}
                className="summary-tech-item"
                style={{ background: t.color }}
                onClick={() => setTechPopup(id)}
              >
                <div className="summary-tech-icon">{t.icon}</div>
                <div className="summary-tech-name">{t.name}</div>
                <div className="summary-tech-desc">กดเพื่อดูรายละเอียด</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Budget */}
      <div className="summary-card">
        <h2 className="summary-title">🎯 แนะนำตามงบ</h2>
        <div className="summary-budget-grid">
          <div className="summary-budget-item"><div className="summary-budget-amt">&lt; 600K</div><div className="summary-budget-list"><span>Hilux Champ</span><span>Yaris ATIV</span><span>Yaris</span></div></div>
          <div className="summary-budget-item"><div className="summary-budget-amt">600K–900K</div><div className="summary-budget-list"><span>Yaris Cross</span><span>Veloz</span><span>Hilux Revo</span></div></div>
          <div className="summary-budget-item"><div className="summary-budget-amt">900K–1.2M</div><div className="summary-budget-list"><span>Altis</span><span>Corolla Cross</span><span>Fortuner</span></div></div>
          <div className="summary-budget-item"><div className="summary-budget-amt">1.2M–1.5M</div><div className="summary-budget-list"><span>Camry HEV</span><span>Innova Zenix</span><span>bZ4X</span></div></div>
          <div className="summary-budget-item"><div className="summary-budget-amt">1.5M–2M</div><div className="summary-budget-list"><span>Fortuner Legender</span><span>Majesty</span><span>Fortuner GR</span></div></div>
          <div className="summary-budget-item"><div className="summary-budget-amt">&gt; 2M</div><div className="summary-budget-list"><span>Alphard</span><span>GR 86</span><span>GR Supra</span></div></div>
        </div>
      </div>

      {/* Summary Table */}
      <div className="summary-card">
        <h2 className="summary-title">📊 สรุปทุกรุ่น</h2>
        <div className="summary-table-wrap">
          <table className="summary-table">
            <thead><tr><th>Segment</th><th>รุ่น</th><th>ราคาเริ่ม</th><th>เชื้อเพลิง</th></tr></thead>
            <tbody>
              {['yarisativ','yaris','yariscross','altis','corollacross','camry',
                'hiace','fortuner_leader','landcruiser_fj','commuter','innovazenix','bz4x',
                'hilux_travo_e','majesty','alphard','gr86','gryaris','grcorolla','grsupra'].map(code => {
                const c = CARS[code];
                if (!c) return null;
                return (
                  <tr key={code}>
                    <td>{c.type}</td>
                    <td className="summary-table-bold">{c.title}</td>
                    <td>{fmtPrice(c.start_price)}</td>
                    <td>{c.fuel.map(f => fuelTag(f)).join(' ')}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Final Quiz */}
      <div className="summary-card">
        <Quiz modId={6} quiz={quiz} ans={ans} res={res} onPick={onPick} />
      </div>

      {/* Navigation */}
      <div className="summary-nav">
        <button className="btn btn-outline" onClick={() => onGo(5)}>← ก่อนหน้า</button>
        <button
          className={`btn ${allAnswered ? 'btn-success' : 'btn-primary'}`}
          onClick={() => {
            if (!allAnswered) { alert('กรุณาตอบ Quiz ให้ครบก่อนครับ'); return; }
            onGo(99);
          }}
        >
          {allAnswered ? '🎉 ดูผลลัพธ์' : 'ตอบ Quiz ก่อน'}
        </button>
      </div>

      {techPopup && <TechDetail id={techPopup} onClose={() => setTechPopup(null)} />}
    </div>
  );
}
