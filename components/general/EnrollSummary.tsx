"use client";
import { useEffect, useState } from "react";
import EnrollButton from "./EnrollButton";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useModal } from "@/context/ModalContext";
import CompleteProfileWarningComponent from "./CompleteProfileWarningComponent";
import CTA_Button_Outlined from "./CTA_Button_Outlined";
import CTA_Button from "./CTA_Button";
import WarningIconSmall from "../ui/WarningIconSmall";
import RoundSuccessIcon from "../ui/RoundSuccessIcon";

type EnrollCourseDataType = {
  courseId: number | null;
  courseScheduleId: number | null;
  force: boolean;
};

const initialEnrollData: EnrollCourseDataType = {
  courseId: null,
  courseScheduleId: null,
  force: false,
};

type ConflictType = {
  conflictingCourseName: string;
  conflictingEnrollmentId: number;
  requestedCourseId: number;
  schedule: string;
};

function EnrollSummary({
  basePrice,
  sessionType,
  step,
  courseId,
  courseScheduleId,
  setTrigger,
}: {
  basePrice: number;
  sessionType: string | null;
  step: number;
  courseId: number;
  courseScheduleId: number | null;
  setTrigger: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [extraPrice, setExtraPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [enrollData, setEnrollData] = useState(initialEnrollData);

  const formatDays = (dayPart: string) =>
    dayPart
      .split(" - ")
      .map((d) => d.trim().slice(0, 3)) // Tue, Wed, Thu
      .join(" - ");

  const parseSchedule = (schedule: string) => {
    const [dayPart, timePart] = schedule.split(" at ");

    const match = timePart.match(/(.+)\((.+)\)/);

    return {
      days: formatDays(dayPart),
      label: match?.[1]?.trim(),
      time: match?.[2],
    };
  };

  const { loggedIn, user, token } = useAuth();
  const { openModal, closeModal } = useModal();

  const handleEnrollForce = () => {
    handleEnroll({ force: true });
  };

  const handleConflict = (data: ConflictType) => {
    const date = parseSchedule(data.schedule);
    openModal(
      <CompleteProfileWarningComponent
        Buttons={
          <>
            <CTA_Button_Outlined
              action={() => handleEnrollForce()}
              title="Continue Anyway"
              className="w-fit h-14.5  items-center justify-center flex text-button-sm"
            />
            <CTA_Button
              title="Cancel"
              className="w-fit grow h-14.5  items-center justify-center flex text-button-sm"
              type="button"
              action={() => closeModal()}
            />
          </>
        }
        Icon={<WarningIconSmall className="w-23.5 h-23.5 text-warning" />}
        title="Enrollment Conflict"
        info={`You are already enrolled in ${data.conflictingCourseName} with the same schedule: ${date.days} at ${date.time}`}
      />,
    );
  };

  useEffect(() => {
    setEnrollData((prev) => ({
      ...prev,
      courseId: courseId,
      courseScheduleId: courseScheduleId,
    }));
  }, [courseId, courseScheduleId]);

  const handleSuccess = ({ name }: { name: string }) => {
    openModal(
      <CompleteProfileWarningComponent
        Buttons={
          <>
            <CTA_Button
              title="Done"
              className="w-full grow h-14.5  items-center justify-center flex text-button-sm"
              type="button"
              action={() => closeModal()}
            />
          </>
        }
        Icon={<RoundSuccessIcon className="w-23.5 23.5 text-[#4F46E5]" />}
        title="Enrollment Confirmed! "
        info={`You've successfully enrolled to the “${name}” Course!`}
      />,
    );
  };

  const handleEnroll = async ({ force }: { force: boolean }) => {
    try {
      const payload = {
        ...enrollData,
        force: force,
      };

      const response = await axios.post(
        "https://api.redclass.redberryinternship.ge/api/enrollments",
        payload,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (response.status === 201) {
        handleSuccess({ name: response.data.data.course.title });
      }

      setTrigger((prev) => prev + 1);
      setEnrollData(initialEnrollData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data;
        console.log(error);
        console.log(data || error); // unknown error

        if (data.conflicts) {
          handleConflict(data.conflicts[0]);
        }
      }
    }
  };

  useEffect(() => {
    let sessionPrice =
      sessionType === "hybrid" ? 50 : sessionType === "in_person" ? 30 : 0;
    let totalPrice = sessionPrice + Number(basePrice);

    setExtraPrice(Number(sessionPrice));
    setTotalPrice(Number(totalPrice));
  }, [basePrice, sessionType, step]);
  return (
    <div className="flex flex-col w-full rounded-xl border p-10 gap-6 bg-grayscale-50 border-gray-100">
      <div className="flex flex-col w-full h-fit gap-8">
        <div className="flex flex-col w-full h-fit gap-8">
          <div className="flex justify-between items-center w-full h-fit gap-6">
            <h4 className="w-53.25 h-6 text-h4 leading-6 text-grayscale-400">
              Total Price
            </h4>
            <div className="flex w-full justify-end h-fit gap-2.5">
              <h2 className="w-53.25 h-9.75 text-h2 text-end text-gray-900">
                ${totalPrice}
              </h2>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between w-full h-fit pr-1 gap-1">
            <div className="flex w-full  h-fit gap-6">
              <h5 className="w-52.75 h-6 text-body-sm leading-6 text-grayscale-400">
                Base Price
              </h5>
              <div className="flex w-full justify-end h-fit gap-2.5">
                <h5 className="w-52.75 h-6 text-end text-gray-800 text-body-sm leading-6">
                  + ${totalPrice}
                </h5>
              </div>
            </div>
            {extraPrice ? (
              <div className="flex w-full justify-between h-fit gap-6">
                <h5 className="w-52.75 h-6 text-body-sm leading-6 text-grayscale-400">
                  Session Type
                </h5>
                <div className="flex w-full justify-end h-fit gap-2.5">
                  <h5 className="w-52.75 h-6 text-end text-gray-800 text-body-sm leading-6">
                    + ${extraPrice}
                  </h5>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <EnrollButton
          action={() => handleEnroll({ force: false })}
          disabled={!loggedIn || !user?.profileComplete || !courseScheduleId}
          title="Enroll Now"
          type="button"
          className="flex items-center justify-center"
        />
      </div>
    </div>
  );
}

export default EnrollSummary;
