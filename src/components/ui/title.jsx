import React from "react";
import cn from "classnames";

const Title = (props) => {
  const { children, className = "", ...others } = props;
  return (
    <p
      className={cn(
        "text-sm text-gray-700 font-bold uppercase dark:text-white",
        className
      )}
      {...others}
    >
      {children}
    </p>
  );
};

export default Title;
