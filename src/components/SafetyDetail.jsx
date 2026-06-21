import { IconX } from './Icons';
import YouTubeEmbed from './YouTubeEmbed';
import './Detail.css';

export default function SafetyDetail({ system, onClose }) {
  if (!system) return null;

  return (
    <div className="detail-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={system.name}>
      <div className="detail-popup" onClick={e => e.stopPropagation()}>
        <div className="detail-header">
          <div className="detail-title">
            <span className="detail-icon" aria-hidden="true">{system.icon}</span> {system.name}
            <div className="safety-detail-fullname">{system.fullName}</div>
          </div>
          <button className="detail-close" onClick={onClose} aria-label="ปิด"><IconX /></button>
        </div>
        <div className="detail-body">
          <div className="safety-detail-section">
            <div className="safety-detail-label">🔍 คืออะไร</div>
            <p>{system.whatIs}</p>
          </div>
          <div className="safety-detail-section">
            <div className="safety-detail-label">⚙️ ทำงานอย่างไร</div>
            <p>{system.howItWorks}</p>
          </div>
          <div className="safety-detail-section">
            <div className="safety-detail-label">✅ ประโยชน์ที่ได้รับ</div>
            <p>{system.benefit}</p>
          </div>
          {system.videoId && (
            <YouTubeEmbed videoId={system.videoId} title={`คลิปสาธิต ${system.name}`} lang={system.videoLang} />
          )}
        </div>
      </div>
    </div>
  );
}
