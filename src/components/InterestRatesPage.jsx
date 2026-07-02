import { useState } from 'react';
import './InterestRatesPage.css';
import { INTEREST_RATES, getDiscountMatrix } from '../data/interestRates';

export default function InterestRatesPage() {
  const [activeTab, setActiveTab] = useState('standard');
  const [searchQuery, setSearchQuery] = useState('');
  const [subTabStandard, setSubTabStandard] = useState('normal'); // 'normal', 'sabaidee', 'sabaidee7y'

  // Standard rates displayed on the page
  const standardGroups = [
    {
      title: 'กลุ่ม A · เอทีฟ, ยาริส, ยาริส ครอส, เวลลอซ',
      key: 'A',
      desc: 'เฉพาะ ATIV / Yaris / Yaris Cross มีโปรแกรมผ่อน 96 เดือน (15%=4.75%, 20%=4.29%, 25%=4.19%)',
      get96: (down) => {
        if (down === '15%') return '4.75%';
        if (down === '20%') return '4.29%';
        if (down === '25%') return '4.19%';
        return '—';
      }
    },
    {
      title: 'กลุ่ม B · โคโรลล่า อัลติส/ครอส, อินโนวา, คัมรี่, ฟอร์จูนเนอร์, อัลฟาร์ด, เวลไฟร์, มาเจสตี้, bZ4X, FJ, GR Series',
      key: 'B',
      desc: 'เฉพาะ Fortuner / Land Cruiser FJ มีโปรแกรมผ่อน 96 เดือน (15%=4.69%, 20%=4.25%, 25%=4.09%)',
      get96: (down) => {
        if (down === '15%') return '4.69%';
        if (down === '20%') return '4.25%';
        if (down === '25%') return '4.09%';
        return '—';
      }
    },
    {
      title: 'กลุ่ม bZ4X · รถยนต์ไฟฟ้า bZ4X (แยกเงื่อนไข RV และสบายดีพิเศษ)',
      key: 'BZ4X',
      desc: 'ไม่มีโปรแกรมผ่อน 96 เดือนในตารางมาตรฐานปกติ',
      get96: () => '—'
    },
    {
      title: 'กลุ่ม C · ไฮลักซ์ แชมป์, รีโว่ B-Cab/C-Cab, ทราโว่ B-Cab/C-Cab',
      key: 'C',
      desc: 'เฉพาะรุ่น 4x4 / 4TREX มีโปรแกรมผ่อน 96 เดือน (15%=5.69%, 20%=5.15%, 25%=4.99%)',
      get96: (down) => {
        if (down === '15%') return '5.69%';
        if (down === '20%') return '5.15%';
        if (down === '25%') return '4.99%';
        return '—';
      }
    },
    {
      title: 'กลุ่ม D · รีโว่ D-Cab, ทราโว่ D-Cab, ทราโว่ อี',
      key: 'D',
      desc: 'เฉพาะรุ่น 4x4 / 4TREX มีโปรแกรมผ่อน 96 เดือน (15%=5.35%, 20%=4.85%, 25%=4.59%)',
      get96: (down) => {
        if (down === '15%') return '5.35%';
        if (down === '20%') return '4.85%';
        if (down === '25%') return '4.59%';
        return '—';
      }
    },
    {
      title: 'กลุ่ม VAN · รถตู้คอมมิวเตอร์, ไฮเอซ (ไม่มีผ่อน 96 เดือน)',
      key: 'VAN',
      desc: 'ไม่เปิดโปรแกรมสำหรับบางงวดในสัญญาสัญญาปกติ',
      get96: () => '—'
    }
  ];

  // Advertising Special Rates (หัก Dealer Subsidy)
  const adSpecialRates = [
    { name: 'โคโรลล่า อัลติส (DLR 14,000 บ. สนับสนุน)', rates: [
      { down: '5%', m48: '3.65%', m60: '4.09%', m72: '4.49%', m84: '5.09%' },
      { down: '10%', m48: '3.25%', m60: '3.59%', m72: '4.05%', m84: '4.69%' },
      { down: '15%', m48: '2.45%', m60: '2.95%', m72: '3.45%', m84: '3.89%' },
      { down: '20%', m48: '2.15%', m60: '2.59%', m72: '2.90%', m84: '3.45%' },
      { down: '25%', m48: '1.79%', m60: '2.39%', m72: '2.69%', m84: '3.25%' }
    ]},
    { name: 'คัมรี่ (DLR 20,000 บ. สนับสนุน)', rates: [
      { down: '5%', m48: '3.70%', m60: '4.25%', m72: '4.60%', m84: '5.15%' },
      { down: '10%', m48: '3.30%', m60: '3.65%', m72: '4.10%', m84: '4.75%' },
      { down: '15%', m48: '2.55%', m60: '3.00%', m72: '3.45%', m84: '3.95%' },
      { down: '20%', m48: '2.20%', m60: '2.65%', m72: '3.00%', m84: '3.55%' },
      { down: '25%', m48: '1.79%', m60: '2.50%', m72: '2.80%', m84: '3.35%' }
    ]},
    { name: 'เอทีฟ ไฮบริด ทางเลือกที่ 1 (DLR 9,000 บ. สนับสนุน)', rates: [
      { down: '5%', m48: '3.80%', m60: '4.15%', m72: '4.65%', m84: '5.15%' },
      { down: '10%', m48: '3.39%', m60: '3.75%', m72: '4.15%', m84: '4.79%' },
      { down: '15%', m48: '2.59%', m60: '3.05%', m72: '3.55%', m84: '3.99%' },
      { down: '20%', m48: '2.25%', m60: '2.69%', m72: '2.99%', m84: '3.50%' },
      { down: '25%', m48: '1.95%', m60: '2.50%', m72: '2.80%', m84: '3.40%' }
    ]},
    { name: 'เอทีฟ ไฮบริด โปรพิเศษ ทางเลือกที่ 2 (DLR 25,000 บ. สนับสนุน)', rates: [
      { down: '5%', m48: '3.10%', m60: '3.59%', m72: '4.15%', m84: '4.65%' },
      { down: '10%', m48: '2.65%', m60: '3.15%', m72: '3.65%', m84: '4.29%' },
      { down: '15%', m48: '1.80%', m60: '2.40%', m72: '2.99%', m84: '3.49%' },
      { down: '20%', m48: '1.45%', m60: '2.05%', m72: '2.40%', m84: '2.99%' },
      { down: '25%', m48: '1.09%', m60: '1.80%', m72: '2.20%', m84: '2.85%' }
    ]},
    { name: 'ยาริส ครอส (DLR 15,000 บ. สนับสนุน)', rates: [
      { down: '5%', m48: '3.45%', m60: '3.85%', m72: '4.39%', m84: '4.89%' },
      { down: '10%', m48: '2.99%', m60: '3.45%', m72: '3.89%', m84: '4.55%' },
      { down: '15%', m48: '2.19%', m60: '2.70%', m72: '3.25%', m84: '3.75%' },
      { down: '20%', m48: '1.89%', m60: '2.29%', m72: '2.99%', m84: '2.99%' },
      { down: '25%', m48: '1.59%', m60: '1.99%', m72: '2.39%', m84: '2.79%' }
    ]},
    { name: 'อินโนวา (DLR 20,000 บ. สนับสนุน)', rates: [
      { down: '5%', m48: '3.65%', m60: '4.20%', m72: '4.55%', m84: '5.09%' },
      { down: '10%', m48: '3.25%', m60: '3.60%', m72: '4.05%', m84: '4.69%' },
      { down: '15%', m48: '2.50%', m60: '2.95%', m72: '3.45%', m84: '3.89%' },
      { down: '20%', m48: '2.15%', m60: '2.60%', m72: '2.90%', m84: '3.40%' },
      { down: '25%', m48: '1.79%', m60: '2.50%', m72: '2.70%', m84: '3.25%' }
    ]},
    { name: 'บีซีโฟร์เอ็กซ์ (DLR 100,000 บ. สนับสนุน)', rates: [
      { down: '5%', m48: '1.95%', m60: '2.69%', m72: '3.29%', m84: '3.99%' },
      { down: '10%', m48: '1.49%', m60: '2.15%', m72: '2.79%', m84: '3.55%' },
      { down: '15%', m48: '0.69%', m60: '1.45%', m72: '2.15%', m84: '2.69%' },
      { down: '20%', m48: '0.25%', m60: '0.99%', m72: '1.55%', m84: '2.19%' },
      { down: '25%', m48: '0.00%', m60: '0.75%', m72: '1.25%', m84: '1.95%' }
    ]},
    { name: 'อัลฟาร์ด, เวลไฟร์ (DLR 200,000 บ. สนับสนุน)', rates: [
      { down: '5%', m48: '2.50%', m60: '3.15%', m72: '3.70%', m84: '4.35%' },
      { down: '10%', m48: '2.05%', m60: '2.65%', m72: '3.19%', m84: '3.90%' },
      { down: '15%', m48: '1.25%', m60: '1.95%', m72: '2.55%', m84: '3.09%' },
      { down: '20%', m48: '0.89%', m60: '1.50%', m72: '1.99%', m84: '2.60%' },
      { down: '25%', m48: '0.49%', m60: '1.09%', m72: '1.80%', m84: '2.39%' }
    ]},
    { name: 'เอทีฟ (เบนซิน) & ยาริส ปี 2566/2569 (DLR 9,000 บ. สนับสนุน)', rates: [
      { down: '5%', m48: '2.60%', m60: '3.20%', m72: '3.80%', m84: '4.39%' },
      { down: '10%', m48: '2.15%', m60: '2.70%', m72: '3.25%', m84: '4.00%' },
      { down: '15%', m48: '1.30%', m60: '1.95%', m72: '2.60%', m84: '2.95%', m96: '3.75%' },
      { down: '20%', m48: '0.79%', m60: '1.45%', m72: '1.85%', m84: '2.39%', m96: '3.29%' },
      { down: '25%', m48: '0.50%', m60: '1.20%', m72: '1.55%', m84: '2.15%', m96: '3.05%' }
    ]},
    { name: 'ฟอร์จูนเนอร์ ลีดเดอร์ (DLR 17,000 บ. สนับสนุน)', rates: [
      { down: '5%', m48: '2.95%', m60: '3.50%', m72: '4.00%', m84: '4.65%' },
      { down: '10%', m48: '2.50%', m60: '3.00%', m72: '3.49%', m84: '4.19%' },
      { down: '15%', m48: '1.70%', m60: '2.30%', m72: '2.89%', m84: '3.39%', m96: '3.95%' },
      { down: '20%', m48: '1.35%', m60: '1.85%', m72: '2.25%', m84: '2.79%', m96: '3.50%' },
      { down: '25%', m48: '0.89%', m60: '1.65%', m72: '2.05%', m84: '2.55%', m96: '3.25%' }
    ]},
    { name: 'ฟอร์จูนเนอร์ เลเจนเดอร์ & GR Sport (DLR 37,000 บ. สนับสนุน)', rates: [
      { down: '5%', m48: '2.95%', m60: '3.50%', m72: '4.00%', m84: '4.65%' },
      { down: '10%', m48: '2.50%', m60: '3.00%', m72: '3.49%', m84: '4.19%' },
      { down: '15%', m48: '1.70%', m60: '2.30%', m72: '2.89%', m84: '3.39%', m96: '3.95%' },
      { down: '20%', m48: '1.35%', m60: '1.85%', m72: '2.25%', m84: '2.79%', m96: '3.50%' },
      { down: '25%', m48: '0.89%', m60: '1.65%', m72: '2.05%', m84: '2.55%', m96: '3.25%' }
    ]},
    { name: 'โคโรลล่า ครอส (DLR 19,000 บ. สนับสนุน)', rates: [
      { down: '5%', m48: '2.35%', m60: '2.99%', m72: '3.55%', m84: '4.25%' },
      { down: '10%', m48: '1.89%', m60: '2.49%', m72: '3.05%', m84: '3.79%' },
      { down: '15%', m48: '1.09%', m60: '1.79%', m72: '2.45%', m84: '2.99%' },
      { down: '20%', m48: '0.70%', m60: '1.35%', m72: '1.85%', m84: '2.49%' },
      { down: '25%', m48: '0.00%', m60: '1.15%', m72: '1.59%', m84: '2.25%' }
    ]}
  ];

  // Revo Advertising Special Rates (DLR Subsidies)
  const revoAdRates = [
    { name: 'รีโว่ C-Cab 4x2 / D-Cab 4x2 (DLR 36,000 บ.)', rates: [
      { down: '5%', m48: '3.35%', m60: '3.90%', m72: '4.20%', m84: '4.50%' },
      { down: '10%', m48: '2.45%', m60: '2.90%', m72: '3.75%', m84: '4.35%' },
      { down: '15%', m48: '1.80%', m60: '2.40%', m72: '3.10%', m84: '3.99%' },
      { down: '20%', m48: '0.95%', m60: '1.90%', m72: '2.55%', m84: '3.45%' },
      { down: '25%', m48: '0.29%', m60: '1.70%', m72: '2.20%', m84: '3.20%', m96: '3.69%' }
    ]},
    { name: 'รีโว่ D-Cab 4x2 (DLR 36,000 บ.)', rates: [
      { down: '5%', m48: '3.25%', m60: '3.85%', m72: '4.30%', m84: '4.60%' },
      { down: '10%', m48: '2.40%', m60: '3.00%', m72: '3.60%', m84: '4.45%' },
      { down: '15%', m48: '1.80%', m60: '2.40%', m72: '2.99%', m84: '3.85%', m96: '4.35%' },
      { down: '20%', m48: '1.05%', m60: '1.85%', m72: '2.40%', m84: '3.30%', m96: '3.80%' },
      { down: '25%', m48: '0.55%', m60: '1.70%', m72: '2.20%', m84: '2.95%', m96: '3.45%' }
    ]},
    { name: 'รีโว่ B-Cab 4x2 (DLR 6,000 บ.)', rates: [
      { down: '5%', m48: '4.75%', m60: '5.10%', m72: '5.25%', m84: '5.40%' },
      { down: '10%', m48: '3.90%', m60: '4.15%', m72: '4.85%', m84: '5.35%' },
      { down: '15%', m48: '3.35%', m60: '3.70%', m72: '4.25%', m84: '5.05%', m96: '5.49%' },
      { down: '20%', m48: '2.55%', m60: '3.25%', m72: '3.70%', m84: '4.50%', m96: '4.95%' },
      { down: '25%', m48: '1.99%', m60: '3.10%', m72: '3.45%', m84: '4.30%', m96: '4.79%' }
    ]}
  ];

  // Hilux Champ Special rates
  const champSpecialRates = [
    { name: 'โปรแกรม 108 เดือน · เพื่อธุรกิจ (ดาวน์เริ่มต้น 10%)', rates: [
      { down: '5%', m48: '4.90%', m60: '5.25%', m72: '5.30%', m84: '5.50%', m96: '—', m108: '—' },
      { down: '10%', m48: '4.09%', m60: '4.29%', m72: '4.89%', m84: '5.30%', m96: '5.80%', m108: '6.30%' },
      { down: '15%', m48: '3.59%', m60: '3.89%', m72: '4.35%', m84: '5.00%', m96: '5.50%', m108: '6.00%' },
      { down: '20%', m48: '2.85%', m60: '3.49%', m72: '3.89%', m84: '4.55%', m96: '5.05%', m108: '5.55%' },
      { down: '25%', m48: '2.39%', m60: '3.39%', m72: '3.69%', m84: '4.45%', m96: '4.95%', m108: '5.45%' }
    ]},
    { name: 'โปรแกรม 108 เดือน · ส่วนบุคคล (ดาวน์เริ่มต้น 10%)', rates: [
      { down: '5%', m48: '4.90%', m60: '5.25%', m72: '5.30%', m84: '5.50%', m96: '—', m108: '—' },
      { down: '10%', m48: '4.09%', m60: '4.29%', m72: '4.89%', m84: '5.30%', m96: '5.65%', m108: '5.70%' },
      { down: '15%', m48: '3.59%', m60: '3.89%', m72: '4.35%', m84: '5.00%', m96: '5.50%', m108: '5.70%' },
      { down: '20%', m48: '2.85%', m60: '3.49%', m72: '3.89%', m84: '4.55%', m96: '5.05%', m108: '5.55%' },
      { down: '25%', m48: '2.39%', m60: '3.39%', m72: '3.69%', m84: '4.45%', m96: '4.95%', m108: '5.45%' }
    ]},
    { name: 'โปรแกรมแคมเปญหอการค้าไทย (TCC) (หัก DLR Subsidy 25,000 บ.)', rates: [
      { down: '5%', m48: '3.19%', m60: '3.79%', m72: '4.05%', m84: '4.39%' },
      { down: '10%', m48: '2.30%', m60: '2.80%', m72: '3.59%', m84: '4.15%', m96: '4.70%', m108: '5.29%' },
      { down: '15%', m48: '1.75%', m60: '2.35%', m72: '2.99%', m84: '3.79%', m96: '4.35%', m108: '4.95%' },
      { down: '20%', m48: '0.95%', m60: '1.89%', m72: '2.49%', m84: '3.29%', m96: '3.89%', m108: '4.45%' },
      { down: '25%', m48: '0%', m60: '1.69%', m72: '2.20%', m84: '3.09%', m96: '3.69%', m108: '4.29%' }
    ]}
  ];

  // Insurance Mark up Rate lists
  const insuranceRates = [
    { model: 'ไฮลักซ์ แชมป์ (เชิงพาณิชย์ · รหัส 320)', tlt: '+1.00%', phyd: '+0.90%', note: 'บวกค่างวดปกติ' },
    { model: 'ไฮลักซ์ แชมป์ (ส่วนบุคคล · รหัส 210)', tlt: '+0.85%', phyd: '+0.75%', note: 'บวกค่างวดปกติ' },
    { model: 'รีโว่ B&C-Cab, โคสเตอร์, ทราโว่ B&C-Cab, เวลลอซ, FJ, ยาริส, อัลติส', tlt: '+0.70%', phyd: '+0.65%', note: 'บวกค่างวดปกติ' },
    { model: 'ยาริส ครอส, ยาริส, โคโรลล่า ครอส, ซิเอ็นต้า, อินโนวา, รีโว่ D-Cab, ทราโว่ D-Cab (น้ำมัน)', tlt: '+0.75%', phyd: '+0.70%', note: 'บวกค่างวดปกติ' },
    { model: 'คัมรี่, ฟอร์จูนเนอร์, bZ4X, ทราโว่ D-Cab (ไฟฟ้า)', tlt: '+0.80%', phyd: '+0.75%', note: 'บวกค่างวดปกติ' }
  ];

  const discountMatrixData = getDiscountMatrix();

  const filteredAdSpecial = adSpecialRates.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="interest-rates-page" style={{ animation: 'fadeIn 400ms var(--ease-out)' }}>
      <div className="rates-header">
        <h1 className="rates-title">📋 ตารางอัตราดอกเบี้ยทั้งหมด</h1>
        <p className="rates-subtitle">อ้างอิง โตโยต้า ลิสซิ่ง (ประเทศไทย) ประจำรอบเดือน มิถุนายน 2569</p>
      </div>

      <div className="rates-nav-tabs">
        <button className={`rates-tab ${activeTab === 'standard' ? 'active' : ''}`} onClick={() => setActiveTab('standard')}>
          เช่าซื้อปกติ & สบายดี
        </button>
        <button className={`rates-tab ${activeTab === 'ad-special' ? 'active' : ''}`} onClick={() => setActiveTab('ad-special')}>
          ดอกเบี้ยพิเศษเพื่อการโฆษณา (DLR)
        </button>
        <button className={`rates-tab ${activeTab === 'discount' ? 'active' : ''}`} onClick={() => setActiveTab('discount')}>
          แคมเปญลดดอกเบี้ย (Discount Matrix)
        </button>
        <button className={`rates-tab ${activeTab === 'other' ? 'active' : ''}`} onClick={() => setActiveTab('other')}>
          แคมเปญประกันภัย & อื่นๆ
        </button>
      </div>

      <div className="rates-content">
        {activeTab === 'standard' && (
          <div className="rates-section">
            <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
              <button className={`rates-tab ${subTabStandard === 'normal' ? 'active' : ''}`} onClick={() => setSubTabStandard('normal')} style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
                เช่าซื้อปกติ (Standard)
              </button>
              <button className={`rates-tab ${subTabStandard === 'sabaidee' ? 'active' : ''}`} onClick={() => setSubTabStandard('sabaidee')} style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
                สบายดี 4-5 ปี (Sabaidee)
              </button>
              <button className={`rates-tab ${subTabStandard === 'sabaidee7y' ? 'active' : ''}`} onClick={() => setSubTabStandard('sabaidee7y')} style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
                สบายดี 7 ปี (Sabaidee 7 Years)
              </button>
            </div>

            {subTabStandard === 'normal' && (
              <>
                <h2 className="rates-sec-title">1. อัตราดอกเบี้ยเช่าซื้อปกติ (Standard Program)</h2>
                {standardGroups.map((g, i) => {
                  const rateGroup = INTEREST_RATES[g.key];
                  return (
                    <div key={i} className="rates-group-box">
                      <h3 className="rates-group-title">{g.title}</h3>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>*{g.desc}</p>
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
                            {rateGroup.standard.map((r, ri) => (
                              <tr key={ri}>
                                <td><strong>{r.down}</strong></td>
                                <td>{r.m48}</td>
                                <td>{r.m60}</td>
                                <td>{r.m72}</td>
                                <td>{r.m84}</td>
                                <td>{g.get96(r.down)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })}
              </>
            )}

            {subTabStandard === 'sabaidee' && (
              <>
                <h2 className="rates-sec-title">2. อัตราดอกเบี้ยโปรแกรมสบายดี (Sabaidee Program 4-5 ปี)</h2>
                <div className="rates-group-box" style={{ background: 'var(--surface)', border: '1px solid var(--border-light)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-4)' }}>
                  <h4 style={{ margin: '0 0 var(--space-2) 0', color: 'var(--blue)' }}>📊 สัดส่วนยอดคงเหลือสุดท้าย (Residual Value)</h4>
                  <ul style={{ margin: 0, paddingLeft: 'var(--space-4)', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    <li><strong>กลุ่ม A / C / D</strong> (เอทีฟ, ยาริส, รีโว่, แชมป์): 48 เดือน = 45% / 60 เดือน = 40%</li>
                    <li><strong>กลุ่ม B</strong> (คัมรี่, อัลติส, ครอส, อินโนวา, ฟอร์จูนเนอร์): 48 เดือน = 40% / 60 เดือน = 35%</li>
                    <li><strong>กลุ่ม bZ4X</strong>: 48 เดือน = 35% / 60 เดือน = 25%</li>
                    <li><strong>กลุ่ม VAN</strong> (รถตู้): 48 เดือน = 35% / 60 เดือน = 30%</li>
                  </ul>
                </div>
                {standardGroups.map((g, i) => {
                  const rateGroup = INTEREST_RATES[g.key];
                  if (!rateGroup.sabaidee) return null;
                  return (
                    <div key={i} className="rates-group-box">
                      <h3 className="rates-group-title">{g.title}</h3>
                      <div style={{ overflowX: 'auto' }}>
                        <table className="car-card-grades-table">
                          <thead>
                            <tr>
                              <th>เงินดาวน์</th>
                              <th>48 เดือน</th>
                              <th>60 เดือน</th>
                            </tr>
                          </thead>
                          <tbody>
                            {rateGroup.sabaidee.map((r, ri) => (
                              <tr key={ri}>
                                <td><strong>{r.down}</strong></td>
                                <td>{r.m48}</td>
                                <td>{r.m60}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })}
              </>
            )}

            {subTabStandard === 'sabaidee7y' && (
              <>
                <h2 className="rates-sec-title">3. อัตราดอกเบี้ยโปรแกรมสบายดี 7 ปี (Sabaidee 7 Years - 84 เดือน)</h2>
                <div className="rates-group-box" style={{ background: 'var(--surface)', border: '1px solid var(--border-light)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-4)' }}>
                  <h4 style={{ margin: '0 0 var(--space-2) 0', color: 'var(--blue)' }}>📊 สัดส่วนยอดคงเหลือสุดท้าย (Residual Value)</h4>
                  <ul style={{ margin: 0, paddingLeft: 'var(--space-4)', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    <li><strong>ยาริส ครอส และ โคโรล่า ครอส</strong>: ยอดคงเหลือสุดท้าย (RV) = <strong>25% (พิเศษ)</strong></li>
                    <li><strong>รุ่นอื่นๆ ทั้งหมด</strong> (เอทีฟ, ยาริส, คัมรี่, ฟอร์จูนเนอร์, อัลติส, อินโนวา, เวลอซ, รีโว่, ทราโว่): RV = <strong>20%</strong></li>
                  </ul>
                </div>
                {standardGroups.map((g, i) => {
                  const rateGroup = INTEREST_RATES[g.key];
                  if (!rateGroup.sabaidee7y) return null;
                  return (
                    <div key={i} className="rates-group-box">
                      <h3 className="rates-group-title">{g.title}</h3>
                      <div style={{ overflowX: 'auto' }}>
                        <table className="car-card-grades-table">
                          <thead>
                            <tr>
                              <th>เงินดาวน์</th>
                              <th>84 เดือน (7 ปี)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {rateGroup.sabaidee7y.map((r, ri) => (
                              <tr key={ri}>
                                <td><strong>{r.down}</strong></td>
                                <td>{r.m84}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
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

            <div style={{ margin: 'var(--space-4) 0' }}>
              <h3 style={{ color: 'var(--blue)', marginBottom: 'var(--space-2)' }}>🚗 กลุ่มรถเก๋ง & SUV ประหยัดน้ำมัน</h3>
              <div className="rates-grid">
                {filteredAdSpecial.map((group, idx) => (
                  <div key={idx} className="rates-group-box">
                    <h3 className="rates-group-title" style={{ color: 'var(--blue)' }}>🏷️ {group.name}</h3>
                    <div style={{ overflowX: 'auto' }}>
                      <table className="car-card-grades-table">
                        <thead>
                          <tr>
                            <th>เงินดาวน์</th>
                            <th>12-48 ด.</th>
                            <th>60 ด.</th>
                            <th>72 ด.</th>
                            <th>84 ด.</th>
                            {group.rates.some(r => r.m96) && <th>96 ด.</th>}
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
                              {group.rates.some(r => r.m96) && <td>{r.m96 || '—'}</td>}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ margin: 'var(--space-5) 0' }}>
              <h3 style={{ color: 'var(--red)', marginBottom: 'var(--space-2)' }}>🛻 กลุ่ม Hilux Revo โฆษณาพิเศษ (หัก DLR)</h3>
              <div className="rates-grid">
                {revoAdRates.map((group, idx) => (
                  <div key={idx} className="rates-group-box">
                    <h3 className="rates-group-title" style={{ color: 'var(--red)' }}>🏷️ {group.name}</h3>
                    <div style={{ overflowX: 'auto' }}>
                      <table className="car-card-grades-table">
                        <thead>
                          <tr>
                            <th>เงินดาวน์</th>
                            <th>12-48 ด.</th>
                            <th>60 ด.</th>
                            <th>72 ด.</th>
                            <th>84 ด.</th>
                            {group.rates.some(r => r.m96) && <th>96 ด.</th>}
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
                              {group.rates.some(r => r.m96) && <td>{r.m96 || '—'}</td>}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ margin: 'var(--space-5) 0' }}>
              <h3 style={{ color: 'var(--orange)', marginBottom: 'var(--space-2)' }}>🌾 กลุ่มพิเศษ Hilux Champ (รวมหอการค้า TCC)</h3>
              <div className="rates-grid">
                {champSpecialRates.map((group, idx) => (
                  <div key={idx} className="rates-group-box">
                    <h3 className="rates-group-title" style={{ color: 'var(--orange)' }}>🏷️ {group.name}</h3>
                    <div style={{ overflowX: 'auto' }}>
                      <table className="car-card-grades-table">
                        <thead>
                          <tr>
                            <th>เงินดาวน์</th>
                            <th>12-48 ด.</th>
                            <th>60 ด.</th>
                            <th>72 ด.</th>
                            <th>84 ด.</th>
                            <th>96 ด.</th>
                            {group.rates.some(r => r.m108) && <th>108 ด.</th>}
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
                              <td>{r.m96 || '—'}</td>
                              {group.rates.some(r => r.m108) && <td>{r.m108 || '—'}</td>}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'discount' && (
          <div className="rates-section">
            <h2 className="rates-sec-title">3. ตารางแคมเปญส่วนลดดอกเบี้ย (Discount Matrix - Dealer Subsidy)</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)', lineHeight: 1.6 }}>
              ตารางสรุปเงินสนับสนุนจากผู้แทนจำหน่าย (Dealer Subsidy) ต่อ **ส่วนลดดอกเบี้ยทุกๆ 0.10%** 
              สำหรับยอดจัดไฟแนนซ์ตั้งแต่ 50,000 - 2,000,000 บาทขึ้นไป (แคมเปญลดดอกเบี้ยสูงสุดไม่เกิน 2.00%)
            </p>
            <div style={{ maxHeight: '600px', overflowY: 'auto', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)' }}>
              <table className="car-card-grades-table" style={{ margin: 0 }}>
                <thead style={{ position: 'sticky', top: 0, background: 'var(--surface)', zIndex: 1 }}>
                  <tr>
                    <th>Step</th>
                    <th>ยอดจัดไฟแนนซ์ (บาท)</th>
                    <th>ผ่อน 48 & 60 เดือน (บ./0.10%)</th>
                    <th>ผ่อน 72 & 84 เดือน (บ./0.10%)</th>
                    <th>ผ่อน 96 & 108 เดือน (บ./0.10%)</th>
                  </tr>
                </thead>
                <tbody>
                  {discountMatrixData.map((row) => (
                    <tr key={row.step}>
                      <td><strong>{row.step}</strong></td>
                      <td>{row.range}</td>
                      <td style={{ color: 'var(--blue)', fontWeight: 600 }}>{row.m48_60.toLocaleString()}</td>
                      <td style={{ color: 'var(--orange)', fontWeight: 600 }}>{row.m72_84.toLocaleString()}</td>
                      <td style={{ color: 'var(--red)', fontWeight: 600 }}>{row.m96_108.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
              <div style={{ overflowX: 'auto' }}>
                <table className="car-card-grades-table">
                  <thead>
                    <tr>
                      <th>รุ่นรถยนต์</th>
                      <th>ประเภทประกันภัย</th>
                      <th>บวกดอกเบี้ยปกติ (TLT Care)</th>
                      <th>บวกดอกเบี้ยขับดี (PHYD)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {insuranceRates.map((r, i) => (
                      <tr key={i}>
                        <td><strong>{r.model}</strong></td>
                        <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{r.code}</td>
                        <td style={{ color: 'var(--red)', fontWeight: 600 }}>{r.tlt}</td>
                        <td style={{ color: 'var(--green)', fontWeight: 600 }}>{r.phyd}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rates-group-box" style={{ background: 'var(--bg-warning)', borderLeft: '3px solid var(--orange)' }}>
              <h3 className="rates-group-title" style={{ color: 'var(--orange)' }}>ℹ️ ข้อมูลแคมเปญและเงื่อนไขลีสซิ่งเพิ่มเติม</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-3)', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                <div>
                  <strong>🌾 โปรแกรมสบายใจ (Sabaijai Program)</strong>:
                  <br />ชำระค่างวดแบบรายปี เริ่มต้นงวดแรกแบบ Beginning เหมาะสำหรับกลุ่มเกษตรกรและธุรกิจที่มีรายได้เป็นรอบรายปี (ลดดอกเบี้ย 0.15% จากตารางดอกเบี้ยปกติ)
                </div>
                <div>
                  <strong>🌾 โปรแกรมสำหรับ TLT & Kubota A-Grade / กลุ่มราชการและอาชีพพิเศษ</strong>:
                  <br />ลดดอกเบี้ยพิเศษ 0.20% สำหรับลูกค้าประวัติดีหรืออาชีพพิเศษ เช่น ข้าราชการ, รัฐวิสาหกิจ, ครู, แพทย์, พยาบาล, วิศวกร
                </div>
                <div>
                  <strong>📅 โปรแกรมสบายประ (Sabaipra Program)</strong>:
                  <br />ชำระค่างวดทุก 3 เดือน หรือทุก 6 เดือน เพื่อเพิ่มความคล่องตัวให้กระแสเงินสดของลูกค้า
                </div>
                <div>
                  <strong>🚕 โปรแกรมรถแท็กซี่ & รถสองแถว (Taxi & On-Air Program)</strong>:
                  <br />อัตราดอกเบี้ยและโปรแกรมการจัดไฟแนนซ์แยกเฉพาะ (อ้างอิงเอกสารหลัก ส่วนที่ 9 และ 10) โดยมีส่วนลดพิเศษตามเงื่อนไขดาวน์และมีผู้ค้ำประกัน
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
