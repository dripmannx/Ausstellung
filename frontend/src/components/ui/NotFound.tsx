import { Button } from "./Button";
interface Props {
  text: string;
}
const NotFound = ({ text }: Props) => {
  return (
    <div className="flex w-full justify-center">
      <div className="mt-10 flex w-1/2 flex-col gap-4 text-center ">
        <h1 className="text-4xl dark:text-dark-text-hover">
          404 Seite nicht gefunden
        </h1>
        <p className="text-xl dark:text-dark-text-base">{text}</p>
        <Button href="/admin">Zurück zur Übersicht</Button>
      </div>
    </div>
  );
};

export default NotFound;
