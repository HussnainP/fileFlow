import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { duotoneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./FileEditor.css";

const FileEditor = ({ fileName, data, setData }) => {
  // const [data, setData] = useState(`\n`);

  const codes = {
    html: "xml",
    php: "php",
    js: "javascript",
    jsx: "jsx",
    txt: "textile",
    xml: "xml",
    css: "css",
    c: "clike",
    java: "java",
    cs: "clike",
    cp: "clike",
    py: "python",
    json: "javascript",
  };

  const handleKeyDown = (evt) => {
    let value = data,
      selStartPos = evt.currentTarget.selectionStart;

    console.log(evt.currentTarget);

    if (evt.key === "Tab") {
      value =
        value.substring(0, selStartPos) +
        "    " +
        value.substring(selStartPos, value.length);
      evt.currentTarget.selectionStart = selStartPos + 3;
      evt.currentTarget.selectionEnd = selStartPos + 4;
      evt.preventDefault();

      setData(value);
    }
  };

  return (
    <div className="row px-5 mt-3">
      <div className="col-md-12 mx-auto code-edit-container p-3">
        <textarea
          className="code-input w-100 h-100"
          value={data}
          onKeyDown={handleKeyDown}
          onChange={(e) => setData(e.target.value)}
        />
        <div className="code-container">
          {" "}
          <pre className="code-output">
            <SyntaxHighlighter
              language={codes[fileName.split(".")[1]]}
              showLineNumbers
              style={duotoneLight}
              wrapLines
              startingLineNumber={1}
            >
              {data}
            </SyntaxHighlighter>
          </pre>{" "}
        </div>
      </div>
    </div>
  );
};

export default FileEditor;
