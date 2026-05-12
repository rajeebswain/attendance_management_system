// import { useState } from "react";

// function SignupPage() {

//   const [fullName, setFullName] = useState("");

//   const [email, setEmail] = useState("");

//   const [password, setPassword] = useState("");

//   return (
//     <div className="min-h-screen flex items-center justify-center">

//       <div className="w-full max-w-md border p-8 rounded-lg">

//         <h1 className="text-3xl font-bold mb-6">
//           Create Account
//         </h1>

//         <form className="space-y-4">

//           <input
//             type="text"
//             placeholder="Full Name"
//             className="w-full border p-3 rounded"
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//           />

//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full border p-3 rounded"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full border p-3 rounded"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <button
//             className="w-full bg-green-600 text-white p-3 rounded"
//           >
//             Create Account
//           </button>

//         </form>

//       </div>

//     </div>
//   );
// }

// export default SignupPage;

import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { signupUser } from '../services/authService';

function SignupPage() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleSignup(event) {
    event.preventDefault();

    try {
      setLoading(true);

      await signupUser({
        fullName,
        email,
        password,
      });

      alert('Account created successfully');

      navigate('/login');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md border p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-6">Create Account</h1>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-3 rounded"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

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
            className="w-full bg-green-600 text-white p-3 rounded"
          >
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
