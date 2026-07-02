import { useState } from 'react';
import './InterestRatesPage.css';

// We import the rates
import { INTEREST_RATES } from '../data/interestRates';

export default function InterestRatesPage() {
  const [activeTab, setActiveTab] = useState('standard');
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Standard Program Group A & B
  const standardGroups = [
    {
      title: 'กลุ่ม A · เอทีฟ, ยาริส, ยาริส ครอส, เวลลอซ',
      rates: [
        { down: '5%', m48: '4.19%', m60: '4.49%', m72: '4.95%', m84: '5.39%', m96: '—' },
        { down: '10%', m48: '3.79%', m60: '4.09%', m72: '4.45%', m84: '5.05%', m96: '—' },
        { down: '15%', m48: '2.99%', m60: '3.39%', m72: '3.85%', m84: '4.25%', m96: '4.75% (bZ4X/YCross)' },
        { down: '20%', m48: '2.69%', m60: '3.05%', m72: '3.29%', m84: '3.79%', m96: '4.29% (bZ4X/YCross)' },
        { down: '25%', m48: '2.39%', m60: '2.89%', m72: '3.15%', m84: '3.69%', m96: '4.19% (bZ4X/YCross)' }
      ]
    },
    {
      title: 'กลุ่ม B · โคโรลล่า อัลติส/ครอส, อินโนวา, คัมรี่, ฟอร์จูนเนอร์, อัลฟาร์ด, เวลไฟร์, มาเจสตี้, bZ4X, FJ, GR Series',
      rates: [
        { down: '5%', m48: '4.09%', m60: '4.45%', m72: '4.85%', m84: '5.39%', m96: '—' },
        { down: '10%', m48: '3.69%', m60: '3.99%', m72: '4.49%', m84: '4.99%', m96: '—' },
        { down: '15%', m48: '2.95%', m60: '3.35%', m72: '3.79%', m84: '4.19%', m96: '4.69% (Fortuner/FJ)' },
        { down: '20%', m48: '2.65%', m60: '2.99%', m72: '3.25%', m84: '3.75%', m96: '4.25% (Fortuner/FJ)' },
        { down: '25%', m48: '2.39%', m60: '2.85%', m72: '3.29%', m84: '3.59%', m96: '4.09% (Fortuner/FJ)' }
      ]
    },
    {
      title: 'กลุ่ม C · ไฮลักซ์ แชมป์, รีโว่ B-Cab/C-Cab, ทราโว่ B-Cab/C-Cab',
      rates: [
        { down: '5%', m48: '5.05%', m60: '5.15%', m72: '5.45%', m84: '5.55%', m96: '—' },
        { down: '10%', m48: '4.20%', m60: '4.40%', m72: '5.05%', m84: '5.49%', m96: '—' },
        { down: '15%', m48: '3.65%', m60: '3.95%', m72: '4.45%', m84: '4.99%', m96: '5.69% (Revo 4x4/4TREX)' },
        { down: '20%', m48: '2.85%', m60: '3.49%', m72: '3.95%', m84: '4.65%', m96: '5.15% (Revo 4x4/4TREX)' },
        { down: '25%', m48: '2.39%', m60: '3.39%', m72: '3.69%', m84: '4.49%', m96: '4.99% (Revo 4x4/4TREX)' }
      ]
    },
    {
      title: 'กลุ่ม D · รีโว่ D-Cab, ทราโว่ D-Cab, ทราโว่ อี',
      rates: [
        { down: '5%', m48: '4.80%', m60: '5.15%', m72: '5.45%', m84: '5.55%', m96: '—' },
        { down: '10%', m48: '4.00%', m60: '4.30%', m72: '4.75%', m84: '5.15%', m96: '—' },
        { down: '15%', m48: '3.45%', m60: '3.85%', m72: '4.19%', m84: '4.85%', m96: '5.35% (Revo 4x4/4TREX)' },
        { down: '20%', m48: '2.75%', m60: '3.29%', m72: '3.65%', m84: '4.35%', m96: '4.85% (Revo 4x4/4TREX)' },
        { down: '25%', m48: '2.39%', m60: '3.19%', m72: '3.49%', m84: '4.09%', m96: '4.59% (Revo 4x4/4TREX)' }
      ]
    }
  ];

  // 2. Advertising Special Rates (DLR Subsidy)
  const adSpecialRates = [
    { name: 'โคโรลล่า อัลติส (DLR 14,000 บ.)', rates: [
      { down: '5%', m48: '3.65%', m60: '4.09%', m72: '4.49%', m84: '5.09%' },
      { down: '10%', m48: '3.25%', m60: '3.59%', m72: '4.05%', m84: '4.69%' },
      { down: '15%', m48: '2.45%', m60: '2.95%', m72: '3.45%', m84: '3.89%' },
      { down: '20%', m48: '2.15%', m60: '2.59%', m72: '2.90%', m84: '3.45%' },
      { down: '25%', m48: '1.79%', m60: '2.39%', m72: '2.69%', m84: '3.25%' }
    ]},
    { name: 'คัมรี่ ปี 2567 (DLR 20,000 บ.)', rates: [
      { down: '5%', m48: '3.70%', m60: '4.25%', m72: '4.60%', m84: '5.15%' },
      { down: '10%', m48: '3.30%', m60: '3.65%', m72: '4.10%', m84: '4.75%' },
      { down: '15%', m48: '2.55%', m60: '3.00%', m72: '3.45%', m84: '3.95%' },
      { down: '20%', m48: '2.20%', m60: '2.65%', m72: '3.00%', m84: '3.55%' },
      { down: '25%', m48: '1.79%', m60: '2.45%', m72: '2.80%', m84: '3.35%' }
    ]},
    { name: 'เอทีฟ ไฮบริด (DLR 9,000 บ.)', rates: [
      { down: '5%', m48: '3.80%', m60: '4.15%', m72: '4.65%', m84: '5.15%' },
      { down: '10%', m48: '3.39%', m60: '3.75%', m72: '4.15%', m84: '4.79%' },
      { down: '15%', m48: '2.59%', m60: '3.05%', m72: '3.55%', m84: '3.99%' },
      { down: '20%', m48: '2.25%', m60: '2.69%', m72: '2.99%', m84: '3.50%' },
      { down: '25%', m48: '1.95%', m60: '2.50%', m72: '2.80%', m84: '3.40%' }
    ]},
    { name: 'เอทีฟ ไฮบริด โปรพิเศษ (DLR 25,000 บ.)', rates: [
      { down: '5%', m48: '3.10%', m60: '3.59%', m72: '4.15%', m84: '4.65%' },
      { down: '10%', m48: '2.65%', m60: '3.15%', m72: '3.65%', m84: '4.29%' },
      { down: '15%', m48: '1.80%', m60: '2.40%', m72: '2.99%', m84: '3.49%' },
      { down: '20%', m48: '1.45%', m60: '2.05%', m72: '2.40%', m84: '2.99%' },
      { down: '25%', m48: '1.09%', m60: '1.80%', m72: '2.20%', m84: '2.85%' }
    ]},
    { name: 'ยาริส ครอส (DLR 15,000 บ.)', rates: [
      { down: '5%', m48: '3.45%', m60: '3.85%', m72: '4.39%', m84: '4.89%' },
      { down: '10%', m48: '2.99%', m60: '3.45%', m72: '3.89%', m84: '4.55%' },
      { down: '15%', m48: '2.19%', m60: '2.70%', m72: '3.25%', m84: '3.75%' },
      { down: '20%', m48: '1.89%', m60: '2.29%', m72: '2.99%', m84: '2.99%' },
      { down: '25%', m48: '1.59%', m60: '1.99%', m72: '2.39%', m84: '2.79%' }
    ]},
    { name: 'อินโนวา (DLR 20,000 บ.)', rates: [
      { down: '5%', m48: '3.65%', m60: '4.20%', m72: '4.55%', m84: '5.09%' },
      { down: '10%', m48: '3.25%', m60: '3.60%', m72: '4.05%', m84: '4.69%' },
      { down: '15%', m48: '2.50%', m60: '2.95%', m72: '3.45%', m84: '3.89%' },
      { down: '20%', m48: '2.15%', m60: '2.60%', m72: '2.90%', m84: '3.40%' },
      { down: '25%', m48: '1.79%', m60: '2.35%', m72: '2.65%', m84: '2.70%' }
    ]},
    { name: 'บีซีโฟร์เอ็กซ์ (DLR 100,000 บ.)', rates: [
      { down: '5%', m48: '1.95%', m60: '2.69%', m72: '3.29%', m84: '3.99%' },
      { down: '10%', m48: '1.49%', m60: '2.15%', m72: '2.79%', m84: '3.55%' },
      { down: '15%', m48: '0.69%', m60: '1.45%', m72: '2.15%', m84: '2.69%' },
      { down: '20%', m48: '0.25%', m60: '0.99%', m72: '1.55%', m84: '2.19%' },
      { down: '25%', m48: '0.00%', m60: '0.75%', m72: '1.25%', m84: '1.95%' }
    ]},
    { name: 'อัลฟาร์ด, เวลไฟร์ NEW (DLR 200,000 บ.)', rates: [
      { down: '5%', m48: '2.50%', m60: '3.15%', m72: '3.70%', m84: '4.35%' },
      { down: '10%', m48: '2.05%', m60: '2.65%', m72: '3.19%', m84: '3.90%' },
      { down: '15%', m48: '1.25%', m60: '1.95%', m72: '2.55%', m84: '3.09%' },
      { down: '20%', m48: '0.89%', m60: '1.50%', m72: '1.99%', m84: '2.60%' },
      { down: '25%', m48: '0.49%', m60: '1.29%', m72: '1.75%', m84: '2.39%' }
    ]},
    { name: 'เอทีฟ (เบนซิน) & ยาริส ปี 2566/2569 (DLR 9,000 บ.)', rates: [
      { down: '5%', m48: '2.60%', m60: '3.20%', m72: '3.80%', m84: '4.39%' },
      { down: '10%', m48: '2.15%', m60: '2.70%', m72: '3.25%', m84: '4.00%' },
      { down: '15%', m48: '1.30%', m60: '1.95%', m72: '2.60%', m84: '2.95%' },
      { down: '20%', m48: '0.79%', m60: '1.45%', m72: '1.85%', m84: '2.39%' },
      { down: '25%', m48: '0.50%', m60: '1.20%', m72: '1.55%', m84: '2.15%' }
    ]}
  ];

  // 3. Other Special Programs (Insurance, Taxi, Staff, etc.)
  const insuranceRates = [
    { model: 'ไฮลักซ์ แชมป์ (เชิงพาณิชย์ · รหัส 320)', tlt: '+1.00%', phyd: '+0.90%' },
    { model: 'ไฮลักซ์ แชมป์ (ส่วนบุคคล · รหัส 210)', tlt: '+0.85%', phyd: '+0.75%' },
    { model: 'รีโว่ B&C-Cab, โคสเตอร์, ทราโว่ B&C-Cab, เวลลอซ, FJ, ยาริส, อัลติส', tlt: '+0.70%', phyd: '+0.65%' },
    { model: 'ยาริส ครอส, ยาริส, โคโรลล่า ครอส, ซิเอ็นต้า, อินโนวา, รีโว่ D-Cab, ทราโว่ D-Cab (น้ำมัน)', tlt: '+0.75%', phyd: '+0.70%' },
    { model: 'คัมรี่, ฟอร์จูนเนอร์, bZ4X, ทราโว่ D-Cab (ไฟฟ้า)', tlt: '+0.80%', phyd: '+0.75%' }
  ];

  const filteredAdSpecial = adSpecialRates.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="interest-rates-page" style={{ animation: 'fadeIn 400ms var(--ease-out)' }}>
      <div className="rates-header">
        <h1 className="rates-title">📋 ตารางอัตราดอกเบี้ยทั้งหมด</h1>
        <p className="rates-subtitle">อ้างอิง โตโยต้า ลิสซิ่ง (ประเทศไทย) ประจำรอบเดือน พฤษภาคม 2569</p>
      </div>

      <div className="rates-nav-tabs">
        <button className={`rates-tab ${activeTab === 'standard' ? 'active' : ''}`} onClick={() => setActiveTab('standard')}>
          เช่าซื้อปกติ & สบายดี
        </button>
        <button className={`rates-tab ${activeTab === 'ad-special' ? 'active' : ''}`} onClick={() => setActiveTab('ad-special')}>
          ดอกเบี้ยพิเศษเพื่อการโฆษณา (DLR)
        </button>
        <button className={`rates-tab ${activeTab === 'other' ? 'active' : ''}`} onClick={() => setActiveTab('other')}>
          แคมเปญประกันภัย & อื่นๆ
        </button>
      </div>

      <div className="rates-content">
        {activeTab === 'standard' && (
          <div className="rates-section">
            <h2 className="rates-sec-title">1. อัตราดอกเบี้ยเช่าซื้อปกติ (Standard Program)</h2>
            {standardGroups.map((g, i) => (
              <div key={i} className="rates-group-box">
                <h3 className="rates-group-title">{g.title}</h3>
                <div style={{ overflowX: 'auto' }}>
                  <table className="car-card-grades-table">
                    <thead>
                      <tr>
                        <th>เงินดาวน์</th>
                        <th>12-48 เดือน</th>
                        <th>60 เดือน</th>
                        <th>72 เดือน</th>
                        <th>84 เดือน</th>
                        <th>96 เดือน</th>
                      </tr>
                    </thead>
                    <tbody>
                      {g.rates.map((r, ri) => (
                        <tr key={ri}>
                          <td><strong>{r.down}</strong></td>
                          <td>{r.m48}</td>
                          <td>{r.m60}</td>
                          <td>{r.m72}</td>
                          <td>{r.m84}</td>
                          <td>{r.m96}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'ad-special' && (
          <div className="rates-section">
            <div className="rates-filter-bar">
              <h2 className="rates-sec-title" style={{ margin: 0 }}>2. อัตราดอกเบี้ยพิเศษเพื่อการโฆษณา (หัก Dealer Subsidy)</h2>
              <input
                type="text"
                placeholder="ค้นหารุ่นรถ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rates-search-input"
              />
            </div>
            
            <div className="rates-grid">
              {filteredAdSpecial.map((group, idx) => (
                <div key={idx} className="rates-group-box">
                  <h3 className="rates-group-title" style={{ color: 'var(--blue)' }}>🏷️ {group.name}</h3>
                  <div style={{ overflowX: 'auto' }}>
                    <table className="car-card-grades-table">
                      <thead>
                        <tr>
                          <th>เงินดาวน์</th>
                          <th>12-48 เดือน</th>
                          <th>60 เดือน</th>
                          <th>72 เดือน</th>
                          <th>84 เดือน</th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.rates.map((r, ri) => (
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
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'other' && (
          <div className="rates-section">
            <div className="rates-group-box">
              <h3 className="rates-group-title" style={{ color: 'var(--red)' }}>🛡️ แคมเปญประกันภัยชั้น 1 (บวกดอกเบี้ยแทนประกัน / Mark up Rate)</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-3)' }}>
                * บวกค่างวดเพิ่มจากตารางปกติสำหรับการคุ้มครองประกันภัยชั้น 1 แคมเปญ TLT Care ผ่อนชำระ 48 เดือนขึ้นไป ดาวน์ไม่เกิน 50%
              </p>
              <table className="car-card-grades-table">
                <thead>
                  <tr>
                    <th>รุ่นรถยนต์</th>
                    <th>บวกดอกเบี้ยปกติ (TLT Care)</th>
                    <th>บวกดอกเบี้ยขับดี (PHYD)</th>
                  </tr>
                </thead>
                <tbody>
                  {insuranceRates.map((r, i) => (
                    <tr key={i}>
                      <td><strong>{r.model}</strong></td>
                      <td style={{ color: 'var(--red)', fontWeight: 600 }}>{r.tlt}</td>
                      <td style={{ color: 'var(--green)', fontWeight: 600 }}>{r.phyd}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rates-group-box" style={{ background: 'var(--bg-warning)', borderLeft: '3px solid var(--orange)' }}>
              <h3 className="rates-group-title" style={{ color: 'var(--orange)' }}>ℹ️ ข้อมูลแคมเปญและเงื่อนไขลีสซิ่งเพิ่มเติม</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-3)', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                <div>
                  <strong>🏷️ แคมเปญลดดอกเบี้ยพิเศษ (Discount Rate)</strong>:
                  <br />ผู้แทนจำหน่ายสามารถสนับสนุนส่วนลดดอกเบี้ยทุกๆ 0.10% โดยขึ้นอยู่กับยอดจัดไฟแนนซ์ และระยะเวลาผ่อน สูงสุดไม่เกิน <strong>2.00%</strong> สำหรับยอดจัดตั้งแต่ 50,000 - 2,000,000 บาท
                </div>
                <div>
                  <strong>🌾 โปรแกรมสบายใจ (Sabaijai Program)</strong>:
                  <br />ชำระค่างวดแบบรายปี เริ่มต้นงวดแรกแบบ Beginning เหมาะสำหรับกลุ่มเกษตรกรและธุรกิจที่มีรายได้เป็นรอบรายปี
                </div>
                <div>
                  <strong>📅 โปรแกรมสบายประ (Sabaipra Program)</strong>:
                  <br />ชำระค่างวดทุก 3 เดือน หรือทุก 6 เดือน เพื่อเพิ่มความคล่องตัวให้กระแสเงินสดของลูกค้า
                </div>
                <div>
                  <strong>🚕 โปรแกรมรถแท็กซี่ & รถสองแถว (Taxi & On-Air Program)</strong>:
                  <br />มีอัตราดอกเบี้ยและโปรแกรมการจัดไฟแนนซ์แยกเฉพาะ (อ้างอิงเอกสารหลัก ส่วนที่ 9 และ 10)
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
