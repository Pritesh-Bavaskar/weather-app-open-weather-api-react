import "./clothing_rec.css";
import React, { useState, useEffect } from "react";
import search_icon from "../../search_icon.json";
import Lottie from "lottie-react";
import ReactMarkdown from "react-markdown";

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const ClothingRecommendation = ({ data }) => {
  const apiKey = "AIzaSyAaE8RzjECfQJqXkS189iY7r3aE7zu4dwI";
  const genAI = new GoogleGenerativeAI(apiKey);
  const [clothingSugg, setClothingSugg] = useState("");

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ];

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  useEffect(() => {
    async function run() {
      const chatSession = model.startChat({
        generationConfig,
        safetySettings,
        history: [],
      });

      try {
        const result = await chatSession.sendMessage(
          `The current weather is ${data.weather[0].description} with a temperature of ${data.main.temp}°C. What clothes should I wear?`
        );
        console.log(result.response.text());
        setClothingSugg(result.response.text());
      } catch (error) {
        console.error("Error fetching clothing recommendation:", error);
      }
    }

    run();

    return () => {};
  }, [data]);

  return (
    <div>
      <div className="animation-box">
        {!clothingSugg && (
          <Lottie className="animation" animationData={search_icon} />
        )}
      </div>
      <div className="animation-box">
        {!clothingSugg && <p>Collecting Insights for You</p>}
      </div>
      {clothingSugg && <div className="clothing_title">Suggestions:</div>}
      <ReactMarkdown className="clothing_subtitle">
        {clothingSugg}
      </ReactMarkdown>
    </div>
  );
};

export default ClothingRecommendation;
