import { TECH_DESC } from '../data/tech';
import { TECH_LABELS } from '../data/tech';
import './Detail.css';

export default function TechDetail({ id, onClose }) {
  const d = TECH_DESC[id];
  const t = TECH_LABELS[id];
  if (!d) return null;

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-popup" onClick={e => e.stopPropagation()} style={{ animation: 'fadeIn 0.3s ease' }}>
        <div className="detail-header">
          <div className="detail-title">
            <span className="detail-icon">{t?.icon}</span> {t?.name}
          </div>
          <button className="detail-close" onClick={onClose}>✕</button>
        </div>
        <div className="detail-body" dangerouslySetInnerHTML={{ __html: d }} />
      </div>
    </div>
  );
}
