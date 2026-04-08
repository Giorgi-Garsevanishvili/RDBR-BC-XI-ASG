import CourseInfo from "@/components/general/CourseInfo";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="flex flex-col gap-16 overflow-y-hidden justify-center">
      <CourseInfo id={id} />
    </div>
  );
}

export default page;
