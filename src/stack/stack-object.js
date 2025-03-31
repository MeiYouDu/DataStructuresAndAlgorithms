//TODO 可以使用symbol或者weakmap来实现私有变量。
class Stack {
  constructor() {
    this.count = 0;
    this.items = {};
  }
  push(el) {
    this.items[this.count++] = el;
    return this.count;
  }
  pop() {
    const el = this.items[this.count]
    delete this.items[this.count--];
    return el;
  }
  peek() {
    return this.items(this.count - 1);
  }
  isEmpty() {
    return this.count === 0;
  }
  size() {
    return this.count;
  }
  clear() {
    this.count = 0;
    return this.items = {};
  }
}
