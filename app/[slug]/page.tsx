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
    <main>
      <Navbar slug={params?.slug} />

      {error && <p className="mt-[5vh] p-4 text-red-600">{error}</p>}

      <section className={error ? "" : "mt-[5vh]"}>
        <CodeEditor
          value={isLoading ? "Loading..." : content}
          readOnly
          placeholder="Please enter your text here"
          padding={15}
          style={{ fontSize: "18px", minHeight: "95vh" }}
          className="bg-[#000000]"
        />
      </section>
    </main>
  );
}
