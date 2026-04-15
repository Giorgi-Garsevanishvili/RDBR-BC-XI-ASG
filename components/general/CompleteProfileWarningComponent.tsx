import React, { ReactElement, ReactNode } from "react";

function CompleteProfileWarningComponent({
  title,
  info,
  Icon,
  Buttons,
}: {
  title: string;
  info?: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | React.ReactElement;
  Buttons?: ReactNode;
}) {
  return (
    <div className="flex w-119 max-h-121.5 rounded-2xl p-15 gap-2.5 bg-grayscale-50">
      <div className="flex flex-col w-full h-fit gap-10.5">
        <div className="flex flex-col justify-between items-center w-full h-fit gap-10">
          <div className="flex flex-col items-center justify-between w-full h-fit gap-6">
            {React.isValidElement(Icon) ? Icon : <Icon />}
            <div className="flex flex-col text-center items-center w-full h-fit text-grayscale-700 gap-6">
              <p className="w-89 h-fit  text-h2 ">{title}</p>
              {info && <p className="w-89 h-fit  text-body-lg ">{info}</p>}
            </div>
          </div>
          <div className="flex w-full h-fit gap-2">{Buttons}</div>
        </div>
      </div>
    </div>
  );
}

export default CompleteProfileWarningComponent;
