import React, { ComponentType } from "react";
import CompArrow from "../ui/CompArrow";
import IconOneEmpty from "../ui/IconOneEmpty";
import StepOneFullIcon from "../ui/IconOneFull";
import StepOneEmptyIcon from "../ui/IconOneEmpty";
import StepTwoFullIcon from "../ui/IconTwoFull";
import StepTwoEmptyIcon from "../ui/IconTwoEmpty";
import StepThreeFullIcon from "../ui/IconThreeFull";
import StepThreeEmptyIcon from "../ui/IconThreeEmpty";
import SessionComp from "./SessionComp";

type StepStatus = "true" | "false";
const StepIcons: Record<
  number,
  Record<StepStatus, React.FC<React.SVGProps<SVGSVGElement>>>
> = {
  1: { true: StepOneFullIcon, false: StepOneEmptyIcon },
  2: { true: StepTwoFullIcon, false: StepTwoEmptyIcon },
  3: { true: StepThreeFullIcon, false: StepThreeEmptyIcon },
};

type FlowIdListType = {
  weekDayId: number | null;
  timeSlotId: number | null;
  sessionTypeId: number | null;
  sessionType: string | null;
};

function EnrollStepWrapper<T>({
  step,
  currentStep,
  status,
  title,
  Slots,
  slotData,
  updateFlow,
  flowId,
}: {
  title: string;
  step: number;
  currentStep: number;
  status: boolean;
  Slots: React.ComponentType<{
    slot: T;
    updateFlow: (key: keyof FlowIdListType, value: number | string) => void;
    flowId: number | null;
    disabled?: boolean;
  }>;
  flowId: number | null;
  slotData: T[] | undefined;
  updateFlow: (key: keyof FlowIdListType, value: number | string) => void;
}) {
  const statusCheck: StepStatus = status ? "true" : "false";
  const Icon = StepIcons[step][statusCheck];
  return (
    <div className="flex flex-col w-132.5 h-fit gap-4.5">
      <div
        className={` ${currentStep === step ? "text-[#130E67]" : status ? "text-[#130E67]" : "  text-grayscale-400 "} flex  w-full justify-between h-fit transition-all ease-out duration-300`}
      >
        <div className="flex w-fit items-center gap-2 h-fit">
          <Icon />
          <div className="flex items-center w-fit h-7.25">
            <h3 className="w-fit h-fit text-center text-h3 leading-6">
              {title}
            </h3>
          </div>
        </div>
        <div className={`${status ? "" : "rotate-180"}`}>
          <CompArrow />
        </div>
      </div>
      <div
        className={`${step <= currentStep ? "flex" : "hidden"} w-full h-fit gap-2`}
      >
        {slotData && (
          <>
            {slotData.map((slot, index) => (
              <Slots
                key={index}
                flowId={flowId}
                updateFlow={updateFlow}
                slot={slot}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default EnrollStepWrapper;
