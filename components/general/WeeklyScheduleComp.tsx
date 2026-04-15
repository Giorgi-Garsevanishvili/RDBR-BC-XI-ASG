import React from "react";
import { AvailableWeekDaysType, FlowIdListType } from "./EnrollComponent";

type Props = {
  slot: AvailableWeekDaysType;
  disabled?: boolean;
  updateFlow: (key: keyof FlowIdListType, value: number | string) => void;
  flowId: number | null;
};

function WeeklyScheduleComp({ slot, updateFlow, flowId }: Props) {
  const updateFullFlow = () => {
    updateFlow("weekDayId", slot.id);
    updateFlow("sessionType", "");
  };
  return (
    <button
      disabled={slot.disabled}
      onClick={() => updateFullFlow()}
      className={`flex ${slot.disabled ? "cursor-default border-grayscale-200 bg-gray-100 text-grayscale-200" : flowId === slot.id ? "border-[#958FEF] bg-[#DDDBFA] text-[#4F46E5]" : "bg-grayscale-50 border-grayscale-200  cursor-pointer text-grayscale-800 hover:border-[#958FEF] hover:bg-[#DDDBFA] hover:text-[#4F46E5]"} items-center justify-center w-73.75 h-22.75 rounded-xl border p-2.5 gap-2.5 transition-all duration-500 ease-out `}
    >
      <h5 className="w-fit capitalize h-fit text-h5">
        {slot.days[0].toLowerCase().trim() === "saturday" &&
        slot.days[1].toLowerCase().trim() === "sunday"
          ? "Weekends"
          : `${slot.days[0].slice(0, 3)} - ${slot.days[1].slice(0, 3)}`}
      </h5>
    </button>
  );
}

export default WeeklyScheduleComp;
