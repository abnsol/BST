import { tree } from "./bst.mjs";

(function driverScript() {
    // Step 1: Create a binary search tree from an array of random numbers < 100
    const newTree = tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
    console.log("Initial tree root:", newTree.root);

    // Step 2: Confirm that the tree is balanced
    console.log("Is the tree balanced?", newTree.isBalanced());

    // Step 3: Print out all elements in level, pre, post, and in order
    console.log("Level order:", newTree.levelOrder());
    console.log("In order:", newTree.inOrder([], newTree.root));
    console.log("Pre order:", newTree.preOrder([], newTree.root));
    console.log("Post order:", newTree.postOrder([], newTree.root));

    // Step 4: Unbalance the tree by adding several numbers > 100
    newTree.insert(150);
    newTree.insert(200);
    newTree.insert(250);
    console.log("Added numbers > 100 to unbalance the tree");

    // Step 5: Confirm that the tree is unbalanced
    console.log("Is the tree balanced now?", newTree.isBalanced());

    // Step 6: Balance the tree by calling rebalance
    newTree.reBalance();
    console.log("Tree has been rebalanced.");

    // Step 7: Confirm that the tree is balanced
    console.log("Is the tree balanced after rebalancing?", newTree.isBalanced());

    // Step 8: Print out all elements in level, pre, post, and in order again
    console.log("Level order after rebalancing:", newTree.levelOrder());
    console.log("In order after rebalancing:", newTree.inOrder([], newTree.root));
    console.log("Pre order after rebalancing:", newTree.preOrder([], newTree.root));
    console.log("Post order after rebalancing:", newTree.postOrder([], newTree.root));
})();
