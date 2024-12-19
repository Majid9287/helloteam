"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  UserPlus,
  Mail,
  Lock,
  Phone,
  Building,
  Key,
} from "lucide-react";
import {
  registerUserInitial,
  completeUserRegistration,
} from "../../../redux/user/userActions";
import Image from "next/image";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    role: "client",
  });
  const [organizationData, setOrganizationData] = useState({
    organizationName: "",
    apiKey: "",
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const handleFirstStepValidation = () => {
    if (
      !userData.name ||
      !userData.email ||
      !userData.password ||
      !userData.phoneNumber
    ) {
      alert("Please fill in all required fields");
      return false;
    }
    if (userData.password !== userData.confirmPassword) {
      alert("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleFirstStep = async () => {
    if (handleFirstStepValidation()) {
      setIsLoading(true);
      try {
        const { confirmPassword, ...submitData } = userData;
        const response = await dispatch(
          registerUserInitial(submitData)
        ).unwrap();
        setUserId(response.userId);
        setStep(2);
        toast.success("Basic information saved successfully!");
      } catch (error) {
        toast.error(error.message || "Registration failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (!organizationData.organizationName || !organizationData.apiKey) {
      toast.error("Please fill in all organization details");
      return;
    }

    setIsLoading(true);
    try {
      await dispatch(
        completeUserRegistration({
          userId,
          organizationData,
        })
      ).unwrap();

      toast.success("Registration completed successfully!");
      router.push("/login");
    } catch (error) {
      toast.error(error.message || "Failed to complete registration");
    } finally {
      setIsLoading(false);
    }
  };

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
          <Phone className="mr-2 h-4 w-4" /> Phone Number
        </label>
        <div className="mt-1">
          <input
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
            type="tel"
            value={userData.phoneNumber}
            onChange={(e) =>
              setUserData({ ...userData, phoneNumber: e.target.value })
            }
            placeholder="Enter your phone number"
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
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
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
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
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
            onChange={(e) =>
              setUserData({ ...userData, confirmPassword: e.target.value })
            }
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
          onClick={handleFirstStep}
          disabled={isLoading}
          className={`flex items-center justify-center bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
          {isLoading ? "Processing..." : "Next Step"}
        </button>
      </div>
    </div>
  );

  const renderSecondStep = () => (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700 flex items-center">
          <Building className="mr-2 h-4 w-4" /> Organization Name
        </label>
        <div className="mt-1">
          <input
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
            type="text"
            value={organizationData.organizationName}
            onChange={(e) =>
              setOrganizationData({
                ...organizationData,
                organizationName: e.target.value,
              })
            }
            placeholder="Enter organization name"
            required
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 flex items-center">
          <Key className="mr-2 h-4 w-4" /> API Key
        </label>
        <div className="mt-1">
          <input
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
            type="text"
            value={organizationData.apiKey}
            onChange={(e) =>
              setOrganizationData({
                ...organizationData,
                apiKey: e.target.value,
              })
            }
            placeholder="Enter API key"
            required
          />
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleRegistration}
          disabled={isLoading}
          className={`flex items-center justify-center bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
          {isLoading ? "Completing..." : "Complete Registration"}
        </button>
      </div>
    </div>
  );
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
              {step === 1 ? "Create Your Account" : "Complete Your Profile"}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {step === 1
                ? "Start your journey with basic information"
                : "Just a few more details to get you started"}
            </p>
          </div>

          <form onSubmit={handleRegistration}>
            {step === 1 ? renderFirstStep() : renderSecondStep()}
          </form>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-orange-500 hover:text-orange-600"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
