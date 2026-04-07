import NavIconSparkles from "../ui/NavIconSparkles";
import { redirect } from "next/navigation";

function NavEnrolledCourses() {
  return (
    <button
      onClick={() => redirect("/")}
      className="flex  text-grayscale-600 rounded-lg p-3.75 gap-2"
    >
      <div className="flex cursor-pointer transition-all ease-out duration-600 stroke-grayscale-600 hover:text-[#4F46E5] hover:stroke-[#4F46E5] items-center justify-center gap-2">
        <NavIconSparkles />
        <p className="flex items-center text-body-lg w-39 h-6">
          Browse Courses
        </p>
      </div>
    </button>
  );
}

export default NavEnrolledCourses;
