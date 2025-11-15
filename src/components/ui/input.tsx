import { Search } from "lucide-react";

import React, { useRef, useState } from "react";

type InputSearchProps = {
  handleSearch: (keyword: string) => void;
};

export const InputSearch = ({ handleSearch }: InputSearchProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [keyword, setKeyword] = useState<string>("");

  
  return (
    <div
      ref={ref}
      className="flex items-center flex-1 rounded-full relative gap-2 ring ring-gray-400 px-2 py-1"
    >
      <div className="p-2 bg-black rounded-full">
        <Search size={15} color="white" />
      </div>
      <input
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
          handleSearch(e.target.value);
        }}
        className="outline-none w-full rounded-full"
        placeholder="Search"
      ></input>
      {/* {onSearch && (
        <div className="absolute w-full h-50 p-2 bg-white top-10 rounded dark:bg-card border-1 z-999">
          <label className="uppercase text-[10px] dark:text-gray-200">
            Recent boards
          </label>
        </div>
      )} */}
    </div>
  );
};

type InputVariant = "default" | "primary" | "danger" | "borderBottom";
type InputSize = "sm" | "md" | "lg";

type InputProps = {
  placeholder?: string;
  variant?: InputVariant;
  sizeOpt?: InputSize;
} & React.InputHTMLAttributes<HTMLInputElement>;

const variantClass: Record<InputVariant, string> = {
  default: "ring ring-gray-300 dark:ring-gray-500 rounded-md",
  primary: "",
  danger: "ring ring-red-500 rounded-md",
  borderBottom: "rounded-none border-b border-black",
};

const sizeClass: Record<InputSize, string> = {
  sm: "h-5 w-1",
  md: "p-2",
  lg: "",
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { 
      placeholder, 
      variant = 'default', 
      sizeOpt = 'md', 
      className, 
      ...rest 
    },
    ref
  ) => {
    const base = "w-full outline-none";
    const finalClass = `${base} ${variantClass[variant]} ${sizeClass[sizeOpt]} ${className}`;

    return (
      <input
        ref={ref}
        className={finalClass}
        {...rest}
        placeholder={placeholder}
      ></input>
    );
  }
);
