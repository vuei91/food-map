import React from "react";
import NaverMap from "./components/NaverMap";
import { supabase } from "./supabase/client";
import RestaurantList from "./components/RestaurantList";

const Home = async () => {
  const { data: restaurants, error } = await supabase
    .rpc("get_restaurants")
    .range(0, 3);

  if (error) {
    console.error("Error fetching data:", error);
    return <p>Failed to load data</p>;
  }

  return (
    <div className="flex">
      <div className="flex-1">
        <RestaurantList restaurants={restaurants} />
      </div>
      <div className="flex-[2]">
        <NaverMap restaurants={restaurants} />;
      </div>
    </div>
  );
};

export default Home;
