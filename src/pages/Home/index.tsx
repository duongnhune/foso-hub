import React, { useEffect, useState } from "react";
import MainContentSlide from "./components/MainContentSlide";
import LastestContentList from "./components/LastestContentList";
import lessonApi from "@/api/lessonApi";

interface Chapter {
  id: number;
  title: string;
}

const HomePage: React.FunctionComponent = () => {
  const [slideData, setSlideData] = useState<any[]>([]); // Initialize slideData as an empty array
  const [loading, setLoading] = useState<boolean>(true); // State to track loading

  useEffect(() => {
    const fetchContents = async () => {
      try {
        setLoading(true);
        const [lessonResponse, chapterResponse] = await Promise.all([
          lessonApi.fetchLessons(0, 5),
          lessonApi.getChapter(),
        ]);

        if (lessonResponse.ok && chapterResponse.ok) {
          const lessonsWithChapters = lessonResponse.body.map((lesson: any) => {
            const chapter = chapterResponse.body.find(
                (ch: Chapter) => ch.id === lesson.chapterId
            );
            return {
              ...lesson,
              chapterTitle: chapter?.title || "Unknown Chapter",
            };
          });

          setSlideData(lessonsWithChapters);
        }
      } catch (error) {
        console.error("Error fetching contents", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <div className="row">
        <div className="col-sm-12 col-lg-8 mb-4">
          {slideData.length > 0 ? (
              <MainContentSlide data={slideData} />
          ) : (
              <p>No content available</p>
          )}
        </div>
        <div className="col-sm-12 col-lg-4 mb-4">
          {slideData.length > 0 ? (
              <LastestContentList data={slideData} />
          ) : (
              <p>No content available</p>
          )}
        </div>
      </div>
  );
};

export default HomePage;
