import './TopBar.css';

export default function TopBar({ cur, mod, progressPercent, currentModIndex, totalModules, onToggleSidebar, sidebarOpen }) {
  return (
    <div className="topbar">
      <button className="topbar-hamburger" onClick={onToggleSidebar} aria-label="Toggle menu">
        {sidebarOpen ? '✕' : '☰'}
      </button>
      <div className="topbar-brand"><span className="topbar-brand-accent">TOYOTA</span> รู้จักผลิตภัณฑ์</div>
      <div className="topbar-spacer" />
      {cur > 0 && cur < 99 && (
        <>
          <div className="topbar-progress-text">
            Module {currentModIndex}/{totalModules}
          </div>
          <div className="topbar-progress-wrap">
            <div className="topbar-progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </>
      )}
      {cur === 0 && (
        <div className="topbar-progress-text">คอร์ส</div>
      )}
      {cur === 99 && (
        <div className="topbar-progress-text">สำเร็จ! 🎉</div>
      )}
    </div>
  );
}
