"use client"
import { useState, useEffect } from "react";
import Link from "next/link"
import { Newspaper, Mail, Lock, Eye, EyeOff, User, UserRound } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"

export default function SignupPage(){

  const Router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
    fullname: "",
  })
  const [buttonDisable, setButtonDisable] = useState(false)

  const [loading, setLoading] = useState(false)

  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  // const [name, setName] = useState('')
  const [error, setError] = useState('')

  const onSignup = async(e: React.FormEvent) => {
    e.preventDefault();
    try{
      setLoading(true);
      const response = await axios.post("/api/users/signup", user)

      console.log("signup success", response.data);
      Router.push("/login")
    } catch(err: any){
       toast.error(err.response?.data?.message || "Signup failed");
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.fullname.length > 0 && user.password.length > 0){
      setButtonDisable(false)
    }else{
      setButtonDisable(true)
    }
  },[user])


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo & header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-4">
            <Newspaper className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl text-gray-900 mb-2">
            {loading ? "processing" : "Signup"}
          </h1>
          <p className="text-gray-600">Sign up to Explore more</p>
        </div>

        {/* signup field */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <form onSubmit={onSignup} className="space-y-6 text-gray-700">
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
            <div>
              <label
                htmlFor="fullname"
                className="block text-sm text-gray-700 mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="text"
                  type="text"
                  value={user.fullname}
                  onChange={(e) =>
                    setUser({ ...user, fullname: e.target.value })
                  }
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
            <div className="text-right">
              <Link
                href="/login"
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Already have an account?
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
              {loading ? "Creating account..." : "Sign Up"}
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