import * as types from "../actions/elementsActions";

const initialState = {
  isLoading: true,
  currentFolder: "root",
  userFolders: [],
  userFiles: [],
  adminFolders: [],
  adminFiles: [],
};

const elementsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_FOLDER:
      return {
        ...state,
        userFolders: [...state.userFolders, action.payload],
      };
    case types.ADD_FOLDERS:
      return {
        ...state,
        userFolders: action.payload,
      };
    case types.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case types.CHANGE_FOLDER:
      return {
        ...state,
        currentFolder: action.payload,
      };

    case types.ADD_FILES:
      return {
        ...state,
        userFiles: action.payload,
      };

    case types.CREATE_FILE:
      return {
        ...state,
        userFiles: [...state.userFiles, action.payload],
      };

    case types.SET_FILE_DATA:
      const { fileId, data } = action.payload;
      const allFiles = state.userFiles;
      const openedFile = allFiles.find((file) => file.docId === fileId);
      openedFile.data.data = data;
      return {
        ...state,
        userFiles: state.userFiles.map((file) =>
          file.docId === fileId ? openedFile : file
        ),
      };

    case types.DELETE_FILE:
      const fileIdToDelete = action.payload.fileId;
      return {
        ...state,
        userFiles: state.userFiles.filter(
          (file) => file.docId !== fileIdToDelete
        ),
      };

    default:
      return state;
  }
};

export default elementsReducer;
