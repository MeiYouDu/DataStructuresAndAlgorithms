/**
 * 比较结果
 */
const enum CompareResult {
  equal = 0,
  lessThan = -1,
  greaterThan = 1,
}
/**
 * 比较函数
 * @param a
 * @param b
 * @returns
 */
function compare(a: any, b: any): CompareResult {
  if (a === b) {
    return CompareResult.equal;
  } else if (a < b) {
    return CompareResult.lessThan;
  } else {
    return CompareResult.greaterThan;
  }
}

/**
 * 节点类
 */
class Node<T> {
  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
  public value: T;
  public left: Node<T> | null;
  public right: Node<T> | null;
}
/**
 * 二叉搜索树类
 */
class BinarySearchTree<T> {
  constructor(compare?: BinarySearchTree<T>["compare"]) {
    this.root = null;
    compare && (this.compare = compare);
  }
  /**
   * 根节点
   */
  private root: Node<T> | null;
  /**
   * search a value in tree, if exist return true else return false
   * 循环代替递归
   */
  public search(value: T): boolean {
    /**
     * 如果root不存在则直接返回false
     */
    if (!this.root) return false;
    else {
      const queue: Node<T>[] = [];
      queue.push(this.root);
      let item: undefined | Node<T>, res: CompareResult;
      while (queue.length > 0) {
        item = queue.shift();
        // 如果队列为空则表示所有节点都访问过了则跳出循环
        if (!item) break;
        res = this.compare(item.value, value);
        // 如果当前节点的值等于则返回true
        if (res === CompareResult.equal) return true;
        if (res === CompareResult.greaterThan) {
          if (item.left) queue.push(item.left);
        } else if (res === CompareResult.lessThan) {
          if (item.right) queue.push(item.right);
        }
      }
      // 循环结束仍一无所则返回false
      return false;
    }
  }

  /**
   * insert node helper
   */
  private insertNode(node: Node<T>, value: T) {
    // 比较当前节点和需要插入的值
    const res = this.compare(node.value, value);
    // 如果当前节点值大于插入值，则左侧插入, 如果左侧节点刚好为空，则直接赋值
    if (res === CompareResult.greaterThan) {
      if (node.left === null) {
        node.left = new Node(value);
      } else {
        this.insertNode(node.left, value);
      }
      // 如果当前节点值小于插入值，则右侧插入, 如果右侧节点刚好为空，则直接赋值
    } else if (res === CompareResult.lessThan) {
      if (node.right === null) {
        node.right = new Node(value);
      } else {
        this.insertNode(node.right, value);
      }
    }
  }
  /**
   * 循环版插入节点
   * @param node
   * @param value
   */
  private insertNodeLoop(node: Node<T>, value: T) {
    const queue: Node<T>[] = [];
    let item: undefined | Node<T>, res: CompareResult;
    queue.push(node);
    while (queue.length > 0) {
      item = queue.shift();
      if (!item) break;
      res = this.compare(item.value, value);
      if (res === CompareResult.greaterThan) {
        if (item.left === null) {
          item.left = new Node(value);
          break;
        } else {
          queue.push(item.left);
        }
      } else if (res === CompareResult.lessThan) {
        if (item.right === null) {
          item.right = new Node(value);
          break;
        } else {
          queue.push(item.right);
        }
      }
    }
  }
  /**
   * 比较函数
   */
  public compare: (a: T, b: T) => CompareResult = compare;
  /**
   * 插入值
   * @param value
   */
  public insert(value: T): BinarySearchTree<T> {
    // 如果当前树是空树，则直接将当前节点作为根节点
    if (this.root === null) {
      this.root = new Node(value);
    } else {
      this.insertNode(this.root, value);
    }
    return this;
  }
  public inOrderTraverse(cb: (node: Node<T>) => void) {
    if (!this.root) return;
    const stack: Node<T>[] = [];
    let node: Node<T> | null = this.root;
    while (stack.length > 0 || node) {
      while (node) {
        // 循环将left放入栈中
        stack.push(node);
        node = this.root.left;
      }
      // 取出left
      node = stack.pop()!;
      if (!node) continue;
      cb(node);
      // 转向right
      node = node.right;
    }
  }
  public preOrderTraverse(cb: (node: Node<T>) => void) {
    if (!this.root) return;
    const stack: Node<T>[] = [];
    let node: Node<T> | null = this.root;
    while (stack.length > 0 || node) {
      while (node) {
        // 直接调用，保证先处理中节点
        cb(node);
        stack.push(node);
        node = this.root.left;
      }
      node = stack.pop()!;
      if (!node) continue;
      node = node.right;
    }
  }
  public postOrderTraverse(cb: (node: Node<T>) => void) {
    if (!this.root) return;
    const stack: (Node<T> | null)[] = [];
    let node: Node<T> | null = this.root;
    node && stack.push(node);
    while (stack.length > 0) {
      node = stack.pop()!;
      if (node === null) {
        node = stack.pop()!;
        node && cb(node);
      } else {
        stack.push(node);
        stack.push(null);
        if (node.right) stack.push(node.right);
        if (node.left) stack.push(node.left);
      }
    }
  }
  public min() {
    let node: Node<T> | null = this.root;
    while (node) {
      node = node.left;
    }
    return node;
  }
  public max() {
    let node: Node<T> | null = this.root;
    while (node) {
      node = node.right;
    }
    return node;
  }
  public remove(value: T): Node<T> | undefined {
    return;
    // if(!this.root) return;
    // if()
  }
}

const tree = new BinarySearchTree<number>();
tree.insert(10).insert(20).insert(30).insert(5).insert(11).insert(7);

console.log(tree.search(31));

export { BinarySearchTree, compare, CompareResult, Node };
