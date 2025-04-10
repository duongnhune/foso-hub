import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import chapterApi from "@/api/chapterApi";
import { IssuesCloseOutlined } from '@ant-design/icons';

interface IChapterTableProps {
  data: any[];
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
}

const ChapterTable: React.FunctionComponent<IChapterTableProps> = ({
                                                                     data,
                                                                     onEdit,
                                                                     onDelete,
                                                                   }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [chapterId, setChapterId] = useState<any>();

  const handleEditChapter = async (chapterId: number) => {
    const response = await chapterApi.getChapter(chapterId);
    if (response.ok && response.body) {
      reset(response.body);
      setShowModalEdit(true);
    }
  };

  const handleCancelModal = () => {
    setShowModal(false);
    setShowModalEdit(false);
  };

  const onSubmit = async (data: any) => {
    if (data.id) {
      const body = {
        title: data.title,
        description: data.description,
      };
      const response = await chapterApi.updateChapter(data.id, body);
      if (response.ok) {
        navigate(0);
      }
      setShowModalEdit(false);
    }
  };

  const handleDelete = async () => {
    const response = await chapterApi.deleteChapter(chapterId);
    if (response.ok) {
      navigate(0);
    }
    setShowModal(false);
  };

  return (
      <>
        {showModal && (
            <div className="modal-overlay">
              <div className="modal-container modal-delete">
                <button onClick={handleCancelModal} className="close-btn">
                    <IssuesCloseOutlined style={{ fontSize: "1.5rem" }} />
                </button>
                <h2>Confirm Deletion</h2>
                <p>Are you sure you want to delete this chapter?</p>
                <div className="modal-buttons">
                  <button
                      onClick={handleCancelModal}
                      className="btn btn-outline-secondary"
                  >
                    Cancel
                  </button>
                  <button onClick={handleDelete} className="btn btn-outline-danger">
                    Delete
                  </button>
                </div>
              </div>
            </div>
        )}

        {showModalEdit && (
            <div className="modal-overlay">
              <div className="modal-container modal-edit">
                <button onClick={handleCancelModal} className="close-btn">
                    <IssuesCloseOutlined style={{ fontSize: "1.5rem" }} />
                </button>
                <h2>Edit Chapter</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        {...register("title", { required: true })}
                        className="form-control"
                    />
                    <label>Description</label>
                    <input
                        type="text"
                        {...register("description", { required: true })}
                        className="form-control"
                    />
                  </div>
                  <div className="modal-buttons">
                    <button
                        onClick={handleCancelModal}
                        className="btn btn-outline-secondary"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-outline-danger">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
        )}

        <div className="chapter-table-wrapper">
          {data && (
              <table
                  style={{
                    width: "100%",
                    fontFamily: "'Arial', sans-serif",
                    overflow: "hidden",
                      border: "1x solid #333333",
                  }}
              >
                <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {data.map((chapter) => (
                    <tr key={chapter.id}>
                      <td style={{ padding: "8px" }}>{chapter.title}</td>
                      <td style={{ padding: "8px" }}>{chapter.description}</td>
                      <td style={{ padding: "8px" }}>
                        <button
                            className="btn btn-outline-success w-45"
                            style={{ marginRight: 8 }}
                            onClick={() => handleEditChapter(chapter.id)}
                        >
                          Edit
                        </button>
                        <button
                            className="btn btn-outline-danger w-45"
                            onClick={() => {
                              setShowModal(true);
                              setChapterId(chapter.id);
                            }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
          )}
        </div>
      </>
  );
};

export default ChapterTable;
