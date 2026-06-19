import { useState } from 'react';
import { pdfUrls } from '../data/pdfMap';
import { TECH_LABELS } from '../data/tech';
import { GRADE_DESC } from '../data/gradeDesc';
import { DESC } from '../data/desc';
import { carImage } from '../data/carImages';
import { IconFile, IconChevronDown, IconChevronUp } from './Icons';
import TechDetail from './TechDetail';
import GradeDetail from './GradeDetail';
import './CarCard.css';

const FUEL_CLASS = {
  Gasoline: 'fuel-gas',
  Hybrid: 'fuel-hev',
  EV: 'fuel-ev',
  Diesel: 'fuel-diesel',
};

const TYPE_ICON = {
  'Personal Cars': '🚗',
  'SUV & PPV': '🚙',
  'Commercial': '🛻',
  'MPV': '🚐',
  'Van': '🚐',
  'GR Performance': '🏎️',
};

function fmtPriceFull(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function fmtPriceShort(n) {
  return (n / 1000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'K';
}

export default function CarCard({ code, car }) {
  const [gradesOpen, setGradesOpen] = useState(false);
  const [techPopup, setTechPopup] = useState(null);
  const [gradePopup, setGradePopup] = useState(null);

  const maxP = Math.max(...car.grades.map(g => g.price));
  const pdfs = pdfUrls(code);
  const desc = DESC[code] || '';
  const typeIcon = TYPE_ICON[car.type] || '🚗';
  const img = carImage(code);

  return (
    <article className="car-card">
      <div className="car-card-top">
        <span className="car-card-type-badge">{typeIcon} {car.type}</span>
      </div>

      {img ? (
        <div className="car-card-img-wrap">
          <img className="car-card-img" src={img.src} srcSet={img.srcSet} sizes={img.sizes} alt={car.title} loading="lazy" />
        </div>
      ) : (
        <div className="car-card-img-placeholder">
          <span className="car-card-placeholder-icon">{typeIcon}</span>
          <span className="car-card-placeholder-name">{car.title}</span>
        </div>
      )}

      <div className="car-card-header">
        <div className="car-card-name">{car.title}</div>
        {car.slogan && <div className="car-card-slogan">{car.slogan}</div>}
      </div>

      <div className="car-card-price-row">
        <div className="car-card-price-label">💰 ราคา</div>
        <div className="car-card-price-value">
          {fmtPriceFull(car.start_price)} – {fmtPriceFull(maxP)} บาท
        </div>
      </div>

      {desc && <div className="car-card-desc" dangerouslySetInnerHTML={{ __html: desc }} />}

      <div className="car-card-section">
        <div className="car-card-section-title">📋 ข้อมูลพื้นฐาน</div>
        <div className="car-card-meta">
          <span className="car-card-tag">👥 {car.seats.join('-')} ที่นั่ง</span>
          {car.fuel.map(f => (
            <span key={f} className={`fuel-tag ${FUEL_CLASS[f] || ''}`}>{f}</span>
          ))}
        </div>
      </div>

      {car.techs.length > 0 && (
        <div className="car-card-section">
          <div className="car-card-section-title">🔧 เทคโนโลยี</div>
          <div className="car-card-techs">
            {car.techs.map(id => {
              const t = TECH_LABELS[id];
              if (!t) return null;
              return (
                <button
                  key={id}
                  className="car-card-tech-btn"
                  style={{ background: t.color }}
                  onClick={() => setTechPopup(id)}
                  title="กดดูรายละเอียด"
                  aria-label={`ดูรายละเอียด ${t.name}`}
                >
                  {t.icon} {t.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="car-card-section">
        <button
          className="car-card-toggle"
          onClick={() => setGradesOpen(o => !o)}
          aria-expanded={gradesOpen}
          aria-label={gradesOpen ? 'ซ่อนรุ่นย่อย' : 'ดูทุกรุ่นย่อย'}
        >
          {gradesOpen ? <><IconChevronUp /> ซ่อนรุ่นย่อย</> : <><IconChevronDown /> ดูทุกรุ่นย่อย + เปรียบเทียบราคา</>}
        </button>

        {gradesOpen && (
          <div className="car-card-grades" style={{ animation: 'fadeIn 250ms cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <div className="car-card-grades-hint">👆 คลิกแถวเพื่อดูว่ารุ่นย่อยนี้เพิ่มอะไรจากรุ่นล่าง</div>
            <table className="car-card-grades-table">
              <thead>
                <tr>
                  <th>รุ่นย่อย</th>
                  <th>เกียร์</th>
                  <th className="car-card-grade-price">ราคา</th>
                </tr>
              </thead>
              <tbody>
                {car.grades.map((g, i) => {
                  const isTopTier = g.price === maxP;
                  return (
                    <tr
                      key={i}
                      className={`car-card-grade-row${isTopTier ? ' top-tier' : ''}`}
                      tabIndex={0}
                      role="button"
                      onClick={() => {
                        const gd = (GRADE_DESC[code] || []).find(
                          d => g.title.includes(d.grade) || d.grade.includes(g.title)
                        );
                        if (gd) setGradePopup({ code, grade: gd });
                      }}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          const gd = (GRADE_DESC[code] || []).find(
                            d => g.title.includes(d.grade) || d.grade.includes(g.title)
                          );
                          if (gd) setGradePopup({ code, grade: gd });
                        }
                      }}
                      aria-label={`ดูรายละเอียดรุ่น ${g.title}`}
                    >
                      <td className="car-card-grade-name">
                        {g.title}
                        {isTopTier && <span className="top-tier-badge">TOP</span>}
                      </td>
                      <td className="car-card-grade-trans">{g.trans || '-'}</td>
                      <td className="car-card-grade-price">{fmtPriceShort(g.price)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {pdfs.length > 0 && (
        <div className="car-card-section">
          <div className="car-card-section-title">📄 เอกสาร PDF</div>
          <div className="car-card-pdfs">
            {pdfs.map(p => (
              <a key={p} className="car-card-pdf-link" href={p} target="_blank" rel="noopener noreferrer">
                <IconFile /> {p.split('/').pop()}
              </a>
            ))}
          </div>
        </div>
      )}

      {techPopup && <TechDetail id={techPopup} onClose={() => setTechPopup(null)} />}
      {gradePopup && (
        <GradeDetail
          grade={gradePopup.grade}
          carTitle={car.title}
          onClose={() => setGradePopup(null)}
        />
      )}
    </article>
  );
}
