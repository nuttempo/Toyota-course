import { useMemo } from 'react';
import { IconCheck, IconX } from './Icons';
import './Quiz.css';

export default function Quiz({ modId, quiz, ans, res, onPick }) {
  const allAnswered = useMemo(
    () => quiz.every((_, i) => ans[`${modId}-${i}`] !== undefined),
    [quiz, ans, modId]
  );

  return (
    <div className="quiz-section">
      <h3 className="quiz-title">Quiz</h3>
      <div className="quiz-list">
        {quiz.map((q, qi) => {
          const k = `${modId}-${qi}`;
          const sel = ans[k];
          const r = res[k];
          return (
            <div key={k} className="quiz-card">
              <div className="quiz-question">{qi + 1}. {q.q}</div>
              <div className="quiz-options" role="radiogroup" aria-label={`ข้อ ${qi + 1}`}>
                {q.opts.map((o, oi) => {
                  let cls = 'quiz-option';
                  if (sel === oi && !r) cls += ' quiz-option-selected';
                  if (r && oi === q.a) cls += ' quiz-option-correct';
                  if (r && sel === oi && oi !== q.a) cls += ' quiz-option-wrong';
                  return (
                    <div
                      key={oi}
                      className={cls}
                      role="radio"
                      aria-checked={sel === oi}
                      tabIndex={0}
                      onClick={() => { if (!r) onPick(modId, qi, oi, quiz); }}
                      onKeyDown={e => {
                        if ((e.key === 'Enter' || e.key === ' ') && !r) {
                          e.preventDefault();
                          onPick(modId, qi, oi, quiz);
                        }
                      }}
                    >
                      <div className="quiz-circle">
                        {sel === oi && <div className="quiz-circle-dot" />}
                      </div>
                      <span>{o}</span>
                    </div>
                  );
                })}
              </div>
              {r && (
                <div className={`quiz-result quiz-result-${r}`}>
                  {r === 'correct' ? <><IconCheck /> ถูกต้อง!</> : <><IconX /> ผิด! คำตอบ: {q.opts[q.a]}</>}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {allAnswered && (
        <div className="quiz-all-done"><IconCheck /> ตอบครบทุกข้อแล้ว!</div>
      )}
    </div>
  );
}
