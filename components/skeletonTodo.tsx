import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonTodo() {
  return (
    <div className="mx-auto w-[540px] flex flex-col justify-center items-center pt-20 ">
      <Skeleton className="w-full h-14 mb-4 bg-primary-gradient-right" />
      <Skeleton className="w-full h-14 mb-4 bg-primary-gradient-right" />
      <Skeleton className="w-full h-14 mb-4 bg-primary-gradient-right" />
    </div>
  );
}
