import authApi from "@/api/authApi";
import { useAppDispatch, useAppSelector } from "@/hooks/common";
import { selectAuth, setIsLogin } from "@/redux/slice/authSlice";
import React from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

const LoginPage: React.FunctionComponent = () => {
  const { isLogin } = useAppSelector(selectAuth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useAppDispatch();
  const onSubmit = async (data: any) => {
    const { ok, body, error } = await authApi.login(data);
    if (ok && body) {
      dispatch(setIsLogin());
      localStorage.setItem("access-token", body.accessToken);
      localStorage.setItem("refresh-token", body.refreshToken);
    }
  };

  if (isLogin) {
    return <Navigate to='/'/>;
  }

  return (
    <div className="login-form-wrapper">
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <h2 className="form-title">Login</h2>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            {...register("username", { required: "Username is required" })}
            className={`form-input ${errors.username ? "has-error" : ""}`}
          />
          {errors.username && <p className="error-message"></p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
            className={`form-input ${errors.password ? "has-error" : ""}`}
          />
          {errors.password && <p className="error-message"></p>}
        </div>

        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
