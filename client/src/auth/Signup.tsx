import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, User, Mail, Lock, Phone, Shield } from "lucide-react";
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

  const signupSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const result = userSignupSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors as Partial<SignupInputState>);
      return;
    }
    try {
      await signup(input);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-900 flex items-center justify-center py-12">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 h-96 w-96 rounded-full bg-fuchsia-600/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/3 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-md mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 mb-4 neon-border shadow-fuchsia-500/40">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-2">
            Create Account
          </h1>
          <p className="text-neutral-400">Join the privacy-first platform</p>
        </div>

        {/* Form */}
        <form
          onSubmit={signupSubmitHandler}
          className="space-y-6 bg-neutral-800/60 backdrop-blur-sm border border-neutral-700 rounded-2xl p-8 neon-border shadow-fuchsia-500/10"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
              <User className="h-4 w-4" />
              Full Name
            </label>
            <Input
              type="text"
              name="fullname"
              placeholder="Enter your full name"
              value={input.fullname}
              onChange={changeEventHandler}
              className="bg-neutral-700/50 border-neutral-600 text-white placeholder:text-neutral-400 focus:border-cyan-400 focus:ring-cyan-400/20"
            />
            {errors.fullname && (
              <span className="text-sm text-red-400">{errors.fullname}</span>
            )}
          </div>

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
              placeholder="Create a strong password"
              value={input.password}
              onChange={changeEventHandler}
              className="bg-neutral-700/50 border-neutral-600 text-white placeholder:text-neutral-400 focus:border-cyan-400 focus:ring-cyan-400/20"
            />
            {errors.password && (
              <span className="text-sm text-red-400">{errors.password}</span>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone Number
            </label>
            <Input
              type="text"
              name="contact"
              placeholder="Enter your phone number"
              value={input.contact}
              onChange={changeEventHandler}
              className="bg-neutral-700/50 border-neutral-600 text-white placeholder:text-neutral-400 focus:border-cyan-400 focus:ring-cyan-400/20"
            />
            {errors.contact && (
              <span className="text-sm text-red-400">{errors.contact}</span>
            )}
          </div>

          {loading ? (
            <Button disabled className="w-full bg-neutral-700 text-neutral-400">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Creating account...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white font-semibold hover:shadow-lg hover:shadow-fuchsia-500/25 neon-border shadow-fuchsia-500/30 transition-all"
            >
              Create Account
            </Button>
          )}

          <Separator className="bg-neutral-700" />

          <p className="text-center text-neutral-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-fuchsia-400 hover:text-fuchsia-300 font-medium transition-colors hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
