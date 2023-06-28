import { Menu, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { Link } from "react-router-dom";
type DropDownItem = {
  link: string;
  label: string;
  icon: ReactNode;
};

function classNames({ ...classes }) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  DropDownItems: DropDownItem[];
}
export default function Dropdown({ DropDownItems }: Props) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center  rounded-md border border-gray-700 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none dark:bg-dark-primary   dark:text-dark-text-hover dark:hover:bg-zinc-800">
          Hinzufügen
          <AiOutlineDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md border-2 border-gray-700 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-dark-secondary">
          <div className="py-1">
            {DropDownItems.map((link) => (
              <Menu.Item key={link.label}>
                {({ active }) => (
                  <Link
                    key={link.link}
                    to={link.link}
                    className={`text-applied text-md justify-left flex flex-row items-center gap-2  px-4 py-2
                  ${active}
                    
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-700',
                   
                  `}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
