import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/hooks/common";
import { resetIsLogin, selectAuth } from "@/redux/slice/authSlice";
import authApi from "@/api/authApi";

interface DefaultHeaderProps {
  tabName: string;
}

const DefaultHeader: React.FunctionComponent<DefaultHeaderProps> = ({
  tabName,
}) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isLogin } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleOptionClick = (option: string) => {
    setDropdownVisible(false);
    if (option === "login") {
      navigate("/login");
    } else if (option === "lesson") {
      navigate("/admin/lesson");
    } else if (option === "chapter") {
      navigate("/admin/chapter");
    }
  };

  const handleLogOut = async () => {
    const response = await authApi.logout();
    if (response.ok) {
      localStorage.removeItem("access-token");
      localStorage.removeItem("refresh-token");
      dispatch(resetIsLogin())
    }
  };

  const toggleDropdown = () => setDropdownVisible(!isDropdownVisible);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="header-top">
        <h1 className="tab-name">
          <div className="back-button" onClick={() => window.history.back()}>
            <FaArrowLeft className="back-icon" />
          </div>
          <div className="tab-title">{tabName}</div>
        </h1>
        <div className="account-container">
          <button className="btn-account" onClick={toggleDropdown}>
            <Icon
              icon="mdi:account-circle"
              width="24"
              style={{ color: "#222222" }}
            />
          </button>
          {isDropdownVisible && (
            <div className="dropdown" ref={dropdownRef}>
              {isLogin ? (
                <>
                  <div
                    className="dropdown-option"
                    onClick={() => {
                      handleLogOut();
                      handleOptionClick("lesson");
                    }}
                  >
                    Log out
                  </div>
                  <div
                    className="dropdown-option"
                    onClick={() => handleOptionClick("lesson")}
                  >
                    Lesson
                  </div>
                  <div
                    className="dropdown-option"
                    onClick={() => handleOptionClick("chapter")}
                  >
                    Chapter
                  </div>
                </>
              ) : (
                <div
                  className="dropdown-option"
                  onClick={() => handleOptionClick("login")}
                >
                  Login
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DefaultHeader;
