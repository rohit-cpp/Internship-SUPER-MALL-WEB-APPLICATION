import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  userLoginSchema,
  userSignupSchema,
  type LoginInputState,
} from "@/schema/userSchema";
import { useUserStore } from "@/store/useUserStore";

const Login = () => {
  const [input, setInput] = useState<LoginInputState>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginInputState>>({});
  const { loading, login } = useUserStore();
  const navigate = useNavigate();
  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const loginSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const result = userLoginSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors as Partial<LoginInputState>);
      return;
    }
    try {
      await login(input);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={loginSubmitHandler}
        className="md:p-8  w-full max-w-md  mx-4"
      >
        <div className="mt-2">
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={input.email}
            onChange={changeEventHandler}
          />
          {errors && (
            <span className="text-sm text-red-500">{errors.email}</span>
          )}
        </div>

        <div className="mt-2">
          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={input.password}
            onChange={changeEventHandler}
          />
          {errors && (
            <span className="text-sm text-red-500">{errors.password}</span>
          )}
        </div>
        <div className="mt-4">
          {loading ? (
            <Button disabled>
              <Loader2 className="h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <div className="mt-5">
              <Button className="w-full" type="submit">
                login
              </Button>
            </div>
          )}
          <div className="pt-4 text-blue-500 hover:underline">
            <Link to="/forgot-password">Forgot password</Link>
          </div>
        </div>

        <Separator className="mt-4" />
        <p>
          Dont have an account?{" "}
          <Link to="/signup" className=" ml-2 text-blue-500">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
