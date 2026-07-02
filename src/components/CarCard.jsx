import { useState } from 'react';
import { pdfUrls } from '../data/pdfMap';
import { TECH_LABELS } from '../data/tech';
import { GRADE_DESC } from '../data/gradeDesc';
import { DESC } from '../data/desc';
import { carImage } from '../data/carImages';
import { VIDEO_MAP } from '../data/videos';
import { getGroupOfVariant } from '../data/groups';
import { getInterestRateForCode, getInsuranceMarkupForCode, getAdSpecialRateForCode, get96MonthRate } from '../data/interestRates';
import { IconFile } from './Icons';
import TechDetail from './TechDetail';
import YouTubeEmbed from './YouTubeEmbed';
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

function findGradeDesc(code, title) {
  const list = GRADE_DESC[code] || [];
  return list.find(d => d.grade === title) ||
    list.find(d => title.includes(d.grade) || d.grade.includes(title));
}

export default function CarCard({ code, car, onSelectVariant }) {
  const [techPopup, setTechPopup] = useState(null);

  const maxP = Math.max(...car.grades.map(g => g.price));
  const pdfs = pdfUrls(code);
  const desc = DESC[code] || '';
  const typeIcon = TYPE_ICON[car.type] || '🚗';
  const img = carImage(code);
  const video = VIDEO_MAP[code];
  const groupInfo = getGroupOfVariant(code);
  const rateInfo = getInterestRateForCode(code);
  const markupInfo = getInsuranceMarkupForCode(code);
  const adSpecialInfo = getAdSpecialRateForCode(code);

  return (
    <article className="car-card">
      {groupInfo && (
        <div className="car-variant-tabs">
          {groupInfo.variants.map(v => (
            <button
              key={v.code}
              className={`car-variant-tab ${code === v.code ? 'active' : ''}`}
              onClick={() => onSelectVariant && onSelectVariant(v.code)}
            >
              {v.name}
            </button>
          ))}
        </div>
      )}
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
          {car.start_price === maxP
            ? `${fmtPriceFull(car.start_price)} บาท`
            : `${fmtPriceFull(car.start_price)} – ${fmtPriceFull(maxP)} บาท`}
        </div>
      </div>

      {desc && <div className="car-card-desc" dangerouslySetInnerHTML={{ __html: desc }} />}

      {video && (
        <div className="car-card-section">
          <div className="car-card-section-title">🎬 คลิปวิดีโอ</div>
          <YouTubeEmbed videoId={video.videoId} title={`คลิปวิดีโอ ${car.title}`} lang={video.lang} />
        </div>
      )}

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
        <div className="car-card-section-title">📊 รุ่นย่อยและการเปรียบเทียบอุปกรณ์เพิ่มเติม</div>
        <div className="car-card-grades" style={{ display: 'block' }}>
          <table className="car-card-grades-table">
            <thead>
              <tr>
                <th>รุ่นย่อย</th>
                <th>เกียร์</th>
                <th className="car-card-grade-price">ราคา</th>
                <th>รายละเอียด / อุปกรณ์ที่เพิ่ม</th>
              </tr>
            </thead>
            <tbody>
              {car.grades.map((g, i) => {
                const isTopTier = g.price === maxP;
                const gd = findGradeDesc(code, g.title);
                return (
                  <tr
                    key={i}
                    className={`car-card-grade-row${isTopTier ? ' top-tier' : ''}`}
                    style={{ cursor: 'default' }}
                  >
                    <td className="car-card-grade-name">
                      {g.title}
                      {isTopTier && <span className="top-tier-badge">TOP</span>}
                    </td>
                    <td className="car-card-grade-trans">{g.trans || '-'}</td>
                    <td className="car-card-grade-price">{fmtPriceShort(g.price)}</td>
                    <td className="car-card-grade-diff" style={{ padding: 'var(--space-3)', color: 'var(--text-secondary)', fontSize: '0.825rem', lineHeight: 1.5 }}>
                      {gd ? gd.diff : '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {rateInfo && (
        <div className="car-card-section">
          <div className="car-card-section-title">📈 อัตราดอกเบี้ยลีสซิ่ง & แคมเปญ (ประจำเดือน พฤษภาคม 2569)</div>
          
          <div className="interest-rates-container" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-5)' }}>
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
                1. โปรแกรมเช่าซื้อปกติ (Standard Program)
              </h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', marginBottom: 'var(--space-3)' }}>
                * ดอกเบี้ยเช่าซื้ออัตราปกติ ผ่อนชำระแบบคงที่เท่ากันทุกงวด ระยะเวลาผ่อน 12 - 84 เดือน (เฉพาะบางรุ่นได้สูงสุด 96 เดือน)
              </p>
              <table className="car-card-grades-table">
                <thead>
                  <tr>
                    <th>เงินดาวน์</th>
                    <th>12 - 48 เดือน</th>
                    <th>60 เดือน</th>
                    <th>72 เดือน</th>
                    <th>84 เดือน</th>
                    <th>96 เดือน</th>
                  </tr>
                </thead>
                <tbody>
                  {rateInfo.standard.map((r, i) => {
                    const m96Value = get96MonthRate(code, r.down);
                    return (
                      <tr key={i}>
                        <td><strong>{r.down}</strong></td>
                        <td>{r.m48}</td>
                        <td>{r.m60}</td>
                        <td>{r.m72}</td>
                        <td>{r.m84}</td>
                        <td style={m96Value !== '—' ? { color: 'var(--blue)', fontWeight: 600 } : {}}>{m96Value}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
                2. โปรแกรมสบายดี (Sabaidee Program)
              </h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', marginBottom: 'var(--space-3)' }}>
                * ผ่อนค่างวดเบาลงในช่วงแรก โดยมีสัดส่วนยอดคงเหลือสุดท้าย (Residual Value หรือ RV): **48ด. = {rateInfo.rv.m48}** / **60ด. = {rateInfo.rv.m60}** 
                ที่งวดสุดท้ายสามารถเลือกปิดบัญชี ขยายไฟแนนซ์ต่อ หรือเทิร์นรถคันใหม่
              </p>
              <table className="car-card-grades-table">
                <thead>
                  <tr>
                    <th>เงินดาวน์</th>
                    <th>48 เดือน</th>
                    <th>60 เดือน</th>
                  </tr>
                </thead>
                <tbody>
                  {rateInfo.sabaidee.map((r, i) => (
                    <tr key={i}>
                      <td><strong>{r.down}</strong></td>
                      <td>{r.m48}</td>
                      <td>{r.m60}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {adSpecialInfo && (
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--blue)', marginBottom: 'var(--space-2)' }}>
                  3. {adSpecialInfo.name}
                </h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', marginBottom: 'var(--space-3)' }}>
                  * อัตราดอกเบี้ยพิเศษแบบหักส่วนลดเงินสนับสนุนจากดีลเลอร์สำหรับการทำสัญญาเช่าซื้อปกติ
                </p>
                {adSpecialInfo.multiple ? (
                  adSpecialInfo.multiple.map((m, idx) => (
                    <div key={idx} style={{ marginBottom: 'var(--space-3)' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 'var(--space-1)' }}>
                        {m.title}
                      </span>
                      <table className="car-card-grades-table">
                        <thead>
                          <tr>
                            <th>เงินดาวน์</th>
                            <th>12 - 48 เดือน</th>
                            <th>60 เดือน</th>
                            <th>72 เดือน</th>
                            <th>84 เดือน</th>
                          </tr>
                        </thead>
                        <tbody>
                          {m.rates.map((r, ri) => (
                            <tr key={ri}>
                              <td><strong>{r.down}</strong></td>
                              <td>{r.m48}</td>
                              <td>{r.m60}</td>
                              <td>{r.m72}</td>
                              <td>{r.m84}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))
                ) : (
                  <table className="car-card-grades-table">
                    <thead>
                      <tr>
                        <th>เงินดาวน์</th>
                        <th>12 - 48 เดือน</th>
                        <th>60 เดือน</th>
                        <th>72 เดือน</th>
                        <th>84 เดือน</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adSpecialInfo.rates.map((r, i) => (
                        <tr key={i}>
                          <td><strong>{r.down}</strong></td>
                          <td>{r.m48}</td>
                          <td>{r.m60}</td>
                          <td>{r.m72}</td>
                          <td>{r.m84}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {markupInfo && (
              <div style={{ background: 'var(--bg-active)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--red)' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--red)', marginBottom: 'var(--space-2)' }}>
                  🛡️ แคมเปญบวกดอกเบี้ยแทนประกันภัย (Mark up Rate / TLT Care & PHYD)
                </h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  ทางเลือกผ่อนชำระเพิ่มเพื่อคุ้มครองประกันภัยชั้น 1 แคมเปญ TLT Care ผ่อนชำระระยะเวลา 48 เดือนขึ้นไป ดาวน์ไม่เกิน 50%:
                </p>
                <ul style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', paddingLeft: 'var(--space-4)', marginTop: 'var(--space-1)', lineHeight: 1.6 }}>
                  <li><strong>บวกเพิ่มจากตารางดอกเบี้ยปกติ (TLT Care)</strong>: <span style={{ color: 'var(--red)', fontWeight: 600 }}>{markupInfo.tlt}</span></li>
                  <li><strong>บวกเพิ่มจากตารางดอกเบี้ยปกติแบบขับดีลดดอกเบี้ย (PHYD - 6 บริษัทประกัน)</strong>: <span style={{ color: 'var(--red)', fontWeight: 600 }}>{markupInfo.phyd}</span></li>
                </ul>
              </div>
            )}

            <div style={{ background: 'var(--bg-info)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--blue)' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--blue)', marginBottom: 'var(--space-2)' }}>
                💡 รายละเอียดแคมเปญและดอกเบี้ยโปรแกรมอื่น ๆ เพิ่มเติม
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-2)', fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                <div>
                  <strong>🏷️ แคมเปญลดดอกเบี้ยพิเศษ (Discount Rate)</strong>:
                  <br />ผู้แทนจำหน่ายสามารถจ่ายเงินสนับสนุน (Dealer Subsidy) เพื่อลดอัตราดอกเบี้ยได้สูงสุด <strong>2.00%</strong> (สำหรับยอดจัดไฟแนนซ์ 50,000 - 2,000,000 บาท ผ่อน 48 งวดขึ้นไป และดาวน์ไม่เกิน 50%) โดยอัตราสนับสนุนอยู่ที่ 0.10% ต่อสัดส่วนยอดจัด
                </div>
                <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />
                <div>
                  <strong>🌾 โปรแกรมสบายใจ (Sabaijai Program)</strong>:
                  <br />โปรแกรมผ่อนชำระสำหรับภาคเกษตรกรรมหรือธุรกิจที่รายได้ตามฤดูกาล โดยผ่อนชำระแบบรายปี เริ่มต้นงวดแรกแบบ Beginning
                </div>
                <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />
                <div>
                  <strong>📅 โปรแกรมสบายประ (Sabaipra Program)</strong>:
                  <br />โปรแกรมผ่อนชำระแบบรายไตรมาส (ทุก 3 เดือน) หรือรายครึ่งปี (ทุก 6 เดือน) เพื่อให้สอดคล้องกับรอบบัญชีและการรับรายได้ของธุรกิจ
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

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
    </article>
  );
}
