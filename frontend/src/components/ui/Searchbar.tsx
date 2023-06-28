import { AiOutlineSearch } from "react-icons/ai";
interface Props {}
export const Searchbar = ({ ...props }) => {
  return (
    <div className="flex items-center rounded-md  bg-white p-2.5 px-4   shadow-xl  duration-300 focus:ring-2 dark:bg-dark-primary dark:text-white dark:focus:ring-gray-900">
      <AiOutlineSearch size="1.5em" />
      <input
        className="ml-4 w-full bg-transparent text-lg focus:outline-none"
        type="search"
        {...props}
      />
    </div>
  );
};
