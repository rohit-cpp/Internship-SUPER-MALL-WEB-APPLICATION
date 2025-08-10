import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Lock, Shield, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const loading = false;

  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-900 flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 h-96 w-96 rounded-full bg-fuchsia-600/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl animate-pulse delay-1500" />
      </div>

      <div className="w-full max-w-md mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 mb-4 neon-border shadow-fuchsia-500/40">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-2">
            Set New Password
          </h1>
          <p className="text-neutral-400">Enter your new secure password</p>
        </div>

        {/* Form */}
        <form className="space-y-6 bg-neutral-800/60 backdrop-blur-sm border border-neutral-700 rounded-2xl p-8 neon-border shadow-fuchsia-500/10">
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
              <Lock className="h-4 w-4" />
              New Password
            </label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              className="bg-neutral-700/50 border-neutral-600 text-white placeholder:text-neutral-400 focus:border-cyan-400 focus:ring-cyan-400/20"
            />
          </div>

          {loading ? (
            <Button disabled className="w-full bg-neutral-700 text-neutral-400">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating password...
            </Button>
          ) : (
            <Button className="w-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white font-semibold hover:shadow-lg hover:shadow-fuchsia-500/25 neon-border shadow-fuchsia-500/30 transition-all">
              Update Password
            </Button>
          )}

          <Link
            to="/login"
            className="flex items-center justify-center gap-2 text-neutral-400 hover:text-fuchsia-400 transition-colors font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
