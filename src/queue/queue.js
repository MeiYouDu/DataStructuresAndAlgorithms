// comply FIFO
// 只能从队列末尾增加且只能从队列头部移除
class Queue {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }
  enqueue(el) {
    this.items[this.count++] = el;
  }
  dequeue() {
    const el = this.items[this.lowestCount];
    delete this.items[this.lowestCount++];
    return el;
  }
  peek() {
    return this.items[this.lowestCount];
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

const queue = new Queue();

queue.enqueue("yqm");
queue.enqueue("wy");

console.log(queue.toString());