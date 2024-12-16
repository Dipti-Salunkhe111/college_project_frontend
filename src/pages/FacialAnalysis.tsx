import React, { useState } from 'react';

const EmotionDetection: React.FC = () => {
  const [processing, setProcessing] = useState(false);

  const handleProcessVideo = () => {
    setProcessing(true);
    setTimeout(() => setProcessing(false), 3000); // Simulate processing
  };

  const handleProcessImages = () => {
    setProcessing(true);
    setTimeout(() => setProcessing(false), 3000); // Simulate processing
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mt-12">Facial Emotion Detection</h1>
      <p className="text-gray-600 mt-4 mb-10">
        Analyze your emotions through uploaded video, or a folder of images.
      </p>
      <div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-around">
          <label>
            <input type="radio" name="uploadType" className="mr-2" />
            Upload Video File
          </label>
          <label>
            <input type="radio" name="uploadType" className="mr-2" />
            Upload Folder of Images
          </label>
        </div>
        <div className="mt-8">
          <label className="block text-gray-700 mb-2">Upload a video file</label>
          <input type="file" className="block w-full mb-4 border rounded p-2" />
          <button
            onClick={handleProcessVideo}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
          >
            Process Video
          </button>
        </div>
        <div className="mt-8">
          <label className="block text-gray-700 mb-2">Upload a folder containing images (JPEG, PNG)</label>
          <input type="file" className="block w-full mb-4 border rounded p-2" />
          <button
            onClick={handleProcessImages}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
          >
            Process Images
          </button>
        </div>
        {processing && (
          <div className="mt-6">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-blue-600 h-4 rounded-full animate-pulse"></div>
            </div>
            <p className="text-blue-600 mt-2">Processing...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmotionDetection;    