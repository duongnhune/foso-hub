import React from "react";
import { Link } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { format } from "date-fns";
import env from "@/app/env";

interface IContentSlideProps {
    data: any[];
}

const MainContentSlide: React.FunctionComponent<IContentSlideProps> = ({ data }) => {
    const properties = {
        prevArrow: (
            <button className="btn-slide">
                <span>&#10094;</span>
            </button>
        ),
        nextArrow: (
            <button className="btn-slide">
                <span>&#10095;</span>
            </button>
        ),
    };

    return (
        <div>
            <Slide {...properties}>
                {data.map((item, index) => {
                    const formattedDate = item.createdDate
                        ? format(new Date(item.createdDate), "dd-MM-yyyy")
                        : "No Date";

                    return (
                        <div className="each-slide-effect" key={index}>
                            <Link to={`/lesson/${item.id}`} className="link">
                                <div className="slide-container">
                                    <div className="img-slide">
                                        <img
                                            src={env.baseGatewayUrl + "media" + item?.thumbnail}
                                            alt={item.title || "Slide Image"}
                                            style={{ width: "100%", height: "auto", objectFit: "cover" }}
                                        />
                                    </div>
                                    <div className="slide-content">
                                        <span className="primary-text">{item.chapterTitle || "Unknown Chapter"}</span>
                                        <h4>{item.title || "No Title"}</h4>
                                        <span className="content-created-date">{formattedDate}</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </Slide>
        </div>
    );
};

export default MainContentSlide;
