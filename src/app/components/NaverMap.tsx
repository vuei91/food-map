"use client";
import React from "react";
import { RestaurantExtend } from "../types/entities";
import { useNaverMap } from "../hooks/useNaverMap";

const NaverMap = ({ restaurants }: { restaurants: RestaurantExtend[] }) => {
  const { mapElement } = useNaverMap(restaurants);

  return <div ref={mapElement} className="w-full h-screen"></div>;
};

export default NaverMap;
