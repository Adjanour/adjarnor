import React, { useState, useEffect, useRef } from "react";
import { Plus, Pen, Type, Move } from "lucide-react";

interface Signature {
  id: string;
  name: string;
  initials?: string;
  message: string;
  signatureData?: string; // base64 canvas data
  signatureType: "text" | "drawn";
  color: string;
  position: { x: number; y: number };
  rotation: number;
  size: "small" | "medium" | "large";
  timestamp: Date;
}

const SignatureWall = () => {
  const [signatures, setSignatures] = useState<Signature[]>([
    {
      id: "1",
      name: "Sarah Chen",
      initials: "SC",
      message: "Absolutely stunning portfolio!",
      signatureType: "text",
      color: "bg-gray-100 text-gray-800 border-gray-300",
      position: { x: 15, y: 20 },
      rotation: -2,
      size: "medium",
      timestamp: new Date(),
    },
    {
      id: "2",
      name: "Alex Kumar",
      initials: "AK",
      message: "Clean design, love the animations!",
      signatureType: "text",
      color: "bg-gray-50 text-gray-700 border-gray-200",
      position: { x: 60, y: 10 },
      rotation: 3,
      size: "large",
      timestamp: new Date(),
    },
    {
      id: "3",
      name: "Maria",
      initials: "M",
      message: "Inspiring work",
      signatureType: "text",
      color: "bg-white text-gray-800 border-gray-300",
      position: { x: 25, y: 60 },
      rotation: -1,
      size: "small",
      timestamp: new Date(),
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newSignature, setNewSignature] = useState({
    name: "",
    initials: "",
    message: "",
  });
  const [signatureType, setSignatureType] = useState<"text" | "drawn">("text");
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signatureCanvas, setSignatureCanvas] = useState<string | null>(null);

  const colors = [
    "bg-white text-gray-800 border-gray-300",
    "bg-gray-50 text-gray-700 border-gray-200",
    "bg-gray-100 text-gray-800 border-gray-300",
    "bg-gray-200 text-gray-900 border-gray-400",
    "bg-gray-300 text-gray-900 border-gray-500",
  ];

  const sizes = ["small", "medium", "large"] as const;

  const generateInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRandomPosition = () => ({
    x: Math.random() * 70 + 10, // 10-80% from left
    y: Math.random() * 60 + 15, // 15-75% from top
  });

  // Signature Canvas Functions
  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000";

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing && canvasRef.current) {
      setSignatureCanvas(canvasRef.current.toDataURL());
    }
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureCanvas(null);
  };

  // Drag Functions
  const handleMouseDown = (e: React.MouseEvent, signatureId: string) => {
    if (e.target === e.currentTarget) {
      setDraggedItem(signatureId);
      const rect = e.currentTarget.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedItem) return;

    const container = e.currentTarget.getBoundingClientRect();
    const newX =
      ((e.clientX - dragOffset.x - container.left) / container.width) * 100;
    const newY =
      ((e.clientY - dragOffset.y - container.top) / container.height) * 100;

    // Constrain to container bounds
    const constrainedX = Math.max(0, Math.min(85, newX));
    const constrainedY = Math.max(0, Math.min(85, newY));

    setSignatures((prev) =>
      prev.map((sig) =>
        sig.id === draggedItem
          ? { ...sig, position: { x: constrainedX, y: constrainedY } }
          : sig
      )
    );
  };

  const handleMouseUp = () => {
    setDraggedItem(null);
    setDragOffset({ x: 0, y: 0 });
  };

  const handleAddSignature = () => {
    if (
      newSignature.name.trim() &&
      newSignature.message.trim() &&
      (signatureType === "text" ||
        (signatureType === "drawn" && signatureCanvas))
    ) {
      const signature: Signature = {
        id: Date.now().toString(),
        name: newSignature.name,
        initials:
          signatureType === "text"
            ? newSignature.initials.trim() ||
              generateInitials(newSignature.name)
            : undefined,
        message: newSignature.message,
        signatureData: signatureType === "drawn" ? signatureCanvas : undefined,
        signatureType,
        color: colors[Math.floor(Math.random() * colors.length)],
        position: getRandomPosition(),
        rotation: Math.random() * 8 - 4,
        size: sizes[Math.floor(Math.random() * sizes.length)],
        timestamp: new Date(),
      };

      setSignatures([...signatures, signature]);
      setNewSignature({ name: "", initials: "", message: "" });
      setSignatureCanvas(null);
      setSignatureType("text");
      setShowAddForm(false);
      clearSignature();
    }
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case "small":
        return "px-3 py-2 text-xs max-w-36";
      case "large":
        return "px-4 py-3 text-sm max-w-56";
      default:
        return "px-3 py-2.5 text-xs max-w-44";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50 relative overflow-hidden">
      {/* Header */}
      <div className="relative z-10 text-center pt-12 pb-8">
        <div className="inline-flex items-center gap-2 mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Signature Wall</h1>
        </div>
        <p className="text-gray-600 text-sm">
          Leave your mark on our digital wall
        </p>
      </div>

      {/* Signature Wall */}
      <div
        className="relative h-[600px] w-full max-w-6xl mx-auto px-4"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {signatures.map((signature, index) => (
          <div
            key={signature.id}
            className={`absolute ${signature.color} ${getSizeClasses(
              signature.size
            )} rounded-lg border-2 shadow-lg cursor-move transition-all duration-300 hover:scale-110 hover:shadow-xl hover:z-20 select-none`}
            style={{
              left: `${signature.position.x}%`,
              top: `${signature.position.y}%`,
              transform: `rotate(${signature.rotation}deg)`,
              animationDelay: `${index * 100}ms`,
              animation: "fadeInScale 0.6s ease-out forwards",
              zIndex: draggedItem === signature.id ? 30 : "auto",
            }}
            onMouseDown={(e) => handleMouseDown(e, signature.id)}
          >
            <div className="flex items-center gap-3 mb-2">
              {signature.signatureType === "text" ? (
                <div className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center text-xs font-bold">
                  {signature.initials}
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                  <Pen className="w-4 h-4 text-white" />
                </div>
              )}
              <div className="font-medium text-xs">~ {signature.name}</div>
            </div>
            <div className="leading-tight break-words">{signature.message}</div>

            {signature.signatureData && (
              <div className="mt-2">
                <img
                  src={signature.signatureData}
                  alt="Signature"
                  className="max-w-full h-auto opacity-80"
                />
              </div>
            )}

            {/* Decorative corner */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gray-800 rounded-full opacity-20"></div>

            {/* Drag indicator */}
            <Move className="absolute top-1 left-1 w-3 h-3 text-gray-400 opacity-50" />
          </div>
        ))}

        {/* Add Signature Button */}
        <button
          onClick={() => setShowAddForm(true)}
          className="fixed bottom-8 right-8 w-14 h-14 bg-gray-900 text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center group z-30"
        >
          <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>

      {/* Add Signature Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform animate-in slide-in-from-bottom-4 duration-300 border border-gray-200">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                <div className="text-lg font-bold">✍</div>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Sign the Wall</h3>
              <p className="text-gray-500 text-sm">
                Share your thoughts with the world
              </p>
            </div>

            {/* Signature Type Toggle */}
            <div className="flex mb-4 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setSignatureType("text")}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                  signatureType === "text"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Type className="w-4 h-4" />
                Text
              </button>
              <button
                onClick={() => setSignatureType("drawn")}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                  signatureType === "drawn"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Pen className="w-4 h-4" />
                Draw
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your name"
                  value={newSignature.name}
                  onChange={(e) =>
                    setNewSignature({ ...newSignature, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-900 focus:ring-0 outline-none transition-colors duration-200"
                  maxLength={20}
                />
              </div>

              {signatureType === "text" && (
                <div>
                  <input
                    type="text"
                    placeholder="Your initials (optional - will auto-generate)"
                    value={newSignature.initials}
                    onChange={(e) =>
                      setNewSignature({
                        ...newSignature,
                        initials: e.target.value.slice(0, 2),
                      })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-900 focus:ring-0 outline-none transition-colors duration-200"
                    maxLength={2}
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Max 2 characters (e.g., JS, MK, A)
                  </p>
                </div>
              )}

              {signatureType === "drawn" && (
                <div>
                  <div className="border-2 border-gray-200 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-3">
                      Draw your signature below:
                    </p>
                    <canvas
                      ref={canvasRef}
                      width={300}
                      height={120}
                      className="border border-gray-300 rounded-lg w-full cursor-crosshair bg-white"
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                    />
                    <button
                      type="button"
                      onClick={clearSignature}
                      className="mt-2 text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
                    >
                      Clear signature
                    </button>
                  </div>
                </div>
              )}

              <div>
                <textarea
                  placeholder="Your message to the world..."
                  value={newSignature.message}
                  onChange={(e) =>
                    setNewSignature({
                      ...newSignature,
                      message: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-900 focus:ring-0 outline-none transition-colors duration-200 resize-none h-24"
                  maxLength={60}
                />
                <p className="text-xs text-gray-400 mt-1">
                  {newSignature.message.length}/60 characters
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    clearSignature();
                    setSignatureCanvas(null);
                    setSignatureType("text");
                    setNewSignature({ name: "", initials: "", message: "" });
                  }}
                  className="flex-1 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSignature}
                  className="flex-1 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={
                    !newSignature.name.trim() ||
                    !newSignature.message.trim() ||
                    (signatureType === "drawn" && !signatureCanvas)
                  }
                >
                  Sign Wall
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8) rotate(0deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(var(--rotation, 0deg));
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default SignatureWall;
