import cn from "classnames";

const SubTitle = (props) => {
  const { children, className = "", ...others } = props;
  return (
    <p
      className={cn(
        "text-2xl text-gray-800 font-bold capitalize dark:text-white",
        className
      )}
      {...others}
    >
      {children}
    </p>
  );
};

export default SubTitle;
