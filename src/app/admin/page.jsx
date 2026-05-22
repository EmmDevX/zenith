"use client";

import { useState } from "react";
import Image from "next/image";
import { Shield, Briefcase, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import PageWrapper from "@/components/PageWrapper";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    // Login logic here
    router.push("/dashboard");
  };

  return (
    <PageWrapper>
      {/* Admin Login Page */}
      <div className="min-h-screen flex items-center justify-center p-[20px] font-sans">

        <div className="max-w-[440px] w-full bg-blue-400/10 rounded-[24px] px-4 sm:px-6 py-7 sm:py-8 shadow-[0_35px_65px_-15px_#000000e6,inset_0_1px_#ffffff26] backdrop-blur-[30px] border border-white/10">

          {/* Header */}
          <div className="flex flex-col items-center mb-3 mt-5 sm:mt-9 text-center">

            <Shield
              size={65}
              className="text-center text-rose-500 mb-2 fill-none stroke-current stroke-2 animate-[pulse_2s_ease-in-out_infinite] hover:scale-110 drop-shadow-[0_0_8px_rgba(233,69,96,0.6)] hover:drop-shadow-[0_0_15px_rgba(233,69,96,0.9)] transition-all duration-500"
            />

            <h2 className="text-blue-600 text-lg sm:text-xl font-bold uppercase">
              Zenith <span>Admin Portal</span>
            </h2>

            <p className="text-sm sm:text-base">
              Access your admin dashboard
            </p>

          </div>

          {/* Form Header */}
          <div className="flex items-center flex-col gap-2 mb-6 text-white text-lg sm:text-xl font-extrabold text-center">

            <Briefcase
              size={24}
              className="text-center text-rose-500 text-md"
            />

            Admin Login

          </div>

          {/* Form */}
          <form className="flex flex-col gap-5" onSubmit={handleLogin}>

            {/* Email */}
            <div className="flex flex-col gap-2">

              <label
                htmlFor="email"
                className="font-[0.9rem] font-medium"
              >
                Admin ID or Email
              </label>

              <input
                type="email"
                id="email"
                placeholder="Enter your Admin ID or Email"
                className="w-full px-4 py-3 border border-2 border-rose-500/10 rounded-xl text-sm transition-colors duration-300 ease-in-out focus:outline-none"
                required
              />

            </div>

            {/* Password */}
            <div className="relative w-full flex flex-col gap-2">

              <label
                htmlFor="password"
                className="font-[0.9rem] font-medium"
              >
                Password
              </label>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full border border-rose-500/10 rounded-lg py-3 px-4 pr-12 text-sm mt-1 focus:outline-none"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[70%] -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

            {/* Button */}
            <button
              type="submit"
              className="bg-rose-500 p-4 border-none rounded-2xl font-xs font-semibold cursor-pointer transition-all duration-300 ease-in mt-2 uppercase hover:bg-rose-900 text-white"
            >
              Access your portal
            </button>

          </form>

          {/* Footer */}
          <div className="flex items-center mt-4 justify-center gap-2 text-gray-300 text-sm sm:text-base text-center">

            <Shield
              size={18}
              className="text-rose-500 text-xl"
            />

            Authorized Personnel Only

          </div>

        </div>
      </div>
    </PageWrapper>
  );
}