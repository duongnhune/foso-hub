import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LessonItem from "./components/LessonItem";
import { Pagination } from "antd";
import lessonApi from "@/api/lessonApi";
import env from "@/app/env";

interface Lesson {
    id: number;
    title: string;
    description: string;
    content: string;
    chapter: string;
    thumbnail: string;
}

const LessonListPage: React.FunctionComponent = () => {
    const [lessonList, setLessonList] = useState<Lesson[] | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);
    const [totalLessons, setTotalLessons] = useState(0);
    const navigate = useNavigate();

    const indexOfFirstLesson = 0;
    const indexOfLastLesson = itemsPerPage;

    const currentLessons =
        lessonList && lessonList.length > 0
            ? lessonList.slice(
                indexOfFirstLesson,
                Math.min(indexOfLastLesson, lessonList.length)
            )
            : [];

    useEffect(() => {
        fetchLessons(currentPage, itemsPerPage);
    }, [currentPage]);

    const fetchLessons = async (page: number, limit: number) => {
        try {
            setLoading(true);
            const response = await lessonApi.fetchLessons(page - 1, limit);
            setLessonList(response.body);
            setTotalLessons(response.pagination.total);
        } catch (error) {
            console.error("Error fetching lessons:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await lessonApi.deleteLesson(id);
            if (response.ok) {
                setLessonList((prev: any) =>
                    prev.filter((lesson: any) => lesson.id !== id)
                );
            }
        } catch (error) {
            console.error("Error deleting lesson:", error);
        }
    };

    const handleEdit = (id: number) => {
        navigate(`/admin/lesson/${id}`);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="lesson-list-container">
            <div className="d-flex justify-content-end">
                <button onClick={()=>{navigate("/admin/lesson/add")}} className="btn btn-outline-success">Add New Lesson</button>
            </div>
            <div className="row mt-3">
                {loading ? (
                    <p>Loading...</p>
                ) : lessonList && lessonList.length > 0 ? (
                    currentLessons.map((lesson) => (
                        <div key={lesson.id} className="col-md-6">
                            <LessonItem
                                title={lesson.title}
                                thumbnail={`${env.baseGatewayUrl + "media" + lesson.thumbnail}`}
                                description={lesson.description}
                                content={lesson.content}
                                chapter={lesson.chapter}
                                onDelete={handleDelete}
                                onEdit={() => handleEdit(lesson.id)}
                                lessonId={lesson.id}
                            />
                        </div>
                    ))
                ) : (
                    <p>No lessons available</p>
                )}
            </div>

            <div className="pagination-container">
                <Pagination
                    current={currentPage}
                    pageSize={itemsPerPage}
                    total={totalLessons}
                    showLessItems
                    onChange={handlePageChange}
                    showQuickJumper
                />
            </div>
        </div>
    );
};

export default LessonListPage;
