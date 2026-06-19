import { useState, useMemo, useRef, useEffect } from 'react';
import { useProgress } from './hooks/useProgress';
import { MODULES } from './data/modules';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import Intro from './components/Intro';
import Lesson from './components/Lesson';
import QuizPage from './components/QuizPage';
import Summary from './components/Summary';
import Complete from './components/Complete';
import './App.css';

export default function App() {
  const { cur, ans, res, tq, cq, go, pickAnswer, reset } = useProgress();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mainRef = useRef(null);

  const mod = useMemo(() => MODULES.find(m => m.id === cur) || MODULES[0], [cur]);

  const totalModules = MODULES.filter(m => !m.isIntro && !m.isComplete && !m.isQuiz).length;
  const currentModIndex = useMemo(() => {
    const lessons = MODULES.filter(m => !m.isIntro && !m.isComplete && !m.isQuiz);
    const idx = lessons.findIndex(m => m.id === cur);
    return idx >= 0 ? idx + 1 : 0;
  }, [cur]);

  const progressPercent = useMemo(() => {
    if (cur === 99) return 100;
    const lessons = MODULES.filter(m => !m.isIntro && !m.isComplete && !m.isQuiz);
    const idx = lessons.findIndex(m => m.id === cur);
    if (idx < 0) return 0;
    return Math.round((idx / lessons.length) * 100);
  }, [cur]);

  useEffect(() => {
    if (mainRef.current) {
      const firstHeading = mainRef.current.querySelector('h1, h2, [tabindex="-1"]');
      if (firstHeading) firstHeading.setAttribute('tabindex', '-1');
      mainRef.current.focus();
    }
  }, [cur]);

  const renderContent = () => {
    const Component = cur === 0 ? Intro :
                     cur === 99 ? Complete :
                     mod?.isSummary ? Summary :
                     mod?.isQuiz ? QuizPage : Lesson;

    const key = `slide-${cur}`;

    return (
      <div key={key} style={{ animation: 'fadeIn 400ms cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <Component
          mod={mod}
          cur={cur}
          ans={ans}
          res={res}
          onPick={pickAnswer}
          onGo={go}
          totalQuestions={tq || 1}
          correctQuestions={cq}
          onReset={reset}
        />
      </div>
    );
  };

  return (
    <div className="app-layout">
      <a className="skip-link" href="#main-content" onClick={e => { e.preventDefault(); mainRef.current?.focus(); }}>
        ข้ามไปยังเนื้อหา
      </a>
      <TopBar
        cur={cur}
        progressPercent={progressPercent}
        currentModIndex={currentModIndex}
        totalModules={totalModules}
        onToggleSidebar={() => setSidebarOpen(o => !o)}
        sidebarOpen={sidebarOpen}
      />
      <div className="app-body">
        <Sidebar
          open={sidebarOpen}
          currentId={cur}
          onSelect={(id) => { go(id); setSidebarOpen(false); }}
          ans={ans}
        />
        <main className="app-content" id="main-content" ref={mainRef} tabIndex={-1}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
