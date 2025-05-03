import React, { useRef, useState } from 'react';
import { RiPauseCircleLine, RiPlayCircleLine, RiCameraLine, RiFullscreenLine, RiAlertLine } from 'react-icons/ri';

// Mock data pour les détections en temps réel
const mockDetections = [
  { label: 'Câble détecté', time: '16:00:12', type: 'normal' },
  { label: 'Pince vide', time: '16:01:05', type: 'warning' },
  { label: 'Erreur placement', time: '16:02:33', type: 'anomaly' },
];

export default function Cameras() {
  // Pour l'intégration backend, remplacer ce src par l'URL du flux vidéo (WebRTC/MJPEG)
  const VIDEO_STREAM_SRC = 'http://localhost:8000/video'; // À adapter
  const [paused, setPaused] = useState(false);
  const [detections, setDetections] = useState(mockDetections);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLImageElement>(null);

  // Gestion du plein écran
  const handleFullscreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Capture d'écran (pour MJPEG, on peut capturer l'image affichée)
  const handleScreenshot = () => {
    if (videoRef.current) {
      const img = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const url = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = url;
        a.download = `screenshot_${Date.now()}.png`;
        a.click();
      }
    }
  };

  // Pause/Reprendre le flux (pour MJPEG, on peut cacher/afficher l'image)
  const handlePause = () => setPaused(true);
  const handleResume = () => setPaused(false);

  // TODO: Remplacer mockDetections par des données WebSocket/Server-Sent Events depuis le backend Python

  // Détection d'anomalie (ex : type === 'anomaly')
  const hasAnomaly = detections.some((d) => d.type === 'anomaly');

  return (
    <div className="min-h-screen bg-[#151C2C] dark:bg-white text-white dark:text-gray-900 font-sans transition-colors duration-300 flex flex-col md:flex-row gap-8 p-4 md:p-8">
      {/* Carte vidéo centrale */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div
          className={`relative w-full max-w-3xl mx-auto rounded-3xl shadow-xl bg-[#1E2A3B] dark:bg-gray-100 border-4 transition-all duration-300 ${hasAnomaly ? 'border-red-500 animate-pulse' : 'border-transparent'}`}
        >
          {/* Titre et contrôles */}
          <div className="flex items-center justify-between px-6 pt-6 pb-2">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-white dark:text-gray-900">
              <span role="img" aria-label="camera">📷</span> Surveillance en direct
              {hasAnomaly && (
                <span className="ml-2 flex items-center gap-1 text-red-500 animate-pulse">
                  <RiAlertLine className="w-5 h-5" /> Anomalie détectée
                </span>
              )}
            </h2>
            <div className="flex items-center gap-2">
              {paused ? (
                <button onClick={handleResume} className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow transition-colors" title="Reprendre">
                  <RiPlayCircleLine size={28} />
                </button>
              ) : (
                <button onClick={handlePause} className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow transition-colors" title="Pause">
                  <RiPauseCircleLine size={28} />
                </button>
              )}
              <button onClick={handleScreenshot} className="p-2 rounded-full bg-green-500 hover:bg-green-600 text-white shadow transition-colors" title="Capture d'écran">
                <RiCameraLine size={24} />
              </button>
              <button onClick={handleFullscreen} className="p-2 rounded-full bg-gray-500 hover:bg-gray-600 text-white shadow transition-colors" title="Plein écran">
                <RiFullscreenLine size={24} />
              </button>
            </div>
          </div>
          {/* Flux vidéo (image MJPEG ou balise vidéo pour WebRTC) */}
          <div className="flex items-center justify-center w-full h-[360px] md:h-[480px] bg-black rounded-b-3xl overflow-hidden">
            {!paused ? (
              <img
                ref={videoRef}
                src={VIDEO_STREAM_SRC}
                alt="Flux vidéo en direct"
                className="object-contain w-full h-full"
                draggable={false}
              />
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full text-gray-400">
                <RiPauseCircleLine size={64} />
                <span className="mt-2">Flux en pause</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Section détections */}
      <div className="w-full md:w-96 flex-shrink-0">
        <div className="bg-[#1E2A3B] dark:bg-gray-100 rounded-3xl shadow-xl p-6 border border-[#232C47] dark:border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-white dark:text-gray-900 flex items-center gap-2">
            <RiAlertLine className="text-yellow-400 dark:text-yellow-500" /> Détections en temps réel
          </h3>
          <div className="overflow-y-auto max-h-96">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left text-gray-400 dark:text-gray-600 font-medium pb-2">Événement</th>
                  <th className="text-left text-gray-400 dark:text-gray-600 font-medium pb-2">Heure</th>
                </tr>
              </thead>
              <tbody>
                {detections.map((d, idx) => (
                  <tr key={idx} className={
                    d.type === 'anomaly'
                      ? 'bg-red-100 dark:bg-red-200 text-red-700'
                      : d.type === 'warning'
                        ? 'bg-yellow-100 dark:bg-yellow-200 text-yellow-700'
                        : 'text-white dark:text-gray-900'
                  }>
                    <td className="py-2 pr-4 flex items-center gap-2">
                      {d.type === 'anomaly' && <RiAlertLine className="text-red-500" />}
                      {d.label}
                    </td>
                    <td className="py-2 pr-4">{d.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 