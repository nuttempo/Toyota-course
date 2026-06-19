import './Detail.css';

export default function GradeDetail({ grade, carTitle, onClose }) {
  if (!grade) return null;

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-popup" onClick={e => e.stopPropagation()} style={{ animation: 'fadeIn 0.3s ease' }}>
        <div className="detail-header">
          <div className="detail-title">
            <span style={{ color: 'var(--red)' }}>{carTitle}</span> — {grade.grade}
          </div>
          <button className="detail-close" onClick={onClose}>✕</button>
        </div>
        <div className="detail-body" style={{ lineHeight: 1.7, fontSize: '0.88rem', color: '#444' }}>
          {grade.diff}
        </div>
      </div>
    </div>
  );
}
