import * as React from 'react';
import { useTranslation } from 'react-i18next';

interface Camera {
  id: number;
  name: string;
  status: 'online' | 'offline';
  preview: string;
}

const dummyCameras: Camera[] = [
  {
    id: 1,
    name: 'Camera 1',
    status: 'online',
    preview: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100%25" height="100%25" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23f0f0f0"/%3E%3C/svg%3E'
  },
  {
    id: 2,
    name: 'Camera 2',
    status: 'online',
    preview: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100%25" height="100%25" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23f0f0f0"/%3E%3C/svg%3E'
  },
  {
    id: 3,
    name: 'Camera 3',
    status: 'offline',
    preview: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100%25" height="100%25" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23f0f0f0"/%3E%3C/svg%3E'
  },
  {
    id: 4,
    name: 'Camera 4',
    status: 'online',
    preview: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100%25" height="100%25" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23f0f0f0"/%3E%3C/svg%3E'
  }
];

export const CameraView = () => {
  const { t } = useTranslation();
  const [selectedCamera, setSelectedCamera] = React.useState<Camera | null>(null);

  return (
    <div className="col-span-2 row-span-2 rounded-xl border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{t('camera.title')}</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {dummyCameras.filter(c => c.status === 'online').length} {t('camera.online')}
          </span>
          <span className="h-4 w-px bg-border" />
          <button className="rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary hover:bg-primary/20">
            {t('camera.viewAll')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {dummyCameras.map((camera) => (
          <button
            key={camera.id}
            className={`group relative aspect-video overflow-hidden rounded-lg border ${
              selectedCamera?.id === camera.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedCamera(camera)}
          >
            <img
              src={camera.preview}
              alt={camera.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 transition-opacity group-hover:opacity-100">
              <p className="text-sm font-medium text-white">{camera.name}</p>
              <p className="text-xs text-white/80">
                {camera.status === 'online' ? t('camera.statusOnline') : t('camera.statusOffline')}
              </p>
            </div>
            {camera.status === 'offline' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <p className="rounded-full bg-red-500/20 px-3 py-1 text-sm font-medium text-red-500">
                  {t('camera.offline')}
                </p>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}; 