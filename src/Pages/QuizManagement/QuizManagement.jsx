import { ChevronLeft, ChevronRight, ImagePlus, Pencil, Puzzle, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialQuizzes = [
  {
    id: "01",
    question: "What is the capital city of the French Republic?",
    updatedAt: "2 hours ago",
    category: "Geography",
    badgeClass: "bg-[#E7F0FF] text-[#2563EB]",
  },
  {
    id: "02",
    question: "Identify the chemical formula used in photosynthesis.",
    updatedAt: "Yesterday",
    category: "Science",
    badgeClass: "bg-[#E7F8EE] text-[#16A34A]",
  },
  {
    id: "03",
    question: "Which of these is not a programming language?",
    updatedAt: "3 days ago",
    category: "Technology",
    badgeClass: "bg-[#F5EAFF] text-[#9333EA]",
  },
  {
    id: "04",
    question: 'Who painted the famous "Starry Night" masterpiece?',
    updatedAt: "1 week ago",
    category: "Arts",
    badgeClass: "bg-[#FFF1E8] text-[#EA580C]",
  },
];

const paginationJumps = [30, 60, 120];

const QuizManagement = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState(initialQuizzes);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryImageName, setCategoryImageName] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const itemsPerPage = 8;
  const totalItems = 250;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const visibleQuizzes = quizzes.slice(0, itemsPerPage);

  const openCategoryModal = () => {
    setCategoryName("");
    setCategoryImageName("");
    setIsCategoryModalOpen(true);
  };

  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false);
  };

  const handleCategoryImageChange = (event) => {
    const file = event.target.files?.[0];
    setCategoryImageName(file ? file.name : "");
  };

  const handleSaveCategory = () => {
    setIsCategoryModalOpen(false);
  };

  const handleDeleteQuiz = () => {
    if (!deleteTarget) return;
    setQuizzes((currentQuizzes) =>
      currentQuizzes.filter((quiz) => quiz.id !== deleteTarget.id)
    );
    setDeleteTarget(null);
  };

  const openQuizMaker = (quiz = null) => {
    if (quiz) {
      navigate(`/quiz-management/${quiz.id}/edit`, { state: { quiz } });
      return;
    }

    navigate("/quiz-management/new");
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 3;

    buttons.push(
      <button
        key="prev"
        onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
        disabled={currentPage === 1}
        className="flex items-center justify-center text-gray-500 transition-colors hover:text-[#FF0099] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={16} />
      </button>
    );

    for (let page = 1; page <= Math.min(maxVisiblePages, totalPages); page += 1) {
      buttons.push(
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`h-5 min-w-5 rounded-sm px-1 text-xs transition-colors ${
            currentPage === page
              ? "bg-[#FF0099] text-white"
              : "text-gray-600 hover:text-[#FF0099]"
          }`}
        >
          {page}
        </button>
      );
    }

    buttons.push(
      <span key="ellipsis" className="text-xs text-gray-400">
        4....
      </span>
    );

    paginationJumps.forEach((page) => {
      buttons.push(
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className="text-xs text-gray-500 transition-colors hover:text-[#FF0099]"
        >
          {page}
        </button>
      );
    });

    buttons.push(
      <button
        key="next"
        onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center text-gray-500 transition-colors hover:text-[#FF0099] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight size={16} />
      </button>
    );

    return buttons;
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto mt-[27px] overflow-hidden rounded-2xl border border-gray-600 bg-white">
        <div className="flex flex-col gap-4 bg-[#FF0099] px-6 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Puzzle className="text-white" size={24} />
            <h1 className="text-2xl font-semibold text-white">Quiz Management</h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={openCategoryModal}
              className="rounded-md bg-white px-5 py-2 text-sm font-medium text-[#FF0099] transition-colors hover:bg-[#FFF0F8]"
            >
              +Add Category
            </button>
            <button
              onClick={() => openQuizMaker()}
              className="rounded-md bg-white px-5 py-2 text-sm font-medium text-[#FF0099] transition-colors hover:bg-[#FFF0F8]"
            >
              +Add New Quiz
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead className="border-b border-gray-200 bg-[#FCFCFC]">
              <tr>
                <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                  SL
                </th>
                <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                  Quiz
                </th>
                <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                  Updated
                </th>
                <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                  Category
                </th>
                <th className="px-6 py-4 text-right text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {visibleQuizzes.map((quiz) => (
                <tr key={quiz.id} className="border-b border-gray-100">
                  <td className="px-6 py-5 text-sm text-gray-400">{quiz.id}</td>
                  <td className="max-w-[420px] px-6 py-5 text-sm font-semibold text-[#1F2937]">
                    <p className="truncate">{quiz.question}</p>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-400">{quiz.updatedAt}</td>
                  <td className="px-6 py-5">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${quiz.badgeClass}`}>
                      {quiz.category}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => setDeleteTarget(quiz)}
                        className="text-[#FF4D4F] transition-colors hover:text-[#D9363E]"
                        aria-label={`Delete ${quiz.question}`}
                      >
                        <Trash2 size={16} />
                      </button>
                      <button
                        onClick={() => openQuizMaker(quiz)}
                        className="text-gray-600 transition-colors hover:text-[#FF0099]"
                        aria-label={`Edit ${quiz.question}`}
                      >
                        <Pencil size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
          <p className="text-sm font-medium text-[#FF0099]">
            SHOWING {startItem}-{endItem} OF {totalItems}
          </p>
          <div className="flex items-center gap-3">{renderPaginationButtons()}</div>
        </div>
      </div>

      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4">
          <div className="w-full max-w-[390px] rounded-sm bg-white px-8 py-6 border border-gray-600">
            <h2 className="text-[18px] font-semibold text-[#1F2937]">Category Name</h2>
            <input
              type="text"
              placeholder="demo category"
              value={categoryName}
              onChange={(event) => setCategoryName(event.target.value)}
              className="mt-3 h-11 w-full rounded-md border border-[#E5E7EB] px-4 text-sm text-gray-700 outline-none transition focus:border-[#FF0099]"
            />

            <div className="mt-6">
              <h3 className="text-[18px] font-semibold text-[#1F2937]">Category Image/Icon</h3>
              <label className="mt-3 flex h-[124px] w-full cursor-pointer flex-col items-center justify-center rounded-md border border-[#E5E7EB] bg-[#FCFCFC] text-gray-400 transition hover:border-[#FF0099] hover:text-[#FF0099]">
                <ImagePlus size={22} />
                <span className="mt-3 text-base">
                  {categoryImageName || "Upload Image"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleCategoryImageChange}
                />
              </label>
            </div>

            <div className="mt-7 flex gap-3">
              <button
                onClick={closeCategoryModal}
                className="flex-1 rounded-md border border-[#FF0099] px-4 py-3 text-sm font-medium text-[#FF0099] transition hover:bg-[#FFF0F8]"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCategory}
                className="flex-1 rounded-md bg-[#FF0099] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#CC007A]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/15 px-4">
          <div className="w-full max-w-[320px] rounded-sm bg-white px-6 py-5 text-center border border-gray-600">
            <h3 className="text-[18px] font-bold leading-tight text-[#111827]">
              Are you sure delete the
              <br />
              quiz?
            </h3>
            <div className="mt-5 flex justify-center gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="min-w-[88px] rounded-sm border border-[#4F6BFF] px-4 py-1.5 text-xs font-medium text-[#4F6BFF] transition hover:bg-[#F5F7FF]"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteQuiz}
                className="min-w-[102px] rounded-sm bg-[#FF5A5F] px-4 py-1.5 text-xs font-medium text-white transition hover:bg-[#E0484D]"
              >
                Yes, Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizManagement;
