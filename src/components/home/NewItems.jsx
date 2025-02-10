import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const SkeletonLoader = () => (
    <div className="nft__item">
      <div className="skeleton-pp-coll skeleton-box"></div>
      <div className="skeleton-image-fluid skeleton-box"></div>
      <div className="skeleton-title skeleton-box"></div>
      <div className="skeleton-title skeleton-box"></div>
      <div className="skeleton-title skeleton-box"></div>
    </div>
);

const NewItems = () => {
  const [itemsCarousel, setItemsCarousel] = useState([]);
  const [loading, setLoading] = useState(true); 

  async function newItemsData() {
    setLoading(true); 
    const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems");
    setItemsCarousel(data);
    setLoading(false); 
  }

  useEffect(() => {
    newItemsData();
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <OwlCarousel className='owl-theme' loop margin={10} nav items={4}>
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => (<SkeletonLoader key={index} />))
            ) : (
              itemsCarousel.map((item, index) => (
                <div className="item" key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to="/author"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={`Creator: ${item.creatorName}`} // Assuming item has creatorName
                      >
                        <img className="lazy" src={item.authorImage || AuthorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="de_countdown">{item.expiryDate}</div>
                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                      <Link to="/item-details">
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>{item.title}</h4>
                      </Link>
                      <div className="nft__item_price">{item.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
