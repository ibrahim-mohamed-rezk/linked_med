"use client";

import { FormEvent } from "react";
import { searchJobs } from "./actions";

export default function RegisterPanelPage() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await searchJobs(formData);
    // You can show a toast or handle response if needed
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white w-full px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-[#96B8FF0D] rounded-3xl w-full max-w-6xl p-4 md:p-6 space-y-6"
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-black font-['Roboto']">
          Register Panel
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            name="discipline"
            className="w-full h-14 md:h-16 rounded-3xl border border-gray-200 text-sm md:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option>Any Discipline</option>
            <option>Mathematics</option>
            <option>Science</option>
            <option>History</option>
          </select>

          <select
            name="grade"
            className="w-full h-14 md:h-16 rounded-3xl border border-gray-200 text-sm md:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option>Any Grade</option>
            <option>Primary</option>
            <option>Secondary</option>
            <option>Higher</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            name="country"
            className="w-full h-14 md:h-16 rounded-3xl border border-gray-200 text-sm md:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option>Australia</option>
            <option>UK</option>
            <option>USA</option>
          </select>

          <select
            name="area"
            className="w-full h-14 md:h-16 rounded-3xl border border-gray-200 text-sm md:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option>Any Area</option>
            <option>Urban</option>
            <option>Suburban</option>
            <option>Rural</option>
          </select>

          <select
            name="speciality"
            className="w-full h-14 md:h-16 rounded-3xl border border-gray-200 text-sm md:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option>Any Speciality</option>
            <option>Math Specialist</option>
            <option>Science Lead</option>
            <option>Language Expert</option>
          </select>
        </div>

        <input
          name="keywords"
          type="text"
          placeholder="Insert Keywords"
          className="w-full h-14 md:h-16 rounded-3xl border border-gray-200 text-sm md:text-base text-gray-700 p-4 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full md:w-1/2 bg-[#9db8fd] hover:bg-[#87a3f5] transition text-base md:text-lg text-white font-medium py-3 md:py-4 px-6 rounded-3xl"
          >
            Search Jobs
          </button>
        </div>
      </form>
    </div>
  );
}
