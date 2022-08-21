import Container from "../components/ui/container";
import SubTitle from "../components/ui/sub-title";
import RelatedProducts from "../components/product/related-products";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getProductApi from "../services/product/getProductApi";
import getAllProductByCategoryApi from "../services/product/getAllProductByCategoryApi";

const Product = () => {
  const params = useParams();
  const [productId, setProductId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mainImage, setMainImage] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [relativeProductList, setRelativeProductList] = useState([]);

  const setProductData = async (id) => {
    try {
      const productResData = await getProductApi(id);
      const relativeProductsResData = await getAllProductByCategoryApi({
        category: productResData.category[0].id || undefined,
      });
      setMainImage(productResData.primary_image);
      setProductDetails(productResData);
      setRelativeProductList(relativeProductsResData.results);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.id) setProductId(params.id);
  }, [params]);

  useEffect(() => {
    if (productId) setProductData(productId);
  }, [productId]);

  return (
    <Container className="mt-10">
      {isLoading ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <div className="md:flex md:gap-5 lg:gap-8">
            <div className="md:flex-none md:w-[300px] lg:w-[400px] xl:w-[500px]">
              <img src={mainImage} alt="product" className="w-full shadow" />
              <div className="grid grid-cols-3 gap-2 mt-3">
                <img
                  src={productDetails?.primary_image}
                  alt="product"
                  className="cursor-pointer shadow"
                  onClick={() => setMainImage(productDetails.primary_image)}
                />
                {productDetails.secondary_image1 && (
                  <img
                    src={productDetails.secondary_image1}
                    alt="product"
                    className="cursor-pointer shadow"
                    onClick={() =>
                      setMainImage(productDetails.secondary_image1)
                    }
                  />
                )}

                {productDetails.secondary_image2 && (
                  <img
                    src={productDetails.secondary_image2}
                    alt="product"
                    className="cursor-pointer shadow"
                    onClick={() =>
                      setMainImage(productDetails.secondary_image2)
                    }
                  />
                )}
              </div>
            </div>
            <div className="md:flex-1 mt-8 md:mt-0">
              <p className="text-lg lg:text-2xl text-gray-800 dark:text-lime-50">
                {productDetails?.name}
              </p>
              <p className="mt-2 font-bold text-xl lg:text-2xl text-yellow-500">
                {productDetails?.price.toFixed(2)}{" "}
                {productDetails.discount ? (
                  <del className="text-sm ml-3 text-gray-600 font-normal">
                    Rs.{" "}
                    {(productDetails.price + productDetails.discount).toFixed(
                      2
                    )}
                  </del>
                ) : null}
              </p>
              <p className="mt-3 text-gray-700 lg:text-lg dark:text-lime-50">
                {productDetails.description}
              </p>
              <div className="mt-8 flex gap-4">
                <button className="text-lime-50 bg-primary px-5 py-2 rounded-sm w-[200px] hover:bg-[#8f0359]">
                  Buy Now
                </button>
                <button className="text-lime-50 bg-yellow-600 px-5 py-2 rounded-sm w-[200px] hover:bg-yellow-700">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <SubTitle className="">Relative Products</SubTitle>
            <RelatedProducts
              className="mt-10"
              productList={relativeProductList}
            />
          </div>
        </>
      )}
    </Container>
  );
};

export default Product;
