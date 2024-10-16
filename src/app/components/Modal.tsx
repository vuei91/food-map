"use client";

import React, { useEffect, useRef } from "react";
import YouTubePlayer from "react-youtube";

interface ModalProps {
  videoId: string;
  time: number;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ videoId, time, onClose }) => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      {/* Modal Container */}
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden max-w-[580px] w-full box-border p-[10px]">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-black bg-white rounded-[5px] p-[0px_10px] text-[20px]"
          onClick={onClose}
        >
          &times;
        </button>
        <YouTubePlayer
          videoId={videoId}
          opts={{ playerVars: { start: time, autoplay: 1 }, width: 560 }}
        />
      </div>
    </div>
  );
};

export default Modal;
