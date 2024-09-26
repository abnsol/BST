import { TreeNode } from "./treeNode.mjs";

export const tree = (array) => {
    // main point is finding mid in sorted and distinct array
    const buildTree = (array,start,end) => {
        if (start > end) return null;
        const mid = Math.floor((start + end) / 2);
        const root = TreeNode(array[mid]);

        root.left = buildTree(array,start,mid - 1);
        root.right = buildTree(array,mid + 1,end);

        return root;
    }     

    const removeDuplicates = (array) => {
        const len = array.length;
        if (len <= 1) return array;

        const uniqueItems = new Set(array);
        return Array.from(uniqueItems);
    }

    const insert = (value,node = root) => {
        // add as leaf node
        if (node === null) return TreeNode(value);

        if (node.data === value) return node;

        if (node.data > value) node.left = insert(value,node.left);
        else if (node.data < value) node.right = insert(value,node.right);
        
        return node;
    }

    // delete element if it has both child nodes
    const getSuccessor = (node) => {
        let current = node.right;

        while (current !== null && current.left !== null) current = current.left;

        return current;
    }

    const del = (value,node = root) => {
        if (node === null) return node;
        
        if (node.data > value) node.left = del(value,node.left);
        else if (node.data < value) node.right = del(value,node.right);
        else {
            // if node has at least one child
            if (node.left === null) return node.right;
            else if (node.right === null) return node.left;

            //if node has more than 1 child
            const successor = getSuccessor(node);
            node.key = successor.key;
            node.right = del(successor,node.right);
        }
        return node;
    }

    const find = (value,node = root) => {
        if (node === null) return 'no such Value';

        if (node.data > value) return find(value,node.left);
        else if (node.data < value) return find(value,node.right);
        else return node;
    }

    const levelOrder = () => {
        const levelOrderedArray = [];
        if (root === null) return [];

        const queue = [root];
        while (queue.length > 0) {
            let len = queue.length;
            for (let i = 0; i < len; i++){
                let node = queue.shift();
                if (node.left !== null) queue.push(node.left);
                if (node.right !== null) queue.push(node.right);
                levelOrderedArray.push(node.data);
            }
        }
        return levelOrderedArray;
    }

    const inOrder = (inOrderArray, root) => {
        if (root === null) return inOrderArray;
    
        inOrder(inOrderArray, root.left);
        inOrderArray.push(root.data);
        inOrder(inOrderArray, root.right);
    
        return inOrderArray;
    };
    
    const preOrder = (preOrderArray, root) => {
        if (root === null) return preOrderArray;
    
        preOrderArray.push(root.data);
        preOrder(preOrderArray, root.left);
        preOrder(preOrderArray, root.right);
    
        return preOrderArray;
    };
    
    const postOrder = (postOrderArray, root) => {
        if (root === null) return postOrderArray;
    
        postOrder(postOrderArray, root.left);
        postOrder(postOrderArray, root.right);
        postOrderArray.push(root.data);
    
        return postOrderArray;
    };
    

    //takes value as argument
    const height = (value) => {
        const findTheNode = find(value); 
        if (findTheNode === 'no such Value') return 'no such value';
        return findMaxHeight(findTheNode) - 1; //
    }

    const findMaxHeight = (node) => {
        if (node === null) return 0;
        let leftHeight = findMaxHeight(node.left);
        let rightHeight = findMaxHeight(node.right);
        let currentHeight = Math.max(leftHeight,rightHeight) + 1; // including mine

        return currentHeight;
    }

    const findMinHeight = (node) => {
        if (node === null) return 0;
        let leftHeight = findMinHeight(node.left);
        let rightHeight = findMinHeight(node.right);
        let currentHeight = Math.min(leftHeight,rightHeight) + 1;

        return currentHeight;
    }

    // if max height differs from min height by more than 2 edges
    const isBalanced = () => findMaxHeight(root) - findMinHeight(root) < 2;

    const depth = (value,currentDepth = 0,node = root) => {
        if (node === null) return 0;

        if (node.data === value) return currentDepth;
        else if (node.data > value) return depth(value,++currentDepth,node.left);
        else return depth(value,++currentDepth,node.right);        
    }

    const reBalance = () => {
        if (!isBalanced()) {
            const newArray = inOrder([],root);
            root = buildTree(newArray,0,newArray.length - 1);
        }
    }

    array = removeDuplicates(array);
    array = array.sort((a,b) => a - b);
    const start = 0, end = array.length - 1; 
    let root = buildTree(array,start,end);

    return {root,insert,inOrder,del,find,levelOrder,preOrder,postOrder,height,depth, isBalanced,reBalance};
}
