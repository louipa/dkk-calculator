import { useRef, useState } from "react";
import Webcam from "react-webcam";
import { createWorker } from "tesseract.js";

interface ScannerProps {
  onScanComplete: (value: string) => void;
  onClose: () => void;
}

export const Scanner: React.FC<ScannerProps> = ({
  onScanComplete,
  onClose,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const webcamRef = useRef<Webcam>(null);

  const handleScan = async () => {
    if (!webcamRef.current) return;

    setIsScanning(true);
    const imageSrc = webcamRef.current.getScreenshot();

    if (imageSrc) {
      const worker = await createWorker();
      await worker.load();

      const {
        data: { text },
      } = await worker.recognize(imageSrc);
      await worker.terminate();

      const numbers = text.match(/\d+([.,]\d+)?/g);
      if (numbers && numbers.length > 0) {
        const lastNumber = numbers[numbers.length - 1].replace(",", ".");
        onScanComplete(lastNumber);
      }
    }

    setIsScanning(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 max-w-lg w-full mx-4">
        <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode: "environment",
            }}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleScan}
            disabled={isScanning}
            className={`flex-1 px-4 py-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isScanning
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
            }`}
          >
            {isScanning ? "Scan en cours..." : "Capturer"}
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};
