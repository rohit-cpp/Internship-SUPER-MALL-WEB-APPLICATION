import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/useUserStore";
import { Loader2, Shield, Mail } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const inputRef = useRef<any>([]);
  const { loading, verifyEmail } = useUserStore();
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);

  const handleChange = (index: number, value: string) => {
    if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }

    if (value !== "" && index < 5) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const verificationCode: string = otp.join("");

    try {
      await verifyEmail(verificationCode);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-900 flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 h-96 w-96 rounded-full bg-fuchsia-600/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-md mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 mb-4 neon-border shadow-fuchsia-500/40">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-2">
            Verify Your Email
          </h1>
          <p className="text-neutral-400">
            Enter the 6-digit code sent to your email address
          </p>
        </div>

        {/* Form */}
        <div className="bg-neutral-800/60 backdrop-blur-sm border border-neutral-700 rounded-2xl p-8 neon-border shadow-fuchsia-500/10">
          <form onSubmit={submitHandler} className="space-y-8">
            {/* OTP Input Grid */}
            <div className="flex justify-center gap-3">
              {otp.map((letter: string, idx: number) => (
                <Input
                  key={idx}
                  ref={(element) => {
                    inputRef.current[idx] = element;
                  }}
                  type="text"
                  maxLength={1}
                  value={letter}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(idx, e.target.value)
                  }
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                    handleKeyDown(idx, e)
                  }
                  className="w-12 h-12 text-center text-xl font-bold rounded-lg bg-neutral-700/50 border-neutral-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20 neon-border shadow-cyan-500/10"
                />
              ))}
            </div>

            {loading ? (
              <Button
                disabled
                className="w-full bg-neutral-700 text-neutral-400"
              >
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Verifying...
              </Button>
            ) : (
              <Button className="w-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white font-semibold hover:shadow-lg hover:shadow-fuchsia-500/25 neon-border shadow-fuchsia-500/30 transition-all">
                Verify Email
              </Button>
            )}
          </form>

          {/* Resend Link */}
          <div className="mt-6 text-center">
            <p className="text-neutral-400 text-sm">
              Didn't receive the code?{" "}
              <button className="text-fuchsia-400 hover:text-fuchsia-300 font-medium transition-colors hover:underline">
                Resend Code
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
