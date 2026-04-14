"use client";
import EnrollStepWrapper from "./EnrollStepWrapper";
import TotalPriceComp from "./TotalPriceComp";
import WeeklyScheduleComp from "./WeeklyScheduleComp";
import SessionComp from "./SessionComp";
import TimeSlotComp from "./TimeSlotComp";
import { useEffect, useState } from "react";
import axios from "axios";

type FlowType = {
  step: number;
  filled: boolean;
};

type EnrollDataType = {
  courseId: number | null;
  courseScheduleId: number | null;
  force: boolean;
};

type FlowIdListType = {
  weekDayId: number | null;
  timeSlotId: number | null;
  sessionTypeId: number | null;
  sessionType: string | null;
};

type AvailableWeekDaysType = {
  id: number;
  label: string;
  days: string[];
};

const initialFlow: FlowType = {
  step: 1,
  filled: false,
};

const initialEnrollData = {
  courseId: null,
  courseScheduleId: null,
  force: false,
};

const initialFlowIdList: FlowIdListType = {
  weekDayId: null,
  timeSlotId: null,
  sessionTypeId: null,
  sessionType: null
};

type AvailableTimeSlot = {
  id: number;
  label: string;
  startTime: string;
  endTime: string;
};

type AvailableSessionType = {
  id: number;
  courseScheduleId: number;
  name: string;
  priceModifier: number;
  availableSeats: number;
  location: string;
};

function EnrollComponent({ courseId, priceData }: { courseId: number, priceData: number }) {
  const [availableWeekDays, setAvailableWeekdays] =
    useState<AvailableWeekDaysType[]>();
  const [availableTimeSlots, setAvailableTimeSlots] =
    useState<AvailableTimeSlot[]>();
  const [availableSessionType, setAvailableSessionType] =
    useState<AvailableSessionType[]>();
  const [flow, setFlow] = useState<FlowType>(initialFlow);
  const [enrollData, setEnrollData] =
    useState<EnrollDataType>(initialEnrollData);
  const [flowIdList, setFlowIdList] =
    useState<FlowIdListType>(initialFlowIdList);

  const updateFlow = (key: keyof FlowIdListType, value: number | string) => {
    setFlowIdList((prev) => {
      const isSame = prev[key] === value;

      const newState = {
        ...prev,
        [key]: isSame ? null : value, // toggle
      };

      // reset dependent steps 👇
      if (key === "weekDayId") {
        newState.timeSlotId = null;
        newState.sessionTypeId = null;
      }

      if (key === "timeSlotId") {
        newState.sessionTypeId = null;
      }

      return newState;
    });
  };

  useEffect(() => {
    if (!flowIdList.weekDayId) {
      setFlow({ step: 1, filled: false });
      getWeekDays();
    } else if (!flowIdList.timeSlotId) {
      setFlow({ step: 2, filled: false });
      getTimeSlots();
    } else if (!flowIdList.sessionTypeId) {
      setFlow({ step: 3, filled: false });
      getTimeSessionType();
    } else {
      setFlow({ step: 3, filled: true });
      getWeekDays();
      console.log(flowIdList);
    }
  }, [flowIdList]);

  const getWeekDays = async () => {
    try {
      const response = await axios.get(
        `https://api.redclass.redberryinternship.ge/api/courses/${courseId}/weekly-schedules`,
      );
      setAvailableWeekdays(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTimeSlots = async () => {
    try {
      const response = await axios.get(
        `https://api.redclass.redberryinternship.ge/api/courses/${courseId}/time-slots?weekly_schedule_id=${flowIdList.weekDayId}`,
      );
      setAvailableTimeSlots(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getTimeSessionType = async () => {
    try {
      const response = await axios.get(
        `https://api.redclass.redberryinternship.ge/api/courses/${courseId}/session-types?weekly_schedule_id=${flowIdList.weekDayId}&time_slot_id=${flowIdList.timeSlotId}`,
      );
      setAvailableSessionType(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center sticky left-303 mt-30 w-132.5 h-fit gap-2.75 shrink-0">
      <div className="flex w-fit h-fit">
        <div className="flex w-full h-full rounded-xl gap2.5">
          <div className="flex flex-col relative w-132.5 h-fit rounded-xl gap-8">
            <EnrollStepWrapper
              step={1}
              flowId={flowIdList.weekDayId}
              status={flowIdList.weekDayId !== null}
              currentStep={flow.step}
              title="Weekly Schedule"
              updateFlow={updateFlow}
              slotData={availableWeekDays}
              Slots={WeeklyScheduleComp}
            />
            <EnrollStepWrapper
              step={2}
              status={flowIdList.timeSlotId !== null}
              flowId={flowIdList.timeSlotId}
              currentStep={flow.step}
              slotData={availableTimeSlots}
              updateFlow={updateFlow}
              title="Time Slots"
              Slots={TimeSlotComp}
            />
            <EnrollStepWrapper
              step={3}
              status={flowIdList.sessionTypeId !== null}
              flowId={flowIdList.sessionTypeId}
              currentStep={flow.step}
              slotData={availableSessionType}
              title="Session Type"
              updateFlow={updateFlow}
              Slots={SessionComp}
            />
            <TotalPriceComp basePrice={priceData} step={flow.step} sessionType={flowIdList.sessionType}/>
          </div>
        </div>
      </div>
      <div>warn</div>
    </div>
  );
}

export default EnrollComponent;
