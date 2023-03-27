import { Node } from "./linkedNode";

class LinkedList {
  constructor(private isEqual: (a: any, b: any) => boolean = isEqualFn) {
    this.count = 0;
  }
  /**
   * 保存元素数量
   */
  private count: number;
  /**
   * 保存链表中第一个元素
   */
  private head?: Node;

  public push(element: any) {}
}

function isEqualFn(a: any, b: any): boolean {
  return a === b;
}
