import React from "react";
import WarningIconSmall from "../ui/WarningIconSmall";
import PersonsIcon from "../ui/PersonsIcon";
import LocationPinIcon from "../ui/LocationPinIcon";
import HybridIcon from "../ui/HybridIcon";
import DesktopIcon from "../ui/OnlineDesktopIcon";

const ImgDataValues: Record<string, React.FC<{ className: string }>> = {
  online: DesktopIcon,
  hybrid: HybridIcon,
  in_person: PersonsIcon,
};

type AvailableSessionType = {
  id: number;
  courseScheduleId: number;
  name: string;
  priceModifier: number;
  availableSeats: number;
  location: string;
};

type FlowIdListType = {
  weekDayId: number | null;
  timeSlotId: number | null;
  sessionTypeId: number | null;
  sessionType: string | null;
};

type Props = {
  slot: AvailableSessionType;
  disabled?: boolean;
  updateFlow: (key: keyof FlowIdListType, value: number | string) => void;
  flowId: number | null;
};

function SessionComp({ disabled, slot, updateFlow, flowId }: Props) {
  const Icon = ImgDataValues[slot.name];

  const updateFullFlow = () => {
    updateFlow("sessionTypeId", slot.id);
    updateFlow("sessionType", slot.name);
  };

  return (
    <button
      disabled={disabled || slot.availableSeats === 0}
      onClick={() => updateFullFlow()}
      className="flex flex-col  items-center w-42.75 h-fit gap-2 transition-all duration-300 ease-out"
    >
      <div
        className={`${disabled || slot.availableSeats === 0 ? " border-grayscale-200 cursor-default bg-gray-100 group text-grayscale-200 stroke-grayscale-200" : flowId === slot.id ? "bg-[#DDDBFA] border-[#958FEF] cursor-pointer text-[#4F46E5] stroke-[#4F46E5]" : "hover:bg-[#DDDBFA] hover:border-[#958FEF] cursor-pointer hover:text-[#4F46E5] group hover:stroke-[#4F46E5] bg-grayscale-50  border-grayscale-200"} flex  flex-col w-fit h-32.75 rounded-xl border transition-all duration-300 ease-out  py-3.75 px-5 gap-1 `}
      >
        <div className="flex w-full flex-col justify-center items-center h-fit gap-1.5">
          {Icon ? (
            <Icon className="h-7 flex items-center justify-center text-center w-7" />
          ) : null}
          <div className="flex justify-between items-center flex-col">
            <div className="flex items-center justify-center flex-col w-full h-full gap-1.5">
              <h5
                className={`w-32.75 text-center capitalize h-4.75 text-h5 ${disabled || slot.availableSeats === 0 ? "text-grayscale-200" : flowId === slot.id ? "text-[#4F46E5]" : "group-hover:text-[#4F46E5] text-grayscale-500"} `}
              >
                {slot.name.replace("_", "-")}
              </h5>
              <div className="flex flex-col justify-center items-center shrink-0 w-full h-fit gap-1">
                <div className="flex justify-center items-center shrink-0   gap-0.5 w-full h-fit">
                  {slot.location && (
                    <LocationPinIcon className="h-3 w-3 flex items-center justify-center" />
                  )}
                  <h6
                    className={`w-fit text-center h-fit ${disabled || slot.availableSeats === 0 ? "text-grayscale-200" : flowId === slot.id ? "text-[#4F46E5]" : "group-hover:text-[#4F46E5] text-grayscale-600"}  text-helper-s-regular`}
                  >
                    {slot.location ? slot.location : "Google Meet"}
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <h3
            className={`text-body-xs w-fit text-center h-fit ${disabled || slot.availableSeats === 0 ? "text-grayscale-200" : "text-[#736BEA]"} `}
          >
            +
            {Number(slot.priceModifier) === 0
              ? "Included"
              : Number(slot.priceModifier)}
          </h3>
        </div>
      </div>
      <div
        className={`flex ${slot.availableSeats < 5 && slot.availableSeats > 0 ? "text-warning" : " text-grayscale-600"} items-center justify-center w-fit h-fit gap-1`}
      >
        {slot.availableSeats < 5 && slot.availableSeats > 0 ? (
          <WarningIconSmall />
        ) : null}
        <h5 className="text-helper-md">
          {slot.availableSeats === 0 && "No Seats Available"}

          {slot.availableSeats < 5 && slot.availableSeats > 0 ? (
            <span className="mr-0.5">Only</span>
          ) : (
            ""
          )}
          {slot.availableSeats === 0
            ? ""
            : `${slot.availableSeats} Seats
          Remaining`}
        </h5>
      </div>
    </button>
  );
}

export default SessionComp;
