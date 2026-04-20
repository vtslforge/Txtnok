"use client";
import CodeEditor from "@uiw/react-textarea-code-editor";
export default function ShopPage() {
  return (
    <main>
      {/* ---------------navbar----------------------------------------------- */}

      <nav className="h-[5vh] bg-[#474444] flex justify-end p-2">
        <button className="border flex justify-center items-center rounded-full px-3 cursor-pointer text-white">share</button>
      </nav>

      {/* ---------------text-area section ----------------------------------- */}

      <section>
        <CodeEditor
          value="ji"
          readOnly
          placeholder="Please enter your text here"
          padding={15}
          style={{fontSize: "18px", minHeight: "95vh", }}
          className="bg-[#000000]"
        />
      </section>
    </main>
  );
}
