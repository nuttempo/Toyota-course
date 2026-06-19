import { MODULES } from '../data/modules';
import { QUIZ } from '../data/quiz';
import './Sidebar.css';

export default function Sidebar({ open, currentId, onSelect, ans }) {
  const lessons = MODULES.filter(m => !m.isIntro && !m.isComplete);

  const isComplete = (modId) => {
    const quiz = QUIZ[modId];
    if (!quiz) return false;
    return quiz.every((_, i) => ans[`${modId}-${i}`] !== undefined);
  };

  return (
    <>
      {open && <div className="sidebar-overlay" onClick={() => onSelect(currentId)} />}
      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-title">📚 คอร์สทั้งหมด</div>
        </div>
        <nav className="sidebar-nav">
          <button
            className={`sidebar-item ${currentId === 0 ? 'sidebar-item-active' : ''}`}
            onClick={() => onSelect(0)}
          >
            <span className="sidebar-item-icon">🏠</span>
            <span className="sidebar-item-label">หน้าแรก</span>
          </button>
          {lessons.map((m, i) => {
            const done = isComplete(m.id);
            return (
              <button
                key={m.id}
                className={`sidebar-item ${currentId === m.id ? 'sidebar-item-active' : ''}`}
                onClick={() => onSelect(m.id)}
              >
                <span className="sidebar-item-num">{i + 1}</span>
                <span className="sidebar-item-label">
                  <span>{m.title}</span>
                  {m.subtitle && <span className="sidebar-item-sub">{m.subtitle}</span>}
                </span>
                {done && <span className="sidebar-item-check">✓</span>}
              </button>
            );
          })}
          <button
            className={`sidebar-item ${currentId === 6 ? 'sidebar-item-active' : ''}`}
            onClick={() => onSelect(6)}
          >
            <span className="sidebar-item-icon">🔧</span>
            <span className="sidebar-item-label">เทคโนโลยี + สรุป</span>
          </button>
        </nav>
      </aside>
    </>
  );
}
