import type { ReactNode } from "react";

/* The white sheet the site is printed on. */
export function PageFrame({ children }: { children: ReactNode }) {
  return (
    <div className="ring-inset-token flex w-full flex-1 flex-col rounded-frame bg-page">
      <div className="frame-line-inset flex flex-1 flex-col rounded-frame-line bg-frame-inner">
        <div className="flex flex-1 flex-col rounded-token bg-sheet">{children}</div>
      </div>
    </div>
  );
}
