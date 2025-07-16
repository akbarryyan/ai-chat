import React from "react";
import { Bot, Sparkles, ChevronDown } from "lucide-react";

const AiModelSelector = ({
  selectedModel,
  onModelChange,
  disabled = false,
}) => {
  const models = [
    {
      value: "akbxr",
      label: "AKBXR AI",
      description: "Balanced & Reliable",
      icon: "🔶",
    },
    {
      value: "chatgpt4",
      label: "ChatGPT-4",
      description: "Advanced Language Model",
      icon: "🤖",
    },
    {
      value: "gemini",
      label: "Gemini AI",
      description: "Google's AI",
      icon: "🤯",
    },
    {
      value: "claude",
      label: "Claude AI",
      description: "Anthropic's AI",
      icon: "🧠",
    },
  ];

  const currentModel = models.find((model) => model.value === selectedModel);

  return (
    <div className="p-4 bg-white border-t border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-gray-700">Model AI</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
            Online
          </span>
        </div>
      </div>

      <div className="relative">
        <select
          value={selectedModel}
          onChange={(e) => onModelChange(e.target.value)}
          disabled={disabled}
          className="w-full p-3 pr-10 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm font-medium appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {models.map((model) => (
            <option key={model.value} value={model.value}>
              {model.icon} {model.label} - {model.description}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
};

export default AiModelSelector;
