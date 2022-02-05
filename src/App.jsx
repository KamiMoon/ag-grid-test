import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      <h2>The App</h2>
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
        }}
      >
        <Link to="/tutorial-grid">Tutorial Grid</Link> | <Link to="/high-frequency-grid">High Frequency Grid</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
