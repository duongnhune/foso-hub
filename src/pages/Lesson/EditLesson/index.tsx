import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import chapterApi from "@/api/chapterApi";
import lessonApi from "@/api/lessonApi";
import env from "@/app/env";
import FormEditor from "@/components/formEditor";

const EditLessonPage: React.FunctionComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [thumbnail, setThumbnail] = useState<string>("");
  const [chapters, setChapters] = useState<any[]>([]);

  const { register, handleSubmit, setValue, getValues, reset } = useForm({
    defaultValues: {
      title: "",
      description: "",
      thumbnail: "",
      content: "",
      chapterId: "",
    },
  });

  useEffect(() => {
    const getLesson = async () => {
      const response = await lessonApi.getLesson(Number(id));
      if (response.ok && response.body) {
        setThumbnail(response.body.thumbnail);
        reset(response.body);
      } else {
        if (response.error.notFound) {
          navigate("/lesson");
        }
      }
    };
    getLesson();
  }, [id, reset]);

  useEffect(() => {
    const fetchChapters = async () => {
      const response = await chapterApi.fetchChapters();
      if (response.ok && response.body) {
        setChapters(response.body);
      } else {
        console.error("Error: " + response.error);
      }
    };
    fetchChapters();
  }, []);

  const onSubmit = async (data: any) => {
    const metadata = {
      title: data.title,
      description: data.description,
      content: data.content,
      chapterId: Number(data.chapterId),
    };

    console.log(metadata);

    const formData = new FormData();

    if (data.thumbnail && data.thumbnail[0]) {
      formData.append("thumbnail", data.thumbnail[0]);
    }

    const metadataBlob = new Blob([JSON.stringify(metadata)], {
      type: "application/json",
    });
    formData.append("request", metadataBlob);

    try {
      const response = await lessonApi.updateLesson(Number(id), formData);
      if (response.ok) {
        navigate("/lesson");
      } else {
        console.error("Failed to edit lesson:", response.error);
      }
    } catch (error) {
      console.error("Error while edit lesson:", error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="edit-lesson-page">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            {...register("description", { required: true })}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Thumbnail</label>
          <input
            type="file"
            {...register("thumbnail")}
            className="form-control"
          />
          <img
            className="thumbnail"
            src={env.baseGatewayUrl + "media" + thumbnail}
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <FormEditor
            onChange={(data) => setValue("content", data)}
            data={getValues().content}
          />
        </div>
        <div className="form-group">
          <label>
            <span>Chapter </span>
            <span>
              <Link to="/admin/chapter">Manage chapter</Link>
            </span>
          </label>
          <select
            {...register("chapterId", { required: true })}
            className="form-control"
          >
            {chapters.map((chapter) => (
              <option key={chapter.id} value={chapter.id}>
                {chapter.title}
              </option>
            ))}
          </select>
        </div>
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-success">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditLessonPage;
