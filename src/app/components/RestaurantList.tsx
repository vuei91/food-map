"use client";
import React, { useState } from "react";
import { RestaurantExtend } from "../types/entities";
import Modal from "./Modal";
import Pagination from "./Pagination";

const RestaurantList = ({
  restaurants,
  page,
}: {
  restaurants: RestaurantExtend[];
  page: number;
}) => {
  const [currentVideoId, setCurrentVideoId] = useState<string>("");
  const [currentSeconds, setCurrentSeconds] = useState<number>(0);
  const [isShow, setIsShow] = useState<boolean>(false);
  const getTimestampToSeconds = (time: string) => {
    if (!time) return 0;
    if (time.includes("-")) time = time.split("-")[0];
    const parts = time.split(":");
    const seconds = parts.reduce((acc, part, index) => {
      return acc + parseInt(part) * Math.pow(60, parts.length - index - 1);
    }, 0);
    return seconds;
  };
  const openModal = (id: string, seconds: number) => {
    setCurrentVideoId(id);
    setCurrentSeconds(seconds);
    setIsShow(true);
  };
  return (
    <>
      {isShow && (
        <Modal
          videoId={currentVideoId}
          time={currentSeconds}
          onClose={() => {
            setIsShow(false);
            setCurrentVideoId("");
            setCurrentSeconds(0);
          }}
        />
      )}
      <div className="p-4">
        <ul className="space-y-5">
          {restaurants.map((restaurant, index) => (
            <li
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
              onClick={() => {
                const time = getTimestampToSeconds(restaurant.timestamp);
                openModal(restaurant.video_id, time);
              }}
            >
              <div className="flex">
                {/* Thumbnail Section */}
                <img
                  src={restaurant.standard}
                  loading="lazy"
                  className="w-32 h-32 object-cover"
                />
                <div className="p-4 flex-1">
                  {/* Restaurant Info */}
                  <h2 className="text-xl font-semibold">{restaurant.name}</h2>
                  <div className="text-gray-700">
                    {restaurant.distance &&
                      "내 위치로 부터 거리 : " +
                        Number(restaurant.distance).toFixed(2).toString() +
                        "km"}
                    {restaurant.timestamp && (
                      <>
                        <br />
                        유튜브 시작 시간: {restaurant.timestamp}
                      </>
                    )}
                  </div>
                  <p className="text-gray-700">주소: {restaurant.address}</p>
                  <div className="flex space-x-4 mt-2">
                    {restaurant.naver_link && (
                      <a
                        href={restaurant.naver_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        네이버지도
                      </a>
                    )}
                    {restaurant.google_map_link && (
                      <a
                        href={restaurant.google_map_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        구글지도
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Pagination
        totalPages={Math.ceil((restaurants[0]?.total_count || 0) / 5)}
        currentPage={page}
      />
    </>
  );
};

export default RestaurantList;
