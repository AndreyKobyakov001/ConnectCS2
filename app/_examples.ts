import { Category } from "./_types";

//Stolen from ChatGPT, hence somewhat imperfect categories.
// # TODO: make them better, add more things in each. 

export const categories: Category[] = [
  {
    category: "Signal Interrupts",
    items: ["SIGKILL", "SIGINT", "SIGSEGV", "SIGTERM"],
    level: 1,
  },
  {
    category: "Popular Algorithm Steps",
    items: [
      "Pick closest unvisited vertex",
      "Predict distance to each neighbor",
      "Update neighbor if smaller",
      "Mark visited when done",
    ],
    level: 2,
  },
  {
    category: "Binary Tree Derivatives",
    items: ["Min-Heap", "Max-Heap", "AVL Tree", "Red-Black Tree"],
    level: 3,
  },
  {
    category: "Programming Paradigms",
    items: ["Object-Oriented", "Functional", "Procedural", "Declarative"],
    level: 4,
  },
  {
    category: "Sorting Algorithms",
    items: ["Quick Sort", "Merge Sort", "Bubble Sort", "Insertion Sort"],
    level: 1,
  },
  {
    category: "Big O Notations",
    items: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
    level: 2,
  },
  {
    category: "Software Development Life Cycle Phases",
    items: ["Requirements", "Design", "Implementation", "Testing"],
    level: 3,
  },
  {
    category: "OSI Model Layers",
    items: ["Application", "Transport", "Network", "Data Link"],
    level: 4,
  },
  {
    category: "Design Patterns",
    items: ["Singleton", "Factory", "Observer", "Strategy"],
    level: 1,
  },
  {
    category: "Memory Management Techniques",
    items: ["Garbage Collection", "Reference Counting", "Manual Allocation", "Virtual Memory"],
    level: 2,
  },
  {
    category: "Database Normal Forms",
    items: ["1NF", "2NF", "3NF", "BCNF"],
    level: 3,
  },
  {
    category: "Networking Protocols",
    items: ["HTTP", "TCP", "UDP", "FTP"],
    level: 4,
  },
];

