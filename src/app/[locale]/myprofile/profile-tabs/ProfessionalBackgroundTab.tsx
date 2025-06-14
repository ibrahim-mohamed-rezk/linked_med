'use client'

const ProfessionalBackgroundTab = () => {
  return (
    <form className="space-y-6 bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800">Professional Background</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Current Job Title</label>
          <input
            type="text"
            placeholder="e.g., Resident Doctor"
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Years of Experience</label>
          <input
            type="number"
            min="0"
            placeholder="e.g., 5"
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm text-gray-600 mb-1">Specialty / Field</label>
          <input
            type="text"
            placeholder="e.g., Cardiology, General Medicine"
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm text-gray-600 mb-1">Languages Spoken</label>
          <input
            type="text"
            placeholder="e.g., English, Arabic, German"
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm text-gray-600 mb-1">Licensing Status</label>
          <input
            type="text"
            placeholder="e.g., MOH Certified, HAAD Eligible"
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm text-gray-600 mb-1">Previous Countries Worked In</label>
          <input
            type="text"
            placeholder="e.g., Egypt, Saudi Arabia, Germany"
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

export default ProfessionalBackgroundTab
