import { redirect } from "next/navigation";
import NavIconBook from "../ui/NavIconBook";


function NavBrowseCoursesButton() {
  return (
    <button
      onClick={() => redirect("/")}
      className="flex   rounded-lg p-3.75 gap-2"
    >
      <div className="flex cursor-pointer transition-all ease-out duration-600 stroke-grayscale-600 hover:text-[#4F46E5] hover:stroke-[#4F46E5] items-center justify-center  gap-2">
        <NavIconBook />
        <p className="flex items-center text-body-lg text w-40.75 h-6">
          Enrolled Courses
        </p>
      </div>
    </button>
  );
}

export default NavBrowseCoursesButton;
