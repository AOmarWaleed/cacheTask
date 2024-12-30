import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  
  private cache = new Map<string, any>();

  constructor() { }

  // Get data from in-memory cache (Map) or fall back to localStorage
  getCachedData(key: string): any {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    const cachedData = localStorage.getItem(key);
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      this.cache.set(key, parsedData); 
      return parsedData;
    }

    return null;
  }

  setCachedData(key: string, data: any): void {
    this.cache.set(key, data);
    localStorage.setItem(key, JSON.stringify(data));
  }

  // When updating on data , u should manually use this 
  removeCachedData(key: string): void {
    this.cache.delete(key);
    localStorage.removeItem(key);
  }
}
