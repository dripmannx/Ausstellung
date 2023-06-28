type InputElement = HTMLInputElement | HTMLTextAreaElement;
type InputChangeEvent = React.ChangeEvent<InputElement>;
type Props = {
  label: string;
  name: string;
  type?: string;
  onChange: (val: string) => void;
  value: string | undefined;
  required?: true;
  textarea?: boolean;
  placeholder?: string;
  disabled?: boolean;
};
const Input = ({
  label,
  value,
  name,
  type = "text",
  onChange,
  textarea,
  placeholder,
  disabled,
  ...rest
}: Props) => {
  const InputElement = textarea ? "textarea" : "input";
  return (
    <div className="relative z-0 mb-8 w-full">
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-primary "
      >
        {label}
      </label>
      <InputElement
        disabled={disabled}
        id={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={({ target: { value } }: InputChangeEvent) => onChange(value)}
        className={`${
          InputElement === "textarea" ? "textarea-bordered textarea" : null
        } block  w-full rounded-lg  border border-gray-300 bg-base-100 p-2.5 text-sm  text-gray-800 placeholder-primary focus:border-accent`}
        {...rest}
      />
    </div>
  );
};

export default Input;
