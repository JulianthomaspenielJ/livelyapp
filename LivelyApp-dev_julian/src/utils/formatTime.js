// src/utils/formatTime.js
/**
 * Formats seconds into MM:SS format
 * @param {number} seconds - Number of seconds to format
 * @returns {string} - Time in MM:SS format
 */
export const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  /**
   * Formats duration in minutes to display format
   * @param {number} minutes - Number of minutes
   * @returns {string} - Formatted duration string
   */
  export const formatDuration = (minutes) => {
    if (isNaN(minutes) || minutes < 0) return '0 min';
    
    if (minutes < 60) {
      return `${minutes} min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      
      if (remainingMinutes === 0) {
        return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
      }
      
      return `${hours}h ${remainingMinutes}m`;
    }
  };