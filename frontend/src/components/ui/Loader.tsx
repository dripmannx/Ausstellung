import preloader from "../../Images/preloader.gif";
interface Props {
  text: string;
}
export const Loader = ({ text }: Props) => {
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center text-center text-2xl font-bold text-light-text dark:text-dark-text-base">
      <img width={74} height={74} src={preloader}></img>
      <span>{text}</span>{" "}
    </div>
  );
};
