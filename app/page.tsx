import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandsBar from "@/components/BrandsBar";
import NewArrivals from "@/components/NewArrivals";
import TopSelling from "@/components/TopSelling";
import DressStyle from "@/components/DressStyle";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <BrandsBar />
        <NewArrivals />
        <TopSelling />
        <DressStyle />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
