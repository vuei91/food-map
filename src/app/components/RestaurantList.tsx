"use client";
import React from "react";
import { RestaurantExtend } from "../types/entities";
import Modal from "./Modal";
import Pagination from "./Pagination";
import RestaurantItem from "./RestaurantItem";
import { useModal } from "../hooks/useModal";

const RestaurantList = ({
  restaurants,
  page,
}: {
  restaurants: RestaurantExtend[];
  page: number;
}) => {
  const { isShow, currentVideoId, currentSeconds, openModal, closeModal } =
    useModal();

  return (
    <>
      {isShow && (
        <Modal
          videoId={currentVideoId}
          time={currentSeconds}
          onClose={closeModal}
        />
      )}
      <div className="p-4">
        <ul className="space-y-5">
          {restaurants.map((restaurant, index) => (
            <RestaurantItem
              key={index}
              restaurant={restaurant}
              onClick={openModal}
            />
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
