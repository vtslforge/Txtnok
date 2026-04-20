"use client";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { useState } from "react";

const Page = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <main className="relative">
      {/* ------------------button overlay------------------------------------- */}
      {showOverlay && (
        <section
          className="flex items-center justify-center shadow-lg"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            width: "120px",
            height: "120px",
            transform: "translate(-50%, -50%)",
            zIndex: 50,
          }}
        >
          <input style={{ height: "24px", backgroundColor: "gray" }}></input>
        </section>
      )}

      {/* ---------------navbar----------------------------------------------- */}

      <nav className="h-[5vh] bg-[#474444] flex justify-end p-2">
        <button
          onClick={() => setShowOverlay(true)}
          className="border flex justify-center items-center rounded-full px-3 cursor-pointer text-white"
        >
          share
        </button>
      </nav>

      {/* ---------------text-area section ----------------------------------- */}
      <section onClick={() => setShowOverlay(false)}>
        <CodeEditor
          placeholder="Please enter your text here"
          padding={15}
          style={{
            fontSize: "18px",
            minHeight: "95vh",
            zIndex: 0,
          }}
          className="bg-[#000000]"
        />
      </section>
    </main>
  );
};

export default Page;
