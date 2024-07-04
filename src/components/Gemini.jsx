import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_KEY = "AIzaSyDujSd_KNt_3XqUWkO8hlO82TFtBJ3ScQo";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

function Gemini() {
  const [prompt, setPrompt] = useState("");

  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

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
      console.log(text);
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
      <button className="text-xl" onClick={() => setShow(!show)}>
        AI
      </button>
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
    <div className="mb-10">
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={() => {
          fetchDataFromGemini(prompt);
        }}
      >
        Click
      </button>
      {loading && <div>Loading....</div>}
      {data && <div>{data}</div>}
    </div>
  );
}

export default Gemini;
