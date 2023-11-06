/**
 * 双向链表工具类
 */
export class LinkedList {
  head;
  tail;
  size;

  constructor() {
    this.head = new LinkedListNode();
    this.tail = new LinkedListNode();
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.head.data = null;
    this.tail.data = null;
    this.size = 0;
  }

  /**
   * 将数据插入链表（自动创建节点插入）
   * @param {any} data
   */
  insertData(data) {
    if (!data) return;
    const nNode = new LinkedListNode();
    nNode.data = data;
    const temp = this.tail.prev;
    temp.next = nNode;
    nNode.prev = temp;
    nNode.next = this.tail;
    this.tail.prev = nNode;
    ++this.size;
  }

  /**
   * 删除链表节点
   * @param {LinkedListNode} node
   */
  remove(node) {
    if (!node || Object.getPrototypeOf(node) !== LinkedListNode.prototype)
      return;
    const prevNode = node.prev;
    const nextNode = node.next;
    prevNode.next = nextNode;
    nextNode.prev = prevNode;
    node.next = null;
    node.prev = null;
    node.data = null;
    --this.size;
  }

  /**
   * 清空链表
   */
  clear() {
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.head.prev = null;
    this.tail.next = null;
    size = 0;
  }

  /**
   * 获取长度
   * @returns number
   */
  getSize() {
    return this.size;
  }
}

/**
 * 双向链表节点类
 */
export class LinkedListNode {
  next;
  prev;
  data;
}
