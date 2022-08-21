import cn from "classnames";

const Container = (props) => {
  const { children, className = "", ...others } = props;
  return (
    <div
      className={cn(
        "px-2 md:px-5 lg:px-8 w-full max-w-[1700px] mx-auto",
        className
      )}
      {...others}
    >
      {children}
    </div>
  );
};

export default Container;
