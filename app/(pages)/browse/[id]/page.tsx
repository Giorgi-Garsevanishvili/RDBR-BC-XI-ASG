import CourseInfo from "@/components/general/CourseInfo";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="flex flex-col gap-16 overflow-y-hidden justify-center">
      <div className="flex  gap-8 w-full my-16 px-44.25 py-">
        <CourseInfo id={id} />
      </div>
    </div>
  );
}

export default page;
