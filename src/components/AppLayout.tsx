import {
  Activity,
  BarChart3,
  Clock3,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Tags,
} from 'lucide-react';
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useDashboard } from '../state/DashboardContext';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/timeline', label: 'Timeline', icon: Clock3 },
  { to: '/apps', label: 'Apps', icon: Tags },
  { to: '/reports', label: 'Reports', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export function AppLayout() {
  const { state } = useDashboard();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className={`app-shell ${isSidebarOpen ? '' : 'sidebar-collapsed'}`}>
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">
            <Activity size={22} />
          </div>
          <div>
            <strong>Digital Balance</strong>
            <span>Activity Analytics</span>
          </div>
        </div>
        <button
          aria-label={isSidebarOpen ? '사이드바 접기' : '사이드바 펼치기'}
          className="sidebar-toggle"
          onClick={() => setIsSidebarOpen((current) => !current)}
          title={isSidebarOpen ? '사이드바 접기' : '사이드바 펼치기'}
          type="button"
        >
          {isSidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
        </button>
        <nav className="nav-list" aria-label="주요 메뉴">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} className="nav-link">
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">Personal Analytics</p>
            <h1>{state.userName}</h1>
          </div>
          <div className="status-pill">
            <span className="status-dot" />
            {state.activeSession ? `${state.activeSession.name} 진행 중` : 'Ready'}
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  );
}
