"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { supabase } from "@/utils/supabase";
import Navbar from "../components/Navbar";

export default function ShopPage() {
  const params = useParams<{ slug: string }>();
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadContent = async () => {
      if (!params?.slug) {
        setError("Slug is missing.");
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("clientData")
        .select("content")
        .eq("slug", params.slug)
        .single();

      if (error) {
        setError(error.code === "PGRST116" ? "No data found" : error.message);
        setIsLoading(false);
        return;
      }

      setContent(data?.content ?? "");
      setIsLoading(false);
    };

    loadContent();
  }, [params?.slug]);

  return (
    <main className="min-h-screen">
      <Navbar slug={params?.slug} />

      <section className="w-full px-0 pb-0 pt-16">
        {error ? (
          <div className="mx-4 flex min-h-80 items-center justify-center rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6 text-center sm:mx-6">
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-rose-300/80">
                Unable to load
              </p>
              <p className="text-base text-rose-100">{error}</p>
            </div>
          </div>
        ) : (
          <CodeEditor
            value={isLoading ? "Loading..." : content}
            readOnly
            placeholder="Please enter your text here"
            padding={8}
            style={{
              fontSize: "18px",
              minHeight: "calc(100vh - 6rem)",
              backgroundColor: "transparent",
              fontFamily: "inherit",
            }}
            className="w-full bg-transparent px-2 text-zinc-100 sm:px-3"
          />
        )}
      </section>
    </main>
  );
}
