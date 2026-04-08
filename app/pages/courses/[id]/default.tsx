import React from "react";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="flex flex-col gap-16 overflow-y-hidden justify-center">
      Oops! Can`t Find Anything with ID: {id}`
    </div>
  );
}

export default page;
