import { cva, VariantProps } from "class-variance-authority";
import { ButtonOrLink, Props as ButtonOrLinkProps } from "./ButtonOrLink";

const buttonStyles = cva(
  "flex items-center justify-center px-4 py-2 rounded font-medium disabled:opacity-60 disabled:pointer-events-none hover:bg-opacity-80",
  {
    variants: {
      intent: {
        primary: "bg-primary text-white",
        secondary:
          "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 focus:ring-gray-500",
        danger: "bg-red-500 text-white focus:ring-red-500",
        outline:
          "border-2 border-red-500 bg-none focus:bg-red-500 hover:bg-red-200",
      },
      fullWidth: {
        true: "w-full",
        false: "w-1/2",
      },
      long: { true: "px-8" },
      icon: {
        true: "gap-2 flex flex-row items-center  lg:w-1/4 ",
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  }
);

export interface Props
  extends ButtonOrLinkProps,
    VariantProps<typeof buttonStyles> {}

export function Button({ intent, fullWidth, long, icon, ...props }: Props) {
  return (
    <ButtonOrLink
      className={buttonStyles({ intent, fullWidth, icon })}
      {...props}
    />
  );
}
