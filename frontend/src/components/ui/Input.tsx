import { ComponentProps, forwardRef } from "react";
import { FieldError } from "./Form";

interface Props extends ComponentProps<"input"> {
  label: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { label, type = "text", ...props },
  ref
) {
  return (
    <label>
      <div className="mb-1 text-left font-medium text-base-light dark:text-base-dark">
        {label}
      </div>
      <input
        className="focus:border-brand-600 focus:ring-brand-500 mb-2 w-full  rounded-md border bg-white px-4 py-2 text-base disabled:bg-gray-500 disabled:bg-opacity-20 disabled:opacity-60 dark:bg-dark-secondary dark:text-base-dark"
        type={type}
        ref={ref}
        {...props}
      />

      <FieldError name={props.name} />
    </label>
  );
});

export const CheckBox = forwardRef<HTMLInputElement, Props>(function Input(
  { label, type = "checkbox", ...props },
  ref
) {
  return (
    <label>
      <div className="mb-1 text-left font-medium text-base-light dark:text-base-dark">
        {label}
      </div>
      <input
        className="focus:border-brand-600 focus:ring-brand-500 mb-2 h-5 w-5 rounded-md border  bg-white p-5 px-4 py-2 text-lg text-base disabled:bg-gray-500 disabled:bg-opacity-20 disabled:opacity-60 dark:bg-dark-secondary dark:text-base-dark"
        type={type}
        ref={ref}
        {...props}
      />

      <FieldError name={props.name} />
    </label>
  );
});
