import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import {
  signUpSchema,
  signUpFormData,
} from "../validation/authValidationSchema";
import { AppDispatch } from "../../../../store/store";
import { signUpUser } from "../authThunk";

import { useAuth } from "./useAuth";

const useSignUp = () => {
  const navigate = useNavigate();
  const { status } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onTouched",
  });

  const handleSignUp = async (data: signUpFormData) => {
    console.log("FORM DATA:", data);

    try {
      const { confirmPassword, ...credentials } = data;

      console.log("API PAYLOAD:", credentials);

      await dispatch(signUpUser(credentials)).unwrap();

      reset();
      navigate("/login");
    } catch (error) {
      console.error("SIGNUP ERROR:", error);
    }
  };

  return {
    handleSignUp,
    errors,
    handleSubmit,
    register,
    status,
  };
};

export default useSignUp;
