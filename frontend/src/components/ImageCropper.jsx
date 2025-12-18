import React, { useState, useRef } from "react";

function ImageCropper({ imageUrl, onCrop, onCancel }) {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const [crop, setCrop] = useState({ x: 0, y: 0, width: 300, height: 300 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [preview, setPreview] = useState(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - crop.x,
      y: e.clientY - crop.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const newX = Math.max(
      0,
      Math.min(e.clientX - rect.left - dragStart.x, rect.width - crop.width)
    );
    const newY = Math.max(
      0,
      Math.min(e.clientY - rect.top - dragStart.y, rect.height - crop.height)
    );

    setCrop((prev) => ({
      ...prev,
      x: newX,
      y: newY,
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const generatePreview = () => {
    const img = imgRef.current;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Calculate the scaling factor
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;

    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;

    ctx.drawImage(
      img,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    canvas.toBlob((blob) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  };

  const handleCrop = () => {
    const img = imgRef.current;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Calculate the scaling factor
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;

    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;

    ctx.drawImage(
      img,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    canvas.toBlob((blob) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        onCrop(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-3xl w-full my-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">✂️ Crop Your Image</h2>
        <p className="text-gray-600 mb-6">
          Drag to adjust the crop area. Choose a preset or set custom size.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Crop Canvas */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">Edit</p>
            <div
              ref={canvasRef}
              className="relative bg-gray-200 rounded-lg overflow-hidden cursor-move border-2 border-gray-300"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{ width: "100%", height: "350px" }}
            >
              <img
                ref={imgRef}
                src={imageUrl}
                alt="Crop preview"
                className="absolute w-full h-full object-cover"
                draggable={false}
              />

              {/* Crop Rectangle */}
              <div
                className="absolute border-4 border-blue-500 bg-transparent cursor-move"
                style={{
                  left: `${crop.x}px`,
                  top: `${crop.y}px`,
                  width: `${crop.width}px`,
                  height: `${crop.height}px`,
                  boxShadow: `0 0 0 9999px rgba(0, 0, 0, 0.5)`,
                }}
              >
                {/* Corner handles */}
                <div
                  className="absolute w-4 h-4 bg-blue-500 rounded-full shadow-lg"
                  style={{ top: "-8px", left: "-8px", cursor: "nwse-resize" }}
                />
                <div
                  className="absolute w-4 h-4 bg-blue-500 rounded-full shadow-lg"
                  style={{ top: "-8px", right: "-8px", cursor: "nesw-resize" }}
                />
                <div
                  className="absolute w-4 h-4 bg-blue-500 rounded-full shadow-lg"
                  style={{ bottom: "-8px", left: "-8px", cursor: "nesw-resize" }}
                />
                <div
                  className="absolute w-4 h-4 bg-blue-500 rounded-full shadow-lg"
                  style={{ bottom: "-8px", right: "-8px", cursor: "nwse-resize" }}
                />
              </div>
            </div>

            {/* Crop Info */}
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700 font-semibold">
                Size: {Math.round(crop.width)} × {Math.round(crop.height)} px
              </p>
            </div>
          </div>

          {/* Right: Preview & Options */}
          <div>
            {/* Preview */}
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">Preview</p>
              <div className="bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-300 flex items-center justify-center"
                   style={{ width: "100%", height: "200px" }}>
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400 text-center">
                    <p>Click "Update Preview" to see result</p>
                  </div>
                )}
              </div>
              <button
                onClick={generatePreview}
                className="w-full mt-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-all duration-300"
              >
                👁️ Update Preview
              </button>
            </div>

            {/* Presets */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                📐 Quick Presets:
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setCrop({ x: 0, y: 0, width: 300, height: 300 })}
                  className="px-3 py-3 bg-green-100 hover:bg-green-200 text-green-800 font-semibold rounded-lg transition text-sm"
                >
                  Square (300x300)
                </button>
                <button
                  onClick={() => setCrop({ x: 0, y: 0, width: 250, height: 250 })}
                  className="px-3 py-3 bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold rounded-lg transition text-sm"
                >
                  Small (250x250)
                </button>
                <button
                  onClick={() => setCrop({ x: 0, y: 0, width: 400, height: 300 })}
                  className="px-3 py-3 bg-purple-100 hover:bg-purple-200 text-purple-800 font-semibold rounded-lg transition text-sm"
                >
                  Wide (400x300)
                </button>
                <button
                  onClick={() => setCrop({ x: 0, y: 0, width: 500, height: 300 })}
                  className="px-3 py-3 bg-orange-100 hover:bg-orange-200 text-orange-800 font-semibold rounded-lg transition text-sm"
                >
                  Large (500x300)
                </button>
              </div>
            </div>

            {/* Manual Size */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                📏 Custom Size:
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Width (px)
                  </label>
                  <input
                    type="number"
                    value={Math.round(crop.width)}
                    onChange={(e) =>
                      setCrop((prev) => ({
                        ...prev,
                        width: Math.max(50, parseInt(e.target.value) || 0),
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Height (px)
                  </label>
                  <input
                    type="number"
                    value={Math.round(crop.height)}
                    onChange={(e) =>
                      setCrop((prev) => ({
                        ...prev,
                        height: Math.max(50, parseInt(e.target.value) || 0),
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-8 sticky bottom-0 bg-white pt-4">
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded-lg transition-all duration-300 text-lg"
          >
            ✖️ Cancel
          </button>
          <button
            onClick={handleCrop}
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg text-lg"
          >
            ✅ Save & Crop
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageCropper;
