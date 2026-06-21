import { useState } from 'react';
import { SAFETY_CATEGORIES, SAFETY_SYSTEMS } from '../data/safety';
import { IconArrowLeft, IconBook } from './Icons';
import SafetyDetail from './SafetyDetail';
import './Lesson.css';
import './Safety.css';

export default function Safety({ mod, onGo }) {
  const [popup, setPopup] = useState(null);

  return (
    <div className="safety" style={{ animation: 'fadeIn 400ms cubic-bezier(0.16, 1, 0.3, 1)' }}>
      <div className="lesson-header">
        <span className="lesson-badge">MODULE {mod.id}</span>
        <h1 className="lesson-title">{mod.title}</h1>
        <p className="lesson-count">{SAFETY_SYSTEMS.length} ระบบ ครอบคลุมทุกรุ่นในคอร์สนี้</p>
      </div>

      {SAFETY_CATEGORIES.map(cat => {
        const systems = SAFETY_SYSTEMS.filter(s => s.category === cat.id);
        if (!systems.length) return null;
        return (
          <div key={cat.id} className="safety-section">
            <h2 className="safety-section-title">{cat.title}</h2>
            <div className="safety-grid">
              {systems.map(s => (
                <button
                  key={s.id}
                  className="safety-card"
                  onClick={() => setPopup(s)}
                  aria-label={`ดูรายละเอียด ${s.name}`}
                >
                  <span className="safety-card-icon" aria-hidden="true">{s.icon}</span>
                  <span className="safety-card-name">{s.name}</span>
                  <span className="safety-card-short">{s.short}</span>
                </button>
              ))}
            </div>
          </div>
        );
      })}

      <div className="lesson-nav">
        <button className="btn btn-outline" onClick={() => onGo(mod.id - 1)}>
          <IconArrowLeft /> ก่อนหน้า
        </button>
        <button className="btn btn-primary" onClick={() => onGo(mod.id + 100)}>
          <IconBook /> ไปทำแบบทดสอบ
        </button>
      </div>

      {popup && <SafetyDetail system={popup} onClose={() => setPopup(null)} />}
    </div>
  );
}
