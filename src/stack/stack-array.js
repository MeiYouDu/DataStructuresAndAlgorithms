// comply LIFO
// 只允许从栈的顶端添加和删除
class Stack {
  constructor() {
    this.items = [];
  }
  push(...el) {
    return this.items.push(...el);
  }
  pop() {
    return this.items.pop()
  }
  peek() {
    return this.items(this.items.length - 1);
  }
  isEmpty() {
    return this.items.length === 0;
  }
  size() {
    return this.items.length;
  }
  clear() {
    return this.items = [];
  }
}

const stack = new Stack();

console.log(stack.isEmpty());