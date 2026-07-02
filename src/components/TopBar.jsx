import { IconMenu, IconX } from './Icons';
import './TopBar.css';

export default function TopBar({ onToggleSidebar, sidebarOpen }) {
  return (
    <header className="topbar" role="banner">
      <button className="topbar-hamburger" onClick={onToggleSidebar} aria-label={sidebarOpen ? 'ปิดเมนู' : 'เปิดเมนู'} aria-expanded={sidebarOpen}>
        {sidebarOpen ? <IconX /> : <IconMenu />}
      </button>
      <div className="topbar-brand">
        <span className="topbar-brand-accent">TOYOTA</span> <span className="ninda">Ninda</span> คู่มือเซลล์ (Sales Manual)
      </div>
      <div className="topbar-spacer" />
    </header>
  );
}
