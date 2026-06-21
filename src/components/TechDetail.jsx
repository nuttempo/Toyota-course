import { IconX } from './Icons';
import { TECH_DESC, TECH_LABELS } from '../data/tech';
import './Detail.css';

export default function TechDetail({ id, onClose }) {
  const d = TECH_DESC[id];
  const t = TECH_LABELS[id];
  if (!d) return null;

  return (
    <div className="detail-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={t?.name}>
      <div className="detail-popup" onClick={e => e.stopPropagation()}>
        <div className="detail-header">
          <div className="detail-title">
            <span className="detail-icon" aria-hidden="true">{t?.icon}</span> {t?.name}
          </div>
          <button className="detail-close" onClick={onClose} aria-label="ปิด"><IconX /></button>
        </div>
        <div className="detail-body" dangerouslySetInnerHTML={{ __html: d }} />
      </div>
    </div>
  );
}
