"use client"

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { login } from '../../../redux/auth/authActions'
import Link from 'next/link'
import Image from 'next/image'
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    rememberMe: false
  })

  const dispatch = useDispatch()
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await dispatch(login(credentials)).unwrap()
      router.push('/dashboard')
    } catch (error) {
      console.error('Login failed', error)
      // TODO: Add proper error handling and display
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="/login.png"
          alt="Login background"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Log In</h2>
            <p className="mt-2 text-sm text-gray-600">
              Access your personalized dashboard
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Mail className="mr-2 h-4 w-4" /> Email or Username
                </label>
                <div className="mt-1">
                  <input
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                    type="text"
                    value={credentials.username}
                    onChange={(e) => setCredentials({
                      ...credentials, 
                      username: e.target.value
                    })}
                    placeholder="Enter your email or username"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Lock className="mr-2 h-4 w-4" /> Password
                </label>
                <div className="mt-1 relative">
                  <input
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                    type={showPassword ? "text" : "password"}
                    value={credentials.password}
                    onChange={(e) => setCredentials({
                      ...credentials, 
                      password: e.target.value
                    })}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  checked={credentials.rememberMe}
                  onChange={(e) => setCredentials({
                    ...credentials, 
                    rememberMe: e.target.checked
                  })}
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-orange-500 hover:text-orange-600">
                  Forgot password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-lg bg-orange-500 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
              >
                Log In
              </button>
            </div>

           
          </form>

          <p className="text-center text-sm text-gray-600">
            Dont have an account?{" "}
            <Link href="/signup" className="font-medium text-orange-500 hover:text-orange-600">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}