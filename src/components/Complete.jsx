import { IconCheck, IconRefresh, IconBook } from './Icons';
import './Complete.css';

export default function Complete({ onGo, onReset, totalQuestions, correctQuestions }) {
  const pct = Math.round((correctQuestions / totalQuestions) * 100);
  let msg = 'ลองทบทวนอีกนิด';
  if (pct >= 80) msg = 'เยี่ยม! พร้อมแนะนำลูกค้า';
  else if (pct >= 60) msg = 'เก่งมาก! ลองทบทวนอีกนิด';

  return (
    <div className="complete" style={{ animation: 'scaleIn 500ms cubic-bezier(0.16, 1, 0.3, 1)' }}>
      <div className="complete-card">
        <div className="complete-icon"><IconCheck /></div>
        <h2 className="complete-title">เรียนครบทุก Module แล้ว!</h2>

        <div className="complete-circle-wrap">
          <div
            className="complete-circle"
            style={{ background: `conic-gradient(var(--red) ${pct}%, var(--grey-border) ${pct}%)` }}
          >
            <div className="complete-circle-inner">
              <div className="complete-score">{correctQuestions}/{totalQuestions}</div>
            </div>
          </div>
        </div>

        <p className="complete-msg">{msg}</p>

        <div className="complete-actions">
          <button className="btn btn-outline" onClick={onReset}>
            <IconRefresh /> เริ่มใหม่
          </button>
          <button className="btn btn-primary" onClick={() => onGo(1)}>
            <IconBook /> ทบทวน
          </button>
        </div>
      </div>
    </div>
  );
}
