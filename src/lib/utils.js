/**
 * Utility functions for the application
 */

/**
 * Detects if the user is on a mobile device based on window width
 * @returns {boolean} True if mobile device (width < 768px), false otherwise
 */
export function isMobileDevice() {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}

/**
 * Hook-friendly mobile detection that updates on resize
 * Returns a function that can be called to check mobile status
 */
export function useIsMobile() {
  if (typeof window === "undefined") {
    return () => false;
  }
  
  // Return a function that checks current window width
  return () => window.innerWidth < 768;
}

