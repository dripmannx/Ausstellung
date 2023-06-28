import { ReactNode } from "react";
import ReactDom from "react-dom";
import { MdCancel } from "react-icons/md";

type Props = {
  open: boolean;
  children: ReactNode;
  title?: ReactNode;
  onClose: () => void;
};

export default function Modal({ children, onClose, title = "" }: Props) {
  return ReactDom.createPortal(
    <>
      <div
        className="bg-modal-rgba fixed top-0 bottom-0 right-0 left-0 z-[1000]"
        onClick={onClose}
      />
      <div
        style={{
          transform: "translate(-50%, -50%)",
        }}
        className="modal-box fixed top-[50%] left-[50%]  z-[1000]"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`flex ${
            title === "" ? "justify-end" : "justify-between"
          } `}
        >
          {title}
          <button onClick={onClose} className="flex self-end">
            <MdCancel size="2em" className="hover:scale-110" />
          </button>
        </div>

        {children}
      </div>
    </>,
    document.getElementById("modal") as HTMLElement
  );
}
