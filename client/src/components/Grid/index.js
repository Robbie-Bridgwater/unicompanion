import React from "react";

export function Container({ fluid, children }) {
  return <div className={`container${fluid ? "-fluid" : ""}`}>{children}</div>;
}

export function Row({ fluid, children, myclass }) {
  return (
    <div className={`row${fluid ? "-fluid" : ""} ${myclass}`}>{children}</div>
  );
}

export function Col({ size, children, myclass }) {
  return (
    <div
      className={
        size
          .split(" ")
          .map((size) => "col-" + size)
          .join(" ") + ` ${myclass}`
      }
    >
      {children}
    </div>
  );
}
