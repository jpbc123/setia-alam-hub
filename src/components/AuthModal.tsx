import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { supabase } from "@/lib/supabaseClient";
import { FcGoogle } from "react-icons/fc";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "signin" | "signup";
  onModeChange: (mode: "signin" | "signup") => void;
}

export const AuthModal = ({
  isOpen,
  onClose,
  mode,
  onModeChange,
}: AuthModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (mode === "signup") {
      if (password !== confirmPassword) {
        setErrorMsg("Passwords do not match.");
        return;
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
        },
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        onClose();
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        onClose();
      }
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md z-[9999]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            {mode === "signin" ? "Welcome Back!" : "Join My Setia Alam"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {mode === "signin"
              ? "Sign in to access your community features"
              : "Create your account to connect with your neighbors"}
          </DialogDescription>
        </DialogHeader>

        <Card className="border-0 shadow-none">
          <CardContent className="p-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="focus:ring-community-green focus:border-community-green"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="focus:ring-community-green focus:border-community-green"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="focus:ring-community-green focus:border-community-green"
                />
              </div>

              {mode === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="focus:ring-community-green focus:border-community-green"
                  />
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-hero hover:opacity-90"
              >
                {mode === "signin" ? "Sign In" : "Create Account"}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>

              {/* Google Sign-in Button */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
                  title="Continue with Google"
                >
                  <FcGoogle className="text-2xl" />
                </button>
              </div>

              {errorMsg && (
                <div className="text-red-600 text-sm text-center">{errorMsg}</div>
              )}
            </form>

            <div className="mt-6 text-center text-sm">
              {mode === "signin" ? (
                <p>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => onModeChange("signup")}
                    className="font-medium text-community-green hover:text-community-green/80"
                  >
                    Sign up here
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => onModeChange("signin")}
                    className="font-medium text-community-green hover:text-community-green/80"
                  >
                    Sign in here
                  </button>
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
