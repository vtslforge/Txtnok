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
    <main className="relative min-h-screen overflow-hidden">
      {/* -----------------------------------------------------------button overlay------------------------------------- */}
      {showOverlay && (
        <section
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setShowOverlay(false)}
        >
          {/* ------------------------------------------------------------form---------------------------------------- */}
          <form
            className="w-full max-w-md space-y-5 rounded-xl border border-zinc-800 bg-zinc-950/95 p-6 shadow-2xl shadow-black/40"
            onSubmit={handleSubmit(onSubmit)}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-zinc-100">Create a custom URL</h2>
              <p className="text-sm text-zinc-400">
                Publish this note with a clean slug that is easy to revisit.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="slug" className="text-sm font-medium text-zinc-300">
                Custom URL
              </label>
              <input
                id="slug"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-zinc-100 transition placeholder:text-zinc-500 focus:border-zinc-700 focus:ring-2 focus:ring-zinc-700/70"
                placeholder="your-snippet-name"
                {...register("slug", { required: true })}
              />
              {errors.slug && (
                <span className="text-sm text-rose-400">This field is required.</span>
              )}
            </div>

            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                className="rounded-lg border border-zinc-800 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-900"
                onClick={() => setShowOverlay(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg border border-zinc-700 bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-white"
              >
                Publish
              </button>
            </div>

            <div className="h-5">
              {submitMessage && (
                <p
                  className={`text-sm transition ${
                    submitMessage === "Submitted" ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {submitMessage === "Submitted"
                    ? "Snippet published successfully."
                    : "Submit failed. Try a different slug."}
                </p>
              )}
            </div>
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
      <section
        className="relative z-10 w-full px-0 pb-0 pt-16"
        onClick={() => setShowOverlay(false)}
      >
        <CodeEditor
          value={content}
          onChange={(e) => setContent(e.target.value)}
          padding={8}
          placeholder="Please enter your text here"
          style={{
            fontSize: "18px",
            minHeight: "calc(100vh - 6rem)",
            zIndex: 0,
            backgroundColor: "transparent",
            fontFamily: "inherit",
          }}
          className="w-full bg-transparent px-2 text-zinc-100 sm:px-3"
        />
      </section>
    </main>
  );
};

export default Page;
