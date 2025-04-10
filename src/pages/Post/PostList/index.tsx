import React, { useEffect, useState } from "react";
import { Pagination, Dropdown, Menu } from "antd";
import PostItem from "./components/PostItem";
import { Input } from "antd";
import { FunnelPlotOutlined } from "@ant-design/icons";
import lessonApi from "@/api/lessonApi";
import { useNavigate, useSearchParams } from "react-router-dom";

interface Chapter {
    id: number;
    title: string;
    description: string;
}

const { Search } = Input;

const PostListPage: React.FunctionComponent = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(10);
    const [totalPosts, setTotalPosts] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [chapterList, setChapterList] = useState<Chapter[]>([]);
    const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
    const [selectedChapter, setSelectedChapter] = useState<string>("");
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const fetchChapters = async () => {
        try {
            const response = await lessonApi.getChapter();
            setChapterList(response.body);
        } catch (error) {
            console.error("Error fetching chapters:", error);
        }
    };

    useEffect(() => {
        const query = searchParams.get("search") || "";
        const page = parseInt(searchParams.get("page") || "1", 10);
        const sort = searchParams.get("sort") || "desc";
        const chapterId = searchParams.get("chapterId.equals");

        setSearchQuery(query);
        setCurrentPage(page);
        setSortOrder(sort as 'desc' | 'asc');
        if (chapterId) {
            const chapter = chapterList.find(ch => ch.id === parseInt(chapterId, 10));
            setSelectedChapter(chapter ? chapter.title : "");
        }
        fetchPosts(page, itemsPerPage, query, sort, String(chapterId));
        fetchChapters();
    }, [searchParams]);

    const fetchPosts = async (page: number, limit: number, searchText: string = '', sort: string = '', chapterId: string = '') => {
        try {
            setLoading(true);
            let response;
            const queryParams = new URLSearchParams();

            if (searchText) {
                queryParams.append("title.contains", searchText);
                queryParams.append("description.contains", searchText);
            }

            if (chapterId) {
                queryParams.append("chapterId.equals", chapterId);
            }
            
            response = await lessonApi.searchLessons(
                queryParams.toString(),
                page - 1,
                limit,
                sort,
                Number(chapterId)
            );

            setPosts(response.body);
            setTotalPosts(response.pagination.total);
        } catch (error) {
            console.error("Error fetching lessons:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);

        navigate(`?search=${value}&page=1&sort=createdDate,${sortOrder}`, { replace: true });
        fetchPosts(1, itemsPerPage, value, sortOrder);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        navigate(`?search=${searchQuery}&page=${page}&sort=createdDate,${sortOrder}`, { replace: true });
        fetchPosts(page, itemsPerPage, searchQuery, sortOrder, searchParams.get("chapterId") || "");
    };

    const handleSortClick = () => {
        const newSortOrder = sortOrder === 'desc' ? 'asc' : 'desc';
        setSortOrder(newSortOrder);

        navigate(`?search=${searchQuery}&page=${currentPage}&sort=createdDate,${newSortOrder}`, { replace: true });
        fetchPosts(currentPage, itemsPerPage, searchQuery, newSortOrder, searchParams.get("chapterId") || "");
    };

    const handleChapterSelect = (id: number, title: string) => {
        const chapterId = String(id);
        setSelectedChapter(title);

        navigate(`?search=${searchQuery}&page=1&sort=createdDate,${sortOrder}&chapterId.equals=${chapterId}`, { replace: true });

        fetchPosts(1, itemsPerPage, searchQuery, sortOrder, chapterId);
    };

    const chapterMenu = (
        <Menu>
            {chapterList.map((chapter) => (
                <Menu.Item key={chapter.id} onClick={() => handleChapterSelect(chapter.id, chapter.title)}>
                    {chapter.title}
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <div>
            <div className="search-sort-row">
                <Search
                    placeholder="Search title or description..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    enterButton
                    className="custom-search"
                    style={{ width: 300, marginRight: 10 }}
                />

                <Dropdown overlay={chapterMenu} trigger={['click']}>
                    <div className="dropdown-wrapper" style={{ marginRight: 10, cursor: 'pointer' }}>
                        {selectedChapter || "Select Chapter"}
                    </div>
                </Dropdown>

                <div className="icon-wrapper" onClick={handleSortClick}>
                    <FunnelPlotOutlined
                        style={{ fontSize: '24px', cursor: 'pointer' }}
                    />
                </div>
            </div>

            <div className="post-list">
                {loading ? (
                    <div>Loading...</div>
                ) : posts.length === 0 ? (
                    <div>No posts available.</div>
                ) : (
                    posts.map((post) => {
                        const chapter = chapterList.find((ch) => ch.id === post.chapterId);
                        return (
                            <PostItem
                                key={post.id}
                                lesson={post}
                                chapterTitle={chapter?.title || "Unknown Chapter"}
                            />
                        );
                    })
                )}
            </div>

            <div className="pagination-container">
                <Pagination
                    current={currentPage}
                    pageSize={itemsPerPage}
                    total={totalPosts}
                    showLessItems
                    onChange={handlePageChange}
                    showQuickJumper
                />
            </div>
        </div>
    );
};

export default PostListPage;
