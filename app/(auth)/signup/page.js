"use client"

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, UserPlus, Mail, Lock, Phone } from 'lucide-react'
import { registerUserInitial } from '../../../redux/user/userActions'
import Image from 'next/image'
import Link from 'next/link'
export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    role: 'agent',
    agreeTerms: false
  })

  const dispatch = useDispatch()
  const router = useRouter()

  const handleFirstStepValidation = () => {
    // Basic validation for first step
    if (!userData.name || !userData.email || !userData.password) {
      alert('Please fill in all required fields')
      return false
    }
    if (userData.password !== userData.confirmPassword) {
      alert('Passwords do not match')
      return false
    }
    return true
  }

  const proceedToSecondStep = () => {
    if (handleFirstStepValidation()) {
      setStep(2)
    }
  }

  const handleRegistration = async (e) => {
    e.preventDefault()
    
    if (!userData.agreeTerms) {
      alert('Please agree to the terms and conditions')
      return
    }

    try {
      const { confirmPassword, agreeTerms, ...submitData } = userData
      await dispatch(registerUserInitial(submitData)).unwrap()
      
      router.push('/login')
    } catch (error) {
      console.error('Registration failed', error)
    }
  }

  const renderFirstStep = () => (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700 flex items-center">
          <UserPlus className="mr-2 h-4 w-4" /> Full Name
        </label>
        <div className="mt-1">
          <input
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
            type="text"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            placeholder="Enter your full name"
            required
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 flex items-center">
          <Mail className="mr-2 h-4 w-4" /> Email
        </label>
        <div className="mt-1">
          <input
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
            type="email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            placeholder="Enter your email"
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
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            placeholder="Create a strong password"
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

      <div>
        <label className="text-sm font-medium text-gray-700 flex items-center">
          <Lock className="mr-2 h-4 w-4" /> Confirm Password
        </label>
        <div className="mt-1 relative">
          <input
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
            type={showConfirmPassword ? "text" : "password"}
            value={userData.confirmPassword}
            onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
            placeholder="Repeat your password"
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4 text-gray-400" />
            ) : (
              <Eye className="h-4 w-4 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={proceedToSecondStep}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
        >
          Next Step
        </button>
      </div>
    </div>
  )

  const renderSecondStep = () => (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700 flex items-center">
          <Phone className="mr-2 h-4 w-4" /> Phone Number
        </label>
        <div className="mt-1">
          <input
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
            type="tel"
            value={userData.phoneNumber}
            onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
            placeholder="Optional: Enter your phone number"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Select Role</label>
        <select
          className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
          value={userData.role}
          onChange={(e) => setUserData({ ...userData, role: e.target.value })}
        >
          <option value="agent">Agent</option>
          <option value="supervisor">Supervisor</option>
          <option value="admin">Admin</option>
          <option value="client">Client</option>
        </select>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
          checked={userData.agreeTerms}
          onChange={(e) => setUserData({ ...userData, agreeTerms: e.target.checked })}
        />
        <label className="ml-2 text-sm text-gray-900">
          I agree to the{" "}
          <a href="#" className="text-orange-500 hover:underline">Terms of Service</a>{" "}
          and{" "}
          <a href="#" className="text-orange-500 hover:underline">Privacy Policy</a>
        </label>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Previous
        </button>
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
        >
          Create Account
        </button>
      </div>
    </div>
  )

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
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              {step === 1 ? 'Create Your Account' : 'Complete Your Profile'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {step === 1 
                ? 'Start your journey with basic information' 
                : 'Just a few more details to get you started'}
            </p>
          </div>
          
          <form onSubmit={handleRegistration}>
            {step === 1 ? renderFirstStep() : renderSecondStep()}
          </form>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-orange-500 hover:text-orange-600">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}