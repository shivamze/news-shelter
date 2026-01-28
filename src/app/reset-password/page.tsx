import { Suspense } from "react";
import ResetForm from "./ResetForm";

export const dynamic = "force-dynamic";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <ResetForm />
    </Suspense>
  );
}

// "use client";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { Newspaper, Lock, Eye, EyeOff } from "lucide-react";
// import axios from "axios";
// import { useSearchParams, useRouter } from "next/navigation";

// export default function SignupPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // 🔒 Guard: token must exist
//   const [token, setToken] = useState<string | null>(null);

//   useEffect(() => {
//     const t = searchParams.get("token");
//     setToken(t);
//   }, [searchParams]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     if (!token) {
//       setError("Invalid reset token");
//       return;
//     }

//     if (password.length < 6) {
//       setError("Password must be at least 6 characters");
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     try {
//       setLoading(true);

//       await axios.post("/api/users/reset-password", {
//         token,
//         password,
//       });

//       // ✅ Success → redirect
//       router.push("/login?reset=success");
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Reset failed");
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div className="min-h-screen text-gray-800 bg-gray-50 flex items-center justify-center px-4 py-12">
//       <div className="w-full max-w-md">
//         {/* Logo & header */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-4">
//             <Newspaper className="w-10 h-10 text-white" />
//           </div>
//           <h1 className="text-2xl text-gray-900 mb-2">Reset Password</h1>
//         </div>

//         {/* signup field */}
//         <div className="bg-white rounded-xl shadow-sm p-8">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* password */}
//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm text-gray-700 mb-2"
//               >
//                 New Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Enter your password"
//                   className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   required
//                 />

//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="confirm-password"
//                 className="block text-sm text-gray-700 mb-2"
//               >
//                 Confirm Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   id="confirm-password"
//                   type={showPassword ? "text" : "password"}
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   placeholder="Enter your password"
//                   className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   {showPassword ? (
//                     <EyeOff className="w-5 h-5" />
//                   ) : (
//                     <Eye className="w-5 h-5" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* error message */}
//             {error && (
//               <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
//                 <p className="text-sm text-red-600">{error}</p>
//               </div>
//             )}

//             {/* submit button */}
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Reset
//             </button>
//           </form>
//         </div>
//         <div className="text-center mt-6">
//           <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
//             ← Back to Home
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
