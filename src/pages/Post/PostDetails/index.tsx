import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import lessonApi from "@/api/lessonApi";
import env from "@/app/env";
import {format} from "date-fns";

const PostDetailsPage: React.FunctionComponent = () => {
    const { id } = useParams<{ id: string }>();
    const [postDetails, setPostDetails] = useState<{
        title: string;
        description: string;
        content: string;
        chapterId: number;
        createdDate: string;
        thumbnail: string;
    } | null>(null);

    const [chapterTitle, setChapterTitle] = useState<string | null>(null);

    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const response = await lessonApi.detailLesson(Number(id));
                setPostDetails(response.body);
            } catch (error) {
                console.error("Error fetching post details:", error);
            }
        };

        const fetchChapterTitle = async (chapterId: number) => {
            try {
                const response = await lessonApi.getChapter();
                const chapter = response.body.find((ch: { id: number }) => ch.id === chapterId);
                if (chapter) {
                    setChapterTitle(chapter.title);
                }
            } catch (error) {
                console.error("Error fetching chapter title:", error);
            }
        };

        if (id) {
            fetchPostDetails();
        }

        if (postDetails?.chapterId) {
            fetchChapterTitle(postDetails.chapterId);
        }
    }, [id, postDetails?.chapterId]);

    if (!postDetails) {
        return <div>Loading...</div>;
    }

    const thumbnailSrc = `${env.baseGatewayUrl + 'media' + postDetails.thumbnail}`;
    const formattedDate = format(new Date(postDetails.createdDate), "dd-MM-yyyy");

    return (
        <div className="post-details">
            <div className="lesson-title">{postDetails.title}</div>
            <div className="post-info">
                <span className="primary-text">{chapterTitle || "Unknown Chapter"}</span>
                <span className="created-date">{formattedDate}</span>
            </div>

            <div className="lesson-description">
                {postDetails.description}
            </div>

            <div>
                <img
                    src={thumbnailSrc}
                    alt="Lesson Thumbnail"
                    style={{
                        margin:"20px",
                        maxWidth: "100%",
                        height: "auto",
                        objectFit: "cover",
                    }}
                /></div>
            <div
                className="lesson-content"
                dangerouslySetInnerHTML={{ __html: postDetails.content }}
            />
        </div>
    );
};

export default PostDetailsPage;
