import React from "react";

const Welcome = ({ className }: { className: string }) => {
  return (
    <div className={`${className} `}>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Stay on top of your tasks with our Todo App
        </h1>
        <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Organize your life and boost your productivity with our easy-to-use
          todo app. Create and delete tasks, mark them as complete and filter
          your todos to easily show what you have done or what is left{" "}
          <span className="font-bold italic text-primary-bright-blue">
            TODO
          </span>
          .
        </p>
      </div>
    </div>
  );
};

export default Welcome;
