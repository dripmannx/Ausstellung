import { MdErrorOutline, MdWarningAmber } from "react-icons/md";
import Show from "../Conditional/Show";
interface Props {
  open: boolean;
  title: string;
  text: string;
  variant?: "warning" | "error";
}

const Alert = ({ open, title, text, variant = "error" }: Props) => {
  return (
    <>
      <Show condition={open}>
        <div
          className={`alert alert-${variant} ${
            variant === "warning" ? "alert-warning" : null
          } w-full shadow-lg`}
        >
          <div>
            {variant === "warning" && <MdWarningAmber size={"1.5em"} />}
            {variant === "error" && <MdErrorOutline size={"1.5em"} />}
            <div>
              <h3 className="font-bold">{title}</h3>
              <div className="text-xs">{text}</div>
            </div>
          </div>
        </div>
      </Show>
    </>
  );
};

export default Alert;
