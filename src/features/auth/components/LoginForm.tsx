"use client";

import type React from "react";

import { useState } from "react";
import Button from "../../../components/UI/Button";
import Input from "../../../components/UI/Input";
import toast from "react-hot-toast";
import { authAPI } from "../../../api/authApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../authSlice";
import { loginFormSchema } from "../../../shared/validations/loginFormValidation";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = loginFormSchema.safeParse(loginData);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    console.log(loginData);

    try {
      const user = await authAPI.login(loginData);
      dispatch(setCredentials(user));
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Input */}
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="email"
            placeholder="Email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border-0 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>

        {/* Password Input */}
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
            className="w-full pl-11 pr-12 py-3 bg-gray-50 border-0 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          <Button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 border-0 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Forgot Password
            <div className="text-right">
              <Button type="button" className="text-sm border-0 text-gray-600 hover:text-gray-900" title="Forgot Password" />
                
            </div> */}

        {/* Submit Button */}
        <div className="pl-3 pr-6 text-center">
            <span className="w-full text-red-600">{error}</span>
          <Button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
            title="Login"
          />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
