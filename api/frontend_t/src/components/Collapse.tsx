import React, { ReactNode, useState } from "react";

interface Props {
  title: string;
  children: ReactNode;
  width: string | number;
  defaultState?: boolean;
}

const Collapse: React.FC<Props> = ({
  title,
  children,
  width,
  defaultState = true,
}) => {
  const [open, setOpen] = useState(defaultState);
  const handleOpen = () => setOpen(!open);
  return (
    <div
      tabIndex={0}
      className={`${width} collapse ${
        open ? "collapse-open" : "collapse-close"
      } collapse-arrow rounded-box mb-6 max-h-fit overflow-auto border border-base-300 bg-base-100`}
    >
      <div
        onClick={handleOpen}
        className=" collapse-title cursor-pointer text-center text-xl font-medium"
      >
        {title}
      </div>
      <div className="collapse-content">{children}</div>
    </div>
  );
};

export default Collapse;
