import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonTodo() {
  return (
    <div className="mx-auto w-[540px] flex flex-col justify-center items-center pt-0 ">
      <Skeleton className="w-full h-14  bg-neutral-very-dark-grayish-blue dark:bg-neutral-very-light-gray mb-12" />
      <Skeleton className="w-full h-14 mb-4 bg-neutral-very-dark-grayish-blue dark:bg-neutral-very-light-gray" />
      <Skeleton className="w-full h-14 mb-4 bg-neutral-very-dark-grayish-blue dark:bg-neutral-very-light-gray" />
      <Skeleton className="w-full h-14 mb-4 bg-neutral-very-dark-grayish-blue dark:bg-neutral-very-light-gray" />
      <Skeleton className="w-full h-14 mb-4 bg-neutral-very-dark-grayish-blue dark:bg-neutral-very-light-gray" />
      <Skeleton className="w-full h-14 mb-4 bg-neutral-very-dark-grayish-blue dark:bg-neutral-very-light-gray" />
    </div>
  );
}
