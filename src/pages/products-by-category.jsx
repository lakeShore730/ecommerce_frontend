import { useEffect, useState } from "react";
import Container from "../components/ui/container";
import CategoryList from "../components/category/category-list";
import { useParams } from "react-router-dom";
import ProductCard from "../components/product/product-card";
import getAllCategoryApi from "../services/category/getAllCategoryApi";
import getAllProductByCategoryApi from "../services/product/getAllProductByCategoryApi";

const ProductsByCategory = () => {
  const { id } = useParams();
  const [categoryList, setCategoryList] = useState([]);

  const [product, setProduct] = useState({
    isLoading: true,
    refetch: true,
    hasNextPage: true,
    category: id,
    page: 1,
    pageSize: 25,
    data: [],
  });

  const setCategoryData = async () => {
    try {
      const categoryResData = await getAllCategoryApi();
      setCategoryList(categoryResData);
    } catch (error) {
      console.log(error);
    }
  };

  const setProductData = async () => {
    if (!product.hasNextPage) return;
    try {
      const productResData = await getAllProductByCategoryApi({
        page: product.page,
        category: id,
      });

      if (product.page === 1) {
        setProduct({
          ...product,
          data: productResData.results,
          refetch: false,
          isLoading: false,
          hasNextPage: productResData.next ? true : false,
        });
      } else {
        setProduct({
          ...product,
          data: [...product, ...productResData.result],
          refetch: false,
          isLoading: false,
          hasNextPage: productResData.next ? true : false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCategoryData();
  }, []);

  useEffect(() => {
    if (product.refetch) setProductData();
  }, [product]);

  useEffect(() => {
    setProduct({
      ...product,
      category: id,
      page: 1,
      refetch: true,
      hasNextPage: true,
      isLoading: true,
    });
  }, [id]); // This is category id

  return (
    <Container>
      <div className="mt-5">
        <CategoryList categoryList={categoryList} selectedCategory={id} />
      </div>
      <div className="min-h-[80vh]">
        {product.isLoading ? (
          <div className="mt-20">
            <p>Loading...</p>
          </div>
        ) : !product.data.length ? (
          <div className="mt-20">
            <p>There is data</p>
          </div>
        ) : (
          <div className="mt-20 grid gap-5 xl:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {product.data.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                discount={product.discount}
                quantity={product.quantity}
                image={product.primary_image}
              />
            ))}
          </div>
        )}
        {product.hasNextPage && !product.isLoading ? (
          <div className="mt-20 flex justify-center">
            <button
              className="bg-green-600 px-4 py-1 text-white rounded-md hover:bg-green-800"
              onClick={() =>
                setProduct({
                  ...product,
                  page: product.page + 1,
                  refetch: true,
                })
              }
            >
              Load More
            </button>
          </div>
        ) : null}
      </div>
    </Container>
  );
};

export default ProductsByCategory;
