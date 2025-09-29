// API service with caching for Sports League data

class ApiService {
  constructor() {
    this.cache = new Map();
    this.baseUrl = 'https://www.thesportsdb.com/api/v1/json/3';
  }

  async fetchWithCache(url, cacheKey) {
    // Check if data is already cached
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Cache the result
      this.cache.set(cacheKey, data);
      
      return data;
    } catch (error) {
      console.error('API fetch error:', error);
      throw error;
    }
  }

  async getAllLeagues() {
    const url = `${this.baseUrl}/all_leagues.php`;
    const cacheKey = 'all_leagues';
    
    const data = await this.fetchWithCache(url, cacheKey);
    return data.leagues || [];
  }

  async getSeasonBadge(leagueId) {
    const url = `${this.baseUrl}/search_all_seasons.php?badge=1&id=${leagueId}`;
    const cacheKey = `season_badge_${leagueId}`;
    
    const data = await this.fetchWithCache(url, cacheKey);
    
    // Return the first season's badge if available
    if (data.seasons && data.seasons.length > 0) {
      return data.seasons[0].strBadge;
    }
    
    return null;
  }

  // Method to clear cache if needed
  clearCache() {
    this.cache.clear();
  }

  // Method to get cache size for debugging
  getCacheSize() {
    return this.cache.size;
  }
}

// Export a singleton instance
export const apiService = new ApiService();
