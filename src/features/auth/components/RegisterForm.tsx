import { useState } from "react";
import Button from "../../../components/UI/Button";
import Input from "../../../components/UI/Input";
import { Eye, EyeOff, Key, Lock, Mail, UserPen } from "lucide-react";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const onInputChange = (
    field: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRegisterData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(registerData);
    if (confirmPassword !== registerData.password) {
      return;
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
            value={registerData.name}
            onChange={(e) => onInputChange("name", e)}
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
            className="absolute right-3 top-3 border-0 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? 
              <EyeOff className="w-5 h-5" />
             : 
              <Eye className="w-5 h-5" />
            }
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
            className="absolute right-3 top-3 border-0 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? 
              <EyeOff className="w-5 h-5 " />
             : 
              <Eye className="w-5 h-5" />
            }
          </Button>
        </div>

        <div className="pl-3 pr-6">
          <Button title="Register" className="w-full rounded-lg bg-gray-900  py-3 text-white font-semibold hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
