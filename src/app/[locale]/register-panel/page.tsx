"use client";
import { FormEvent } from "react";
import { searchJobs } from "./actions";
import authimage from "/public/images/membership_addon-2048x1232.webp";
import Image from "next/image";

export default function RegisterPanelPage() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await searchJobs(formData);
    // You can show a toast or handle response if needed
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white w-full px-4 py-8">
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image Section */}
          <div className="order-2 lg:order-1 flex justify-center">
            <div className="w-full max-w-md lg:max-w-lg">
              <Image
                src={authimage}
                alt="Membership Registration"
                className="w-full h-auto rounded-3xl shadow-lg object-cover"
                priority
              />
            </div>
          </div>

          {/* Form Section */}
          <div className="order-1 lg:order-2">
            <form
              onSubmit={handleSubmit}
              className=" rounded-3xl w-full p-4 md:p-6 lg:p-8 space-y-6"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center text-black font-['Roboto'] mb-6">
                Register Panel
              </h2>

              {/* Discipline and Grade Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select
                  name="discipline"
                  className="w-full h-12 md:h-14 lg:h-16 rounded-3xl border border-gray-200 text-sm md:text-base text-gray-700 px-4 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent"
                >
                  <option>Any Discipline</option>
                  <option>Mathematics</option>
                  <option>Science</option>
                  <option>History</option>
                  <option>English</option>
                  <option>Art</option>
                </select>
                <select
                  name="grade"
                  className="w-full h-12 md:h-14 lg:h-16 rounded-3xl border border-gray-200 text-sm md:text-base text-gray-700 px-4 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent"
                >
                  <option>Any Grade</option>
                  <option>Primary</option>
                  <option>Secondary</option>
                  <option>Higher</option>
                </select>
              </div>

              {/* Country, Area, and Speciality Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <select
                  name="country"
                  className="w-full h-12 md:h-14 lg:h-16 rounded-3xl border border-gray-200 text-sm md:text-base text-gray-700 px-4 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent"
                >
                  <option>Australia</option>
                  <option>UK</option>
                  <option>USA</option>
                  <option>Canada</option>
                  <option>New Zealand</option>
                </select>
                <select
                  name="area"
                  className="w-full h-12 md:h-14 lg:h-16 rounded-3xl border border-gray-200 text-sm md:text-base text-gray-700 px-4 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent"
                >
                  <option>Any Area</option>
                  <option>Urban</option>
                  <option>Suburban</option>
                  <option>Rural</option>
                </select>
                <select
                  name="speciality"
                  className="w-full h-12 md:h-14 lg:h-16 rounded-3xl border border-gray-200 text-sm md:text-base text-gray-700 px-4 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent sm:col-span-2 lg:col-span-1"
                >
                  <option>Any Speciality</option>
                  <option>Math Specialist</option>
                  <option>Science Lead</option>
                  <option>Language Expert</option>
                  <option>Special Needs</option>
                  <option>Technology</option>
                </select>
              </div>

              {/* Keywords Input */}
              <input
                name="keywords"
                type="text"
                placeholder="Insert Keywords"
                className="w-full h-12 md:h-14 lg:h-16 rounded-3xl border border-gray-200 text-sm md:text-base text-gray-700 px-4 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent placeholder-gray-500"
              />

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="w-full  bg-[#9db8fd] hover:bg-[#87a3f5] active:bg-[#7593ed] transition-all duration-200 text-base md:text-lg text-white font-medium py-3 md:py-4 px-6 rounded-3xl shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Search Jobs
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}