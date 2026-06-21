import { MODULES } from '../data/modules';
import { QUIZ } from '../data/quiz';
import { IconHome, IconBook, IconWrench, IconCheck } from './Icons';
import './Sidebar.css';

function isQuizStep(id) {
  return id > 100 && id < 200;
}

export default function Sidebar({ open, currentId, onSelect, ans }) {
  const lessons = MODULES.filter(m => !m.isIntro && !m.isComplete && !m.isQuiz && !m.isSummary);
  const summaryMod = MODULES.find(m => m.isSummary);

  const isComplete = (modId) => {
    const quiz = QUIZ[modId];
    if (!quiz) return false;
    return quiz.every((_, i) => ans[`${modId}-${i}`] !== undefined);
  };

  const isActive = (m) => currentId === m.id || currentId === m.id + 100;

  return (
    <>
      {open && <div className="sidebar-overlay" onClick={() => onSelect(currentId)} />}
      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`} aria-label="เมนูคอร์ส">
        <div className="sidebar-header">
          <div className="sidebar-title"><IconBook /> คอร์สทั้งหมด</div>
        </div>
        <nav className="sidebar-nav">
          <button
            className={`sidebar-item ${currentId === 0 ? 'sidebar-item-active' : ''}`}
            onClick={() => onSelect(0)}
          >
            <span className="sidebar-item-icon"><IconHome /></span>
            <span className="sidebar-item-label">หน้าแรก</span>
          </button>
          {lessons.map((m, i) => {
            const done = isComplete(m.id);
            return (
              <button
                key={m.id}
                className={`sidebar-item ${isActive(m) ? 'sidebar-item-active' : ''}`}
                onClick={() => onSelect(isQuizStep(currentId) && isActive(m) ? currentId : m.id)}
              >
                <span className="sidebar-item-num">{i + 1}</span>
                <span className="sidebar-item-label">
                  <span>{m.title}</span>
                  {m.subtitle && <span className="sidebar-item-sub">{m.subtitle}</span>}
                </span>
                {done && <span className="sidebar-item-check" aria-label="เรียนเสร็จแล้ว"><IconCheck /></span>}
              </button>
            );
          })}
          {summaryMod && (
            <button
              className={`sidebar-item ${currentId === summaryMod.id ? 'sidebar-item-active' : ''}`}
              onClick={() => onSelect(summaryMod.id)}
            >
              <span className="sidebar-item-icon"><IconWrench /></span>
              <span className="sidebar-item-label">{summaryMod.title}</span>
            </button>
          )}
        </nav>
      </aside>
    </>
  );
}
