import { useState } from "react";
import Button from "../../../components/UI/Button";
import Input from "../../../components/UI/Input";
import { Eye, EyeOff, Key, Lock, Mail, UserPen } from "lucide-react";
import { registerFormSchema } from "../../../shared/validations/registerFormValidation";
import toast from "react-hot-toast";
import { authAPI } from "../../../api/authApi";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [registerData, setRegisterData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  const onInputChange = (
    field: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRegisterData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = registerFormSchema.safeParse(registerData);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    if (confirmPassword !== registerData.password) {
      setError("password and confirm password should match");
      return;
    }

    try {
      await authAPI.register(registerData);
      navigate("/otp", { state : {email: registerData.email} });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="relative p-5">
          <UserPen className="absolute left-8 top-8 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={registerData.userName}
            onChange={(e) => onInputChange("userName", e)}
            className="pl-10"
          />
        </div>

        <div className="relative p-5">
          <Mail className="absolute left-8 top-8 w-5 h-5 text-gray-400" />
          <Input
            type="email"
            name="email"
            placeholder="Enter Email..."
            value={registerData.email}
            onChange={(e) => onInputChange("email", e)}
            className="pl-10"
          />
        </div>

        <div className="relative p-5">
          <Lock className="absolute left-8 top-8 w-5 h-5 text-gray-400" />
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter Password"
            value={registerData.password}
            onChange={(e) => onInputChange("password", e)}
            className="pl-10"
          />
          <Button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute border-0 right-3 top-8 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </Button>
        </div>

        <div className="relative p-5">
          <Key className="absolute left-8 top-8 w-5 h-5 text-gray-400" />
          <Input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Enter Password Again"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="pl-10"
          />
          <Button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute border-0 right-3 top-8 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5 " />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </Button>
        </div>

        <div className="pl-3 pr-6 text-center">
          <span className="w-full  text-red-600">{error}</span>
          <Button
            title="Register"
            className="w-full bg-gray-900 text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
