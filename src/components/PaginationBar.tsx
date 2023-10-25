import Link from "next/link";

interface PaginationBarProps {
  currentPage: number;
  totalPage: number;
}

export default function PaginationBar({
  currentPage,
  totalPage,
}: PaginationBarProps) {
  const maxPage = Math.min(totalPage, Math.max(currentPage + 4, 10));
  const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9));
  const numberedPageItems: JSX.Element[] = [];
  for (let page = minPage; page <= maxPage; page++) {
    numberedPageItems.push(
      <Link
        className="flex flex-row justify-between gap-10 pl-6 pr-6"
        href={"/catalog?page=" + page}
        key={page}
      >
        {page}
      </Link>
    );
  }

  return (
    <nav className="lg:pl-96 md:ml-64 md:pl-62 lg:ml-96 pl-2">
      <ul className="inline-flex">
        <button className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-whit">
          {currentPage > 1 && (
            <Link href={"/catalog?page=" + (currentPage - 1)}>Prev</Link>
          )}
        </button>

        {numberedPageItems.map((item) => (
          <li
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            key={item.key}
          >
            {item}
          </li>
        ))}

        <button className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          {currentPage < totalPage && (
            <Link href={"/catalog?page=" + (currentPage + 1)}>Next</Link>
          )}
        </button>
      </ul>
    </nav>
  );
}
