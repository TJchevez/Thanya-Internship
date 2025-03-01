import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";


const SkeletonLoader = () => (
  <div className="nft__item">
      <div className="skeleton-box skeleton-image-fluid" style={{height:'48vh'}}></div>
      <div className="skeleton-pp-coll skeleton-box" style={ {top:'-360px', left:'20px'}}></div>
      <div className="skeleton-code skeleton-box" style={ {width:'100%',maxWidth:'120px', height:'30px',left:'-60px', marginLeft:'10px'}}></div>
      <div className="bottom-two__skeleton-boxes">
      <div className="skeleton-code skeleton-box"></div>
      <div className="skeleton-code skeleton-box"style={{maxWidth:'30px'}}></div>
      </div>
  </div>
);


const NewItems = () => {
  const [itemsCarousel, setItemsCarousel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countdowns, setCountdowns] = useState({});

  async function newItemsData() {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setItemsCarousel(data);
    setLoading(false);
    startCountdowns(data);
  }

  useEffect(() => {
    newItemsData();
  }, []);

  const startCountdowns = (items) => {
    const countdownIntervals = {};

    items.forEach((item) => {
        if (item.expiryDate) {
            const updateCountdown = () => {
                const timeLeft = new Date(item.expiryDate).getTime() - Date.now();

                if (timeLeft <= 0) {
                    clearInterval(countdownIntervals[item.id]);
                    setCountdowns((prev) => ({ ...prev, [item.id]: "00:00:00" }));
                } else {
                    const formatTime = (time) => String(Math.floor(time)).padStart(2, "0");
                    const hours = formatTime((timeLeft / (1000 * 60 * 60)) % 24);
                    const minutes = formatTime((timeLeft / (1000 * 60)) % 60);
                    const seconds = formatTime((timeLeft / 1000) % 60);
                    setCountdowns((prev) => ({ ...prev, [item.id]: `${hours}:${minutes}:${seconds}` }));
                }
            };
            
            updateCountdown(); 
            countdownIntervals[item.id] = setInterval(updateCountdown, 1000);
        }
    });
};

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
          {loading ? (
            <OwlCarousel className="owl-theme" loop margin={10} nav items={4}>
              {Array(4)
                .fill()
                .map((_, index) => (
                  <div key={index}>
                    <SkeletonLoader />
                  </div>
                ))}
            </OwlCarousel>
          ) : (
            <OwlCarousel className="owl-theme" loop margin={10} nav items={4}>
              {itemsCarousel.map((item, index) => (
                <div className="item" key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to="/author"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={`Creator: ${item.creatorName}`}
                      >
                        <img
                          className="lazy"
                          src={item.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    <div className="de_countdown">
                      {countdowns[item.id] || "00:00:00"}
                    </div>

                    <div className="nft__item_wrap">
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
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;

