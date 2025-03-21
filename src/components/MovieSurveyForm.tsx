import React, { useState } from "react";
import SuccessPage from "./SuccessPage";
import movies from "../data/movies.ts"; // ดึงข้อมูลจาก movies.js
import { Film, RefreshCw, Send } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  favoriteMovie: string;
  comments: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  favoriteMovie?: string;
}

const MovieSurveyForm: React.FC = () => {
  const [formState, setFormState] = useState<"form" | "success">("form");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    favoriteMovie: "",
    comments: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showErrors, setShowErrors] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "โปรดใส่ชื่อของคุณ";
    } else if (!isNaN(Number(formData.name.trim()))) {
      newErrors.name = "ชื่อไม่สามารถเป็นตัวเลขได้";
    }
    if (!formData.email.trim()) {
      newErrors.email = "โปรดใส่อีเมลของคุณ";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "รูปแบบอีเมลไม่ถูกต้อง";
    }
    if (!formData.favoriteMovie) {
      newErrors.favoriteMovie = "กรุณาเลือกหนังที่คุณชอบ";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (showErrors) {
      validateForm();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowErrors(true);
    if (validateForm()) {
      setFormState("success");
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      favoriteMovie: "",
      comments: "",
    });
    setErrors({});
    setShowErrors(false);
  };

  const handleStartNewSurvey = () => {
    handleReset();
    setFormState("form");
  };

  if (formState === "success") {
    return <SuccessPage formData={formData} onStartNewSurvey={handleStartNewSurvey} />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-10">
      <div className="w-full max-w-md">
        <div className="bg-gradient-to-r from-[rgb(151,34,194)] to-[rgb(82,16,230)] text-white p-4 rounded-t-md">
          <h2 className="text-xl font-bold flex items-center">
            <span className="mr-4"> <Film /> </span> Movie Survey
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-b-md shadow-md"
        >
          {/* ชื่อ */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              ชื่อ <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="กรุณากรอกชื่อของคุณ"
              className={`mt-1 block w-full border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500`}
            />
            {errors.name && showErrors && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* อีเมล */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              อีเมล <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className={`mt-1 block w-full border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500`}
            />
            {errors.email && showErrors && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* เลือกหนังที่ชอบ */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              เลือกหนังที่คุณชอบ <span className="text-red-500">*</span>
            </label>
            <div
              className={`mt-1 border ${
                errors.favoriteMovie && showErrors
                  ? "border-red-500"
                  : "border-0"
              } rounded-md p-3`}
            >
              {movies.map((movie) => (
                <div key={movie.title} className="mb-2 last:mb-0] hover:bg-gray-100 p-2 rounded-md">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="favoriteMovie"
                      value={`${movie.title} (${movie.year})`}
                      checked={
                        formData.favoriteMovie ===
                        `${movie.title} (${movie.year})`
                      }
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                    />
                    <span className="ml-2">
                      <span className=" text-sm">
                        {movie.title} ({movie.year})
                      </span>
                      <br />
                      <span className="text-sm text-gray-500">
                        Director: {movie.director}
                      </span>
                    </span>
                  </label>
                </div>
              ))}
            </div>
            {errors.favoriteMovie && showErrors && (
              <p className="mt-1 text-sm text-red-500">
                {errors.favoriteMovie}
              </p>
            )}
          </div>

          {/* ความคิดเห็น */}
          <div className="mb-6">
            <label
              htmlFor="comments"
              className="block text-sm font-medium text-gray-700"
            >
              ความคิดเห็นเกี่ยวกับหนัง
            </label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              placeholder="พิมพ์ความคิดเห็นของคุณที่นี่..."
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* ปุ่ม */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md flex items-center"
            >
              
                <RefreshCw size={16} className="mr-1" />
              รีเซ็ต
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-[rgb(151,34,194)] to-[rgb(82,16,230)] text-white py-2 px-4 rounded-md flex items-center"
            >
              <Send size={16} className="mr-1" />
              ส่งแบบสำรวจ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieSurveyForm;
