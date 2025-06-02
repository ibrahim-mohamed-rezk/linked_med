import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Services from "@/components/home/Services";
import "../../../public/css/home.css";
import Testimonials from "@/components/home/CustomerRev";
import MapImage from "@/components/home/MapImage";
import { getData } from "@/libs/server/server";
import { HomeTypes } from "@/libs/helpers/types";
import MessageFromCeo from "@/components/home/messageFromCeo";
import WhyLinkedMid from "@/components/home/WhyLinkedMid";
export default async function Home() {
  const feachData = async () => {
    try {
      const response = await getData("/home");
      return response.videos;
    } catch (error) {
      throw error;
    }
  };

  const homeData: HomeTypes = await feachData();

  // console.log("homeData", homeData);
  return (
    <div>
      <main className="w-full">
        <Hero data={homeData.intro} />
        <About data={homeData.about} />
        <Services data={homeData.service} />
        <MapImage />
        {/* <Map /> */}
        {/* <Testimonials />*/}
        <MessageFromCeo />
        <WhyLinkedMid />
        <Testimonials />
      </main>
    </div>
  );
}
