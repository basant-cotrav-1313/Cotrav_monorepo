import React, { useState } from "react";
import { TabsNavigation } from "./Tabs/ServiceTabs";
import { MainContainer } from "./Tabs/MainTabs";
// import SearchButton from "./searchbutton";
import WhyChooseCotrav from "./Tabs/WhyChooseCotrav";
import hero from "../assets/images/Home_Page.png";

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "flight" | "hotel" | "cab" | "bus"
  >("flight");

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <img src={hero} alt="Flight" className="w-full h-full object-cover" />
      </div>

      {/* Booking Card */}
      <div className="max-w-6xl mx-auto -mt-32 px-2 relative z-20">
        <div className="bg-white rounded-2xl shadow-2xl">
          {/* FIRST CONTAINER: Tabs Only */}
          <TabsNavigation activeTab={activeTab} onTabChange={setActiveTab} />

          {/* SECOND CONTAINER: Main Content */}
          <MainContainer activeTab={activeTab} />
        </div>
      </div>
      <WhyChooseCotrav />
    </div>
  );
};

export default Home;
