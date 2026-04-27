"use client";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import Navbar from "./components/Navbar";

type Inputs = {
  slug: string;
  exampleRequired: string;
};

const Page = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [content, setContent] = useState("");

  // ----------------------------------------------------------database insert----------------------------------------
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await fetch("/api/customUrl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug: data.slug,
          content: content,
        }),
      });

      if (!res.ok) {
        setSubmitMessage("Submit failed");
        return;
      }

      await res.json();
      setSubmitMessage("Submitted");
      setTimeout(() => {
        setShowOverlay(false);
        setSubmitMessage("");
      }, 2000);
    } catch {
      setSubmitMessage("Submit failed");
    }
  };

  return (
    <main className="relative">
      {/* -----------------------------------------------------------button overlay------------------------------------- */}
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
          {/* ------------------------------------------------------------form---------------------------------------- */}
          <form
            className="rounded-md space-y-3"
            style={{ backgroundColor: "white", padding: "1rem" }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <label>enter custom url</label>
            <input
              className="border rounded-md p-1"
              defaultValue="test"
              {...register("slug", { required: true })}
            />
            {errors.slug && <span>This field is required</span>}
            <input className="border rounded-md px-2" type="submit" />
            {submitMessage && <p className="text-sm text-green-700">{submitMessage}</p>}
          </form>
        </section>
      )}

      {/* -------------------------------------------------------------navbar----------------------------------------------- */}

      <Navbar
        onShare={() => {
          setSubmitMessage("");
          setShowOverlay(true);
        }}
      />

      {/* ------------------------------------------------------------text-area section ----------------------------------- */}
      <section onClick={() => setShowOverlay(false)}>
        <CodeEditor
          value={content}
          onChange={(e)=>setContent(e.target.value)}
          placeholder="Please enter your text here"
          padding={15}
          style={{ fontSize: "18px", minHeight: "95vh", zIndex: 0 }}
          className="bg-[#000000] mt-[5vh]"
        />
      </section>
    </main>
  );
};

export default Page;
