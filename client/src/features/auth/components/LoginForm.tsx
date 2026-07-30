import { Button, Input, Card } from "@heroui/react";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../authThunk";
import { AppDispatch } from "../../../../store/store";
export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(
      loginUser({
        email,
        password,
      }),
    );

    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md rounded-2xl p-8 shadow-lg">
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-sm text-default-500">
              Sign in to continue to your account.
            </p>
          </div>

          {/* Login Form */}
          <form className="space-y-4 space-x-2" onSubmit={handleLogin}>
            <Input
              isRequired
              label="Email"
              placeholder="Enter your email"
              type="email"
              value={email}
              variants="bordered"
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              isRequired
              label="Password"
              placeholder="Enter your password"
              type="password"
              value={password}
              variants="bordered"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button fullWidth color="primary" size="lg" type="submit">
              Sign In
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-default-500">
            Don't have an account?{" "}
            <Link color="primary" to="/signup">
              Create Account
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
