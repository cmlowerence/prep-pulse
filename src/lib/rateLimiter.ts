const trackers = new Map<string, number[]>();

export function rateLimit(identifier: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const timestamps = trackers.get(identifier) || [];
  
  // Filter out old timestamps
  const validTimestamps = timestamps.filter(t => now - t < windowMs);
  
  if (validTimestamps.length >= limit) {
    return false;
  }
  
  validTimestamps.push(now);
  trackers.set(identifier, validTimestamps);
  return true;
}
