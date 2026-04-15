"use client";
import { useCallback, useEffect, useState } from "react";
import ClearFilterXIcon from "../ui/ClearFilterXIcon";
import axios from "axios";
import Chips from "./Chips";
import { useRouter, useSearchParams } from "next/navigation";

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

  const router = useRouter();
  const searchParams = useSearchParams();

  const toggleArrayParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const existing = params.getAll(key);
    if (existing.includes(value)) {
      // remove it
      params.delete(key);
      existing.filter((v) => v !== value).forEach((v) => params.append(key, v));
    } else {
      params.append(key, value);
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const clearAll = () => router.push("?");

  const activeCount =
    searchParams.getAll("categories[]").length +
    searchParams.getAll("topics[]").length +
    searchParams.getAll("instructors[]").length +
    searchParams.getAll("sort").length;

  const getCategories = async () => {
    try {
      const response = await axios.get(
        `https://api.redclass.redberryinternship.ge/api/categories`,
      );
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTopics = useCallback(async () => {
    try {
      const selectedCategories = searchParams.getAll("categories[]");
      const params = new URLSearchParams();
      selectedCategories.forEach((id) => params.append("categories[]", id));

      const response = await axios.get(
        `https://api.redclass.redberryinternship.ge/api/topics?${params.toString()}`,
      );

      setTopics(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }, [searchParams]);

  const getInstructors = async () => {
    try {
      const response = await axios.get(
        "https://api.redclass.redberryinternship.ge/api/instructors",
      );
      setInstructors(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInstructors();
    getCategories();
    getTopics();
  }, [getTopics]);

  return (
    <div className="flex flex-col w-[309px] shrink-0 sticky top-8 gap-6">
      <div className="flex w-full justify-between flex-col h-fit gap-8">
        <div className="flex w-full h-fit justify-between items-center">
          <h1 className="text-h1 w-[121px] h-[48px] text-grayscale-950">
            Filters
          </h1>
          {activeCount > 0 && (
            <button
              onClick={clearAll}
              className="flex  hover:text-[#4F46E5] text-grayscale-400 hover:stroke-[#4F46E5] transition-all duration-300 ease-out cursor-pointer gap-1.75 items-center justify-end w-full h-fit"
            >
              <p className="text-center text-button-sm ">Clear All Filters</p>
              <ClearFilterXIcon />
            </button>
          )}
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
                  const isActive = searchParams
                    .getAll("categories[]")
                    .includes(String(category.id));
                  return (
                    <div
                      key={category.id}
                      onClick={() =>
                        toggleArrayParam("categories[]", String(category.id))
                      }
                    >
                      <Chips
                        disabled={true}
                        isActive={isActive}
                        Icon={category.icon}
                        title={category.name}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/**Topics */}
          <div className="flex flex-col justify-between w-full h-fit gap-6">
            <h3 className="w-77.25 h-5.5 text-body-md text-grayscale-500">
              Topics
            </h3>
            <div className="flex w-full h-fit gap-2">
              <div className="flex w-full flex-wrap h-fit gap-2">
                {topics?.map((topic) => {
                  const isActive = searchParams
                    .getAll("topics[]")
                    .includes(String(topic.id));
                  return (
                    <div
                      key={topic.id}
                      onClick={() =>
                        toggleArrayParam("topics[]", String(topic.id))
                      }
                    >
                      <Chips disabled title={topic.name} isActive={isActive} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/**Instructors */}
          <div className="flex flex-col justify-between w-fit h-fit gap-6">
            <h3 className="w-77.25 h-5.5 text-body-md text-grayscale-500">
              Instructors
            </h3>
            <div className="flex flex-col w-fit h-fit gap-2">
              {instructors?.map((instructor) => {
                const isActive = searchParams
                  .getAll("instructors[]")
                  .includes(String(instructor.id));
                return (
                  <div
                    key={instructor.id}
                    onClick={() =>
                      toggleArrayParam("instructors[]", String(instructor.id))
                    }
                  >
                    <Chips
                      type="instructor"
                      title={instructor.name}
                      avatar={instructor.avatar}
                      isActive={isActive}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex w-full h-fit border-t pt-4 border-grayscale-300">
          <div className="flex w-full h-5 justify-between pr-[179.59px]">
            <p className="text-center w-[101px] h-[17px] top-[0.5px] text-body-xs text-gray-400">
              {activeCount} Filters Active
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterComponent;
