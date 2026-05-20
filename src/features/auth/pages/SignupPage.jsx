import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import Button from "../../../components/ui/Button";

import Input from "../../../components/ui/Input";

import Card from "../../../components/ui/Card";

import {

  signupUser,

} from "../services/authService";


function SignupPage() {

  const navigate = useNavigate();


  // Form state
  const [fullName, setFullName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");


  // Loading state
  const [loading, setLoading] = useState(false);


  // Handle signup form
  async function handleSignup(event) {

    event.preventDefault();

    try {

      setLoading(true);

      await signupUser({

        fullName,

        email,

        password,
      });

      alert("Account created successfully");

      navigate("/login");

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

          <h1 className="text-3xl font-bold mb-6">

            Create Account

          </h1>


          <form
            onSubmit={handleSignup}
            className="space-y-4"
          >

            <Input
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

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

            <Button type="submit">

              {loading ? "Creating..." : "Signup"}

            </Button>

          </form>


          <p className="mt-4 text-sm">

            Already have account?

            <Link
              to="/login"
              className="text-blue-600 ml-1"
            >
              Login
            </Link>

          </p>

        </div>

      </Card>

    </div>
  );
}

export default SignupPage;