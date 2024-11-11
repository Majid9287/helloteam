"use client"

import { Eye, EyeOff } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"

import { useRouter } from 'next/navigation'
export default function SignupPage() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [agreeTerms, setAgreeTerms] = React.useState(false)
  const router = useRouter()
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Login attempted", { email, password, keepLoggedIn })
    router.push('/dashboard')
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Full height image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="/login.png"
          alt="Signup background"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      {/* Right side - Signup form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Create an account</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4 rounded-md">
              <div>
                <label className="text-sm font-medium text-gray-700" htmlFor="name">
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700" htmlFor="email">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700" htmlFor="password">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    
                  />
                  <button
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700" htmlFor="confirm-password">
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <input
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                    id="confirm-password"
                    name="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    
                  />
                  <button
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    type="button"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <input
                className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                id="agree-terms"
                name="agree-terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                
              />
              <label className="ml-2 block text-sm text-gray-900" htmlFor="agree-terms">
                I agree to the{" "}
                <Link href="#" className="text-orange-500 hover:text-orange-600">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-orange-500 hover:text-orange-600">
                  Privacy Policy
                </Link>
              </label>
            </div>
            <div>
              <button
                className="group relative flex w-full justify-center rounded-lg bg-orange-500 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                type="submit"
              >
                Sign up
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-gray-50 px-2 text-gray-500">or</span>
              </div>
            </div>
            <div>
              <button
                className="group relative flex w-full justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                type="button"
              >
                <Image
                  alt="Google logo"
                  className="h-5 w-5"
                  height={20}
                  src="/placeholder.svg?height=20&width=20"
                  width={20}
                />
                Sign up with Google
              </button>
            </div>
          </form>
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link className="font-medium text-orange-500 hover:text-orange-600" href="#">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}