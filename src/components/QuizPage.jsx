import { useMemo } from 'react';
import { QUIZ } from '../data/quiz';
import { IconArrowLeft, IconArrowRight, IconCheck, IconBook } from './Icons';
import Quiz from './Quiz';
import './QuizPage.css';

export default function QuizPage({ mod, cur, ans, res, onPick, onGo }) {
  const quiz = QUIZ[mod.quizId] || [];
  const allAnswered = useMemo(
    () => quiz.length ? quiz.every((_, i) => ans[`${mod.quizId}-${i}`] !== undefined) : true,
    [quiz, ans, mod.quizId]
  );

  const nextLabel = mod.quizId === 5 ? 'ดูสรุป' : 'Module ถัดไป';
  const nextTarget = mod.quizId === 5 ? 6 : mod.quizId + 1;

  return (
    <div className="quizpage" style={{ animation: 'fadeIn 400ms cubic-bezier(0.16, 1, 0.3, 1)' }}>
      <div className="quizpage-header">
        <span className="quizpage-badge">QUIZ M{mod.quizId}</span>
        <h1 className="quizpage-title">{mod.title}</h1>
        <p className="quizpage-count">{quiz.length} ข้อ</p>
      </div>

      <Quiz modId={mod.quizId} quiz={quiz} ans={ans} res={res} onPick={onPick} />

      <div className="quizpage-nav">
        <button className="btn btn-outline" onClick={() => onGo(mod.quizId)}>
          <IconArrowLeft /> กลับไปเรียนรู้
        </button>
        <button
          className={`btn ${allAnswered ? 'btn-success' : 'btn-primary'}`}
          disabled={!allAnswered}
          onClick={() => {
            if (!allAnswered) { alert('กรุณาตอบ Quiz ให้ครบก่อนครับ'); return; }
            onGo(nextTarget);
          }}
        >
          <IconBook /> {nextLabel} <IconArrowRight />
        </button>
      </div>
    </div>
  );
}
