import React from "react";

type Props = {
  inputQuery?: string;
  /** input of the input Tag*/
  placeholder?: string;
  setInputQuery?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** callback Function to set the input State */
};

const Searchbar = ({ inputQuery, placeholder, setInputQuery }: Props) => {
  return (
    <div className="relative my-4 hidden w-full items-center rounded-lg border border-gray-200 bg-transparent  text-xs text-gray-900 dark:border-gray-700 dark:text-gray-100 xl:flex xl:text-base">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-search ml-2 text-gray-900 dark:text-gray-100 xl:ml-4"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <circle cx="10" cy="10" r="7"></circle>
        <line x1="21" y1="21" x2="15" y2="15"></line>
      </svg>
      <input
        placeholder="Search for components"
        id="componentSearch"
        className="w-full rounded-full px-2 py-2 placeholder-gray-900  focus:outline-none dark:bg-transparent dark:placeholder-gray-100 xl:px-4 xl:py-4"
        value=""
      />
      <label
        htmlFor="headerSearch"
        className="pointer-events-none absolute opacity-0"
      >
        Search
      </label>
    </div>
  );
};

export default Searchbar;
