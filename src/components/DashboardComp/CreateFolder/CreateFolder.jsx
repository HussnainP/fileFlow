import { faL, faTimes, fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { React, useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { createFolder } from "../../../redux/actionCreators/elementsActionCreator";

const CreateFolder = ({ setIsCreateFolderModalOpen }) => {
  const [folderName, setFolderName] = useState("");

  const { userFolders, user, currentFolder } = useSelector(
    (state) => ({
      userFolders: state.elements.userFolders,
      user: state.auth.user,
      currentFolder: state.elements.currentFolder,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const checkFolderAlreadyPresent = (name) => {
    const firstFolderArray = userFolders[0];
    const folderExists = firstFolderArray?.some(
      (folder) => folder?.name?.toLowerCase() === name.toLowerCase()
    );
    return folderExists;
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Before check:", userFolders);
  //   if (userFolders) {
  //     console.log("After check:", userFolders);
  //     if (folderName) {
  //       if (folderName.length > 3) {
  //         if (!checkFolderAlreadyPresent(folderName)) {
  //           // ... rest of your code
  //         } else {
  //           alert("Folder already exists!");
  //         }
  //       } else {
  //         alert("Folder name must contain 3 or more characters!");
  //       }
  //     } else {
  //       alert("Folder name required!");
  //     }
  //   } else {
  //     alert("Error: userFolders is undefined or null.");
  //   }
  // };

  // const checkFolderAlreadyPresent = (name) => {
  //   const folderExists = userFolders.find((folder) => folder.name == name);
  //   if (folderExists) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (folderName) {
      if (folderName.length > 3) {
        if (!checkFolderAlreadyPresent(folderName)) {
          const data = {
            createdAt: new Date(),
            name: folderName,
            userId: user.uid,
            createBy: user.displayName,
            path: currentFolder == "root" ? [] : ["parent folder path!"],
            parent: currentFolder,
            lastAccessed: null,
            updatedAt: new Date(),
          };
          dispatch(createFolder(data));
        } else {
          alert("Folder already exists!");
        }
      } else {
        alert("Folder name must contain 3 or more characters!");
      }
    } else {
      alert("Folder name required!");
    }
  };
  return (
    <div
      className="col-md-12 position-fixed top-0 left-0 w-100 h-100"
      style={{ background: "rgba(0,0,0,0.4)", zIndex: 9999 }}
    >
      <div className="row align-items-center justify-content-center">
        <div className="col-md-4 mt-5 bg-white rounded p-4">
          <div className="d-flex justify-content-between">
            <h4>Create Folder</h4>
            <button
              className="btn"
              onClick={() => setIsCreateFolderModalOpen(false)}
            >
              <FontAwesomeIcon
                icon={faTimes}
                className="text-black"
                size="sm"
              />
            </button>
          </div>
          <hr />
          <div className="d-flex flex-column algin-items-center">
            <form className="mt-3 w-100" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="folderName"
                  placeholder="Folder Name"
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-5 form-control"
              >
                Create Folder
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFolder;
