import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ProductCard from "./product-card";

const settings = {
  arrows: true,
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 6,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 6,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 1224,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const RelatedProducts = (props) => {
  const { productList, ...others } = props;
  return (
    <div {...others}>
      <Slider {...settings}>
        {productList.map((product) => (
          <ProductCard
            className="mx-[7px] mb-2"
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            discount={product.discount}
            quantity={product.quantity}
            image={product.primary_image}
          />
        ))}
      </Slider>
    </div>
  );
};

export default RelatedProducts;
