"use client";
import { useState } from "react";
import Image from "next/image";
import { Shield, Briefcase, Eye, EyeOff, UserPlus } from "lucide-react";
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
  <div className="min-h-screen flex flex-col justify-center items-center p-[20px]">
    
    {/* Staff Registration Page */}
    <div className="flex flex-col items-center justify-center mt-6 text-center">
      <Shield
        size={65}
        className="text-center text-rose-500 mb-2 fill-none stroke-current stroke-2 animate-[pulse_2s_ease-in-out_infinite] hover:scale-110 drop-shadow-[0_0_8px_rgba(233,69,96,0.6)] hover:drop-shadow-[0_0_15px_rgba(233,69,96,0.9)] transition-all duration-500"
      />

      <h2 className="text-lg sm:text-xl font-extrabold uppercase mb-2 tracking-widest">
        Zenith Staff Portal
      </h2>

      <p className="text-xs sm:text-sm font-semibold tracking-widest text-rose-500">
        Staff Registration
      </p>
    </div>

    {/* Registration Card */}
    <div className="max-w-[500px] w-full bg-blue-400/10 rounded-[24px] px-4 sm:px-6 py-8 sm:py-10 shadow-[0_35px_65px_-15px_#000000e6,inset_0_1px_#ffffff26] backdrop-blur-[30px] border border-white/10 mt-5">

      <div className="flex flex-col items-center gap-2 tracking-widest uppercase font-extrabold mb-8 text-center">
        <UserPlus size={35} className="text-rose-500" />
        Staff Registration
      </div>

      <form className="flex flex-col gap-5">

        {/* Full Name & Phone */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">

          <div className="flex flex-col gap-2 text-sm uppercase w-full">
            <label
              htmlFor="Fullname"
              id="fullname"
              className="font-[0.9rem] font-bold text-gray-300"
            >
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-2 border-rose-500/10 rounded-xl text-sm transition-colors duration-300 ease-in-out focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2 text-sm uppercase w-full">
            <label
              htmlFor="PhoneNum"
              id="phonenum"
              className="font-[0.9rem] font-bold text-gray-300"
            >
              Phone Number
            </label>

            <input
              type="tel"
              placeholder="+234"
              className="w-full px-4 py-3 border border-2 border-rose-500/10 rounded-xl text-sm transition-colors duration-300 ease-in-out focus:outline-none"
            />
          </div>

        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="Email"
            id="email"
            className="font-[0.9rem] font-bold text-gray-300"
          >
            Email-Address
          </label>

          <input
            type="email"
            placeholder="example@zenithhotels.com"
            className="w-full px-4 py-3 border border-2 border-rose-500/10 rounded-xl text-sm transition-colors duration-300 ease-in-out focus:outline-none"
          />
        </div>

        {/* Position */}
        <div className="flex flex-col text-gray-300">
          <label htmlFor="Position" id="position">
            Position
          </label>

          <select className="w-full px-4 py-3 bg-blue-700/10 text-rose-500 rounded-sm mt-3">
            <option value=""></option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="receptionist">Receptionist</option>
            <option value="housekeeping">Housekeeping</option>
            <option value="chef">Chef</option>
            <option value="waiter">Waiter</option>
            <option value="security">Security</option>
            <option value="accountant">Accountant</option>
            <option value="customer-support">Customer Support</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        {/* Password Section */}
        <div className="flex flex-col sm:flex-row gap-4 relative">

          <div className="flex flex-col gap-3 w-full">
            <label className="font-[0.9rem] font-bold text-gray-300">
              Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-3 pr-12 border border-2 border-rose-500/10 rounded-xl text-sm transition-colors duration-300 ease-in-out focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-3 w-full">
            <label className="font-[0.9rem] font-bold text-gray-300">
              Confirm Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-3 border border-2 border-rose-500/10 rounded-xl text-sm transition-colors duration-300 ease-in-out focus:outline-none"
            />
          </div>

          {/* Eye Icon */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-[68%] sm:top-[63%] -translate-y-1/2"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>

        </div>

        {/* Secret Code */}
        <div className="flex flex-col gap-2 border border-red-600 bg-red-600/10 rounded-xl px-4 py-4">

          <div className="text-red-600 font-semibold">
            <div className="flex gap-2 items-center">
              <Shield size={25} className="text-gray-400" />
              Staff Secret Code
            </div>
          </div>

          <div>
            <input
              type="code"
              placeholder="Enter secret code from manager"
              className="w-full px-4 py-3 border border-2 border-rose-500/10 rounded-xl text-sm transition-colors duration-300 ease-in-out focus:outline-none"
            />
          </div>

          <div>
            <p className="text-white text-sm">
              Contact your manager for your secret code
            </p>
          </div>

        </div>

        {/* Button */}
        <button className="bg-rose-500 p-4 border-none rounded-2xl font-xs font-semibold cursor-pointer transition-all duration-300 ease-in mt-2 uppercase hover:bg-rose-900 text-white">
          Register as Staff
        </button>

      </form>

      {/* Sign In */}
      <div className="flex flex-wrap gap-2 items-center justify-center mt-4 text-center">

        <div className="text-gray-400">
          <p>Already have an account?</p>
        </div>

        <div className="text-red-600 text-sm font-medium tracking-widest hover:text-blue-600">
          <a href="/staff">SignIn</a>
        </div>

      </div>

      {/* Footer */}
      <div className="flex items-center justify-center mt-4 gap-3 text-gray-400 text-center">
        <Shield size={24} className="text-red-600 font-medium font-sm" />
        Authorized Personnel Only
      </div>

    </div>
  </div>
</PageWrapper>
  );
}
