import cn from "classnames";
import Container from "../ui/container";

const Footer = (props) => {
  const { className = "" } = props;

  return (
    <div className="bg-gray-100">
      <Container className={cn("", className)}>
        <div className="h-[300px] "></div>
      </Container>
    </div>
  );
};

export default Footer;
