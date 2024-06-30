import { useState } from "react";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import User from "../type";
type LoginUser = Pick<User, "email" | "password">;
const Login = () => {
  const [user, setUser] = useState<LoginUser>({
    email: "",
    password: "",
  });
  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setUser((prev: LoginUser) => ({ ...prev, [name]: value }));
  };
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const isErrorEmail = !isValidEmail(user.email);
  const isErrorPassword = user.password.length < 8;
  const handleLogin = () => {
    axios
      .post("http://localhost:3001/user/login", user)
      .then((res) => alert(res.data.message))
      .catch((err) => alert(err.message));
  };

  return (
    <form>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          name="email"
          value={user.email}
          onChange={handleUserChange}
        />
        {isErrorEmail ? (
          <FormHelperText>Valid Email is required.</FormHelperText>
        ) : (
          <FormErrorMessage></FormErrorMessage>
        )}
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          type="text"
          name="password"
          value={user.password}
          placeholder="your_password"
          onChange={handleUserChange}
          required
        />
        {isErrorPassword ? (
          <FormHelperText>
            minimum eight characters is required for your password
          </FormHelperText>
        ) : (
          <FormErrorMessage></FormErrorMessage>
        )}
      </FormControl>
      <Button
        style={{
          marginTop: "2%",
          width: "80%",
        }}
        colorScheme="blue"
        onClick={handleLogin}
      >
        Login
      </Button>
    </form>
  );
};

export default Login;
