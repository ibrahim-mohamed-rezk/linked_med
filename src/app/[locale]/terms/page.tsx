import { getTranslations } from "next-intl/server";

const page = async () => {
  const termsData = await getTranslations("terms");
  return (
    <div className="container mx-auto p-6 max-[1920px]">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Terms & Conditions
      </h1>

      {/* Introduction Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          {termsData("introduction.title")}
        </h2>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
          <p className="text-yellow-800 italic">
            {termsData("introduction.attention")}
          </p>
        </div>
        <div className="space-y-2">
          <p>{termsData("introduction.definitions.we")}</p>
          <p>{termsData("introduction.definitions.you")}</p>
        </div>
      </section>

      {/* Key Sections */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          {termsData("keySections.title")}
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              title: termsData("serviceAvailability.title"),
              description: termsData("serviceAvailability.description"),
              bgColor: "bg-blue-50",
            },
            {
              title: termsData("informationAccuracy.title"),
              description: termsData("informationAccuracy.description"),
              bgColor: "bg-green-50",
            },
            {
              title: termsData("thirdPartyLinks.title"),
              description: termsData("thirdPartyLinks.description"),
              bgColor: "bg-purple-50",
            },
            {
              title: termsData("dataProtection.title"),
              description: termsData("dataProtection.description"),
              bgColor: "bg-indigo-50",
            },
          ].map((section, index) => (
            <div key={index} className={`${section.bgColor} p-4 rounded-lg`}>
              <h3 className="font-bold mb-2 text-gray-800">{section.title}</h3>
              <p>{section.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Detailed Sections */}
      {[
        {
          title: termsData("linking.title"),
          content: (
            <ul className="list-disc list-inside">
              {termsData
                .raw("linking.conditions")
                .map((condition: string, index: number) => (
                  <li key={index}>{condition}</li>
                ))}
            </ul>
          ),
        },
        {
          title: termsData("acceptableUse.title"),
          content: (
            <>
              <p className="mb-2">{termsData("acceptableUse.purpose")}</p>
              <ul className="list-disc list-inside">
                {termsData
                  .raw("acceptableUse.prohibitions")
                  .map((prohibition: string, index: number) => (
                    <li key={index} className="text-red-600">
                      {prohibition}
                    </li>
                  ))}
              </ul>
            </>
          ),
        },
        {
          title: termsData("candidateResponsibilities.title"),
          content: <p>{termsData("candidateResponsibilities.description")}</p>,
        },
        {
          title: termsData("userSubmissions.title"),
          content: (
            <ul className="list-disc list-inside">
              {termsData
                .raw("userSubmissions.conditions")
                .map((condition: string, index: number) => (
                  <li key={index}>{condition}</li>
                ))}
            </ul>
          ),
        },
      ].map((section, index) => (
        <section key={index} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            {section.title}
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg">{section.content}</div>
        </section>
      ))}

      {/* Legal and Contact Sections */}
      {[
        {
          title: termsData("termsOfBusiness.title"),
          content: <p>{termsData("termsOfBusiness.description")}</p>,
        },
        {
          title: termsData("intellectualProperty.title"),
          content: <p>{termsData("intellectualProperty.description")}</p>,
        },
        {
          title: termsData("securityAndAccount.title"),
          content: <p>{termsData("securityAndAccount.description")}</p>,
        },
        {
          title: termsData("terminationOfAccess.title"),
          content: <p>{termsData("terminationOfAccess.description")}</p>,
        },
      ].map((section, index) => (
        <section key={index} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            {section.title}
          </h2>
          <div className="bg-white border p-4 rounded-lg">
            {section.content}
          </div>
        </section>
      ))}

      {/* Limitation of Liability */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          {termsData("limitationOfLiability.title")}
        </h2>
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="mb-2 text-red-800 font-semibold">
            {termsData("limitationOfLiability.description")}
          </p>
          <ul className="list-disc list-inside text-red-700">
            {termsData
              .raw("limitationOfLiability.exemptions")
              .map((exemption: string, index: number) => (
                <li key={index}>{exemption}</li>
              ))}
          </ul>
        </div>
      </section>

      {/* Governing Law and Updates */}
      <section className="mb-8">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-3 text-blue-800">
              {termsData("governingLaw.title")}
            </h2>
            <p>{termsData("governingLaw.description")}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-3 text-green-800">
              {termsData("updates.title")}
            </h2>
            <p>{termsData("updates.description")}</p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          {termsData("contact.title")}
        </h2>
        <div className="bg-indigo-50 p-4 rounded-lg">
          <p>
            <strong>{termsData("contact.officer")}</strong>
          </p>
          <p>
            Email:{" "}
            <a
              href={`mailto:${termsData("contact.email")}`}
              className="text-blue-600 hover:underline"
            >
              {termsData("contact.email")}
            </a>
          </p>
          <p>
            Website:{" "}
            <a
              href={`https://${termsData("contact.website")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {termsData("contact.website")}
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default page;
