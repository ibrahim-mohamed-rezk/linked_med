import { getTranslations } from "next-intl/server";

const page = async () => {
  const ourValuesData = await getTranslations("ourValues");

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-10 text-center text-blue-900">
        {ourValuesData("page_title")}
      </h1>

      {/* Mission Statement */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-8 mb-12 shadow-lg">
        <p className="text-xl text-center italic text-gray-800 leading-relaxed">
          {ourValuesData("mission_statement")}
        </p>
      </section>

      {/* Values Grid */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {[
          "excellence_innovation",
          "integrity_trust",
          "empowerment_growth",
          "global_reach",
          "impact_driven",
        ].map((valueKey) => (
          <div
            key={valueKey}
            className="bg-white border-2 border-blue-100 rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">
              {ourValuesData(`values.${valueKey}.title`)}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {ourValuesData(`values.${valueKey}.description`)}
            </p>
          </div>
        ))}
      </section>

      {/* Mission Closing */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-10 text-center mb-12">
        <p className="text-2xl font-medium leading-relaxed">
          {ourValuesData("mission_closing")}
        </p>
      </section>

      {/* Corporate Responsibility */}
      <section className="bg-blue-50 rounded-xl p-8 shadow-md">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
          {ourValuesData("corporate_responsibility.title")}
        </h2>
        <h3 className="text-xl text-blue-700 mb-4 text-center italic">
          {ourValuesData("corporate_responsibility.subtitle")}
        </h3>
        <p className="text-gray-700 text-center leading-relaxed">
          {ourValuesData("corporate_responsibility.description")}
        </p>
      </section>
    </div>
  );
};

export default page;
