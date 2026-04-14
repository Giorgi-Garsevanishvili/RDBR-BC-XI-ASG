import IconMorning from "../ui/IconMorning";
import AfterNoonIcon from "../ui/IconAfternoon";
import NightIcon from "../ui/IconNight";
import MorningIcon from "../ui/IconMorning";
type AvailableTimeSlot = {
  id: number;
  label: string;
  startTime: string;
  endTime: string;
};

type FlowIdListType = {
  weekDayId: number | null;
  timeSlotId: number | null;
  sessionTypeId: number | null;
  sessionType: string | null;
};

type Props = {
  slot: AvailableTimeSlot;
  disabled?: boolean;
  updateFlow: (key: keyof FlowIdListType, value: number | string) => void;
  flowId: number | null;
};

const ImgDataValues: Record<string, React.FC<{ className: string }>> = {
  morning: MorningIcon,
  afternoon: AfterNoonIcon,
  evening: NightIcon,
};

function TimeSlotComp({ disabled, slot, updateFlow, flowId }: Props) {
  const Icon =
    ImgDataValues[slot.label.slice(0, 9).toLowerCase().replace(" (", "")];

  const updateFullFlow = () => {
    updateFlow("timeSlotId", slot.id);
    updateFlow("sessionType", "");
  };

  return (
    <button
      disabled={disabled}
      onClick={() => updateFullFlow()}
      className={`${disabled ? "bg-grayscale-100 cursor-default border-grayscale-200 text-grayscale-200 " : flowId === slot.id ? "border-[#958FEF] text-[#4F46E5] bg-[#DDDBFA]" : "hover:border-[#958FEF] hover:text-[#4F46E5] cursor-pointer text-grayscale-500 hover:bg-[#DDDBFA] border-grayscale-200 bg-grayscale-50"} flex flex-col w-fit h-fit rounded-xl border p-3.75 gap-2.5`}
    >
      <div className="flex justify-baseline items-center w-fit h-fit gap-3">
        <Icon className="" />
        <div className="flex flex-col gap-0.5 w-fit h-full">
          <h4 className="w-fit h-fit text-body-xs ">
            {slot.label.slice(0, 9).replace(" (", "")}
          </h4>
          <h6 className="w-fit h-fit text-helper-xs-regular">
            {slot.startTime} AM – {slot.endTime} PM
          </h6>
        </div>
      </div>
    </button>
  );
}

export default TimeSlotComp;
