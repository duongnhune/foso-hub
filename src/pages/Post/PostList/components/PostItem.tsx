import React from "react";
import { Link } from "react-router-dom";
import env from "@/app/env";
import { format } from "date-fns";

interface PostItemProps {
  lesson: {
    id: string;
    title: string;
    description: string;
    content: string;
    chapterId: number;
    createdDate: string;
    chapterName: string;
    thumbnail: string;
  };
  chapterTitle?: string;
}

const PostItem: React.FunctionComponent<PostItemProps> = ({ lesson, chapterTitle }) => {
  const thumbnailSrc = `${env.baseGatewayUrl + 'media' + lesson.thumbnail}`;
  const formattedDate = format(new Date(lesson.createdDate), "dd-MM-yyyy");

  return (
      <>
        <Link to={`/lesson/${lesson.id}`} className="link">
          <div className="post-item-wrapper">
            <div className="row">
              <div className="col-sm-12 col-md-4 post-item-img">
                <img
                    src={thumbnailSrc}
                    alt="Lesson Thumbnail"
                    style={{
                      borderRadius: "16px",
                      maxWidth: "100%",
                      height: "auto",
                      objectFit: "cover",
                    }}
                />
              </div>
              <div className="col-sm-12 col-md-8" style={{ display: "flex", flexDirection: "column" }}>
                <div className="post-item-content">
                  <h4>{lesson.title}</h4>
                  <p>{lesson.description}</p>
                </div>
                <div className="post-footer">
                  <span className="created-date">{formattedDate}</span>
                  <span className="primary-text">{chapterTitle || "Unknown Chapter"}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </>
  );
};

export default PostItem;
