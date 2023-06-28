import { TbLayoutGrid, TbSlideshow } from "react-icons/tb";
type Props = {
  state?: number;
  setState1?: () => void;
  setState2?: () => void;
  className?: string;
};

function ButtonSwitcher({ className, state, setState1, setState2 }: Props) {
  return (
    <>
      <div className="mb-3 flex justify-center">
        <button
          onClick={setState2}
          className={`${
            state === 2 ? "text-accent" : null
          }  inline-flex items-center gap-1  rounded-l-full px-4  py-2 hover:text-gray-600 focus:outline-none `}
          id="slider"
        >
          <TbSlideshow size="2.5em" />
          <span>Slider</span>
        </button>
        <button
          onClick={setState1}
          className={`${
            state === 1 ? "text-accent" : null
          } inline-flex items-center rounded-r-full px-4 py-2 transition-colors duration-300  ease-in hover:text-accent focus:outline-none`}
          id="list"
        >
          <TbLayoutGrid size={"2.5em"} />
          <span>List</span>
        </button>
      </div>
    </>
  );
}

export default ButtonSwitcher;
