import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "./Container";

interface Props {
  Count: number;
  Title: string;
  Icon: ReactNode;
  to: string;
}
export const Stat = ({ Count, Title, Icon, to }: Props) => {
  const navigate = useNavigate();

  return (
    <Container
      styles="transition-animation cursor-pointer"
      onClick={() => navigate(to)}
    >
      <div className="flex gap-6">
        <div className="flex w-16 items-center justify-center rounded-full bg-green-100 lg:h-16">
          {Icon}
        </div>
        <div className="flex-1">
          <span className="block text-2xl font-bold text-light-text dark:text-dark-text-hover">
            {Count}
          </span>
          <span className="block text-light-text dark:text-dark-text-base">
            {Title}
          </span>
        </div>
      </div>
    </Container>
  );
};
export default Stat;
