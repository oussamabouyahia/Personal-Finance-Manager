import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";

import User from "../type";
type RegistUser = Pick<User, "email" | "password" | "name">;
const Register = () => {
  const [user, setUser] = useState<RegistUser>({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setUser((prev: RegistUser) => ({ ...prev, [name]: value }));
  };
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const isErrorEmail = !isValidEmail(user.email);
  const isErrorName = user.name.length < 3;
  const isErrorPassword = user.password.length < 8;
  const handleSubmit = () => {
    axios
      .post("http://localhost:3001/user", user)
      .then((res) => alert(res.data.message))
      .catch((err) => console.log(err));
  };

  return (
    <form>
      <FormControl>
        <FormLabel>name</FormLabel>
        <Input
          type="text"
          placeholder="your_name"
          name="name"
          value={user.name}
          required
          onChange={handleUserChange}
        />
        {isErrorName ? (
          <FormHelperText>
            minimum of three characters is required for your name
          </FormHelperText>
        ) : (
          <FormErrorMessage></FormErrorMessage>
        )}
      </FormControl>
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
      <div style={{ display: "flex", gap: "20%", margin: "1% 10% auto 10%" }}>
        {" "}
        <Button
          style={{
            width: "30%",
          }}
          colorScheme="blue"
          onClick={handleSubmit}
        >
          Sign up
        </Button>
        <p>
          already have an account
          <span
            style={{
              textDecoration: "underline",
              color: "blue",
              cursor: "pointer",
            }}
            onClick={() => navigate("/login")}
          >
            sign in
          </span>
        </p>
      </div>
    </form>
  );
};

export default Register;
