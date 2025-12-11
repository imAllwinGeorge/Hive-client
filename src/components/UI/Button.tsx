import React from "react";
import { classNames } from "../../utils";

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  return (
    <button
      {...props}
      className={classNames(
        "text-xl font-semibold p-2 border m-2 rounded-2xl",
        props.className || ""
      )}
    >
      {props.title || props.children}
    </button>
  );
};

export default Button;
