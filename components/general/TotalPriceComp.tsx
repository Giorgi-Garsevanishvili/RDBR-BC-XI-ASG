"use client";
import { useEffect, useState } from "react";
import EnrollButton from "./EnrollButton";

function TotalPriceComp({
  basePrice,
  sessionType,
  step,
}: {
  basePrice: number;
  sessionType: string | null;
  step: number;
}) {
  const [extraPrice, setExtraPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let sessionPrice =
      sessionType === "hybrid" ? 50 : sessionType === "in_person" ? 30 : 0;
    let totalPrice = sessionPrice + Number(basePrice);

    console.log(sessionType);
    
    console.log(step);
    
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
          title="Enroll Now"
          type="button"
          className="flex items-center justify-center"
        />
      </div>
    </div>
  );
}

export default TotalPriceComp;
