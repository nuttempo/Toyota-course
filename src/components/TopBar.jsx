import { IconMenu, IconX, IconChevronDown, IconChevronUp, IconFile, IconDollar } from './Icons';
import './TopBar.css';

export default function TopBar({ cur, progressPercent, currentModIndex, totalModules, onToggleSidebar, sidebarOpen }) {
  return (
    <header className="topbar" role="banner">
      <button className="topbar-hamburger" onClick={onToggleSidebar} aria-label={sidebarOpen ? 'ปิดเมนู' : 'เปิดเมนู'} aria-expanded={sidebarOpen}>
        {sidebarOpen ? <IconX /> : <IconMenu />}
      </button>
      <div className="topbar-brand"><span className="topbar-brand-accent">TOYOTA</span> <span className="ninda">Ninda</span> รู้จักผลิตภัณฑ์</div>
      <div className="topbar-spacer" />
      {cur > 0 && cur < 99 && (
        <>
          <span className="topbar-progress-text">
            Module {currentModIndex}/{totalModules}
          </span>
          <div className="topbar-progress-wrap" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}>
            <div className="topbar-progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </>
      )}
      {cur === 0 && <span className="topbar-progress-text">คอร์ส</span>}
      {cur === 99 && <span className="topbar-progress-text">สำเร็จ!</span>}
    </header>
  );
}
