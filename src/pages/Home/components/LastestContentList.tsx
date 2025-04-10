import env from "@/app/env";
import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

interface ILastestContentProps {
  data: any[];
}

const LastestContentList: React.FunctionComponent<ILastestContentProps> = ({
  data,
}) => {
  return (
    <>
      <div className="lastest-contents-wrapper">
        <div className="lastest-contents-header">
          <h2>Lasted Post</h2>
        </div>
        <div className="lastest-contents-container">
          {data.map((item: any, index: number) => {
            const formattedDate = format(
              new Date(item.createdDate),
              "dd-MM-yyyy"
            );
            return (
              <Link className="link" to={`/lesson/${item.id}`}>
                <div className="lastest-content" key={index}>
                  <div className="row">
                    <div className="col-4">
                      <div className="lastest-content-img">
                        <img
                          src={env.baseGatewayUrl + "media" + item?.thumbnail}
                          alt={item?.title || "Image"}
                        />
                      </div>
                    </div>
                    <div className="col-8 lastest-content-meta">
                      <div>
                        <span className="created-date">{formattedDate}</span>
                        <span className="primary-text">
                          {item.chapterTitle || "Unknown Chapter"}
                        </span>
                      </div>
                      <p>
                        <strong>{item?.title}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default LastestContentList;
