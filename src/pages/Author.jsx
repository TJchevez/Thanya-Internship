import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";



const Author = () => {
  const { authorId } = useParams();
  const [posts, setPosts] = useState([]);
  const [items, setItems] = useState([]);
  

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems?author=${authorId}`
      );
      console.log(data);
      setPosts(data);
      setItems(data);
    }
    fetchPosts();
  }, [authorId]);

  const NewItemComponent = ({ item }) => {
    return (
        <div>
            <h2>{item.title}</h2>
        </div>
        
    );
  };
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>
        <>
        {items.length > 0 ? (
                        items.map(item => (
                            <NewItemComponent key={item.id} item={item} />
                        ))
                    ) : (
                        <p>No items found!</p>
                    )}
          {posts.length > 0 && (
            <div key={0}>
              <section aria-label="section">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="d_profile de-flex">
                        <div className="de-flex-col">
                          <div className="profile_avatar">
                            <img src={AuthorImage} alt="" />
                            <i className="fa fa-check"></i>
                            <div className="profile_name">
                            <h4>
                                Monica Lucas
                                <span className="profile_username">
                                  @monicaaaa
                                </span>
                                <span id="wallet" className="profile_wallet">
                                  UDHUHWudhwd78wdt7edb32uidbwyuidhg7wUHIFUHWewiqdj87dy7
                                </span>
                                <button id="btn_copy" title="Copy Text">
                                  Copy
                                </button>
                              </h4>
                            </div>
                          </div>
                        </div>
                        <div className="profile_follow de-flex">
                          <div className="de-flex-col">
                            <div className="profile_follower">
                              573 followers
                            </div>
                            <Link to="#" className="btn-main">
                              Follow
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="de_tab tab_simple">
                        <AuthorItems />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )};
    </>
      </div>
    </div>
  );
};


export default Author;


