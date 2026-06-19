import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'toyota-course-progress';

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return { cur: 0, ans: {}, res: {}, tq: 0, cq: 0 };
}

export function useProgress() {
  const [state, setState] = useState(loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const go = useCallback((n) => {
    setState(s => ({ ...s, cur: n }));
  }, []);

  const pickAnswer = useCallback((modId, qi, oi, quizData) => {
    setState(s => {
      if (s.ans[`${modId}-${qi}`] !== undefined) return s;
      const q = quizData[qi];
      const isCorrect = oi === q.a;
      const newAns = { ...s.ans, [`${modId}-${qi}`]: oi };
      const newRes = { ...s.res, [`${modId}-${qi}`]: isCorrect ? 'correct' : 'wrong' };
      return {
        ...s,
        ans: newAns,
        res: newRes,
        tq: s.tq + 1,
        cq: s.cq + (isCorrect ? 1 : 0),
      };
    });
  }, []);

  const reset = useCallback(() => {
    setState({ cur: 0, ans: {}, res: {}, tq: 0, cq: 0 });
  }, []);

  return { ...state, go, pickAnswer, reset };
}
