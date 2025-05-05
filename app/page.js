import HeroSection from "@/components/sections/HeroSection";
import SearchForm from "@/components/ui/forms/SearchForm";
import DestinationGrid from "@/components/sections/DestinationGrid";
import TourPackages from "@/components/sections/TourPackages";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import AboutCompany from "@/components/sections/AboutCompany";
// import Testimonials from "@/components/sections/Testimonials";
// import StatsCounter from "@/components/sections/StatsCounter";
// import BlogSection from "@/components/sections/BlogSection";
// import Newsletter from "@/components/sections/Newsletter";

export default function Home() {
  return (
    <>
      {/* Hero Section with Search Form */}
      <HeroSection>
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 z-10">
          <div className="container mx-auto px-4">
            <SearchForm />
          </div>
        </div>
      </HeroSection>

      <div className="pt-32 pb-20"> {/* Extra padding to account for absolute search form */}
        
        {/* Popular Destinations */}
        <section className="container mx-auto px-4 mb-20">
          <div className="text-center mb-12">
            {/* <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Destinations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our most popular travel destinations that our clients choose
            </p> */}
          </div>
          <DestinationGrid />
        </section>

        {/* Tour Packages */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Best Tour Packages</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Handpicked tours and experiences for your perfect vacation
              </p>
            </div>
            <TourPackages />
          </div>
        </section>

        {/* Why Choose Us */}
        <WhyChooseUs />
<AboutCompany/>
        {/* Testimonials */}
        {/* <Testimonials /> */}

        {/* Stats Counter */}
        {/* <StatsCounter /> */}

        {/* Blog Section */}
        {/* <BlogSection /> */}

        {/* Newsletter */}
        {/* <Newsletter /> */}
      </div>
    </>
  );
}