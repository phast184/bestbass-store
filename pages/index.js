import React from "react";
import banner from "../bestbass-store/schemas/banner";
import { Product, HeroBanner, FooterBanner } from "../components";
import { client } from "../lib/client";
const Home = ({ productsData, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className="products-container">
        {productsData?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      <FooterBanner footerBanner = {bannerData && bannerData[0]}/>
    </>
  );
};

//getServerSideProps will pre-render this page on each request using the data returned by getServerSideProps
export const getServerSideProps = async () => {
  const productsQuery = '*[_type == "product"]';
  const productsData = await client.fetch(productsQuery);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return { props: { productsData, bannerData } };
};

export default Home;
