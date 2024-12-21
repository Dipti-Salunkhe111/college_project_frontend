import React, { useState } from 'react';
import { submitFacialAnalysis } from '../services/test';
import FinishModal from '../components/FinishModal';

interface EmotionResults {
  [key: string]: number;
}

// Separate components for Video and Image uploads
const VideoUpload: React.FC<{
  onFileChange: (file: File | null) => void;
  videoFile: File | null;
}> = ({ onFileChange, videoFile }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file && file.size > 10 * 1024 * 1024) {
      alert('Video size must be less than 10MB');
      return;
    }
    onFileChange(file);
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
      <label className="block text-gray-700 mb-4">Upload a video file (max 10MB)</label>
      <input
        type="file"
        onChange={handleFileChange}
        accept="video/*"
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {videoFile && <p className="mt-2 text-sm text-gray-600">Selected: {videoFile.name}</p>}
    </div>
  );
};

const ImageUpload: React.FC<{
  onFileChange: (files: FileList | null) => void;
  imageFiles: FileList | null;
}> = ({ onFileChange, imageFiles }) => {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
      <label className="block text-gray-700 mb-4">Upload multiple images (JPEG, PNG)</label>
      <input
        type="file"
        onChange={(e) => onFileChange(e.target.files)}
        accept="image/*"
        multiple
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {imageFiles && (
        <p className="mt-2 text-sm text-gray-600">Selected: {imageFiles.length} file(s)</p>
      )}
    </div>
  );
};

const ResultsModal: React.FC<{
  results: EmotionResults;
  onClose: () => void;
}> = ({ results, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-xl max-w-md w-full mx-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Facial Analysis Results</h2>
      <div className="space-y-4">
        {Object.entries(results).map(([emotion, score]) => (
          <div key={emotion} className="bg-gray-50 p-3 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="capitalize text-gray-700">{emotion}</span>
              <span className="font-semibold text-blue-600">{(score * 100).toFixed(1)}%</span>
            </div>
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${score * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={onClose}
        className="mt-6 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Continue
      </button>
    </div>
  </div>
);

const EmotionDetection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'video' | 'images'>('video');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<EmotionResults | null>(null);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);

// In the handleSubmit function, update it like this:
const handleSubmit = async () => {
  if (activeTab === 'video' && !videoFile) {
    setError('Please select a video file first');
    return;
  }
  if (activeTab === 'images' && !imageFiles) {
    setError('Please select image files first');
    return;
  }

  try {
    setProcessing(true);
    setError(null);

    const formData = new FormData();
    if (activeTab === 'video' && videoFile) {
      formData.append('files', videoFile);
    } else if (activeTab === 'images' && imageFiles) {
      Array.from(imageFiles).forEach((file) => formData.append('files', file));
    }

    const response = await submitFacialAnalysis(formData);
    setResults(response.scores);
    // First show the results modal
    setShowResultsModal(true);
    // Then after response is successful, set showFinishModal to true
    setShowFinishModal(true);
  } catch (err) {
    setError(err instanceof Error ? err.message : 'An error occurred during processing');
  } finally {
    setProcessing(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center px-4">
      <h1 className="text-4xl font-bold text-gray-800 mt-12">Facial Emotion Detection</h1>
      <p className="text-gray-600 mt-4 mb-10 text-center">
        Analyze emotions through uploaded video or multiple images using AI-powered facial recognition.
      </p>

      <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-md">
        <div className="flex border-b mb-6">
          <button
            className={`flex-1 py-2 text-center font-medium ${
              activeTab === 'video' ? 'text-blue-600 border-blue-600 border-b-2' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('video')}
          >
            Upload Video
          </button>
          <button
            className={`flex-1 py-2 text-center font-medium ${
              activeTab === 'images' ? 'text-blue-600 border-blue-600 border-b-2' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('images')}
          >
            Upload Images
          </button>
        </div>

        {activeTab === 'video' ? (
          <VideoUpload onFileChange={setVideoFile} videoFile={videoFile} />
        ) : (
          <ImageUpload onFileChange={setImageFiles} imageFiles={imageFiles} />
        )}

        {error && <div className="text-red-500 text-sm text-center mt-4">{error}</div>}

        <button
          onClick={handleSubmit}
          disabled={processing || (!videoFile && !imageFiles)}
          className={`w-full py-3 rounded-lg font-medium mt-6 ${
            processing || (!videoFile && !imageFiles)
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          } transition-colors`}
        >
          {processing ? 'Processing...' : 'Analyze'}
        </button>
      </div>

      {showResultsModal && results && (
        <ResultsModal
          results={results}
          onClose={() => {
            setShowResultsModal(false);
            setShowFinishModal(true);
          }}
        />
      )}

      <FinishModal
        isOpen={showFinishModal}
        onClose={() => setShowFinishModal(false)}
        title="Thank You!"
        message="You have successfully completed the facial emotion analysis test."
      />
    </div>
  );
};

export default EmotionDetection;