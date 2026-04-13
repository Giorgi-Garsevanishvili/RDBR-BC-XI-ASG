"use client";
import { useEffect, useState } from "react";
import ClearFilterXIcon from "../ui/ClearFilterXIcon";
import axios from "axios";
import Chips from "./Chips";
import DevelopmentIcon from "../ui/DevelopmentIcon";
import DesignIcon from "../ui/DesignIcon";
import BusinessIcon from "../ui/BusinessIcon";
import MarketingIcon from "../ui/MarketingIcon";
import DataScienceIcon from "../ui/DataScienceIcon";

const ImgDataValues: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  development: DevelopmentIcon,
  design: DesignIcon,
  business: BusinessIcon,
  marketing: MarketingIcon,
  "data-science": DataScienceIcon,
};

type CategoriesDataType = {
  id: 0;
  name: "string";
  icon: "string";
};

type TopicDataType = {
  id: 0;
  name: "string";
  categoryId: 0;
};

type InstructorsDataType = {
  id: 0;
  name: "string";
  avatar: "string";
};

function FilterComponent() {
  const [categories, setCategories] = useState<CategoriesDataType[]>();
  const [topics, setTopics] = useState<TopicDataType[]>();
  const [instructors, setInstructors] = useState<InstructorsDataType[]>();

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://api.redclass.redberryinternship.ge/api/categories",
      );
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTopics = async () => {
    try {
      const response = await axios.get(
        "https://api.redclass.redberryinternship.ge/api/topics",
      );
      setTopics(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getInstructors = async () => {
    try {
      const response = await axios.get(
        "https://api.redclass.redberryinternship.ge/api/instructors",
      );
      setInstructors(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInstructors();
    getCategories();
    getTopics();
  }, []);

  return (
    <div className="flex flex-col w-[309px] shrink-0 sticky top-8 gap-6">
      <div className="flex w-full justify-between flex-col h-fit gap-8">
        <div className="flex w-full h-fit justify-between items-center">
          <h1 className="text-h1 w-[121px] h-[48px] text-grayscale-950">
            Filters
          </h1>
          <button className="flex cursor-pointer gap-1.75 items-center justify-end w-full h-fit">
            <p className="text-center text-button-sm text-grayscale-400">
              Clear All Filters
            </p>
            <ClearFilterXIcon />
          </button>
        </div>
        <div className="flex w-full flex-col h-fit gap-14">
          {/**Categories */}

          <div className="flex flex-col justify-between w-full h-fit gap-6">
            <h3 className="w-[309px] h-[22px] text-body-md text-grayscale-500">
              Categories
            </h3>
            <div className="flex w-full h-fit gap-2">
              <div className="flex w-full flex-wrap h-fit gap-2">
                {categories?.map((category) => {
                  const Icon = ImgDataValues[category.icon] ?? DevelopmentIcon;

                  return (
                    <Chips
                      key={category.id}
                      Icon={Icon}
                      title={category.name}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          {/**Topics */}
          <div className="flex flex-col justify-between w-full h-fit gap-6">
            <h3 className="w-[309px] h-[22px] text-body-md text-grayscale-500">
              Topics
            </h3>
            <div className="flex w-full h-fit gap-2">
              <div className="flex w-full flex-wrap h-fit gap-2">
                {topics?.map((topic) => {
                  return <Chips key={topic.id} title={topic.name} />;
                })}
              </div>
            </div>
          </div>
          {/**Instructors */}
          <div className="flex flex-col justify-between w-fit h-fit gap-6">
            <h3 className="w-[309px] h-[22px] text-body-md text-grayscale-500">
              Instructors
            </h3>
            <div className="flex flex-col w-[179px] h-fit gap-2">
              {instructors?.map((instructor) => {
                return (
                  <Chips
                    key={instructor.id}
                    type="instructor"
                    title={instructor.name}
                    avatar={instructor.avatar}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex w-full h-fit border-t pt-4 border-grayscale-300">
          <div className="flex w-full h-5 justify-between pr-[179.59px]">
            <p className="text-center w-[101px] h-[17px] top-[0.5px] text-body-xs text-gray-400">
              0 Filters Active
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterComponent;
