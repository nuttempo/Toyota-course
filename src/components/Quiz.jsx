import { useMemo } from 'react';
import './Quiz.css';

export default function Quiz({ modId, quiz, ans, res, onPick }) {
  const allAnswered = useMemo(
    () => quiz.every((_, i) => ans[`${modId}-${i}`] !== undefined),
    [quiz, ans, modId]
  );

  return (
    <div className="quiz-section">
      <h3 className="quiz-title">✏️ Quiz</h3>
      <div className="quiz-list">
        {quiz.map((q, qi) => {
          const k = `${modId}-${qi}`;
          const sel = ans[k];
          const r = res[k];
          return (
            <div key={k} className="quiz-card">
              <div className="quiz-question">{qi + 1}. {q.q}</div>
              <div className="quiz-options">
                {q.opts.map((o, oi) => {
                  let cls = 'quiz-option';
                  if (sel === oi && !r) cls += ' quiz-option-selected';
                  if (r && oi === q.a) cls += ' quiz-option-correct';
                  if (r && sel === oi && oi !== q.a) cls += ' quiz-option-wrong';
                  return (
                    <div
                      key={oi}
                      className={cls}
                      onClick={() => {
                        if (!r) onPick(modId, qi, oi, quiz);
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
                  {r === 'correct' ? '✅ ถูกต้อง!' : `❌ ผิด! คำตอบ: ${q.opts[q.a]}`}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {allAnswered && (
        <div className="quiz-all-done">✓ ตอบครบทุกข้อแล้ว!</div>
      )}
    </div>
  );
}
