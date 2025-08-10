import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, Lock, Shield } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { userLoginSchema, type LoginInputState } from "@/schema/userSchema";
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
    <div className="relative min-h-screen overflow-hidden bg-neutral-900 flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-fuchsia-600/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="w-full max-w-md mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 mb-4 neon-border shadow-fuchsia-500/40">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-neutral-400">Sign in to your secure account</p>
        </div>

        {/* Form */}
        <form
          onSubmit={loginSubmitHandler}
          className="space-y-6 bg-neutral-800/60 backdrop-blur-sm border border-neutral-700 rounded-2xl p-8 neon-border shadow-fuchsia-500/10"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Address
            </label>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={input.email}
              onChange={changeEventHandler}
              className="bg-neutral-700/50 border-neutral-600 text-white placeholder:text-neutral-400 focus:border-cyan-400 focus:ring-cyan-400/20"
            />
            {errors.email && (
              <span className="text-sm text-red-400">{errors.email}</span>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Password
            </label>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={input.password}
              onChange={changeEventHandler}
              className="bg-neutral-700/50 border-neutral-600 text-white placeholder:text-neutral-400 focus:border-cyan-400 focus:ring-cyan-400/20"
            />
            {errors.password && (
              <span className="text-sm text-red-400">{errors.password}</span>
            )}
          </div>

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-fuchsia-400 hover:text-fuchsia-300 transition-colors hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {loading ? (
            <Button disabled className="w-full bg-neutral-700 text-neutral-400">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white font-semibold hover:shadow-lg hover:shadow-fuchsia-500/25 neon-border shadow-fuchsia-500/30 transition-all"
            >
              Sign In
            </Button>
          )}

          <Separator className="bg-neutral-700" />

          <p className="text-center text-neutral-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-fuchsia-400 hover:text-fuchsia-300 font-medium transition-colors hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
