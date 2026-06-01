import { Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export function LoginPage() {
  return (
    <main className="login-screen">
      <section className="login-panel">
        <div className="brand-mark large">
          <Activity size={30} />
        </div>
        <p className="eyebrow">Sign In</p>
        <h1>Digital Balance Dashboard</h1>
        <p>개인 활동 데이터를 확인하려면 대시보드로 이동하세요.</p>
        <Link className="primary-action" to="/">
          대시보드 입장
        </Link>
      </section>
    </main>
  );
}
