
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
  // async function handleLogin(event) {

  //   // Prevent page refresh
  //   event.preventDefault();

  //   try {

  //     setLoading(true);

  //     // Call login service
  //     await loginUser({

  //       email,

  //       password,
  //     });

  //     // Redirect after login
  //     navigate("/dashboard");

  //   } catch (error) {

  //     alert(error.message);

  //   } finally {

  //     setLoading(false);
  //   }
  // }

  async function handleLogin(event) {

    event.preventDefault();
  
    try {
  
      setLoading(true);
  
      const result = await loginUser({
  
        email,
  
        password,
  
      });
  
      console.log(
        "LOGIN SUCCESS",
        result
      );
  
      // Give Supabase auth listener time
      setTimeout(() => {
  
        navigate(
          "/dashboard"
        );
  
      }, 500);
  
    } catch (error) {
  
      console.error(
        "LOGIN ERROR",
        error
      );
  
      alert(
        error.message
      );
  
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
