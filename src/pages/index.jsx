import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Container from "../components/ui/container";
import Advertisement from "../components/home/advertisement/advertisement";
import Title from "../components/ui/title";
import SubTitle from "../components/ui/sub-title";
import ProductCard from "../components/product/product-card";
import CategorySlider from "../components/category/category-slider";
import { getErrorMessage } from "../utils/utils";
import getAllCategoryApi from "../services/category/getAllCategoryApi";
import getAllAdvertisementApi from "../services/advertisement/getAllAdvertisementApi";
import getAllFeaturedProductApi from "../services/product/getAllFeatureProductApi";
import getAllLatestProductApi from "../services/product/getAllLatestProductApi";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);
  const [primaryAdvertisementList, setPrimaryAdvertisementList] = useState([]);
  const [secondaryAdvertisementList, setSecondaryAdvertisementList] = useState(
    []
  );
  const [featuredProductList, setFeaturedProductList] = useState([]);
  const [latestProductList, setLatestProductList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const setData = async () => {
    try {
      const categoryResData = await getAllCategoryApi();
      const advertisementResData = await getAllAdvertisementApi();
      const featuredProductResData = await getAllFeaturedProductApi();

      setPrimaryAdvertisementList(
        advertisementResData.filter((data, i) => i < 2)
      );
      setSecondaryAdvertisementList(
        advertisementResData.filter((data, i) => i >= 2)
      );
      setCategoryList(categoryResData);
      setFeaturedProductList(featuredProductResData.results || []);
      setIsLoading(false);
    } catch (error) {
      const errorMessage = getErrorMessage(error, []);
      toast.error(errorMessage);
    }
  };

  const setLatestProductData = async (page) => {
    if (!hasNextPage) return;

    try {
      const productResData = await getAllLatestProductApi({ page });
      if (productResData.next) setHasNextPage(true);
      else setHasNextPage(false);
      setLatestProductList(productResData.results);
    } catch {
      setHasNextPage(false);
    }
  };

  useEffect(() => {
    setData();
  }, []);

  useEffect(() => {
    setLatestProductData(page);
  }, [page]);

  return (
    <Container className="mt-5">
      {isLoading ? (
        <div className="h-[80vh]">
          <p className="text-gray-700 dark:text-white">Loading...</p>
        </div>
      ) : (
        <>
          <Advertisement
            className="mt-16"
            advertisement={primaryAdvertisementList}
          />
          <div className="mt-20">
            <Title className="text-center">Collection</Title>
            <SubTitle className="text-center mt-3">Our Top Collection</SubTitle>
            <div className="mt-20 grid gap-5 lg:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {featuredProductList.map((product) => (
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
          </div>

          <div className="mt-20">
            <Title className="text-center">Categories</Title>
            <SubTitle className="text-center mt-3">
              Featured categories
            </SubTitle>
            <div className="mt-20">
              <CategorySlider categories={categoryList} />
            </div>
          </div>

          <Advertisement
            className="mt-20"
            advertisement={secondaryAdvertisementList}
          />

          <div className="mt-20">
            <Title className="text-center">Latest</Title>
            <SubTitle className="text-center mt-3">
              Our Latest Collection
            </SubTitle>
            <div className="mt-20 grid gap-5 xl:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {latestProductList.map((product) => (
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

            {hasNextPage ? (
              <div className="mt-20 flex justify-center">
                <button
                  className="bg-green-600 px-4 py-1 text-white rounded-md hover:bg-green-800"
                  onClick={() => setPage(page + 1)}
                >
                  Load More
                </button>
              </div>
            ) : null}
          </div>
        </>
      )}
    </Container>
  );
};

export default Home;
