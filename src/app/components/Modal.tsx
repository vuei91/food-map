"use client";

import React, { useEffect, useRef, useState } from "react";
import YouTubePlayer from "react-youtube";

interface ModalProps {
  videoId: string;
  time: number;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ videoId, time, onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  // 모달 바깥 클릭 감지 함수
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose(); // 모달을 닫는 함수 실행
      }
    };

    // 클릭 이벤트 리스너 추가
    document.addEventListener("mousedown", handleClickOutside);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, onClose]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      {/* Modal Container */}
      <div
        className="relative bg-white rounded-lg shadow-lg overflow-hidden max-w-[660px] w-full box-border p-[10px]"
        ref={modalRef}
      >
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-black bg-white rounded-[5px] p-[0px_10px] text-[20px]"
          onClick={onClose}
        >
          &times;
        </button>
        <YouTubePlayer
          videoId={videoId}
          opts={{ playerVars: { start: time, autoplay: 1 } }}
        />
      </div>
    </div>
  );
};

export default Modal;
