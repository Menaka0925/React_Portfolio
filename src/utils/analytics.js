// Replace this with your SEPARATE Google Sheet Script URL for Analytics
const ANALYTICS_URL = "https://script.google.com/macros/s/AKfycbymJs67O4Z_3dJOyvXHUjbbKL-9NtOnUKjADZuM9reTH0IXz89L_IqD3l4AG2tiXgGe/exec"; 

/**
 * Utility to track user interactions in the portfolio.
 * @param {string} action - The event name (e.g., 'PAGE_VISIT', 'RESUME_VIEW', 'RESUME_DOWNLOAD')
 * @param {string} label - Additional details (e.g., 'Resume' or 'CV')
 */
export const trackEvent = async (action, label = "") => {
  try {
    // Fetch the visitor's IP address
    let visitorIp = "Unknown";
    try {
      const ipResponse = await fetch("https://api.ipify.org?format=json");
      const ipData = await ipResponse.json();
      // Mask the last part of the IP for privacy (e.g., 122.161.45.89 -> 122.161.45.xxx)
      visitorIp = ipData.ip.split('.').slice(0, 3).join('.') + '.xxx';
    } catch (e) {
      console.warn("IP lookup skipped.");
    }

    const data = {
      timestamp: new Date().toLocaleString(),
      action: action,
      label: label,
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      ip: visitorIp, // Add the IP here
      isTracking: true 
    };

    if (!ANALYTICS_URL) return;

    await fetch(ANALYTICS_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: new Blob([JSON.stringify(data)], { type: 'text/plain' })
    });
  } catch (error) {
    // Silent fail to not interrupt user experience
    console.warn("Analytics Sync skipped.");
  }
};
