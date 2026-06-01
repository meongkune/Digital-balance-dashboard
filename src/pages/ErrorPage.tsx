import { Link } from 'react-router-dom';

export function ErrorPage() {
  return (
    <main className="login-screen">
      <section className="login-panel">
        <p className="eyebrow">404</p>
        <h1>페이지를 찾을 수 없습니다.</h1>
        <p>잘못된 URL로 접근했을 때 보여주는 오류 화면입니다.</p>
        <Link className="primary-action" to="/">
          홈으로 이동
        </Link>
      </section>
    </main>
  );
}
