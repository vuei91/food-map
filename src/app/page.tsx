import React from "react";
import NaverMap from "./components/NaverMap";
import { supabase } from "./supabase/client";
import RestaurantList from "./components/RestaurantList";

const Home = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { data: restaurants, error } = await supabase.rpc("get_restaurants", {
    offset_val: searchParams?.page ? (Number(searchParams?.page) - 1) * 5 : 0,
    limit_val: 4,
  });

  if (error) {
    console.error("Error fetching data:", error);
    return <p>Failed to load data</p>;
  }

  return (
    <div className="flex">
      <div className="flex-1">
        <RestaurantList
          restaurants={restaurants}
          page={searchParams?.page ? Number(searchParams?.page) : 1}
        />
      </div>
      <div className="flex-[2]">
        <NaverMap restaurants={restaurants} />;
      </div>
    </div>
  );
};

export default Home;
