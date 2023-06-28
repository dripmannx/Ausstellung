import { useState } from 'react';

interface PaginationResult<T> {
  currentItems: T[];
  currentPage: number;
  totalPages: number;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
}

function usePagination<T>(items: T[], itemsPerPage: number, startingPage = 1): PaginationResult<T> {
  const [currentPage, setCurrentPage] = useState<number>(startingPage);

  const indexOfLastItem: number = currentPage * itemsPerPage;
  const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
  const currentItems: T[] = items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages: number = Math.ceil(items.length / itemsPerPage);

  const goToNextPage = (): void => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  const goToPreviousPage = (): void => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  return {
    currentItems,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
  };
}

export default usePagination;
