import Breadcrumb from "@/components/general/Breadcrumb";
import CoursesBoard from "@/components/general/CoursesBoard";
import FilterComponent from "@/components/general/FilterComponent";

function page() {
  return (
    <div className="flex flex-col gap-8 w-full my-16 px-44.25 py-">
      <Breadcrumb />
      <div className="flex gap-8 justify-between items-start w-full">
        <FilterComponent />
        <CoursesBoard />
      </div>
    </div>
  );
}

export default page;