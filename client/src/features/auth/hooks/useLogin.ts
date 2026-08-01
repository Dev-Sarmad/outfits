import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { loginFormData, loginSchema } from "../validation/authValidationSchema";
import { AppDispatch } from "../../../../store/store";
import { loginUser } from "../authThunk";

import { useAuth } from "./useAuth";

const useLogin = () => {
  const { status } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });
  const dispatch = useDispatch<AppDispatch>();
  const handleLogin = async (data: loginFormData) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      reset();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return { handleLogin, errors, handleSubmit, register, status };
};

export default useLogin;
