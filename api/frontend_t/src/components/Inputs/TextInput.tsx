import { ComponentProps, forwardRef } from "react";
import { FieldError } from "./Form";

interface Props extends ComponentProps<"input"> {
  label: string;
}

export const TextInput = forwardRef<HTMLInputElement, Props>(function Input(
  { label, type = "text", ...props },
  ref
) {
  const ttype = type;
  return (
    <label>
      <div className="mb-1  text-left font-medium">{label}</div>
      <input
        className={`${
          ttype == "checkbox"
            ? "checkbox-primary checkbox "
            : "w-full px-4 py-2"
        }  focus:border-brand-600 focus:ring-brand-500 rounded-md border bg-white disabled:bg-gray-500 disabled:bg-opacity-20 disabled:opacity-60`}
        type={type}
        ref={ref}
        {...props}
      />

      <FieldError name={props.name} />
    </label>
  );
});
