import { ReactNode } from "react";

interface Props {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
}

export function Container({ title, action, children }: Props) {
  return (
    <>
      <div className="h-auto w-[90%] border border-gray-700  bg-white p-6 shadow-lg sm:my-8 sm:rounded-xl  lg:w-1/2">
        {(title || action) && (
          <div className="mb-4 flex items-center justify-between">
            {title && (
              <h1 className="text-base-light dark:text-base-dark text-3xl font-bold">
                {title}
              </h1>
            )}
            {action}
          </div>
        )}
        {children}
      </div>
    </>
  );
}
