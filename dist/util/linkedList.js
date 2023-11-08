export class ListNode {
    constructor() {
        this.next = null;
        this.prev = null;
    }
}
export class LinkedList {
    constructor() {
        this.head = new ListNode();
        this.tail = new ListNode();
        this.size = 0;
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    addLast(node) {
        if (!node)
            return;
        const temp = this.tail.prev;
        temp.next = node;
        node.prev = temp;
        node.next = this.tail;
        this.tail.prev = node;
        ++this.size;
    }
    remove(node) {
        if (!node)
            return;
        const nextNode = node.next;
        const prevNode = node.next;
        prevNode.next = nextNode;
        nextNode.prev = prevNode;
        --this.size;
    }
    clear() {
        this.head.next = this.tail;
        this.tail.prev = this.head;
        this.size = 0;
    }
    getSize() {
        return this.size;
    }
    getHead() {
        return this.head;
    }
    getTail() {
        return this.tail;
    }
}
