import { Button, Input, Card, ErrorMessage } from "@heroui/react";
import { Link } from "react-router-dom";

import useSignUp from "../hooks/useSignUp";
export default function SignUpForm() {
  const { handleSignUp, errors, register, handleSubmit } = useSignUp();

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md rounded-2xl p-8 shadow-lg">
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Welcome Outfits</h1>
            <p className="text-sm text-default-500">
              Sign Up to continue to your account.
            </p>
          </div>

          {/* Login Form */}
          <form
            className="space-y-4 space-x-2"
            onSubmit={handleSubmit(handleSignUp)}
          >
            <Input
              isRequired
              label="Name"
              placeholder="Enter your name"
              type="text"
              variant="bordered"
              {...register("name")}
              isInvalid={!!errors.name}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            <Input
              isRequired
              label="Email"
              placeholder="Enter your email"
              type="email"
              variant="bordered"
              {...register("email")}
              isInvalid={!!errors.email}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}

            <Input
              isRequired
              label="Password"
              placeholder="Enter your password"
              type="password"
              variant="bordered"
              {...register("password")}
              isInvalid={!!errors.password}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
            <Button fullWidth size="lg" type="submit">
              Sign Up
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-default-500">
            Already have an account?{" "}
            <Link color="primary" to="/login">
              Login Account
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
