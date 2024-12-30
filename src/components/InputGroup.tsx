import { useEffect, useState } from "react";

interface InputGroupProps {
  customClasses?: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  error?: boolean;
  helpText?: string;
}

const InputGroup = ({
  customClasses,
  label,
  type,
  placeholder,
  required,
  onChange,
  value,
  error,
  helpText
}: InputGroupProps) => {
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    setInputValue(value !== undefined ? value : "");
  }, [value]);

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (onChange) onChange(e);
  };
  return (
    <>
      <div className={customClasses}>
        <label className="mb-3 flex text-base font-medium text-dark dark:text-gray-dark
        ">
          {label}
          {required && <span className="text-red">*</span>}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleOnChangeInput}
          className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-gray-6 focus:border-primary active:primary disabled:cursor-default dark:border-gray-6 dark:bg-gray-5 dark:text-gray-dark dark:focus:border-primary"
        />
        {error && <span className="text-red pl-5 font-semibold">{helpText}</span>}
      </div>
    </>
  );
};

export default InputGroup;
