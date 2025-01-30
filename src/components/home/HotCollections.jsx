import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const HotCollections = () => {
  const [carousel, setCarousel] = useState([]);
  async function datacollection() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setCarousel(data);
  }
  useEffect(() => {
    datacollection();
  }, []);

  var script = document.createElement("script");
  script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
  script.onload = function () {
    console.log("jQuery has been loaded!", window.jQuery);
  };
  document.head.appendChild(script);

  const Nft = ({ nft }) => {
    const [img, setImage] = useState();

    useEffect(() => {
      const image = new Image();
      image.src = nft.url;
      image.onLoad = () => {
        setTimeout(() => {
          setImage(image);
        }, 300)
      }
    })
  }

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <>
          <div className="container">
            <div className="row">
              <div className="nft_coll">
                <div className="nft_wrap">
          <div className="skeleton-box skeleton-image-fluid"></div>
          </div>
          <div className="nft_coll_pp">
          <div className="skeleton-box skeleton-pp-coll"></div>
          </div>
          <div className="skeleton-box skeleton-title"></div>
          <div className="skeleton-box skeleton-code"></div>
          </div>
          </div>
          </div>
          </>
          :
          <>
          {carousel.length > 0 && (
            <OwlCarousel className="owl-theme" loop margin={10} nav>
            {carousel.map((nft, index) => (
              <div key={index}>
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to="/item-details">
                      <img
                        src={nft.nftImage}
                        className="lazy img-fluid"
                        alt=""
                        />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to="/author">
                      <img
                        className="lazy pp-coll"
                        src={nft.authorImage}
                        alt=""
                        />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{nft.title}</h4>
                    </Link>
                    <span>ERC-{nft.code}</span>
                  </div>
                </div>
              </div>
            ))}{" "}
          </OwlCarousel>
        )}
        </>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;