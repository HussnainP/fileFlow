import { React, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate, Route, Routes } from "react-router-dom";
import Nav from "../../components/DashboardComp/Navbar/Nav";
import SubBar from "../../components/DashboardComp/SubBar/SubBar";
import HomePageComp from "../../components/DashboardComp/HomePageComp/HomePageComp";
import CreateFolder from "../../components/DashboardComp/CreateFolder/CreateFolder";
import { getFolders } from "../../redux/actionCreators/elementsActionCreator";
import FolderComp from "../../components/DashboardComp/FolderComp/FolderComp";

const DashboardPage = () => {
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const { isLoggedIn, isLoading, userId } = useSelector(
    (state) => ({
      isLoggedIn: state.auth.isAuthenticated,
      isLoading: state.elements.isLoading,
      userId: state.auth.user.uid,
    }),
    shallowEqual
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (isLoading && userId) {
      dispatch(getFolders(userId));
    }
  }, [isLoading, userId, dispatch]);

  return (
    <>
      {isCreateFolderModalOpen && (
        <CreateFolder setIsCreateFolderModalOpen={setIsCreateFolderModalOpen} />
      )}
      <Nav />
      <SubBar setIsCreateFolderModalOpen={setIsCreateFolderModalOpen} />
      <Routes>
        <Route path="" element={<HomePageComp />} />
        <Route path="folder/:folderId" element={<FolderComp />} />
      </Routes>
    </>
  );
};

export default DashboardPage;
