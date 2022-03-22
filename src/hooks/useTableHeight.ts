import { useCallback, useEffect, useRef } from "react";

const viewportHeight =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;

export default function useTableHeight(
  containerElement?: HTMLElement
): [number | null, (timeout?: number) => NodeJS.Timeout] {
  const tableHeightRef = useRef<number | null>(null);

  const updateTableHeight = useCallback(
    (timeout = 0) => {
      return setTimeout(() => {
        const tableBodyElement = (containerElement || document).querySelector(
          ".ant-table-body"
        ) as HTMLElement;

        // const tablePaginationElement = document.querySelector('.ant-table-pagination') as HTMLElement;
        const tableBodyElementRect = tableBodyElement.getBoundingClientRect();

        const height = viewportHeight - tableBodyElementRect.y - 80;
        tableHeightRef.current = height;
        tableBodyElement.style.height = `${height}px`;
        tableBodyElement.style["max-height"] = `${height}px`;
      }, timeout);
    },
    [containerElement]
  );

  useEffect(() => {
    const timer = updateTableHeight();

    return () => clearTimeout(timer);
  });

  return [tableHeightRef.current, updateTableHeight];
}
