import { CARS } from '../data/cars';
import { QUIZ } from '../data/quiz';
import { TIPS } from '../data/tips';
import CarCard from './CarCard';
import Quiz from './Quiz';
import './Lesson.css';

export default function Lesson({ mod, cur, ans, res, onPick, onGo }) {
  const quiz = QUIZ[mod.id] || [];
  const allAnswered = quiz.length ? quiz.every((_, i) => ans[`${mod.id}-${i}`] !== undefined) : true;

  return (
    <div className="lesson" style={{ animation: 'fadeIn 0.4s ease' }}>
      <div className="lesson-header">
        <span className="lesson-badge">MODULE {mod.id}</span>
        <h1 className="lesson-title">{mod.title}</h1>
        <p className="lesson-count">{mod.codes.length} รุ่น</p>
      </div>

      <div className="lesson-cars">
        {mod.codes.map(code => {
          const car = CARS[code];
          if (!car) return null;
          return (
            <CarCard
              key={code}
              code={code}
              car={car}
            />
          );
        })}
      </div>

      {TIPS[mod.id] && (
        <div className="lesson-tip" dangerouslySetInnerHTML={{ __html: TIPS[mod.id] }} />
      )}

      {quiz.length > 0 && (
        <Quiz
          modId={mod.id}
          quiz={quiz}
          ans={ans}
          res={res}
          onPick={onPick}
        />
      )}

      <div className="lesson-nav">
        <button className="btn btn-outline" onClick={() => onGo(mod.id - 1)}>
          ← ก่อนหน้า
        </button>
        <button
          className={`btn ${allAnswered ? 'btn-success' : 'btn-primary'}`}
          onClick={() => {
            if (!allAnswered) { alert('กรุณาตอบ Quiz ทั้งหมดก่อนครับ'); return; }
            if (mod.id === 5) onGo(6);
            else onGo(mod.id + 1);
          }}
        >
          {quiz.length ? (allAnswered ? 'ต่อไป →' : 'ตอบก่อนไปต่อ →') : 'ต่อไป →'}
        </button>
      </div>
    </div>
  );
}
