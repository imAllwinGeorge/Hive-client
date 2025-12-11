import { useState } from "react"
import Button from "../../../components/UI/Button"
import Input from "../../../components/UI/Input"
import Label from "../../../components/UI/Label"

const LoginForm = () => {
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    const onInputChange = (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData((prev) => ({...prev, [field]: e.target.value}))
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log(loginData)
    }
  return (
    <div>
        <form onSubmit={(e) =>handleSubmit(e)}>
            <div>
                <Label htmlFor="email" title="Email" />
                <Input type="email" name="email" placeholder="Enter Email..." value={loginData.email} onChange={(e) =>onInputChange("email", e)} />
            </div>

            <div>
                <Label htmlFor="password" title="Password" />
                <Input type="password" name="password" placeholder="Enter Password" value={loginData.password} onChange={(e) => onInputChange("password", e)} />
            </div>

            <Button title="Login" className="" type="submit"  />
        </form>
    </div>
  )
}

export default LoginForm