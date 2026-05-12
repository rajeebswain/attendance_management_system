// export default LoginPage;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { loginUser } from '../services/authService';

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();

    try {
      setLoading(true);

      await loginUser(email, password);

      navigate('/dashboard');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 border rounded-lg">
        <h1 className="text-3xl font-bold mb-6">Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded"
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
