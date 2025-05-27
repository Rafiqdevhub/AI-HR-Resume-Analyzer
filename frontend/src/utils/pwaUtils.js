// PWA utilities for handling offline mode and installation
let deferredPrompt;

export const checkOnlineStatus = () => {
  return navigator.onLine;
};

export const setupPWAListeners = () => {
  // Listen for online/offline events
  window.addEventListener("online", handleOnlineStatusChange);
  window.addEventListener("offline", handleOnlineStatusChange);

  // Listen for PWA install prompt
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
  });
};

export const handleOnlineStatusChange = () => {
  const isOnline = checkOnlineStatus();
  // You can implement your own status change handling here
  console.log(`App is ${isOnline ? "online" : "offline"}`);
};

export const installPWA = async () => {
  if (!deferredPrompt) {
    return false;
  }

  try {
    const result = await deferredPrompt.prompt();
    console.log(`Install prompt result: ${result.outcome}`);
    deferredPrompt = null;
    return true;
  } catch (error) {
    console.error("Error installing PWA:", error);
    return false;
  }
};

export const isPWAInstallable = () => {
  return !!deferredPrompt;
};

export const clearPWAPrompt = () => {
  deferredPrompt = null;
};
