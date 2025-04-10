class Dictionary<K, V> {
  private items: Map<K, V>;

  constructor() {
    this.items = new Map<K, V>();
  }

  // Add a key-value pair
  set(key: K, value: V): void {
    this.items.set(key, value);
  }

  // Get the value by key
  get(key: K): V | undefined {
    return this.items.get(key);
  }

  // Check if the dictionary contains a key
  has(key: K): boolean {
    return this.items.has(key);
  }

  // Remove a key-value pair
  delete(key: K): boolean {
    return this.items.delete(key);
  }

  // Get the size of the dictionary
  size(): number {
    return this.items.size;
  }

  // Clear all key-value pairs
  clear(): void {
    this.items.clear();
  }

  // Get all keys
  keys(): K[] {
    return Array.from(this.items.keys());
  }

  // Get all values
  values(): V[] {
    return Array.from(this.items.values());
  }
}

export default Dictionary;
