import { toast, TypeOptions } from "react-toastify";

type Props = {
  variant: TypeOptions;
  text: string;
  Icon: any;
  TTL: number;
};

const Toast = ({ variant, text, Icon, TTL }: Props) => {
  return toast(text, { type: variant, icon: Icon, delay: TTL });
};

export default Toast;
