// comply LIFO & FIFO
// 可以从头部添加和移除，也可以从尾部添加和移除
class Deque {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }
  addFront(el) {
    if (this.isEmpty()) { // {1}
      this.addBack(element);
    } else if (this.lowestCount > 0) { // {2}
      this.lowestCount--;
      this.items[this.lowestCount] = element;
    } else {
      for (let i = this.count; i > 0; i--) { // {3}
        this.items[i] = this.items[i - 1];
      }
      this.count++;
      this.lowestCount = 0;
      this.items[0] = element; // {4}
    }
  }
  removeFront() {
    const el = this.items[this.lowestCount];
    delete this.items[this.lowestCount++];
    return el;
  }
  addBack(el) {
    this.items[this.count++] = el;
  }
  removeBack() {
    const el = this.items[this.count]
    delete this.items[this.count--];
    return el;
  }
  peekFront() {
    return this.items[this.lowestCount];
  }
  peekBack() {
    return this.items[this.count - 1];
  }
  isEmpty() {
    return this.size() === 0;
  }
  size() {
    return this.count - this.lowestCount;
  }
  clear() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }
  toString() {
    if (this.isEmpty()) return;
    let str = this.items[this.lowestCount];
    for (let i = this.lowestCount + 1, u = this.size(); i < u; i++) {
      str = `${str},${this.items[i]}`;
    }
    return str;
  }
}
