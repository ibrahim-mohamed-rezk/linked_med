import { getTranslations } from "next-intl/server";

const page = async () => {
  const privacyData = await getTranslations("privacy");
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 border-b-4 border-blue-500 pb-4">
        {privacyData("companyName")} {privacyData("sections.privacyPromise.title")}
      </h1>

      {/* Privacy Promise Section */}
      <section className="mb-10 bg-blue-50 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-blue-800">
          {privacyData("sections.privacyPromise.title")}
        </h2>
        <div className="space-y-4">
          <p className="text-gray-700 italic">
            {privacyData("privacyPromise.commitment")}
          </p>
          <p className="text-gray-600">
            {privacyData("privacyPromise.purpose")}
          </p>
        </div>
      </section>

      {/* Compliance Regulations */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          {privacyData("sections.complianceRegulations.title")}
        </h2>
        <div className="bg-green-50 p-6 rounded-lg shadow-md">
          <ul className="list-disc list-inside space-y-2 text-green-800">
            {privacyData.raw("privacyPromise.complianceRegulations").map((regulation: string, index: number) => (
              <li key={index}>{regulation}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Data Collection */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          {privacyData("sections.dataCollection.title")}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-purple-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-purple-800">
              {privacyData("sections.dataCollection.personalInformationTitle")}
            </h3>
            <ul className="list-disc list-inside space-y-2 text-purple-700">
              {privacyData.raw("dataCollection.personalInformation").map((info: string, index: number) => (
                <li key={index}>{info}</li>
              ))}
            </ul>
          </div>
          <div className="bg-red-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-red-800">
              {privacyData("sections.dataCollection.sensitiveInformationTitle")}
            </h3>
            <ul className="list-disc list-inside space-y-2 text-red-700">
              {privacyData.raw("dataCollection.sensitiveInformation").map((info: string, index: number) => (
                <li key={index}>{info}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-4 text-gray-600 italic">
          {privacyData("sections.dataCollection.sharingPrinciplesNote")}
        </p>
      </section>

      {/* Data Usage Purposes */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          {privacyData("sections.dataUsage.title")}
        </h2>
        <div className="space-y-4">
          {privacyData.raw("dataUsage.purposes").map((purpose: any, index: number) => (
            <div key={index} className="bg-indigo-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-indigo-800">
                {purpose.name}
              </h3>
              <p className="text-gray-700">{purpose.details}</p>
            </div>
          ))}
        </div>
      </section>

      {/* User Rights */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          {privacyData("sections.userRights.title")}
        </h2>
        <div className="bg-yellow-50 p-6 rounded-lg shadow-md">
          <p className="mb-4 text-gray-700">
            {privacyData("sections.userRights.statementIntro")}
          </p>
          <ul className="list-disc list-inside space-y-2 text-yellow-800">
            {privacyData.raw("userRights.rights").map((right: string, index: number) => (
              <li key={index}>{right}</li>
            ))}
          </ul>
          <p className="mt-4 text-gray-600 italic">
            {privacyData("sections.userRights.exerciseMethodNote")}
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          {privacyData("sections.contactInformation.title")}
        </h2>
        <div className="bg-green-50 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3 text-green-800">
            {privacyData("contactInformation.title")}
          </h3>
          <div className="space-y-2 text-gray-700">
            <p>
              {privacyData("sections.contactInformation.emailLabel")}: {" "}
              <a
                href={`mailto:${privacyData("contactInformation.email")}`}
                className="text-blue-600 hover:underline"
              >
                {privacyData("contactInformation.email")}
              </a>
            </p>
            <p>
              {privacyData("sections.contactInformation.websiteLabel")}: {" "}
              <a
                href={`https://${privacyData("contactInformation.website")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {privacyData("contactInformation.website")}
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Policy Updates */}
      <section className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">
          {privacyData("sections.policyUpdates.title")}
        </h2>
        <p className="text-gray-700">
          {privacyData("policyUpdates.details")}
        </p>
        <p className="mt-2 text-gray-600 italic">
          {privacyData("sections.policyUpdates.acceptanceNote")}
        </p>
      </section>
    </div>
  );
};

export default page;