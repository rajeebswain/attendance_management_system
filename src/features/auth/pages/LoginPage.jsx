// // export default LoginPage;

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// import { loginUser } from '../services/authService';

// function LoginPage() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState('');

//   const [password, setPassword] = useState('');

//   const [loading, setLoading] = useState(false);

//   async function handleLogin(event) {
//     event.preventDefault();

//     try {
//       setLoading(true);

//       await loginUser(email, password);

//       navigate('/dashboard');
//     } catch (error) {
//       alert(error.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="w-full max-w-md p-8 border rounded-lg">
//         <h1 className="text-3xl font-bold mb-6">Login</h1>

//         <form onSubmit={handleLogin} className="space-y-4">
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
//             disabled={loading}
//             className="w-full bg-blue-600 text-white p-3 rounded"
//           >
//             {loading ? 'Loading...' : 'Login'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;

// React state
import { useState } from "react";


// Navigation
import { Link, useNavigate } from "react-router-dom";


// Reusable UI components
import Button from "../../../components/ui/Button";

import Input from "../../../components/ui/Input";

import Card from "../../../components/ui/Card";


// Authentication service
import {

  loginUser,

} from "../services/authService";


function LoginPage() {

  // Page navigation
  const navigate = useNavigate();


  // Form states
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");


  // Loading state
  const [loading, setLoading] = useState(false);


  // Handle login form submit
  async function handleLogin(event) {

    // Prevent page refresh
    event.preventDefault();

    try {

      setLoading(true);

      // Call login service
      await loginUser({

        email,

        password,
      });

      // Redirect after login
      navigate("/dashboard");

    } catch (error) {

      alert(error.message);

    } finally {

      setLoading(false);
    }
  }


  return (

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-100
      "
    >

      <Card>

        <div className="w-[350px]">

          {/* Page heading */}
          <h1 className="text-3xl font-bold mb-6">

            Login

          </h1>


          {/* Login form */}
          <form
            onSubmit={handleLogin}
            className="space-y-4"
          >

            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />


            {/* Submit button */}
            <Button type="submit">

              {loading ? "Loading..." : "Login"}

            </Button>

          </form>


          {/* Signup redirect */}
          <p className="mt-4 text-sm">

            Don't have an account?

            <Link
              to="/signup"
              className="text-blue-600 ml-1"
            >
              Signup
            </Link>

          </p>

        </div>

      </Card>

    </div>
  );
}

export default LoginPage;
