import { useState } from "react";

export const useModal = () => {
  const [isShow, setIsShow] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState<string>("");
  const [currentSeconds, setCurrentSeconds] = useState<number>(0);

  const openModal = (id: string, seconds: number) => {
    setCurrentVideoId(id);
    setCurrentSeconds(seconds);
    setIsShow(true);
  };

  const closeModal = () => {
    setIsShow(false);
    setCurrentVideoId("");
    setCurrentSeconds(0);
  };

  return { isShow, currentVideoId, currentSeconds, openModal, closeModal };
};
