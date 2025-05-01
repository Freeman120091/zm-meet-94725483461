import { forwardRef } from "react";

interface InputProps {
  title?: string;
  type: string;
  placeholder: string;
  readonly?: boolean;
  isRequired?: boolean;
}

const InputField = forwardRef<HTMLInputElement, InputProps>(
  ({ title, type, placeholder, readonly = false }, ref) => {
    return (
      <div className="flex flex-col gap-2 text-sm text-black w-full">
        {title && <div className="text-[1rem]">{title}</div>}
        <div className="flex flex-row items-center p-3 bg-white border-2 border-gray-400/70 rounded-lg w-full">
          <input
            type={type}
            placeholder={placeholder}
            readOnly= {readonly}
            ref={ref} // Attach the ref here
            className="outline-none text-[1rem] bg-transparent w-full"
          />
        </div>
      </div>
    );
  }
);

export default InputField;
