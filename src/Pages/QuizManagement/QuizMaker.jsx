import { ImagePlus, UploadCloud } from "lucide-react";
import { message } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const categoryOptions = [
  "General Knowledge",
  "Geography",
  "Science",
  "Technology",
  "Arts",
];

const pointOptions = [200, 400, 600, 200, 400, 600];
const layoutOptions = Array.from({ length: 8 }, (_, index) => `Layout ${index + 1}`);

const QuizMaker = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editingQuiz = location.state?.quiz;

  const [category, setCategory] = useState(editingQuiz?.category || "General Knowledge");
  const [selectedPoint, setSelectedPoint] = useState(0);
  const [questionText, setQuestionText] = useState(editingQuiz?.question || "");
  const [answerText, setAnswerText] = useState("");
  const [layout, setLayout] = useState("Layout 1");
  const [mediaName, setMediaName] = useState("");
  const [answerMediaName, setAnswerMediaName] = useState("");

  const handleDiscard = () => {
    navigate("/quiz-management");
  };

  const handleSaveQuestion = () => {
    message.success(editingQuiz ? "Quiz updated successfully" : "Quiz created successfully");
    navigate("/quiz-management");
  };

  const handleFileSelect = (event, setter) => {
    const file = event.target.files?.[0];
    setter(file ? file.name : "");
  };

  const renderUploadBox = (label, fileName, onChange) => (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-500">{label}</label>
      <label className="flex min-h-[118px] w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#E3E7EF] bg-white text-center transition hover:border-[#FF0099]">
        <UploadCloud className="text-[#FF66C2]" size={22} />
        <p className="mt-3 text-sm font-medium text-[#374151]">
          {fileName || "Click to upload or drag and drop"}
        </p>
        <p className="mt-1 text-[11px] text-gray-400">PNG, JPG or GIF (max. 5MB)</p>
        <input type="file" accept="image/*" className="hidden" onChange={onChange} />
      </label>
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="mx-auto mt-[27px] overflow-hidden rounded-2xl border border-gray-600 bg-white">
        <div className="flex flex-col gap-3 bg-[#FF0099] px-6 py-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-semibold text-white">Quiz Maker Page</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDiscard}
              className="rounded-md border border-white/70 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Discard
            </button>
            <button
              onClick={handleSaveQuestion}
              className="rounded-md bg-white px-4 py-2 text-sm font-medium text-[#111827] transition hover:bg-[#FFF0F8]"
            >
              Save Question
            </button>
          </div>
        </div>

        <div className="grid gap-6 p-4 lg:grid-cols-[minmax(0,1fr)_156px]">
          <div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-500">Category</label>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="h-11 w-full rounded-md border border-[#E5E7EB] bg-white px-4 text-sm text-gray-700 outline-none transition focus:border-[#FF0099]"
              >
                {categoryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
              {pointOptions.map((points, index) => {
                const isActive = selectedPoint === index;
                return (
                  <button
                    key={`${points}-${index}`}
                    onClick={() => setSelectedPoint(index)}
                    className={`flex h-12 items-center gap-3 rounded-md border px-4 text-sm font-medium transition ${
                      isActive
                        ? "border-[#FF0099] bg-[#FF0099] text-white"
                        : "border-[#F7D6E7] bg-[#FFF0F8] text-[#4B5563]"
                    }`}
                  >
                    <span
                      className={`h-3 w-3 rounded-full border ${
                        isActive ? "border-white bg-white" : "border-[#B97A9E] bg-transparent"
                      }`}
                    />
                    {points}
                  </button>
                );
              })}
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold text-gray-500">Question Text</label>
              <textarea
                value={questionText}
                onChange={(event) => setQuestionText(event.target.value)}
                placeholder="Type your question here..."
                className="min-h-[88px] w-full rounded-xl border border-[#E5E7EB] px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#FF0099]"
              />
            </div>

            <div className="mt-5">{renderUploadBox("Media (Optional)", mediaName, (event) => handleFileSelect(event, setMediaName))}</div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold text-gray-500">Answer</label>
              <textarea
                value={answerText}
                onChange={(event) => setAnswerText(event.target.value)}
                placeholder="Type your question here..."
                className="min-h-[88px] w-full rounded-xl border border-[#E5E7EB] px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#FF0099]"
              />
            </div>

            <div className="mt-5">{renderUploadBox("Answer Media (Optional)", answerMediaName, (event) => handleFileSelect(event, setAnswerMediaName))}</div>
          </div>

          <div className="rounded-[22px] bg-[#F3F4F6] p-4">
            <h2 className="text-sm font-bold uppercase tracking-wide text-[#1F2937]">Layouts</h2>
            <div className="mt-4 space-y-3">
              {layoutOptions.map((option) => {
                const isActive = layout === option;
                return (
                  <button
                    key={option}
                    onClick={() => setLayout(option)}
                    className={`flex w-full items-center gap-3 rounded-md px-4 py-3 text-sm transition ${
                      isActive
                        ? "bg-[#FF0099] text-white"
                        : "bg-[#FDECF5] text-[#374151]"
                    }`}
                  >
                    <span
                      className={`h-3 w-3 rounded-full border ${
                        isActive ? "border-white bg-white" : "border-[#A1A1AA] bg-transparent"
                      }`}
                    />
                    {option}
                  </button>
                );
              })}
            </div>

            <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-md bg-[#FF0099] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#CC007A]">
              <ImagePlus size={16} />
              + Add Section
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizMaker;
