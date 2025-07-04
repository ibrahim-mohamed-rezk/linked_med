import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Services from "@/components/home/Services";
import "../../../public/css/home.css";
import Testimonials from "@/components/home/CustomerRev";
// import MapImage from "@/components/home/MapImage";
import { getData } from "@/libs/server/server";
// import { HomeTypes } from "@/libs/helpers/types";
import MessageFromCeo from "@/components/home/messageFromCeo";
import WhyLinkedMid from "@/components/home/WhyLinkedMid";
import BlogSection  from "@/components/home/Blogs";

export default async function Home() {
  const feachData = async () => {
    try {
      const response = await getData("/home");
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const homeData = await feachData();
  console.log("homeData", homeData);
  return (
    <div>
      <main className="w-full bg-black text-white">
        <Hero data={homeData?.videos.intro} />
        <About data={homeData?.videos.about} />
        <Services data={homeData?.videos.service} />
        {/* <MapImage /> */}
        {/* <Map /> */}
        {/* <Testimonials />*/}
        <MessageFromCeo />
        <WhyLinkedMid  />
        <Testimonials data={homeData.testimonials} />
        <BlogSection data={homeData.blogs} />
      </main>
    </div>
  );
}
