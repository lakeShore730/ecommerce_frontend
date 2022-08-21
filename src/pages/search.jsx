import Container from "../components/ui/container";
import { useSelector } from "react-redux";
import ProductCard from "../components/product/product-card";
import searchProductApi from "../services/product/searchProductApi";
import { useEffect, useState } from "react";

const Search = () => {
  const productSearchData = useSelector((state) => state.productSearchData);
  const [productList, setProductList] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const setSearchedProductData = async () => {
    if (page !== 1 && !hasNextPage) return;
    if (page === 1) setIsLoading(true);

    try {
      const searchResData = await searchProductApi({
        page,
        query: productSearchData.searchKey,
        category: productSearchData.category,
      });

      setProductList(
        page === 1
          ? searchResData.results
          : [...productList, ...searchResData.results]
      );
      setHasNextPage(searchResData.next);
    } catch (error) {
      console.log(error);
    }

    setRefetch(false);
    setIsLoading(false);
  };

  useEffect(() => {
    if (refetch) setSearchedProductData();
  }, [refetch]);

  useEffect(() => {
    setRefetch(true);
  }, [page]);

  useEffect(() => {
    if (page === 1) setRefetch(true);
    else setPage(1);
  }, [productSearchData]);

  if (!productSearchData.searchKey.trim().length) {
    return (
      <Container className="mt-20 min-h-[70vh]">
        <p>Please enter the search key.</p>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container className="mt-20 min-h-[70vh]">
        <p>Loading...</p>
      </Container>
    );
  }

  if (!productList.length) {
    return (
      <Container className="mt-20 min-h-[70vh]">
        <p>Product not found</p>
      </Container>
    );
  }

  return (
    <Container className="mt-20 min-h-[70vh]">
      <div className="grid gap-5 xl:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {productList.map((product) => {
          return (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              discount={product.discount}
              quantity={product.quantity}
              image={product.primary_image}
            />
          );
        })}
        {hasNextPage ? (
          <div>
            <p
              className="text-center cursor-pointer"
              onClick={() => setPage(page + 1)}
            >
              Load More
            </p>
          </div>
        ) : null}
      </div>
    </Container>
  );
};

export default Search;
