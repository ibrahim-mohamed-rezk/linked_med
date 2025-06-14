'use client'

const PersonalInfoTab = () => {
  return (
    <form className="space-y-6 bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Date of Birth</label>
          <input
            type="date"
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Nationality</label>
          <input
            type="text"
            placeholder="e.g., Egyptian"
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Current Country & City</label>
          <input
            type="text"
            placeholder="Germany, Berlin"
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
          <input
            type="tel"
            placeholder="+49 123 456789"
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Preferred Contact Language</label>
          <select className="w-full bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select Language</option>
            <option value="en">English</option>
            <option value="ar">Arabic</option>
            <option value="de">German</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">LinkedMed Case Manager</label>
          <input
            type="text"
            placeholder="Coordinator Name"
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition"
        >
          Save
        </button>
      </div>
    </form>
  )
}

export default PersonalInfoTab
