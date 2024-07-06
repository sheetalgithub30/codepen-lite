import React, { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Grid, Hourglass, ProgressBar, Vortex } from "react-loader-spinner";
import{motion} from "framer-motion"
import { MdFindReplace } from "react-icons/md";

const API_KEY = "AIzaSyDujSd_KNt_3XqUWkO8hlO82TFtBJ3ScQo";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

function Gemini() {
  const [prompt, setPrompt] = useState("");

  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(()=>{
    if(!show){
        setPrompt("");
        setData("");
    }
  },[show])

  async function fetchDataFromGemini(prompt) {
    try {
      if (!prompt) {
        const notify = () => toast.warning("Provide a prompt");
        notify();
        return;
      }
      setLoading(true);
      const response = await model.generateContent(prompt);
      const result = response.response;
      const text = result.text();
    //   console.log(text);
      setData(text);
      setLoading(false);
    } catch (err) {
      setLoading(false);

      console.log(err);
    }
  }
  return (
    <div className="">
    
      <ToastContainer />
      <motion.button
      whileTap={{scale:1.5}}
        className="text-xl fixed right-1 bottom-2"
        onClick={() => setShow(!show)}
      >
        <Vortex
          visible={true}
          height="40"
          width="40"
          ariaLabel="vortex-loading"
          wrapperStyle={{}}
          wrapperClass="vortex-wrapper"
          colors={["red", "green", "blue", "yellow", "orange", "purple"]}
        />
      </motion.button>

     
      {show && (
        <GeminiPrompt
          data={data}
          prompt={prompt}
          setPrompt={setPrompt}
          fetchDataFromGemini={fetchDataFromGemini}
          loading={loading}
        />
      )}
    </div>
  );
}

function GeminiPrompt({
  data,
  prompt,
  setPrompt,
  fetchDataFromGemini,
  loading,
}) {
  return (
    <div
     style={{fontFamily:"cursive"}}
    className="mb-10 bg-slate-700 p-4 rounded-3xl w-[28rem]">
        <p className="text-xl p-3 font-semibold text-white"><i>Stuck in program ?? Get Help... ✨✨</i> </p>
      <div className="flex justify-evenly items-center">
      <textarea
      className="text-wrap w-80 h-10 p-2 rounded-lg outline-none"
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <motion.button
      whileTap={{scale:0.9}}
      className=" bg-emerald-700 text-white h-10 rounded-xl cursor-pointer px-2"
        onClick={() => {
          fetchDataFromGemini(prompt);
        }}
      >
      <MdFindReplace className="text-2xl" />
      </motion.button>
      </div>
      {loading && <div className="flex justify-center items-center p-2">
        <Hourglass
  visible={true}
  height="30"
  width="30"
  ariaLabel="hourglass-loading"
  wrapperStyle={{}}
  wrapperClass=""
  colors={['#306cce', '#72a1ed']}
  />

        </div>}
      {data &&
       <pre className="overflow-y-scroll text-wrap max-h-96 bg-slate-950 text-white p-3 m-2">
        {data}
        </pre>}
    </div>
  );
}

export default Gemini;
