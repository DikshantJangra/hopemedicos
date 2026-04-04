// Rate limiter for tracking API usage per provider

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private limits: Map<string, RateLimitEntry> = new Map();

  canMakeRequest(providerName: string, maxRequests: number, windowMs: number): boolean {
    const now = Date.now();
    const entry = this.limits.get(providerName);

    if (!entry || now > entry.resetTime) {
      // Reset or initialize
      this.limits.set(providerName, {
        count: 1,
        resetTime: now + windowMs,
      });
      return true;
    }

    if (entry.count < maxRequests) {
      entry.count++;
      return true;
    }

    return false;
  }

  recordRequest(providerName: string, windowMs: number): void {
    const now = Date.now();
    const entry = this.limits.get(providerName);

    if (!entry || now > entry.resetTime) {
      this.limits.set(providerName, {
        count: 1,
        resetTime: now + windowMs,
      });
    } else {
      entry.count++;
    }
  }

  getRemainingRequests(providerName: string, maxRequests: number): number {
    const entry = this.limits.get(providerName);
    if (!entry || Date.now() > entry.resetTime) {
      return maxRequests;
    }
    return Math.max(0, maxRequests - entry.count);
  }

  getResetTime(providerName: string): number | null {
    const entry = this.limits.get(providerName);
    if (!entry || Date.now() > entry.resetTime) {
      return null;
    }
    return entry.resetTime;
  }

  reset(providerName?: string): void {
    if (providerName) {
      this.limits.delete(providerName);
    } else {
      this.limits.clear();
    }
  }
}

export const rateLimiter = new RateLimiter();
