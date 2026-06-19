import { IconArrowRight, IconBook, IconTarget } from './Icons';
import { CARS } from '../data/cars';
import { QUIZ } from '../data/quiz';
import './Intro.css';

const MODULE_COUNT = 6;
const CAR_COUNT = Object.keys(CARS).length;
const QUIZ_COUNT = Object.values(QUIZ).reduce((sum, qs) => sum + qs.length, 0);
const PDF_COUNT = 32;

export default function Intro({ onGo }) {
  return (
    <div className="intro-card">
      <div className="intro-hero">
        <div className="intro-logo">
          <span className="intro-logo-accent">TOYOTA</span> <span className="ninda intro-ninda">Ninda</span>
        </div>
        <h1 className="intro-title">รู้จักผลิตภัณฑ์ทั้งหมด</h1>
        <p className="intro-subtitle">{MODULE_COUNT} Module · {CAR_COUNT} รุ่น · ข้อมูลจริงจาก Toyota Thailand</p>

        <div className="intro-stats">
          <div className="intro-stat">
            <div className="intro-stat-num">{MODULE_COUNT}</div>
            <div className="intro-stat-label">Module</div>
          </div>
          <div className="intro-stat">
            <div className="intro-stat-num">{CAR_COUNT}</div>
            <div className="intro-stat-label">รุ่น</div>
          </div>
          <div className="intro-stat">
            <div className="intro-stat-num">{QUIZ_COUNT}</div>
            <div className="intro-stat-label">Quiz</div>
          </div>
          <div className="intro-stat">
            <div className="intro-stat-num">{PDF_COUNT}</div>
            <div className="intro-stat-label">PDF</div>
          </div>
        </div>

        <div className="intro-info-box">
          <strong><IconTarget /> สำหรับมือใหม่</strong><br />
          <strong>เบนซิน</strong> = เติมน้ำมันเหมือนรถทั่วไป<br />
          <strong>Hybrid (HEV)</strong> = เบนซิน + มอเตอร์ไฟฟ้า <span className="intro-info-green">ประหยัดกว่า ไม่ต้องชาร์จ</span><br />
          <strong>EV</strong> = ไฟฟ้า 100% <span className="intro-info-green">เสียบชาร์จ ไม่ต้องเติมน้ำมัน</span><br />
          <strong>ดีเซล</strong> = เติมน้ำมันดีเซล <span className="intro-info-brown">แรงบิดสูง เหมาะกับรถบรรทุก กระบะ</span><br />
          <strong>SUV</strong> = รถสูงเอนกประสงค์ · <strong>PPV</strong> = รถแกร่งโครงสร้างกระบะ<br />
          <strong>GR</strong> = รุ่นสปอร์ตสมรรถนะสูง โดยทีม Gazoo Racing
        </div>

        <button className="intro-start-btn" onClick={() => onGo(1)}>
          เริ่มเรียน <IconArrowRight />
        </button>
      </div>
    </div>
  );
}
