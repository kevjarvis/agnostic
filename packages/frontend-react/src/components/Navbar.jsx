import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <header className="flex bg-transparent h-10 py-10 items-center justify-between relative">
      <div className="flex gap-3 items-center">
        <span className="font-display font-[900] dark:text-blue-500 text-lg">
          AGNOSTIC.
        </span>
        <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">
          User
        </span>
      </div>

      <nav>
        <ul className="flex gap-5">
          <li>
            <Link
              to={"/"}
              className="p-3 rounded-full duration-500 dark:text-gray-300 font-display font-bold text-sm hover:bg-slate-800 hover:text-gray-100 hover:shadow-md hover:shadow-gray-900"
            >
              User.
            </Link>
          </li>
          <li>
            <Link
              to={"/admin"}
              className="p-3 rounded-full duration-500 dark:text-gray-300 font-display font-bold text-sm hover:bg-slate-800 hover:text-gray-100 hover:shadow-md hover:shadow-gray-900"
            >
              Admin.
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
