import DefaultHeader from "@/components/layouts/headers/DefaultHeader";
import { useAppSelector } from "@/hooks/common";
import { selectAuth } from "@/redux/slice/authSlice";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AdminPanelLayout: React.FunctionComponent = () => {
  const { isLogin } = useAppSelector(selectAuth);
  const location = useLocation(); // Lấy thông tin về đường dẫn hiện tại

  const getTabName = (path: string) => {
    switch (true) {
      case path === "/admin/lesson":
        return "Manage Lesson";
      case path === "/admin/lesson/add":
        return "Add Lesson";
      case path.startsWith("/admin/lesson/"):
        return "Edit Lesson";
      case path.startsWith("/admin/chapter"):
        return "Manage Chapter";
      default:
        return "";
    }
  };

  const tabName = getTabName(location.pathname);

  return (
    <>
      <DefaultHeader tabName={tabName} />
      {isLogin ? <Outlet /> : <Navigate to={"/login"} />}
    </>
  );
};

export default AdminPanelLayout;
