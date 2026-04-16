"use client";
import React, { useEffect, useState } from "react";
import RatingFullStar from "../ui/RatingFullStar";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

function RatingComponent({
  className,
  courseId,
  setOpenRating,
  openRating,
}: {
  className: string;
  courseId: number;
  setOpenRating?: React.Dispatch<React.SetStateAction<boolean>>;
  openRating: boolean;
}) {
  const rating = [1, 2, 3, 4, 5];
  const [hovered, setHovered] = useState<number | null>(null);
  const { token } = useAuth();
  const [localOpen, setLocalOpen] = useState(true);

  useEffect(() => {
    setLocalOpen(openRating);
  }, [openRating]);

  const handleRating = async ({ rating }: { rating: number }) => {
    try {
      await axios.post(
        `https://api.redclass.redberryinternship.ge/api/courses/${courseId}/reviews`,
        { rating: rating },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (setOpenRating) {
        setOpenRating(false);
      }
      setLocalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`${localOpen ? "flex" : "hidden"} items-center transition-all duration-300 ease-out justify-between flex-col w-fit h-fit gap-4.5`}
    >
      <h3
        className={`w-75.5 h-5.75 text-center text-body-sm ${className} leading-6 `}
      >
        Rate your experience
      </h3>
      <div className="flex w-full items-center justify-center h-fit gap-5.5">
        {rating.map((r) => (
          <div
            key={r}
            onMouseEnter={() => setHovered(r)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleRating({ rating: r })}
            className="cursor-pointer"
          >
            <RatingFullStar
              className={`w-11.5  ${hovered && r <= hovered ? " text-warning" : "text-grayscale-50 stroke-grayscale-200"} cursor-pointer  stroke-[0.5] transition-all duration-300 ease-out  h-11.5`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RatingComponent;
