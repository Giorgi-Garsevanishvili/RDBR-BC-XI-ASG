"use client";
import CloseIcon from "../ui/CloseIcon";
import { useModal } from "@/context/ModalContext";
import ProfileComponent from "./ProfileComponent";
import CTA_Button from "./CTA_Button";
import { useAuth } from "@/context/AuthContext";
import HybridIcon from "../ui/HybridIcon";
import { useEffect, useState } from "react";
import LogIn from "./LogInForm";
import Input from "./Input";
import PencilIcon from "../ui/PencilIcon";
import CheckIcon from "../ui/CheckIcon";
import ArrowDownIcon from "../ui/ArrowDownIcon";
import CompleteProfileWarningComponent from "./CompleteProfileWarningComponent";
import axios from "axios";
import ModalUserIcon from "../ui/ModalUserIcon";
import CTA_Button_Outlined from "./CTA_Button_Outlined";
import SuccessIcon from "../ui/SuccessIcon";
import { RiLogoutCircleLine } from "react-icons/ri";
import DefaultCheckIcon from "../ui/DefaultCheckIcon";

export type UserUpdateType = {
  full_name: string;
  mobile_number: string;
  age: string;
};

export type UpdateUserErrors = {
  fullNameError: string;
  mobileNumberError: string;
  avatarError: string;
  ageError: string;
  updateError: string;
};

const ClearFormData = {
  full_name: "",
  mobile_number: "",
  age: "",
};

const ClearErrorData = {
  fullNameError: "",
  mobileNumberError: "",
  avatarError: "",
  ageError: "",
  updateError: "",
};

function MyProfileComponent() {
  const [avatarFile, setAvatarFile] = useState<File>();
  const [errorData, setErrorData] = useState<UpdateUserErrors>(ClearErrorData);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File>();
  const [submitDisable, setSubmitDisable] = useState(true);
  const { token } = useAuth();
  const { closeModal, openModal } = useModal();
  const { signOut, loggedIn, userUpdateRecorder, user, reCheck } = useAuth();
  const [success, setSuccess] = useState(false);

  const userFilledData = {
    full_name: user?.fullName || "",
    mobile_number: user?.mobileNumber || "",
    age: user?.age || "",
  };
  const [formData, setFormData] = useState<UserUpdateType>(userFilledData);

  useEffect(() => {
    const startedFill = Object.values(formData).some((val) => val.length >= 3);

    if (startedFill) {
      const isError = updateErrorState();
      setSubmitDisable(isError);
    } else {
      setErrorData(ClearErrorData);
      setSubmitDisable(true);
    }
  }, [formData]);

  const updateErrorState = () => {
    setErrorData(ClearErrorData);
    let isError = false;
    // Full Name Validation
    const name = formData.full_name;

    if (!name) {
      setErrorData((prev) => ({
        ...prev,
        fullNameError: "Name is required",
      }));
      isError = true;
    } else if (name.length < 3) {
      setErrorData((prev) => ({
        ...prev,
        fullNameError: "Name must be at least 3 characters",
      }));
      isError = true;
    } else if (name.length > 50) {
      setErrorData((prev) => ({
        ...prev,
        fullNameError: "Name must not exceed 50 characters",
      }));
      isError = true;
    }

    // Mobile Number validation

    const mobileRaw = formData.mobile_number;
    const mobile = mobileRaw.trim();
    if (!mobile) {
      setErrorData((prev) => ({
        ...prev,
        mobileNumberError: "Mobile number is required",
      }));
      isError = true;
    } else if (!/^\d+$/.test(mobile)) {
      setErrorData((prev) => ({
        ...prev,
        mobileNumberError:
          "Please enter a valid Georgian mobile number (9 digits starting with 5)",
      }));
      isError = true;
    } else if (!mobile.startsWith("5")) {
      setErrorData((prev) => ({
        ...prev,
        mobileNumberError: "Georgian mobile numbers must start with 5",
      }));
      isError = true;
    } else if (mobile.length !== 9) {
      setErrorData((prev) => ({
        ...prev,
        mobileNumberError: "Mobile number must be exactly 9 digits",
      }));
      isError = true;
    }

    // Age Validation

    const ageRaw = formData.age;

    if (!ageRaw) {
      setErrorData((prev) => ({
        ...prev,
        ageError: "Age is required",
      }));
      isError = true;
    } else if (!/^\d+$/.test(ageRaw)) {
      setErrorData((prev) => ({
        ...prev,
        ageError: "Age must be a number",
      }));
      isError = true;
    } else {
      const age = Number(ageRaw);

      if (age < 16) {
        setErrorData((prev) => ({
          ...prev,
          ageError: "Age must be at least 16",
        }));
        isError = true;
      }
      if (age > 120) {
        setErrorData((prev) => ({
          ...prev,
          ageError: "Please enter a valid age",
        }));
        isError = true;
      }
    }

    if (isError) {
      setSuccess(false);
      return isError;
    } else {
      setErrorData(ClearErrorData);
      setSuccess(true);
      return isError;
    }
  };

  const handleSignOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    closeModal();
    signOut();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 2 * 1024 * 1024; // 2MB

    // File Type Validation
    if (setErrorData) {
      if (!allowedTypes.includes(selectedFile.type)) {
        setErrorData((prev) => ({
          ...prev,

          avatarError: "Only JPG, PNG or WebP allowed ",
        }));
        return;
      }

      // SIZE VALIDATION
      if (selectedFile.size > maxSize) {
        setErrorData?.((prev) => ({
          ...prev,

          avatarError: "Max size is 2MB",
        }));
        return;
      }
      const previewUrl = URL.createObjectURL(selectedFile);

      setFile(selectedFile);
      setPreview(previewUrl);
      if (selectedFile) {
        setAvatarFile?.(selectedFile);
      }

      setErrorData?.((prev) => ({
        ...prev,
        avatarError: "",
      }));

      setTimeout(() => {
        setErrorData(ClearErrorData);
      }, 6000);
    }
  };

  const updateData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleUpdateSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setSubmitDisable(true);
    updateErrorState();

    e.preventDefault();
    try {
      const errorCheck = updateErrorState();

      if (errorCheck) {
        return;
      }
      const form = new FormData();
      form.append("full_name", formData.full_name.trim());
      form.append("mobile_number", formData.mobile_number.trim());
      form.append("age", formData.age);

      if (avatarFile) {
        form.append("avatar", avatarFile);
      }

      const response = await axios.put(
        " https://api.redclass.redberryinternship.ge/api/profile",
        form,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (response.status === 200) {
        setAvatarFile(undefined);
        setFormData(ClearFormData);
        setErrorData(ClearErrorData);
        setPreview(null);
        userUpdateRecorder(response.data.data);
        reCheck();
        openModal(
          <CompleteProfileWarningComponent
            Buttons={
              <CTA_Button
                title="Done"
                className="w-full h-14.5  items-center justify-center flex text-button-sm"
                type="button"
                action={() => closeModal()}
              />
            }
            Icon={SuccessIcon}
            title="Profile updated successfully!"
          />,
        );
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data;

        setErrorData((prev) => ({
          ...prev,
          updateError: data?.message || "Something went wrong",
        }));
      } else {
        console.log(error); // unknown error
      }
    } finally {
      setTimeout(() => {
        setErrorData(ClearErrorData);
      }, 6000);
    }
  };

  useEffect(() => {
    if (!loggedIn) {
      openModal(<LogIn />);
    }
  }, [loggedIn]);

  const handleModalClose = (
    e: React.MouseEvent<HTMLButtonElement> | KeyboardEvent,
  ) => {
    e.preventDefault();
    if (user?.profileComplete) {
      closeModal();
    } else {
      openModal(
        <CompleteProfileWarningComponent
          Buttons={
            <>
              <CTA_Button_Outlined
                title="Complete Profile"
                className="w-full h-14.5 items-center justify-center flex text-button-sm"
                action={() => openModal(<MyProfileComponent />)}
              />
              <CTA_Button
                title="Cancel"
                className="w-full h-14.5  items-center justify-center flex text-button-sm"
                type="button"
                action={() => closeModal()}
              />
            </>
          }
          Icon={ModalUserIcon}
          title="Your profile is incomplete"
          info="You won't be able to enroll in courses until you complete it. Close anyway?"
        />,
      );
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleModalClose(e);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [closeModal]);

  return (
    <form
      onSubmit={(e) => handleUpdateSubmit(e)}
      className="w-115 flex items-end relative justify-start flex-col rounded-xl p-12.5 bg-[#FFFFFF] gap-3"
    >
      <div className="flex absolute top-5 right-3.5 left-3.5">
        <button
          type="button"
          onClick={(e) => handleModalClose(e)}
          className="cursor-pointer absolute flex top-0 right-0"
        >
          <CloseIcon />
        </button>
        <button
          type="button"
          onClick={(e) => handleSignOut(e)}
          className="cursor-pointer absolute flex top-0 left-0"
        >
          <RiLogoutCircleLine className="text-grayscale-400" size={22} />
        </button>
      </div>
      <div className="flex flex-col w-full gap-6">
        <div className="flex flex-col w-full h-fit gap-4">
          <div className="flex flex-col justify-center items-center  w-full h-fit gap-6">
            <div className="w-full h-fit justify-center items-center flex flex-col gap-6">
              <h2 className="w-90 h-9.75 text-center text-grayscale-900 text-h2">
                Profile
              </h2>
              <div className="flex flex-col w-full h-fit gap-2">
                <div className="flex flex-col w-full h-fit gap-2.5">
                  <div className="flex justify-center items-center w-full h-fit gap-3">
                    <div>
                      <ProfileComponent
                        profileComplete={user?.profileComplete}
                      />
                    </div>
                    <div className="flex flex-col justify-center w-full h-fit gap-1">
                      <h4 className="w-73 h-[24.3px] text-h4 text-grayscale-950">
                        {user?.username}
                      </h4>
                      <div className="flex flex-col w-full h-fit pl-0.5 gap2.5">
                        <div className="flex flex-col w-fit h-fit gap-2.5">
                          <div className="flex w-fit h-fit gap-0.5">
                            <p
                              className={`w-fit h-3 ${user?.profileComplete ? "text-success" : user?.profileComplete === undefined ? "text-error" : "text-warning"} text-helper-xs-regular`}
                            >
                              {user?.profileComplete
                                ? "Profile is Complete"
                                : !user?.profileComplete === undefined
                                  ? "Undefined Profile Status"
                                  : "Incomplete Profile"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full h-fit gap-3">
              {user && (
                <>
                  <Input
                    value={formData.full_name}
                    success={success}
                    placeholder={user.fullName ? user.fullName : "Full Name"}
                    label="Full Name"
                    id="fullname"
                    name="username"
                    type="text"
                    error={errorData.fullNameError}
                    onChange={(e) => updateData({ full_name: e.target.value })}
                    Icon={PencilIcon}
                  />
                  <Input
                    placeholder="Email"
                    label="Email"
                    id="email"
                    name="email"
                    type="text"
                    value={user.email}
                    Icon={DefaultCheckIcon}
                    disabled
                  />
                  <div className="flex  w-full gap-2">
                    <Input
                      placeholder={user?.mobileNumber ?? "Mobile Number"}
                      success={success}
                      label="Mobile Number"
                      id="mobile-number"
                      name="mobile-number"
                      type="mobile"
                      error={errorData.mobileNumberError}
                      value={formData.mobile_number}
                      onChange={(e) =>
                        updateData({ mobile_number: e.target.value })
                      }
                      Icon={CheckIcon}
                    />
                    <Input
                      placeholder={user?.age ? user.age : undefined}
                      label="Age"
                      success={success}
                      id="age"
                      name="age"
                      type="age"
                      error={errorData.ageError}
                      value={formData.age}
                      onChange={(e) => updateData({ age: e.target.value })}
                      Icon={ArrowDownIcon}
                    />
                  </div>
                  <Input
                    placeholder="Upload Avatar"
                    label="Upload Avatar"
                    id="avatar-upload"
                    name="avatar-upload"
                    type="file"
                    file={file}
                    error={errorData.avatarError || errorData.updateError}
                    Icon={CheckIcon}
                    preview={preview}
                    handleFileChange={handleFileChange}
                  />
                </>
              )}
            </div>
          </div>
          <CTA_Button
            disabled={submitDisable}
            type="submit"
            title="Update Profile"
            className="text-button-sm h-11.75 text-center flex justify-center items-center"
          />
        </div>
      </div>
    </form>
  );
}

export default MyProfileComponent;
