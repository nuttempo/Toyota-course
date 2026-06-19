import { CARS } from '../data/cars';
import { TIPS } from '../data/tips';
import { IconArrowLeft, IconBook } from './Icons';
import CarCard from './CarCard';
import './Lesson.css';

export default function Lesson({ mod, cur, ans, onGo }) {
  return (
    <div className="lesson" style={{ animation: 'fadeIn 400ms cubic-bezier(0.16, 1, 0.3, 1)' }}>
      <div className="lesson-header">
        <span className="lesson-badge">MODULE {mod.id}</span>
        <h1 className="lesson-title">{mod.title}</h1>
        <p className="lesson-count">{mod.codes.length} รุ่น</p>
      </div>

      <div className="lesson-cars">
        {mod.codes.map(code => {
          const car = CARS[code];
          if (!car) return null;
          return <CarCard key={code} code={code} car={car} />;
        })}
      </div>

      {TIPS[mod.id] && <div className="lesson-tip" dangerouslySetInnerHTML={{ __html: TIPS[mod.id] }} />}

      <div className="lesson-nav">
        <button className="btn btn-outline" onClick={() => onGo(mod.id === 1 ? 0 : mod.id - 1)}>
          <IconArrowLeft /> ก่อนหน้า
        </button>
        <button className="btn btn-primary" onClick={() => onGo(mod.id + 100)}>
          <IconBook /> ไปทำแบบทดสอบ
        </button>
      </div>
    </div>
  );
}
