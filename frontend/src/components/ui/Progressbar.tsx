import { BiCheckCircle } from "react-icons/bi";

type Props = { value: number; text?: string };

const Progressbar = ({ value, text = "Erfolgreich" }: Props) => {
  const valueWidth = `${value}%`;
  return (
    <div className="w-full rounded-full bg-inherit">
      {value === 100 ? (
        <>
          <div className="flex flex-col items-center justify-center text-green-600">
            {" "}
            <BiCheckCircle size={"5em"} />
            <span>{text}</span>
          </div>
        </>
      ) : (
        <div
          className="rounded-full bg-blue-600 p-0.5 text-center text-xs font-medium leading-none text-blue-100"
          style={{ width: valueWidth }}
        >
          {" "}
          {value}%
        </div>
      )}
    </div>
  );
};

export default Progressbar;
