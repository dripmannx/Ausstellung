import { ComponentProps, forwardRef } from "react";
import { FieldError } from "./Form";

interface Props extends ComponentProps<"textarea"> {
  label: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  function TextArea({ label, ...props }, ref) {
    return (
      <label>
        <div className="mb-1 font-medium text-light-text dark:text-dark-text-base">
          {label}
        </div>
        <textarea
          className="focus:border-brand-600 focus:ring-brand-500 w-full rounded-md border bg-white px-4 py-2 text-light-text text-gray-800 disabled:bg-gray-500 disabled:bg-opacity-20 disabled:opacity-60  dark:bg-dark-secondary dark:text-dark-text-base"
          ref={ref}
          {...props}
        />

        <FieldError name={props.name} />
      </label>
    );
  }
);
