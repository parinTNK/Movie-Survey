import React from "react";
import { CircleCheckBig, RefreshCw, Film } from "lucide-react";

interface SuccessPageProps {
  formData: {
    name: string;
    email: string;
    favoriteMovie: string;
    comments?: string;
  };
  onStartNewSurvey: () => void;
}

const SuccessPage: React.FC<SuccessPageProps> = ({ formData, onStartNewSurvey }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <div className="bg-gradient-to-r from-[rgb(151,34,194)] to-[rgb(82,16,230)] text-white p-4 rounded-t-md">
          <h2 className="text-xl font-bold flex items-center">
            <span className="mr-2"><Film /></span> Movie Survey
          </h2>
        </div>

        <div className="bg-white p-6 rounded-b-md shadow-md">
          <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
            <p className="text-green-700 flex items-center">
              
            <CircleCheckBig size={16} className="mr-2" />
              ส่งแบบสำรวจสำเร็จ!
            </p>

            <div className="my-4">
            <div className="flex flex-cols gap-2 mb-1">
              <span className="text-gray-600 w-1/3 ">ชื่อ:</span>
              <span className="font-medium">{formData.name}</span>
            </div>
            <div className="flex flex-cols gap-2 mb-1">
              <span className="text-gray-600 w-1/3">อีเมล:</span>
              <span className="font-medium">{formData.email}</span>
            </div>
            <div className="flex flex-cols gap-2 mb-1">
              <span className="text-gray-600 w-1/3">หนังที่ชอบ:</span>
              <span className="font-medium text-purple-600">
                {formData.favoriteMovie.split(" (")[0]}
              </span>
            </div>
            {formData.comments && (
              <div className="flex flex-cols gap-2">
                <span className="text-gray-600 w-1/3">ความคิดเห็นเกี่ยวกับหนัง:</span>
                <span className="font-medium">{formData.comments}</span>
              </div>
            )}
          </div>
          </div>

  
          <button
            onClick={onStartNewSurvey}
            className="w-full bg-black text-white py-2 px-4 rounded-md flex justify-center items-center"
          >
            <RefreshCw size={16} className="mr-1" />
            ทำแบบสำรวจใหม่
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;