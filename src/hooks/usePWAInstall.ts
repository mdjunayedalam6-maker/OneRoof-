import { useEffect, useState, useCallback } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

let globalDeferredPrompt: BeforeInstallPromptEvent | null = null;
const promptListeners = new Set<() => void>();

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e: Event) => {
    e.preventDefault();
    globalDeferredPrompt = e as BeforeInstallPromptEvent;
    promptListeners.forEach((fn) => fn());
  });

  window.addEventListener('appinstalled', () => {
    globalDeferredPrompt = null;
    promptListeners.forEach((fn) => fn());
  });
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(
    () => globalDeferredPrompt
  );
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detect standalone mode (already installed)
    let isStandalone = false;
    try {
      if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
        isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      }
      if (!isStandalone && typeof window !== 'undefined' && window.navigator) {
        isStandalone = (window.navigator as unknown as { standalone?: boolean }).standalone === true;
      }
    } catch (_) {}
    setIsInstalled(isStandalone);

    // Detect iOS devices
    let isIOSDevice = false;
    try {
      const userAgent = (window.navigator?.userAgent || '').toLowerCase();
      isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    } catch (_) {}
    setIsIOS(isIOSDevice);

    const updatePrompt = () => {
      setDeferredPrompt(globalDeferredPrompt);
    };

    promptListeners.add(updatePrompt);

    return () => {
      promptListeners.delete(updatePrompt);
    };
  }, []);

  const install = useCallback(async (): Promise<boolean> => {
    if (!globalDeferredPrompt) {
      return false;
    }
    try {
      await globalDeferredPrompt.prompt();
      const { outcome } = await globalDeferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
        globalDeferredPrompt = null;
        setDeferredPrompt(null);
        promptListeners.forEach((fn) => fn());
        return true;
      }
    } catch (err) {
      console.error('PWA prompt error:', err);
    }
    return false;
  }, []);

  return {
    isInstallable: !!deferredPrompt,
    isInstalled,
    isIOS,
    install,
  };
}
