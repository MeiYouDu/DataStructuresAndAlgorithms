import { Node } from "./linkedNode.ts";

function isEqualFn<T>(a: T, b: T): boolean {
  return a === b;
}
class LinkedList<T> {
  constructor(private isEqual: (a: T, b: T) => boolean = isEqualFn<T>) {
    this.count = 0;
  }
  /**
   * 保存元素数量
   */
  private count: number;
  /**
   * 保存链表中第一个元素
   */
  private head?: Node<T>;

  /**
   * 在链表尾部增加一个元素
   * @param element
   */
  public push(element: T) {
    let node = new Node(element);
    let currentNode: Node<T> | undefined;
    // distinguish between two case (this.count equal to zero or this.count greater than zero)
    // if this.count equal to zero, just assign this.head to a Node
    if (this.count === 0 && this.head === undefined) {
      this.head = node;
      // else this.count greater than zero, should find the last Node and assign Node.next to a new Node
    } else {
      currentNode = this.head;
      while (currentNode?.next !== undefined) {
        currentNode = currentNode.next;
      }
      if (currentNode !== undefined) {
        currentNode.next = node;
      }
    }
    this.count++;
  }

  /**
   * 向链表指定位置插入一个元素
   * @param element 元素
   * @param position 位置
   */
  public insert(element: T, position: number): boolean {
    if (position >= 0 && position <= this.count) {
      const newNode = new Node(element);
      let last: Node<T> | undefined;
      if (position === 0) {
        last = this.head;
        newNode.next = last;
        this.head = newNode;
      } else {
        last = this.getElementAt(position - 1);
        if (last) {
          newNode.next = last?.next;
          last.next = newNode;
        }
      }
      this.count++;
      return true;
    }
    return false;
  }

  /**
   * 返回特定位置的元素，如果该位置没有元素则返回undefined
   * @param position 位置
   */
  getElementAt(position: number): Node<T> | undefined {
    if (position >= 0 && position <= this.count) {
      let i = 0;
      let current = this.head;
      while (i < position && current !== undefined) {
        current = current?.next;
        i++;
      }
      return current;
    }
  }

  /**
   * 删除指定位置的元素
   * @param position 位置
   * @returns 如果删除成功返回被删除的节点
   */
  public removeAt(position: number): Node<T> | undefined {
    if (position >= 0 && position < this.count) {
      let current;
      if (position === 0) {
        current = this.head;
        this.head = this.head?.next;
      } else {
        const previous = this.getElementAt(position - 1);
        if (!previous) return;
        current = previous.next;
        previous.next = current?.next;
      }
      this.count--;
      return current;
    }
  }

  /**
   * 返回指定元素的位置，如果没有该元素则返回-1，至于如何判断两个元素是否相等，可以自定义
   * @param element 位置
   */
  public indexOf(element: T): number {
    let current = this.head;
    let i = 0;
    while (i < this.count) {
      if (!current) return -1;
      if (this.isEqual(current.element, element)) {
        return i;
      }
      current = current?.next;
      i++;
    }
    return -1;
  }

  /**
   * 删除指定元素，并返回被删除元素位置
   * @param element 元素
   */
  public remove(element: T): number {
    let position: number = this.indexOf(element);
    this.removeAt(position);
    return position;
  }

  /**
   * 返回元素总数
   */
  size(): number {
    return this.count;
  }

  isEmpty(): boolean {
    return this.count === 0;
  }

  toString(hyphen: string = ","): string {
    let current = this.head;
    let str = "";
    let i = 0;
    while (i < this.count) {
      i === this.count - 1 ? (hyphen = "") : undefined;
      str += current?.element + hyphen;
      current = current?.next;
      i++;
    }
    return str;
  }

  find(fn: (node: Node<T>) => boolean): Node<T> | undefined {
    let current = this.head;
    while (current) {
      if (fn(current)) {
        return current;
      }
      current = current.next;
    }
    return undefined;
  }
}

export { LinkedList };
