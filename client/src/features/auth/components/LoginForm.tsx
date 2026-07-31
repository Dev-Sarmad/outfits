import { Button, Input, Card } from "@heroui/react";
import { Link } from "react-router-dom";

import useLogin from "../hooks/useLogin";
export default function LoginForm() {
  const { handleLogin, handleSubmit, errors, register, status } = useLogin();
  // const {
  //   register,
  //   reset,
  //   formState: { errors },
  //   handleSubmit,
  // } = useForm<loginFormData>({
  //   resolver: zodResolver(loginSchema),
  // });

  // const navigate = useNavigate();
  // const dispatch = useDispatch<AppDispatch>();
  // const handleLogin = async (data: loginFormData) => {
  //   try {
  //     await dispatch(loginUser(data));
  //     reset();
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
          <form
            className="space-y-4 space-x-2"
            onSubmit={handleSubmit(handleLogin)}
          >
            <Input
              isRequired
              label="Email"
              placeholder="Enter your email"
              type="email"
              variants="bordered"
              {...register("email")}
              errorMessage={errors.email?.message}
              isInvalid={!!errors.email}
            />

            <Input
              isRequired
              isInvalid={!!errors.password}
              label="Password"
              placeholder="Enter your password"
              type="password"
              variants="bordered"
              {...register("password")}
              errorMessage={errors.password?.message}
              isInvalid={!!errors.password}
            />
            <Button
              fullWidth
              isDisabled={status === "loading"}
              size="lg"
              type="submit"
            >
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
