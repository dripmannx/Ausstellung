import preloader from "../../Images/preloader.gif";

type Props = {};

const Enercon_Footer = ({}: Props) => {
  return (
    <div className="h-32   w-full">
      <div className="h-1/3">
        <div className="h-1/2 bg-[#d2e9e0]"></div>
        <div className="h-1/2 bg-[#84b1a1] "></div>
      </div>{" "}
      <div className="flex h-2/3 items-center justify-center bg-[#4c8a7a] text-slate-700">
        <div>2023 ENERCON Ausbildung </div>

        <img className="" width="64" src={preloader}></img>
      </div>
    </div>
  );
};

export default Enercon_Footer;
