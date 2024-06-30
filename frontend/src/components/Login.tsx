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
import { useNavigate } from "react-router-dom";
type LoginUser = Pick<User, "email" | "password">;
const Login = () => {
  const [user, setUser] = useState<LoginUser>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
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
      .then((res) => {
        alert(res.data.message);
        setUser({ email: "", password: "" });
        localStorage.setItem("accessToken", res.data.accessToken);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  return (
    <form>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          name="email"
          placeholder="your email here"
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
          placeholder="your password here"
          onChange={handleUserChange}
          required
        />
        {isErrorPassword ? (
          <FormHelperText>your valid password is required</FormHelperText>
        ) : (
          <FormErrorMessage></FormErrorMessage>
        )}
      </FormControl>
      <div style={{ display: "flex", gap: "20%", margin: "1% 10% auto 10%" }}>
        {" "}
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
        <p>
          I don't have an account
          <span
            style={{
              textDecoration: "underline",
              color: "blue",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            register
          </span>
        </p>
      </div>
    </form>
  );
};

export default Login;
