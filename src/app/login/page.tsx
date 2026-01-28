"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Newspaper, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/src/context/AuthContext";

export default function LoginPage() {

  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  })
  const {setAuthFromServer} = useAuth();

  const [buttonDisable, setButtonDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const onLogin = async(e: React.FormEvent) => {
    e.preventDefault();
    try{
      setLoading(true);
      const res = await axios.post("/api/users/login", user, {withCredentials: true});

      console.log(res);
      console.log(res.data.role);

      const role = res.data.role;

      setAuthFromServer(role);
      
      toast.success("Login successfully");
      router.push("/")
    }catch(err: any){
      toast.error(err.message);
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0){
      setButtonDisable(false);
    }else{
      setButtonDisable(true);
    }
  }, [user])


  return (
    <div className="min-h-screen text-gray-800 bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo & header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-4">
            <Newspaper className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl text-gray-900 mb-2">
            {loading ? "processing" : "Login"}
          </h1>
          <p className="text-gray-600">Log in to Explore more</p>
        </div>

        {/* signup field */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <form onSubmit={onLogin} className="space-y-6">
            {/* email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  placeholder="admin@newsshelter.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>
            {/* password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* error message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Forgot Password Link */}
            <div className="flex justify-between">
              <Link
                href="/reset-password-req"
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Forgot password?
              </Link>
              <Link
                href="/signup"
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Have not an account?
              </Link>
            </div>

            {/* submit button */}
            <button
              type="submit"
              disabled={buttonDisable || loading}
              className={`w-full py-2.5 rounded-lg transition-colors ${
                buttonDisable || loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {loading ? "Logging In..." : "Log In"}
            </button>
          </form>
        </div>
        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
