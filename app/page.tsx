"use client";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

type Inputs = {
  example: string;
  exampleRequired: string;
};

const Page = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const { register, handleSubmit, formState: { errors },} = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  // ----------------------------------------------------------database insert----------------------------------------

  return (
    <main className="relative">
{/* -----------------------------------------------------------button overlay------------------------------------- */}
      {showOverlay && (
        <section
          className="flex items-center justify-center shadow-lg"
          style={{ position: "fixed", top: "50%", left: "50%", width: "120px", height: "120px", transform: "translate(-50%, -50%)", zIndex: 50, }}>

{/* ------------------------------------------------------------form---------------------------------------- */}
          <form className="rounded-md space-y-3"
            style={{ backgroundColor: "white", padding:"1rem", }}
            onSubmit={handleSubmit(onSubmit)}>
              <label>enter custom url</label>
            <input className="border rounded-md p-1" defaultValue="test" {...register("example")}/>
            {errors.exampleRequired && <span>This field is required</span>}
            <input className="border rounded-md px-2" type="submit" />
          </form>
        </section> )}

{/* -------------------------------------------------------------navbar----------------------------------------------- */}

      <nav className="h-[5vh] bg-[#474444] flex justify-end p-2">
        <button
          onClick={() => setShowOverlay(true)}
          className="border flex justify-center items-center rounded-full px-3 cursor-pointer text-white">share</button>
      </nav>

{/* ------------------------------------------------------------text-area section ----------------------------------- */}
      <section onClick={() => setShowOverlay(false)}>
        <CodeEditor
          placeholder="Please enter your text here"
          padding={15}
          style={{fontSize: "18px", minHeight: "95vh", zIndex: 0,
          }}
          className="bg-[#000000]"
        />
      </section>
    </main>
  );
};

export default Page;
