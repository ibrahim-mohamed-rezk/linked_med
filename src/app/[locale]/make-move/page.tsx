import { getTranslations } from "next-intl/server";

const page = async () => {
  const makeMove = await getTranslations("makeMove");
  return (
    <div className="container mx-auto p-6 ">
      {/* Hero Section */}
      <section className="text-center mb-12 bg-blue-50 p-8 rounded-lg">
        <h1 className="text-4xl font-bold mb-4 text-blue-900">
          {makeMove("title")}
        </h1>
        <p className="text-xl text-blue-800 mb-6">{makeMove("description")}</p>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 italic text-yellow-800">
          {makeMove("introduction")}
        </div>
      </section>

      {/* Event Overview */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          {makeMove("event_overview_title")}
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          {makeMove("event_description")}
        </p>
      </section>

      {/* What You'll Learn */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          {makeMove("what_youll_learn_title")}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {makeMove
            .raw("what_youll_learn")
            .map(
              (item: { topic: string; description: string }, index: number) => (
                <div
                  key={index}
                  className="bg-green-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-bold mb-3 text-green-900">
                    {item.topic}
                  </h3>
                  <p className="text-green-800">{item.description}</p>
                </div>
              )
            )}
        </div>
      </section>

      {/* Who Should Attend */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          {makeMove("who_should_attend_title")}
        </h2>
        <ul className="list-disc list-inside text-lg text-gray-700 space-y-3 bg-gray-50 p-6 rounded-lg">
          {makeMove
            .raw("who_should_attend")
            .map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
        </ul>
      </section>

      {/* Why Attend */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          {makeMove("why_attend_title")}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {makeMove.raw("why_attend").map((item: any, index: number) => (
            <div
              key={index}
              className="bg-indigo-50 p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-bold mb-3 text-indigo-900">
                {item.benefit}
              </h3>
              <p className="text-indigo-800">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-blue-100 p-12 rounded-lg mb-12">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">
          {makeMove("cta_section_title")}
        </h2>
        <p className="text-xl text-blue-800 mb-8">
          {makeMove("call_to_action")}
        </p>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors">
          {makeMove("book_spot_button")}
        </button>
      </section>

      {/* Closing Statement */}
      <section className="text-center">
        <p className="text-xl text-gray-700 italic">
          {makeMove("closing_statement")}
        </p>
      </section>
    </div>
  );
};

export default page;
