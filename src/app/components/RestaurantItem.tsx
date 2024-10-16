import React from "react";
import { RestaurantExtend } from "../types/entities";
import { getTimestampToSeconds } from "../utils/time";

const RestaurantItem = ({
  restaurant,
  onClick,
}: {
  restaurant: RestaurantExtend;
  onClick: (videoId: string, seconds: number) => void;
}) => {
  const handleClick = () => {
    const time = getTimestampToSeconds(restaurant.timestamp);
    onClick(restaurant.video_id, time);
  };

  return (
    <li
      className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
      onClick={handleClick}
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
  );
};

export default RestaurantItem;
