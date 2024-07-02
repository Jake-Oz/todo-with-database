import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonTodo() {
  return (
    <div className="mx-auto mt-80 p-4 rounded-lg  w-64 bg-gradient-to-tl from-primary-gradient-left to-primary-gradient-right dark:bg-neutral-white text-dark-theme-very-dark-blue">
      <div className="flex flex-col gap-2 justify-center items-center  text-neutral-white dark:text-dark-theme-very-dark-blue">
        <h1 className="font-bold tracking-widest">TODO Login</h1>
        <Skeleton className="mt-1 bg-neutral-dark-grayish-blue w-40 h-10 rounded-3xl" />
        <div className="relative w-full flex items-center">
          <div className="flex-grow border-t border-neutral-dark-grayish-blue"></div>
          <span className="flex-shrink mx-4 text-gray-400">or</span>
          <div className="flex-grow border-t border-neutral-dark-grayish-blue"></div>
        </div>
        <Skeleton className="bg-neutral-dark-grayish-blue w-48 h-10 rounded" />
        <Skeleton className="mt-2 bg-neutral-dark-grayish-blue w-40 h-10 rounded-3xl" />
      </div>
    </div>
  );
}
