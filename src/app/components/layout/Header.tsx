"use client"
import { useState } from "react";
import Link from "next/link"
import {Menu, X, Newspaper, User} from 'lucide-react'
import { useAuth } from "@/src/context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";





export function Header(){

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const {auth, logout} = useAuth();
    const router = useRouter();

    const onLogout = async () => {
      setIsUserMenuOpen(false)
      try {
        const response = await axios.get("/api/users/logout");
        logout();
        toast.success("Logout successful");
        console.log(response);
        router.push("/");
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Signup failed");
      }
    };

    console.log(auth)
    return (
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm text-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                <Newspaper className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                News Shelter
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Home
              </Link>

              <Link
                href="/blogs"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Opinion
              </Link>

              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                About Us
              </Link>

              {/* Auth-based links */}
              {!auth.isAuthenticated && (
                <>
                  <Link
                    href="/login"
                    className="nav-link font-semibold text-blue-600"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="nav-link font-semibold text-blue-600"
                  >
                    Signup
                  </Link>
                </>
              )}

              {auth.isAuthenticated && auth.role === "user" && (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen((prev) => !prev)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <User className="bg-gray-200 rounded-xl p-1" />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg py-2">
                      <Link
                        href="/user/profile"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Profile
                      </Link>

                      <Link
                        href="/user/bookmarks"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Bookmarks
                      </Link>

                      <button
                        onClick={onLogout} 
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}

              {auth.isAuthenticated && auth.role === "admin" && (
                <Link href="/admin" className="nav-link text-gray-700">
                  <User className="bg-gray-200 rounded-xl p-1 border-amber-100" />
                </Link>
              )}

              {/* {auth.isAuthenticated && (
                <button
                  onClick={logout}
                  className="text-red-500 hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
              )} */}
            </nav>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {isMenuOpen && (
            <nav className="md:hidden py-4 border-t border-gray-200">
              <Link
                href="/"
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/blogs"
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Opinion
              </Link>
              <Link
                href="/about"
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              {!auth.isAuthenticated && (
                <>
                  <Link
                    href="/login"
                    className="mobile-link font-semibold text-blue-600 block my-2"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="mobile-link font-semibold text-blue-600 my-2"
                  >
                    Signup
                  </Link>
                </>
              )}

              {auth.isAuthenticated && auth.role === "user" && (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen((prev) => !prev)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <User className="bg-gray-200 rounded-xl p-1" />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute mt-2 w-48 bg-white border rounded-xl shadow-lg py-2">
                      <Link
                        href="/user/profile"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Profile
                      </Link>

                      <Link
                        href="/user/bookmarks"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Bookmarks
                      </Link>

                      <button
                        onClick={onLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}

              {auth.isAuthenticated && auth.role === "admin" && (
                <Link href="/admin" className="mobile-link text-gray-700">
                  Admin Dashboard
                </Link>
              )}

              {/* {auth.isAuthenticated && (
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="block text-left w-full text-red-500 hover:text-red-600"
                >
                  Logout
                </button>
              )} */}
            </nav>
          )}
        </div>
      </header>
    );
}