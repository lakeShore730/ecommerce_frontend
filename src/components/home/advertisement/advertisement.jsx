import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import cn from "classnames";

const settings = {
  arrows: false,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Advertisement = (props) => {
  const { className = "", advertisement } = props;

  return (
    <div className={cn(className)}>
      <Slider {...settings}>
        {advertisement.map((data) => (
          <div className="overflow-hidden rounded-md" key={data.id}>
            <img src={data.image} alt="advertisement" className="w-full" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Advertisement;
