import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'evaluacion_2',
  webDir: 'www',
  plugins: {
    Camera: {
      permissions: ['camera', 'photos'],
    },
    Filesystem: {
      permissions: ['read', 'write'],
    },
    Geolocation: {
      permissions: ['location'],
    },
  },
  bundledWebRuntime: false,
  
};

export default config;
