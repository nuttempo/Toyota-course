import { useState } from 'react';
import { pdfUrls } from '../data/pdfMap';
import { TECH_LABELS } from '../data/tech';
import { GRADE_DESC } from '../data/gradeDesc';
import { DESC } from '../data/desc';
import { IconFile, IconChevronDown, IconChevronUp, IconDollar } from './Icons';
import TechDetail from './TechDetail';
import GradeDetail from './GradeDetail';
import './CarCard.css';

const FUEL_CLASS = {
  Gasoline: 'fuel-gas',
  Hybrid: 'fuel-hev',
  EV: 'fuel-ev',
  Diesel: 'fuel-diesel',
};

function fmtPrice(n) {
  return (n / 1000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'K';
}

export default function CarCard({ code, car }) {
  const [gradesOpen, setGradesOpen] = useState(false);
  const [techPopup, setTechPopup] = useState(null);
  const [gradePopup, setGradePopup] = useState(null);

  const maxP = Math.max(...car.grades.map(g => g.price));
  const pdfs = pdfUrls(code);
  const desc = DESC[code] || '';

  return (
    <article className="car-card">
      <div className="car-card-header">
        <div>
          <div className="car-card-name">{car.title}</div>
          {car.slogan && <div className="car-card-slogan">"{car.slogan}"</div>}
        </div>
        <div className="car-card-price">
          <IconDollar /> {fmtPrice(car.start_price)} – {fmtPrice(maxP)}
        </div>
      </div>

      {desc && <div className="car-card-desc" dangerouslySetInnerHTML={{ __html: desc }} />}

      <div className="car-card-meta">
        <span className="car-card-tag">{car.seats.join('-')} ที่นั่ง</span>
        <span className="car-card-tag">{car.type}</span>
        {car.fuel.map(f => (
          <span key={f} className={`fuel-tag ${FUEL_CLASS[f] || ''}`}>{f}</span>
        ))}
      </div>

      {car.techs.length > 0 && (
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
      )}

      <button
        className="car-card-toggle"
        onClick={() => setGradesOpen(o => !o)}
        aria-expanded={gradesOpen}
        aria-label={gradesOpen ? 'ซ่อนรุ่นย่อย' : 'ดูทุกรุ่นย่อย'}
      >
        {gradesOpen ? <><IconChevronUp /> ซ่อนรุ่นย่อย</> : <><IconChevronDown /> ดูทุกรุ่นย่อย + เปรียบเทียบ</>}
      </button>

      {gradesOpen && (
        <div className="car-card-grades" style={{ animation: 'fadeIn 250ms cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <div className="car-card-grades-hint">คลิกแถวเพื่อดูว่ารุ่นย่อยนี้เพิ่มอะไรจากรุ่นล่าง</div>
          <table className="car-card-grades-table">
            <tbody>
              {car.grades.map((g, i) => (
                <tr
                  key={i}
                  className="car-card-grade-row"
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
                  <td className="car-card-grade-name">{g.title}</td>
                  <td className="car-card-grade-trans">{g.trans}</td>
                  <td className="car-card-grade-price">
                    {(g.price / 1000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}K
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {pdfs.length > 0 && (
        <div className="car-card-pdfs">
          {pdfs.map(p => (
            <a key={p} className="car-card-pdf-link" href={p} target="_blank" rel="noopener noreferrer">
              <IconFile /> {p.split('/').pop()}
            </a>
          ))}
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
