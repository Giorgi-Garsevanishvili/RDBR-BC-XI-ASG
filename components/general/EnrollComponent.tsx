"use client";
import EnrollStepWrapper from "./EnrollStepWrapper";
import EnrollSummary from "./EnrollSummary";
import WeeklyScheduleComp from "./WeeklyScheduleComp";
import SessionComp from "./SessionComp";
import TimeSlotComp from "./TimeSlotComp";
import { useEffect, useState } from "react";
import axios from "axios";

import CourseWarning from "./CourseWarning";

type FlowType = {
  step: number;
  filled: boolean;
};

export type FlowIdListType = {
  weekDayId: number | null;
  timeSlotId: number | null;
  sessionTypeId: number | null;
  sessionType: string | null;
  courseScheduleId: number | null;
};

export type AvailableWeekDaysType = {
  id: number;
  label: string;
  days: string[];
  disabled?: boolean;
};

const initialFlow: FlowType = {
  step: 1,
  filled: false,
};

const initialFlowIdList: FlowIdListType = {
  weekDayId: null,
  timeSlotId: null,
  sessionTypeId: null,
  courseScheduleId: null,
  sessionType: null,
};

export type AvailableTimeSlot = {
  id: number;
  label: string;
  startTime: string;
  endTime: string;
  disabled: boolean;
};

export type AvailableSessionType = {
  id: number;
  courseScheduleId: number;
  name: string;
  priceModifier: number;
  availableSeats: number;
  location: string | null | undefined;
  disabled: boolean;
};

const initialWeeklySlotData = [
  {
    id: 1,
    label: "Monday - Wednesday",
    days: ["monday", "wednesday"],
    disabled: true,
  },
  {
    id: 2,
    label: "Tuesday - Thursday",
    days: ["tuesday", "thursday"],
    disabled: true,
  },
  {
    id: 3,
    label: "Friday - Saturday",
    days: ["friday", "saturday"],
    disabled: true,
  },
  {
    id: 4,
    label: "Weekend Only",
    days: ["saturday", "sunday"],
    disabled: true,
  },
];
const InitialTimeSlotData = [
  {
    id: 1,
    label: "Morning (9:00 AM - 11:00 AM)",
    startTime: "09:00:00",
    endTime: "11:00:00",
    disabled: true,
  },
  {
    id: 2,
    label: "Afternoon (2:00 PM - 4:00 PM)",
    startTime: "14:00:00",
    endTime: "16:00:00",
    disabled: true,
  },
  {
    id: 3,
    label: "Evening (6:00 PM - 8:00 PM)",
    startTime: "18:00:00",
    endTime: "20:00:00",
    disabled: true,
  },
];
const initialSessionData = [
  {
    id: 1,
    courseScheduleId: 0,
    name: "online",
    priceModifier: 0.0,
    availableSeats: 0,
    location: null,
    disabled: true,
  },
  {
    id: 2,
    courseScheduleId: 0,
    name: "in_person",
    priceModifier: 50.0,
    availableSeats: 0,
    location: null,
    disabled: true,
  },
  {
    id: 3,
    courseScheduleId: 0,
    name: "hybrid",
    priceModifier: 30.0,
    availableSeats: 0,
    location: null,
    disabled: true,
  },
];

function EnrollComponent({
  courseId,
  priceData,
  setTrigger,
}: {
  courseId: number;
  priceData: number;
  setTrigger: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [availableWeekDays, setAvailableWeekdays] = useState<
    AvailableWeekDaysType[]
  >(initialWeeklySlotData);
  const [availableTimeSlots, setAvailableTimeSlots] =
    useState<AvailableTimeSlot[]>();
  const [availableSessionType, setAvailableSessionType] =
    useState<AvailableSessionType[]>();
  const [flow, setFlow] = useState<FlowType>(initialFlow);
  const [flowIdList, setFlowIdList] =
    useState<FlowIdListType>(initialFlowIdList);

  const updateFlow = (key: keyof FlowIdListType, value: number | string) => {
    setFlowIdList((prev) => {
      const isSame = prev[key] === value;

      const newState = {
        ...prev,
        [key]: isSame ? null : value, // toggle
      };

      if (key === "weekDayId") {
        newState.timeSlotId = null;
        newState.sessionTypeId = null;
        newState.courseScheduleId = null;
      }

      if (key === "timeSlotId") {
        newState.sessionTypeId = null;
        newState.courseScheduleId = null;
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
    }
  }, [flowIdList]);

  const getWeekDays = async () => {
    try {
      const response = await axios.get(
        `https://api.redclass.redberryinternship.ge/api/courses/${courseId}/weekly-schedules`,
      );

      const dbData = response.data.data as AvailableWeekDaysType[];

      const merged = initialWeeklySlotData.map((initialSlot) => {
        const match = dbData.find(
          (dbSlot) =>
            dbSlot.days[0] === initialSlot.days[0] &&
            dbSlot.days[1] === initialSlot.days[1],
        );

        if (match) {
          return {
            ...initialSlot, // keep your UI label
            ...match, // take id from DB (important!)
            disabled: false, // enable
          };
        }

        return {
          ...initialSlot,
          disabled: true, // keep disabled
        };
      });

      setAvailableWeekdays(merged);
    } catch (error) {
      return;
    }
  };

  const getTimeSlots = async () => {
    try {
      const response = await axios.get(
        `https://api.redclass.redberryinternship.ge/api/courses/${courseId}/time-slots?weekly_schedule_id=${flowIdList.weekDayId}`,
      );

      const dbData = response.data.data as AvailableTimeSlot[];

      const merged = InitialTimeSlotData.map((initialSlot) => {
        const match = dbData.find(
          (dbSlot) =>
            dbSlot.label.trim().toLocaleLowerCase() ===
            initialSlot.label.toLowerCase().trim(),
        );

        if (match) {
          return {
            ...initialSlot, // keep your UI label
            ...match, // take id from DB (important!)
            disabled: false, // enable
          };
        }

        return {
          ...initialSlot,
          disabled: true, // keep disabled
        };
      });

      setAvailableTimeSlots(merged);
    } catch (error) {
      return;
    }
  };

  const getTimeSessionType = async () => {
    try {
      const response = await axios.get(
        `https://api.redclass.redberryinternship.ge/api/courses/${courseId}/session-types?weekly_schedule_id=${flowIdList.weekDayId}&time_slot_id=${flowIdList.timeSlotId}`,
      );

      const dbData = response.data.data as AvailableSessionType[];

      const getMatch = (name: string) =>
        dbData.find(
          (dbSlot) =>
            dbSlot.name.toLowerCase().trim() === name.toLowerCase().trim(),
        );

      const getFallbackLocation = (name: string) => {
        const n = name.toLowerCase().trim();

        // 🔁 cross fallback rule
        if (n === "in_person") {
          return (
            getMatch("hybrid")?.location ||
            getMatch("in_person")?.location ||
            null
          );
        }

        if (n === "hybrid") {
          return (
            getMatch("in_person")?.location ||
            getMatch("hybrid")?.location ||
            null
          );
        }

        if (n === "online") {
          return getMatch("online")?.location;
        }

        return null;
      };

      const merged = initialSessionData.map((initialSlot) => {
        const match = getMatch(initialSlot.name);

        if (!match) {
          return {
            ...initialSlot,
            location: getFallbackLocation(initialSlot.name),
            disabled: true,
          };
        }

        return {
          ...initialSlot,
          ...match,
          disabled: false,
        };
      });

      setAvailableSessionType(merged);
    } catch (error) {
      return;
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
            <EnrollSummary
              setTrigger={setTrigger}
              courseId={courseId}
              courseScheduleId={flowIdList.courseScheduleId}
              basePrice={priceData}
              step={flow.step}
              sessionType={flowIdList.sessionType}
            />
          </div>
        </div>
      </div>
      <CourseWarning />
    </div>
  );
}

export default EnrollComponent;
