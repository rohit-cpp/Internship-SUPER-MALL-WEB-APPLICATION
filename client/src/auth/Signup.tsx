import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { userSignupSchema, type SignupInputState } from "@/schema/userSchema";
import { useUserStore } from "@/store/useUserStore";

const Signup = () => {
  const [input, setInput] = useState<SignupInputState>({
    fullname: "",
    email: "",
    password: "",
    contact: "",
  });
  const [errors, setErrors] = useState<Partial<SignupInputState>>({});
  const { signup, loading } = useUserStore();
  const navigate = useNavigate();
  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const loginSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    //form validation start
    const result = userSignupSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors as Partial<SignupInputState>);
      return;
    } // login api implemetation
    try {
      await signup(input);
      // navigate("/verify-email");
      navigate("/");
    } catch (error) {
      console.log(error);
    }

    console.log(input);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={loginSubmitHandler}
        className="md:p-8  w-full max-w-md  mx-4"
      >
        <div className="mt-2">
          <Input
            type="text"
            name="fullname"
            placeholder="Enter your Fullname"
            value={input.fullname}
            onChange={changeEventHandler}
          />
          {errors && (
            <span className="text-sm text-red-500">{errors.fullname}</span>
          )}
        </div>
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
        <div className="mt-2">
          <Input
            type="text"
            name="contact"
            placeholder="Enter your Phone Number"
            value={input.contact}
            onChange={changeEventHandler}
          />
          {errors && (
            <span className="text-sm text-red-500">{errors.contact}</span>
          )}
        </div>

        <div className="mt-4">
          {loading ? (
            <Button disabled>
              <Loader2 className=" h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <div className="mt-5">
              <Button type="submit">Signup</Button>
            </div>
          )}
        </div>

        <Separator className="mt-4" />
        <p>
          Already have an account?{" "}
          <Link to="/login" className=" ml-2 text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
