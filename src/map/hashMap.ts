import { LinkedList } from "../linkedlist/linkedList.ts";

interface KeyValuePair<K, V> {
  key: K;
  value: V;
}

interface IHashMap<K, V> {
  put(key: K, value: V): boolean;
  get(key: K): V | undefined;
  remove(key: K): boolean;
  hasKey(key: K): boolean;
  size(): number;
}

class HashMapSeparateChaining<K, V> implements IHashMap<K, V> {
  private table: Array<LinkedList<KeyValuePair<K, V>>>;
  private tableSize: number;
  private djb2HashCode(key: K): number {
    const strKey = String(key);
    let hash = 5381;
    for (let i = 0; i < strKey.length; i++) {
      hash = (hash << 5) + hash + strKey.charCodeAt(i);
    }
    return hash % this.tableSize; // 取模控制哈希表大小
  }
  constructor(tableSize: number = 31) {
    this.tableSize = tableSize;
    this.table = new Array(tableSize).fill(null).map(() => new LinkedList());
  }
  put(key: K, value: V): boolean {
    const hash = this.djb2HashCode(key);
    const linkedList = this.table[hash];
    const existingNode = linkedList.find((node) => node.element.key === key);

    if (existingNode) {
      existingNode.element.value = value; // 更新已存在的键
    } else {
      linkedList.push({ key, value }); // 新增键值对
    }
    return true;
  }

  get(key: K): V | undefined {
    const hash = this.djb2HashCode(key);
    const linkedList = this.table[hash];
    const node = linkedList.find((node) => node.element.key === key);
    return node?.element.value;
  }
  remove(key: K): boolean {
    const hash = this.djb2HashCode(key);
    const linkedList = this.table[hash];
    const node = linkedList.find((node) => node.element.key === key);
    if (node) {
      linkedList.remove(node.element);
      return true;
    }
    return false;
  }
  hasKey(key: K): boolean {
    const hash = this.djb2HashCode(key);
    const linkedList = this.table[hash];
    return linkedList.find((node) => node.element.key === key) !== undefined;
  }
  size(): number {
    return this.table.reduce((acc, linkedList) => acc + linkedList.size(), 0);
  }
}

const hashTable = new HashMapSeparateChaining<number, string>(10);

hashTable.put(1, "one");
hashTable.put(2, "two");

console.log(hashTable.get(1)); // "one"

export { HashMapSeparateChaining };
