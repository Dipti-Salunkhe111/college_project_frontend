import React, { useState } from 'react';
import { submitFacialAnalysis } from '../services/test';
import FinishModal from '../components/FinishModal';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

interface EmotionResults {
  [key: string]: number;
}

// VideoUpload Component
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
    <motion.div
      className="bg-[#f8f8f5] p-8 border border-[#eaeae5]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <label className="block text-[#333] mb-4 font-medium">Upload a video file (max 10MB)</label>
      <input
        type="file"
        onChange={handleFileChange}
        accept="video/*"
        className="block w-full text-sm text-[#555] file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-sm file:font-semibold file:bg-[#90a870] file:text-white hover:file:bg-[#7d9460]"
      />
      {videoFile && <p className="mt-2 text-sm text-[#555]">Selected: {videoFile.name}</p>}
    </motion.div>
  );
};

// ImageUpload Component
const ImageUpload: React.FC<{
  onFileChange: (files: FileList | null) => void;
  imageFiles: FileList | null;
}> = ({ onFileChange, imageFiles }) => {
  return (
    <motion.div
      className="bg-[#f8f8f5] p-8 border border-[#eaeae5]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <label className="block text-[#333] mb-4 font-medium">Upload multiple images (JPEG, PNG)</label>
      <input
        type="file"
        onChange={(e) => onFileChange(e.target.files)}
        accept="image/*"
        multiple
        className="block w-full text-sm text-[#555] file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-sm file:font-semibold file:bg-[#90a870] file:text-white hover:file:bg-[#7d9460]"
      />
      {imageFiles && (
        <p className="mt-2 text-sm text-[#555]">Selected: {imageFiles.length} file(s)</p>
      )}
    </motion.div>
  );
};

// ResultsModal Component
const ResultsModal: React.FC<{
  results: EmotionResults;
  onClose: () => void;
}> = ({ results, onClose }) => (
  <motion.div
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <div className="bg-[#f8f8f5] p-8 max-w-md w-full mx-4 border border-[#eaeae5]">
      <h2 className="text-2xl font-medium text-[#333] mb-6">Facial Analysis Results</h2>
      <div className="space-y-4">
        {Object.entries(results).map(([emotion, score]) => (
          <div key={emotion} className="bg-white p-3 border border-[#eaeae5]">
            <div className="flex justify-between items-center">
              <span className="capitalize text-[#555]">{emotion}</span>
              <span className="font-medium text-[#90a870]">{(score * 100).toFixed(1)}%</span>
            </div>
            <div className="mt-2 bg-[#eaeae5] h-2">
              <div
                className="bg-[#90a870] h-2"
                style={{ width: `${score * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={onClose}
        className="mt-6 w-full bg-[#90a870] text-white px-4 py-2 rounded-none hover:bg-[#7d9460] transition-colors"
      >
        Continue
      </button>
    </div>
  </motion.div>
);

// Main EmotionDetection Component
const EmotionDetection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'video' | 'images'>('video');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<EmotionResults | null>(null);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);

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
      setShowFinishModal(true);
      setResults(response.scores);
      setShowResultsModal(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during processing');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f0]">
      <Header />
      <main className="flex-grow py-16 px-6">
        <div className="container mx-auto max-w-screen-xl">
          <motion.h1
            className="text-3xl md:text-5xl font-medium text-[#333] mb-6 leading-tight text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Facial Emotion Detection
          </motion.h1>
          <motion.p
            className="text-base md:text-lg text-[#555] mb-10 leading-relaxed text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Analyze emotions through uploaded video or multiple images using AI-powered facial recognition.
          </motion.p>

          <div className="bg-white p-8 border border-[#eaeae5]">
            <div className="flex border-b border-[#eaeae5] mb-6">
              <button
                className={`flex-1 py-2 text-center font-medium ${
                  activeTab === 'video' ? 'text-[#90a870] border-b-2 border-[#90a870]' : 'text-[#555]'
                }`}
                onClick={() => setActiveTab('video')}
              >
                Upload Video
              </button>
              <button
                className={`flex-1 py-2 text-center font-medium ${
                  activeTab === 'images' ? 'text-[#90a870] border-b-2 border-[#90a870]' : 'text-[#555]'
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
              className={`w-full py-3 rounded-none font-medium mt-6 ${
                processing || (!videoFile && !imageFiles)
                  ? 'bg-[#eaeae5] cursor-not-allowed text-[#555]'
                  : 'bg-[#90a870] hover:bg-[#7d9460] text-white'
              } transition-colors`}
            >
              {processing ? 'Processing...' : 'Analyze'}
            </button>
          </div>
        </div>
      </main>
      <Footer />

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