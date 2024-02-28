import React from "react";
import { IoSearchOutline } from "react-icons/io5";

interface InputSearchProps {
  placeholder: string;
  className?: string;
  onChange?: any;
}

const inputSearch: React.FC<InputSearchProps> = ({ ...props }) => {
  return (
    <div className="relative flex-1 text-sm">
      <div className="absolute top-0 left-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
        <IoSearchOutline className="" />
      </div>
      <input
        placeholder={props.placeholder}
        type="text"
        className={`pl-10 w-full border 
        border-gray-200 rounded-lg py-1 
        outline outline-1 
        outline-gray-500 focus:outline-none focus:ring-2 
        focus:ring-primary-500 
        focus:border-transparent ${props.className}`}
        onChange={props.onChange}
      />
    </div>
  );
};

export default inputSearch;
