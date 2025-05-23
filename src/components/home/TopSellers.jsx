import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import AOS from "aos";
import 'aos/dist/aos.css';

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const topSellersData = async () => {
    const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers");
    setTopSellers(response.data);
};

useEffect(() => {
  topSellersData();
}, []);

 useEffect(()=>{
      AOS.init();
    }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div data-aos="zoom-out" data-aos-duration="800" className="col-lg-12">
          <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
              </div>
          {topSellers.length ? (
              <ol className="author_list">
                {topSellers.map((item, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={item.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${item.authorId}`}>
                        {item.authorName}
                      </Link>
                      <span>{item.price} ETH</span>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <ol className="author_list">
                {new Array(12).fill(0).map((item, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <Link to={``}>
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={``}>
                        <Skeleton width="100px" height="20px" />
                      </Link>
                      <span>
                        <Skeleton width="40px" height="20px" />
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
