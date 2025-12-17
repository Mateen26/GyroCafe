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

/**
 * Get API endpoint - uses proxy on Vercel, direct on other hosts
 * @param {string} endpoint - API endpoint path (e.g., 'generate-token', 'checkout')
 * @returns {string} Full API URL (proxy or direct)
 */
export function getApiEndpoint(endpoint) {
  // Remove leading slash if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  
  // Check if we're on Vercel
  const isVercel = typeof window !== 'undefined' && 
    window.location.origin === 'https://gyro-cafe.vercel.app';
  
  if (isVercel) {
    // Use Next.js API proxy routes on Vercel
    return `/api/payment/${cleanEndpoint}`;
  } else {
    // Use direct backend API on other hosts (Hostinger, etc.)
    const paymentUrl = process.env.NEXT_PUBLIC_payment_URL;
    if (!paymentUrl) {
      throw new Error('Payment service is not configured.');
    }
    return `${paymentUrl}/${cleanEndpoint}`;
  }
}

/**
 * Get API endpoint for orders endpoint (different path structure)
 * @param {string} endpoint - API endpoint path (e.g., 'api/orders')
 * @returns {string} Full API URL (proxy or direct)
 */
export function getOrdersApiEndpoint(endpoint = 'api/orders') {
  const isVercel = typeof window !== 'undefined' && 
    window.location.origin === 'https://gyro-cafe.vercel.app';
  
  if (isVercel) {
    return `/api/${endpoint}`;
  } else {
    const paymentUrl = process.env.NEXT_PUBLIC_payment_URL;
    if (!paymentUrl) {
      throw new Error('Payment service is not configured.');
    }
    return `${paymentUrl}/${endpoint}`;
  }
}

