import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type PropsPath = { path: string; text: string; Icon: ReactNode; back?: never };
type PropsBack = { path?: never; text: string; Icon: ReactNode; back: boolean };
type Props = PropsPath | PropsBack;
export const NavButton = ({ path, text, Icon, back }: Props) => {
  const navigate = useNavigate();

  if (path)
    return (
      <div
        onClick={() => navigate(path)}
        className="relative inline-block text-left"
      >
        <button className="inline-flex w-full justify-center gap-2  rounded-md border border-gray-700 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 dark:bg-dark-primary  dark:text-dark-text-hover dark:hover:bg-zinc-600">
          <div className="flex flex-row items-center gap-2">
            <>
              {Icon}
              {text}
            </>
          </div>
        </button>
      </div>
    );
  if (back)
    return (
      <div
        onClick={() => navigate(-1)}
        className="relative inline-block text-left"
      >
        <button className="inline-flex w-full justify-center gap-2  rounded-md border border-gray-700 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 dark:bg-dark-primary  dark:text-dark-text-hover dark:hover:bg-zinc-600">
          <div className="flex flex-row items-center gap-2">
            <>
              {Icon}
              {text}
            </>
          </div>
        </button>
      </div>
    );
  return null;
};

export default NavButton;
