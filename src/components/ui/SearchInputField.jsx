import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setSearchProductData } from "../../redux/slices/productSearchSlice";

const SearchInputField = (props) => {
  const { categoryList } = props;
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchKey, setSearchKey] = useState("");
  const [category, setCategory] = useState(null);

  useEffect(() => {
    if (pathname !== "/search") {
      dispatch(
        setSearchProductData({
          searchKey: "",
          category: null,
        })
      );
      setSearchKey("");
      setCategory(null);
    }
  }, [pathname]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      setSearchProductData({
        searchKey,
        category: category === "all" ? null : category,
      })
    );

    if (pathname !== "/search") navigate("/search");
  };

  return (
    <form
      className="flex w-full rounded-md border py-2 dark:border-gray-700"
      onSubmit={handleSubmit}
    >
      <div className="border-r-2 pr-3 pl-2 dark:border-gray-700">
        <select
          className="bg-transparent w-[200px] text-gray-700 dark:text-white outline-none"
          value={!category ? "all" : category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Category</option>
          {categoryList.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <input
        className="w-full pl-3 pr-2 bg-transparent outline-none dark:text-white"
        placeholder="Search the products"
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
      />
    </form>
  );
};

export default SearchInputField;
