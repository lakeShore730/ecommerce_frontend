import { Link } from "react-router-dom";
import categoryImg from "../../assets/category/p1.jpg";

const CategoryCard = (props) => {
  const { id, name, image } = props;

  return (
    <Link to={`/products/category/${id}`}>
      <div className="px-2 relative cursor-pointer shadow-sm">
        <div className="absolute p-2">
          <p className="bg-orange-500 px-2 text-sm text-white rounded-lg">
            {name}
          </p>
        </div>
        <img
          src={image ? image : categoryImg}
          alt="category"
          className="w-full rounded-md"
        />
      </div>
    </Link>
  );
};

export default CategoryCard;
