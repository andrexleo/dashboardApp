import React from "react";
import HeroBg from "../../assets/images/boda1.jpg";
const BgStyle = {
  backgroundImage: `url(${HeroBg})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  with: "100%",
  height: "100%",
};
const Hero = () => {
  return (
    <>
      <div
        style={BgStyle}
        className="min-h-[550px] sm:min-h-[800px] relative z-[-1] flex justify-center items-center mb-2"
      >
        <div className="container pb-8 sm:pb-0">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* text content section */}
            <div className="flex flex-col justify-start gap-2 pt-8 sm:pt-0 text-center sm:text-left  sm:order-1">
              <h1 data-aos="fade-up" data-aos-once="true" className="text-6xl text-green-600">
                Business Intelligence Dashboard Insight en tiempo real, éxito en
                cada paso
              </h1>
              <h1 data-aos="fade-up" data-aos-once="true" className="text-4xl font-semibold text-white">
              Donde los datos se convierten en estrategia.
                </h1>
              <div data-aos="fade-up" data-aos-delay="400"></div>
            </div>
            {/* Image section */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
