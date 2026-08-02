import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signUpSchema } from "../validation/authValidationSchema";
import { AppDispatch } from "../../../../store/store";
import { signUpUser } from "../authThunk";
import { SignUpPayload } from "../api/authApi";

import { useAuth } from "./useAuth";

const useSignUp = () => {
  const { status } = useAuth();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpSchema>({
    resolver: zodResolver(signUpSchema),
    mode: "onTouched",
  });
  const dispatch = useDispatch<AppDispatch>();
  const handleSignUp = async (data: SignUpPayload) => {
    try {
      await dispatch(signUpUser(data)).unwrap();
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return { handleSignUp, errors, handleSubmit, register, status };
};

export default useSignUp;
