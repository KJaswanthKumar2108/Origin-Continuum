import React, { useRef, useState } from 'react';
import { ArrowRight, Camera, Image as ImageIcon, Upload, X } from 'lucide-react';

interface CaptureScreenProps {
  onCapture: (capturedData?: { imageBase64?: string; mimeType?: string; textHint?: string }) => void;
  onUseDemo: () => void;
  onCancel: () => void;
}

export const CaptureScreen: React.FC<CaptureScreenProps> = ({ onCapture, onUseDemo, onCancel }) => {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const [imageName, setImageName] = useState('');
  const [mimeType, setMimeType] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('Choose an image under 10 MB.');
      return;
    }
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Choose a supported image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        setErrorMessage('This image could not be loaded. Try another file.');
        return;
      }
      const image = new Image();
      image.onload = () => {
        const scale = Math.min(1, 1280 / Math.max(image.naturalWidth, image.naturalHeight));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
        const context = canvas.getContext('2d');
        if (!context) {
          setErrorMessage('This image could not be prepared. Try another file.');
          return;
        }
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        setImageData(canvas.toDataURL('image/jpeg', 0.82));
        setImageName(file.name || 'Captured photo');
        setMimeType('image/jpeg');
        setErrorMessage(null);
      };
      image.onerror = () => setErrorMessage('This image could not be decoded. Try another file.');
      image.src = reader.result;
    };
    reader.onerror = () => setErrorMessage('This image could not be loaded. Try another file.');
    reader.onerror = () => setErrorMessage('This image could not be loaded. Try another file.');
    reader.readAsDataURL(file);
  };

  return (
    <div id="origin-capture-screen" className="flex-1 flex flex-col bg-black text-white px-4 pt-3 pb-4 min-h-0">
      <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" onChange={handleImage} className="hidden" />
      <input ref={uploadInputRef} type="file" accept="image/*" onChange={handleImage} className="hidden" />

      <div className="flex items-center justify-between mb-3 shrink-0">
        <button onClick={onCancel} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center" aria-label="Close capture">
          <X className="w-4 h-4" />
        </button>
        <div className="text-center">
          <h2 className="text-[14px] font-bold">Capture</h2>
          <p className="text-[10px] text-neutral-400">Choose a real photo to structure</p>
        </div>
        <span className="w-8" />
      </div>

      <div className="flex-1 min-h-0 rounded-xl border border-white/15 bg-neutral-950 flex items-center justify-center overflow-hidden">
        {imageData ? (
          <img src={imageData} alt="Selected capture" className="w-full h-full object-contain" />
        ) : (
          <div className="max-w-60 px-5 text-center">
            <Camera className="w-10 h-10 text-[#FFE600] mx-auto mb-3" />
            <p className="text-[13px] font-semibold text-white">No photo selected</p>
            <p className="text-[11px] text-neutral-400 mt-1">Take a picture with your device or upload an image.</p>
          </div>
        )}
      </div>

      {errorMessage && <p role="alert" className="mt-2 text-center text-[11px] text-red-300">{errorMessage}</p>}
      {imageData && <p className="mt-2 text-center text-[10px] text-neutral-400 truncate">{imageName}</p>}

      <div className="shrink-0 pt-3 space-y-2">
        {imageData ? (
          <>
            <button
              onClick={() => onCapture({ imageBase64: imageData, mimeType, textHint: imageName })}
              className="w-full py-3 rounded-xl bg-[#FFE600] text-black font-extrabold text-[14px] flex items-center justify-center gap-2"
            >
              Use this photo <ArrowRight className="w-4 h-4" />
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => cameraInputRef.current?.click()} className="py-2 rounded-lg bg-white/10 text-[11px] font-semibold flex items-center justify-center gap-1.5">
                <Camera className="w-3.5 h-3.5" /> Retake
              </button>
              <button onClick={() => uploadInputRef.current?.click()} className="py-2 rounded-lg bg-white/10 text-[11px] font-semibold flex items-center justify-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5" /> Choose another
              </button>
            </div>
          </>
        ) : (
          <>
            <button
              onClick={() => cameraInputRef.current?.click()}
              className="w-full py-3 rounded-xl bg-[#FFE600] text-black font-extrabold text-[14px] flex items-center justify-center gap-2"
            >
              <Camera className="w-4 h-4" /> Take photo
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => uploadInputRef.current?.click()} className="py-2.5 rounded-lg bg-white/10 text-[11px] font-semibold flex items-center justify-center gap-1.5">
                <Upload className="w-3.5 h-3.5" /> Upload image
              </button>
              <button onClick={() => onCapture({})} className="py-2.5 rounded-lg bg-white/10 text-[11px] font-semibold">
                Text only
              </button>
            </div>
            <button onClick={onUseDemo} className="w-full py-2 text-[10px] text-neutral-400 underline underline-offset-2">
              Open deterministic Demo Mode
            </button>
          </>
        )}
      </div>
    </div>
  );
};
