"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Play,
  RotateCcw,
  Copy,
  Check,
  Terminal,
  BookOpen,
  Sparkles,
  Trophy,
  Flame,
  CheckCircle2,
  Globe,
  Languages,
  ArrowRight,
  ArrowLeft,
  Search,
  CheckSquare,
  HelpCircle,
  Maximize2,
  Minimize2,
  ChevronRight,
  Bookmark,
  Share2,
  Sun,
  Moon,
  ExternalLink,
  Laptop
} from "lucide-react";
import GoogleAd from "@/components/Common/GoogleAd";

export type TechLang =
  | "html"
  | "css"
  | "javascript"
  | "python"
  | "sql"
  | "react"
  | "next"
  | "node"
  | "cpp"
  | "c"
  | "typescript";

export type ExplanMode = "english" | "hindi" | "hinglish";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonContent {
  id: string;
  topicName: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  title: string;
  explanations: {
    english: string;
    hindi: string;
    hinglish: string;
  };
  keyTakeaways: string[];
  initialCode: string;
  expectedOutput: string;
  quiz: QuizQuestion;
}

export interface TechCatalog {
  name: string;
  shortName: string;
  icon: string;
  color: string;
  description: string;
  lessons: LessonContent[];
}

export const W3_TUTORIALS: Record<TechLang, TechCatalog> = {
  html: {
    name: "HTML5 Tutorial",
    shortName: "HTML",
    icon: "🌐",
    color: "#e34f26",
    description: "The language for building web pages structure",
    lessons: [
      {
        id: "html-intro",
        topicName: "HTML Introduction",
        level: "Beginner",
        title: "HTML Introduction & Structure",
        explanations: {
          english: "HTML stands for HyperText Markup Language. It is the standard markup language for creating web pages. HTML describes the structure of a Web page semantically.",
          hindi: "HTML का पूरा नाम HyperText Markup Language है। यह वेबपेज का मूल ढांचा (Structure) बनाने के काम आता है।",
          hinglish: "HTML web pages ka skeleton (ढांचा) banata hai. Tags jaise <h1>, <p>, <a> aur <div> se content structured hota hai."
        },
        keyTakeaways: [
          "<!DOCTYPE html> defines that this document is an HTML5 document",
          "<html> element is the root element of an HTML page",
          "<head> contains meta information about the HTML page",
          "<body> defines the document's body, and is a container for all visible contents"
        ],
        initialCode: `<!DOCTYPE html>
<html>
<head>
  <title>My First Web Page</title>
</head>
<body style="font-family: sans-serif; background: #0f172a; color: white; padding: 20px;">

  <h1 style="color: #4ade80;">Welcome to W3Cortex HTML Tutorial</h1>
  <p>HTML is super easy to learn!</p>
  <button style="background: #04AA6D; color: white; padding: 10px 20px; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">
    Click Me! 🚀
  </button>

</body>
</html>`,
        expectedOutput: `Rendering HTML5 Live Preview:\n- Heading: Welcome to W3Cortex HTML Tutorial\n- Paragraph: HTML is super easy to learn!\n- Styled W3-Green Button: Click Me! 🚀`,
        quiz: {
          question: "What does HTML stand for?",
          options: [
            "Hyper Text Markup Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language",
            "Hyper Tool Machine Language"
          ],
          correctIndex: 0,
          explanation: "HTML stands for Hyper Text Markup Language."
        }
      },
      {
        id: "html-elements",
        topicName: "HTML Elements & Tags",
        level: "Beginner",
        title: "HTML Elements, Headings & Paragraphs",
        explanations: {
          english: "An HTML element is defined by a start tag, some content, and an end tag. Headings are defined with <h1> to <h6> tags.",
          hindi: "HTML एलिमेंट स्टार्ट टैग, कंटेंट और एंड टैग से बनता है। हेडिंग्स <h1> से <h6> तक होती हैं।",
          hinglish: "HTML me elements start tag (<p>) aur end tag (</p>) se bante hain. <h1> sabse badi heading hoti hai."
        },
        keyTakeaways: [
          "<h1> is the main heading, <h6> is the smallest heading",
          "<p> tag creates a paragraph block",
          "<br> tag produces a single line break without end tag"
        ],
        initialCode: `<h1>This is Heading 1</h1>
<h2>This is Heading 2</h2>
<h3>This is Heading 3</h3>
<p>This is a paragraph with a <br> line break.</p>`,
        expectedOutput: `Heading 1, Heading 2, Heading 3 and paragraph rendered with line break.`,
        quiz: {
          question: "Which tag is used for the largest heading in HTML?",
          options: ["<h6>", "<head>", "<h1>", "<heading>"],
          correctIndex: 2,
          explanation: "<h1> defines the largest and most important heading."
        }
      },
      {
        id: "html-forms",
        topicName: "HTML Forms & Inputs",
        level: "Intermediate",
        title: "HTML Forms, Inputs & Action Buttons",
        explanations: {
          english: "An HTML form is used to collect user input. The user input is most often sent to a server for processing.",
          hindi: "HTML फॉर्म का उपयोग यूज़र से इनपुट डेटा (जैसे लॉगिन या कांटेक्ट फॉर्म) लेने के लिए किया जाता है।",
          hinglish: "Forms se user data enter karta hai jaise Name, Email, Password, aur Submit button click karke server bheja jata hai."
        },
        keyTakeaways: [
          "<form> wraps input elements",
          "<input type='text'> defines a single-line text input field",
          "<input type='submit'> defines a submit button"
        ],
        initialCode: `<form style="display: flex; flex-direction: column; gap: 12px; max-width: 320px;">
  <label style="color: #94a3b8; font-weight: bold;">Full Name:</label>
  <input type="text" placeholder="Rahul Sharma" style="padding: 10px; border-radius: 6px; border: 1px solid #334155; background: #1e293b; color: white;" />
  
  <label style="color: #94a3b8; font-weight: bold;">Email Address:</label>
  <input type="email" placeholder="rahul@cortex.com" style="padding: 10px; border-radius: 6px; border: 1px solid #334155; background: #1e293b; color: white;" />

  <button type="submit" style="background: #04AA6D; color: white; padding: 12px; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">
    Submit Form »
  </button>
</form>`,
        expectedOutput: `Form rendered with text field, email field, and W3-Green submit button.`,
        quiz: {
          question: "Which HTML element is used to define a multi-line input control?",
          options: ["<input type='text'>", "<textarea>", "<input type='multiline'>", "<textblock>"],
          correctIndex: 1,
          explanation: "<textarea> defines a multi-line text input control."
        }
      }
    ]
  },
  css: {
    name: "CSS3 Tutorial",
    shortName: "CSS",
    icon: "🎨",
    color: "#1572b6",
    description: "The language for styling web pages layout and design",
    lessons: [
      {
        id: "css-intro",
        topicName: "CSS Syntax & Selectors",
        level: "Beginner",
        title: "CSS Syntax, Colors & Selectors",
        explanations: {
          english: "CSS (Cascading Style Sheets) describes how HTML elements are to be displayed on screen, paper, or in other media.",
          hindi: "CSS से हम वेबपेज का कलर, फॉन्ट, लेआउट और एनिमेशन डिज़ाइन करते हैं।",
          hinglish: "CSS se HTML ko sundar aur attractive banaya jata hai using rules like color, padding, margin aur flexbox."
        },
        keyTakeaways: [
          "CSS selector targets HTML elements",
          "Property: value pairs define styles",
          "Class selector uses dot (.myClass), ID selector uses hash (#myId)"
        ],
        initialCode: `/* W3Cortex CSS Styling Example */
body {
  background-color: #0f172a;
  font-family: 'Segoe UI', sans-serif;
}

.hero-box {
  background: linear-gradient(135deg, #1e293b, #0f172a);
  border: 2px solid #04AA6D;
  border-radius: 12px;
  padding: 24px;
  color: #ffffff;
  box-shadow: 0 10px 25px rgba(0,0,0,0.5);
}

.hero-title {
  color: #38bdf8;
  font-size: 24px;
}`,
        expectedOutput: `CSS stylesheet compiled cleanly. Hero box styled with linear gradient and green border.`,
        quiz: {
          question: "Which CSS property is used to change the background color of an element?",
          options: ["color", "background-color", "bgcolor", "canvas-color"],
          correctIndex: 1,
          explanation: "background-color is used to set the background color of an element."
        }
      },
      {
        id: "css-flexbox",
        topicName: "CSS Flexbox Layout",
        level: "Intermediate",
        title: "CSS Flexbox Layout Model",
        explanations: {
          english: "Flexible Box Layout Module makes it easier to design flexible responsive layout structure without using float or positioning.",
          hindi: "Flexbox से एलिमेंट्स को एक लाइन में अलाइन करना और रिस्पॉन्सिव बनाना बहुत आसान हो जाता है।",
          hinglish: "Flexbox display: flex set karke elements ko horizontally ya vertically automatically distribute karta hai."
        },
        keyTakeaways: [
          "display: flex activates flex container",
          "justify-content aligns items horizontally (center, space-between)",
          "align-items aligns items vertically"
        ],
        initialCode: `.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1e293b;
  padding: 16px;
  border-radius: 8px;
}

.flex-item {
  background-color: #04AA6D;
  color: white;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: bold;
}`,
        expectedOutput: `Flexbox container displaying 3 flex items spaced evenly across horizontal axis.`,
        quiz: {
          question: "Which value of justify-content distributes items evenly with equal space between them?",
          options: ["center", "flex-start", "space-between", "stretch"],
          correctIndex: 2,
          explanation: "space-between places equal space between items inside flex container."
        }
      }
    ]
  },
  javascript: {
    name: "JavaScript Tutorial",
    shortName: "JS",
    icon: "⚡",
    color: "#f7df1e",
    description: "The programming language of the Web",
    lessons: [
      {
        id: "js-variables",
        topicName: "JS Variables (let, const)",
        level: "Beginner",
        title: "JavaScript Variables & Data Types",
        explanations: {
          english: "Variables are containers for storing data. In modern JS, we use let and const instead of var.",
          hindi: "वेरिएबल डेटा स्टोर करने का डिब्बा होते हैं। मॉडर्न JS में let और const का उपयोग किया जाता है।",
          hinglish: "JavaScript me 'let' aur 'const' se variables banaye jate hain. 'const' ki value badli nahi ja sakti."
        },
        keyTakeaways: [
          "const creates read-only constant variables",
          "let creates reassignable block-scoped variables",
          "console.log() prints output to execution console"
        ],
        initialCode: `// Modern JavaScript Variables
const companyName = "Cortex Web Solutions";
let activeStudents = 1250;

activeStudents += 250; // New enrollment

console.log("Welcome to:", companyName);
console.log("Total Active Students:", activeStudents);`,
        expectedOutput: `Welcome to: Cortex Web Solutions\nTotal Active Students: 1500`,
        quiz: {
          question: "Which keyword is used to declare a constant variable that cannot be reassigned?",
          options: ["let", "var", "const", "static"],
          correctIndex: 2,
          explanation: "const creates a constant reference that cannot be reassigned."
        }
      },
      {
        id: "js-functions",
        topicName: "JS Functions & Arrow Syntax",
        level: "Intermediate",
        title: "JavaScript Functions & ES6 Arrow Functions",
        explanations: {
          english: "A JavaScript function is a block of code designed to perform a particular task. Arrow functions provide concise syntax.",
          hindi: "फ़ंक्शन कोड का एक ब्लॉक होता है जिसे नाम देकर बार-बार रन किया जा सकता है।",
          hinglish: "Function me logic band karke reusable banate hain. Arrow function () => {} modern clean syntax hai."
        },
        keyTakeaways: [
          "Function declaration: function myFunc() {}",
          "Arrow function: const myFunc = (param) => {}",
          "return statement yields output back to caller"
        ],
        initialCode: `// Arrow Function Example
const calculateTotal = (price, taxPercent) => {
  const tax = price * (taxPercent / 100);
  return price + tax;
};

const finalAmount = calculateTotal(1000, 18);
console.log("Final Payable Amount (incl 18% GST): ₹", finalAmount);`,
        expectedOutput: `Final Payable Amount (incl 18% GST): ₹ 1180`,
        quiz: {
          question: "What is the correct syntax for an ES6 Arrow Function?",
          options: [
            "const add = function(a, b) { return a + b; }",
            "const add = (a, b) => a + b",
            "function add(a, b) => return a + b",
            "def add(a, b): return a + b"
          ],
          correctIndex: 1,
          explanation: "const add = (a, b) => a + b is the concise ES6 arrow function syntax."
        }
      },
      {
        id: "js-async",
        topicName: "JS Async / Await & APIs",
        level: "Advanced",
        title: "JavaScript Promises & Async / Await",
        explanations: {
          english: "Async/await makes promises easier to write. async makes a function return a Promise, and await makes it wait for a Promise.",
          hindi: "Async/await का उपयोग सर्वर से डेटा (API Fetching) बिना पेज फ्रीज किए लोड करने के लिए किया जाता है।",
          hinglish: "Async/await se server se backend APIs ka data fetch karte hain clean synchronous lagne wale code se."
        },
        keyTakeaways: [
          "async functions always return a Promise",
          "await pauses code execution until promise settles",
          "try...catch handles network failures gracefully"
        ],
        initialCode: `async function fetchStudentProfile() {
  console.log("📡 Fetching profile from Cortex Cloud Server...");
  
  const mockApi = new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: "dev-99", name: "Gurvinder Singh", course: "Full Stack Mastery" });
    }, 400);
  });

  const profile = await mockApi;
  console.log("✅ Data Received:", profile);
}

fetchStudentProfile();`,
        expectedOutput: `📡 Fetching profile from Cortex Cloud Server...\n✅ Data Received: { id: 'dev-99', name: 'Gurvinder Singh', course: 'Full Stack Mastery' }`,
        quiz: {
          question: "Which keyword can ONLY be used inside an async function?",
          options: ["yield", "await", "defer", "promise"],
          correctIndex: 1,
          explanation: "The await keyword can only be used inside an async function."
        }
      }
    ]
  },
  python: {
    name: "Python Tutorial",
    shortName: "PYTHON",
    icon: "🐍",
    color: "#3776ab",
    description: "A high-level readable programming language for AI & Web",
    lessons: [
      {
        id: "py-intro",
        topicName: "Python Syntax & Print",
        level: "Beginner",
        title: "Python Syntax, Variables & Indentation",
        explanations: {
          english: "Python relies on indentation (whitespace) to define scope, such as loops, functions, and classes.",
          hindi: "पायथन में ब्रैकेट की जगह स्पेस (Indentation) से कोड ब्लॉक तय होता है।",
          hinglish: "Python bohot clean aur readable language hai. Indentation (4 spaces) se blocks decide hote hain."
        },
        keyTakeaways: [
          "print() displays output",
          "No curly braces {} needed for blocks; uses indentation",
          "Dynamic typing - no variable declaration keywords like let or var"
        ],
        initialCode: `# Python Beginner Script
user_name = "Aman Kumar"
course_enrolled = "Python AI & Data Science"

print("--- Student Enrollment Card ---")
print("Name:", user_name)
print("Course:", course_enrolled)`,
        expectedOutput: `--- Student Enrollment Card ---\nName: Aman Kumar\nCourse: Python AI & Data Science`,
        quiz: {
          question: "How do you create a variable in Python?",
          options: [
            "var x = 5",
            "int x = 5",
            "x = 5",
            "let x = 5"
          ],
          correctIndex: 2,
          explanation: "In Python, variables are created simply by assigning a value: x = 5."
        }
      }
    ]
  },
  sql: {
    name: "SQL Database Tutorial",
    shortName: "SQL",
    icon: "🗄️",
    color: "#4479a1",
    description: "Standard language for storing and querying relational databases",
    lessons: [
      {
        id: "sql-select",
        topicName: "SQL SELECT & WHERE",
        level: "Beginner",
        title: "SQL SELECT Statement & WHERE Filtering",
        explanations: {
          english: "The SELECT statement is used to select data from a database. The WHERE clause filters records.",
          hindi: "SELECT का उपयोग डेटाबेस टेबल से डेटा निकालने और WHERE से फ़िल्टर लगाने के लिए होता है।",
          hinglish: "SQL SELECT query se DB rows fetch hoti hain aur WHERE clause se conditional filtering hoti hai."
        },
        keyTakeaways: [
          "SELECT * FROM table returns all columns",
          "WHERE clause specifies conditions",
          "ORDER BY sorts results ascending or descending"
        ],
        initialCode: `-- SQL Database Query Example
SELECT id, name, email, course 
FROM students 
WHERE status = 'ACTIVE' 
ORDER BY id DESC;`,
        expectedOutput: `Query Executed Successfully! Returned 42 active student records.`,
        quiz: {
          question: "Which SQL statement is used to extract data from a database?",
          options: ["GET", "OPEN", "SELECT", "EXTRACT"],
          correctIndex: 2,
          explanation: "SELECT statement is used to query and extract data from a database table."
        }
      }
    ]
  },
  react: {
    name: "React.js Tutorial",
    shortName: "REACT",
    icon: "⚛️",
    color: "#61dafb",
    description: "A JavaScript library for building user interfaces",
    lessons: [
      {
        id: "react-components",
        topicName: "React Components & JSX",
        level: "Beginner",
        title: "React Functional Components & State",
        explanations: {
          english: "React components are JavaScript functions that return markup via JSX. useState hook manages component state.",
          hindi: "रिएक्ट कंपोनेंट्स जावास्क्रिप्ट फ़ंक्शन होते हैं जो JSX रिटर्न करते हैं। useState से स्टेट मैनेज होती है।",
          hinglish: "React me UI small reusable components me bat-ti hai. useState Hook state change hone par automatic re-render karta hai."
        },
        keyTakeaways: [
          "JSX allows HTML writing directly inside JS",
          "useState Hook holds dynamic component state",
          "Props pass read-only data into child components"
        ],
        initialCode: `import React, { useState } from 'react';

export default function CounterApp() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '20px', background: '#0f172a', borderRadius: '12px', color: 'white' }}>
      <h2>React Counter: {count}</h2>
      <button 
        onClick={() => setCount(count + 1)}
        style={{ background: '#04AA6D', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
      >
        Increment Counter +1
      </button>
    </div>
  );
}`,
        expectedOutput: `React Virtual DOM rendered. Initial counter state set to 0.`,
        quiz: {
          question: "What Hook is used to handle state in React functional components?",
          options: ["useContext", "useEffect", "useState", "useRef"],
          correctIndex: 2,
          explanation: "useState Hook allows functional components to have state variable management."
        }
      }
    ]
  },
  next: {
    name: "Next.js 15 Tutorial",
    shortName: "NEXT.JS",
    icon: "🚀",
    color: "#ffffff",
    description: "The React Framework for Full-Stack Web Development",
    lessons: [
      {
        id: "next-routing",
        topicName: "Next.js App Router",
        level: "Advanced",
        title: "Next.js 15 App Router & Server Components",
        explanations: {
          english: "Next.js 15 uses the App Router based on React Server Components (RSC) for optimized performance and file-based routing.",
          hindi: "Next.js 15 एप राउटर फ़ोल्डर स्ट्रक्चर के हिसाब से ऑटोमैटिक राउटिंग और सर्वर साइड रेंडरिंग देता है।",
          hinglish: "Next.js React ka fullstack framework hai. File-based routing aur Server Components se website bohot fast chalti hai."
        },
        keyTakeaways: [
          "app/ directory defines routes based on folder names",
          "Server Components render on server with zero client JS payload",
          "'use client' directive marks interactive client-side components"
        ],
        initialCode: `// app/dashboard/page.tsx (Next.js Server Component)
export default async function DashboardPage() {
  const stats = { users: 1420, revenue: "₹4.2L", status: "Operational" };

  return (
    <main style={{ padding: '30px', background: '#090d16', color: 'white' }}>
      <h1>Next.js 15 Cloud Dashboard</h1>
      <p>Active Users: {stats.users}</p>
    </main>
  );
}`,
        expectedOutput: `Next.js App Router Server Component compiled. Fast Server-Side HTML stream ready.`,
        quiz: {
          question: "Which file inside a folder defines a public route in Next.js App Router?",
          options: ["index.js", "route.js", "page.tsx", "layout.tsx"],
          correctIndex: 2,
          explanation: "page.tsx or page.jsx defines the UI route segment in Next.js App Router."
        }
      }
    ]
  },
  node: {
    name: "Node.js Tutorial",
    shortName: "NODE.JS",
    icon: "🟩",
    color: "#339933",
    description: "JavaScript runtime environment built on Chrome's V8 engine",
    lessons: [
      {
        id: "node-express",
        topicName: "Node.js Express Server",
        level: "Intermediate",
        title: "Node.js & Express REST API Server",
        explanations: {
          english: "Node.js allows running JavaScript on the server. Express is a web application framework for Node.js.",
          hindi: "Node.js सर्वर साइड पर JS चलाता है। Express.js से REST APIs बहुत आसानी से बनाई जाती हैं।",
          hinglish: "Node.js backend engine hai. Express framework se hum API endpoints jaise GET /api/data banate hain."
        },
        keyTakeaways: [
          "require('express') imports express module",
          "app.get() registers GET HTTP route handler",
          "res.json() sends JSON response back to client"
        ],
        initialCode: `const express = require('express');
const app = express();

app.get('/api/status', (req, res) => {
  res.json({
    service: "Cortex Express API",
    status: "Healthy",
    timestamp: new Date().toISOString()
  });
});

console.log("✅ Express Server listening on port 5000");`,
        expectedOutput: `✅ Express Server listening on port 5000\nEndpoint GET /api/status ready.`,
        quiz: {
          question: "Which method is used in Express to return JSON data?",
          options: ["res.sendText()", "res.json()", "res.render()", "res.write()"],
          correctIndex: 1,
          explanation: "res.json() formats response as JSON and sends it with correct application/json header."
        }
      }
    ]
  },
  cpp: {
    name: "C++ Tutorial",
    shortName: "C++",
    icon: "⚡",
    color: "#00599c",
    description: "High-performance object-oriented programming language",
    lessons: [
      {
        id: "cpp-basics",
        topicName: "C++ iostream & Pointers",
        level: "Beginner",
        title: "C++ Main Function, iostream & Pointers",
        explanations: {
          english: "C++ is a powerful general-purpose programming language used in system software, game development, and performance applications.",
          hindi: "C++ बहुत तेज़ गति की प्रोग्रामिंग भाषा है जो मेमरी कंट्रोल और सिस्टम सॉफ़्टवेयर में काम आती है।",
          hinglish: "C++ High Performance compiled language hai. cout से स्क्रीन पर प्रिंट होता है और * से Pointers मेमोरी एड्रेस लेते हैं।"
        },
        keyTakeaways: [
          "#include <iostream> includes standard input-output stream",
          "std::cout prints output to console",
          "Pointer (*) holds memory address (&) of a variable"
        ],
        initialCode: `#include <iostream>
using namespace std;

int main() {
    int score = 100;
    int* ptr = &score;

    cout << "User Score: " << score << endl;
    cout << "Memory Address: " << ptr << endl;
    return 0;
}`,
        expectedOutput: `User Score: 100\nMemory Address: 0x7ffeefbff5c8`,
        quiz: {
          question: "Which operator is used to get the memory address of a variable in C++?",
          options: ["*", "&", "%", "->"],
          correctIndex: 1,
          explanation: "The address-of operator (&) returns the memory address of a variable."
        }
      }
    ]
  },
  c: {
    name: "C Language Tutorial",
    shortName: "C",
    icon: "🟦",
    color: "#a8b9cc",
    description: "The foundational system programming language",
    lessons: [
      {
        id: "c-basics",
        topicName: "C Language printf & Structs",
        level: "Beginner",
        title: "C Fundamentals, printf & Struct Data Types",
        explanations: {
          english: "C is a foundational programming language. Structs allow grouping variables of different types under one name.",
          hindi: "C भाषा सभी आधुनिक प्रोग्रामिंग भाषाओं का आधार है। इसमें printf से आउटपुट मिलता है।",
          hinglish: "C language foundational memory language hai. Struct se custom data types banaye jate hain."
        },
        keyTakeaways: [
          "printf() displays formatted text",
          "struct bundles related variables together",
          "main() function is execution entry point"
        ],
        initialCode: `#include <stdio.h>

struct Student {
    char name[30];
    int marks;
};

int main() {
    struct Student s1 = {"Karan Sharma", 95};
    printf("Student Name: %s, Marks: %d\\n", s1.name, s1.marks);
    return 0;
}`,
        expectedOutput: `Student Name: Karan Sharma, Marks: 95`,
        quiz: {
          question: "Which header file is required for printf() function in C?",
          options: ["<stdlib.h>", "<conio.h>", "<stdio.h>", "<string.h>"],
          correctIndex: 2,
          explanation: "<stdio.h> defines standard input output functions including printf."
        }
      }
    ]
  },
  typescript: {
    name: "TypeScript Tutorial",
    shortName: "TYPESCRIPT",
    icon: "🟦",
    color: "#3178c6",
    description: "Typed JavaScript at Any Scale",
    lessons: [
      {
        id: "ts-types",
        topicName: "TS Types & Interfaces",
        level: "Intermediate",
        title: "TypeScript Interfaces, Types & Static Analysis",
        explanations: {
          english: "TypeScript extends JavaScript by adding static types to catch bugs early in development.",
          hindi: "टाइपस्क्रिप्ट जावास्क्रिप्ट का टाइप-सुरक्षित वर्ज़न है जो डेवलपमेंट के दौरान गलतियां पकड़ लेता है।",
          hinglish: "TypeScript JavaScript me types add karta hai jisse wrong type assignments build-time par hi pakad aate hain."
        },
        keyTakeaways: [
          "interface defines contract for object structure",
          "type defines custom type aliases",
          "Static type checker prevents undefined property access"
        ],
        initialCode: `interface UserConfig {
  id: number;
  name: string;
  isAdmin: boolean;
}

function verifyUser(user: UserConfig): string {
  return \`User \${user.name} (\${user.isAdmin ? 'Admin' : 'Member'})\`;
}

const newUser: UserConfig = { id: 1, name: "Siddharth", isAdmin: true };
console.log(verifyUser(newUser));`,
        expectedOutput: `User Siddharth (Admin)`,
        quiz: {
          question: "How do you define an object structure interface in TypeScript?",
          options: [
            "class User = {}",
            "interface User {}",
            "struct User {}",
            "type User = interface {}"
          ],
          correctIndex: 1,
          explanation: "interface User {} is used to define object structure shape in TypeScript."
        }
      }
    ]
  }
};

export default function InteractiveAcademyStudio() {
  const [activeTech, setActiveTech] = useState<TechLang>("html");
  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);
  const [explanMode, setExplanMode] = useState<ExplanMode>("hinglish");

  // Code Editor State
  const [code, setCode] = useState<string>("");
  const [consoleOutput, setConsoleOutput] = useState<string>("");
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isSandboxExpanded, setIsSandboxExpanded] = useState<boolean>(false);

  // Quiz State
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // User Stats & Search
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [completedLessons, setCompletedLessons] = useState<string[]>(["html-intro", "js-variables"]);
  const [streakDays, setStreakDays] = useState<number>(7);

  const catalog = W3_TUTORIALS[activeTech];
  const currentLesson = catalog.lessons[activeLessonIndex] || catalog.lessons[0];

  useEffect(() => {
    if (currentLesson) {
      setCode(currentLesson.initialCode);
      setConsoleOutput(`Click 'Run Code »' to execute code in sandbox.`);
      setSelectedQuizOption(null);
      setQuizSubmitted(false);
    }
  }, [activeTech, activeLessonIndex]);

  const handleRunCode = () => {
    setIsExecuting(true);
    setConsoleOutput("⏳ Executing code in W3Cortex sandbox...");

    setTimeout(() => {
      setIsExecuting(false);
      setConsoleOutput(currentLesson.expectedOutput);
    }, 450);
  };

  const handleResetCode = () => {
    setCode(currentLesson.initialCode);
    setConsoleOutput("Code reset to original lesson template.");
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrevLesson = () => {
    if (activeLessonIndex > 0) {
      setActiveLessonIndex(activeLessonIndex - 1);
    }
  };

  const handleNextLesson = () => {
    if (activeLessonIndex < catalog.lessons.length - 1) {
      setActiveLessonIndex(activeLessonIndex + 1);
    }
  };

  const handleQuizSubmit = () => {
    if (selectedQuizOption === null) return;
    setQuizSubmitted(true);
    if (selectedQuizOption === currentLesson.quiz.correctIndex) {
      if (!completedLessons.includes(currentLesson.id)) {
        setCompletedLessons([...completedLessons, currentLesson.id]);
      }
    }
  };

  // Filter lessons by search query
  const filteredLessons = catalog.lessons.filter((l) =>
    l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.topicName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-100 font-sans selection:bg-[#04AA6D] selection:text-white pt-16">
      
      {/* W3Schools Top Bar (Tech Tabs & Search & Language Toggle) */}
      <div className="sticky top-16 z-30 bg-[#161b22] border-b border-slate-800 shadow-md">
        <div className="container mx-auto px-2 sm:px-4 max-w-7xl flex items-center justify-between gap-2 overflow-x-auto py-1.5 scrollbar-none">
          
          {/* Tech Tabs Navigation Bar */}
          <div className="flex items-center gap-1 overflow-x-auto py-1">
            {(Object.keys(W3_TUTORIALS) as TechLang[]).map((techKey) => {
              const item = W3_TUTORIALS[techKey];
              const isSelected = activeTech === techKey;
              return (
                <button
                  key={techKey}
                  onClick={() => {
                    setActiveTech(techKey);
                    setActiveLessonIndex(0);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black tracking-wider transition-all flex items-center gap-1.5 whitespace-nowrap uppercase ${
                    isSelected
                      ? "bg-[#04AA6D] text-white shadow-md scale-105"
                      : "text-slate-300 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span>{item.shortName}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation Language Toggle Pill */}
          <div className="flex items-center gap-1 bg-[#0d1117] p-1 rounded-xl border border-slate-800 shrink-0">
            <button
              onClick={() => setExplanMode("hinglish")}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                explanMode === "hinglish" ? "bg-[#04AA6D] text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              🗣️ Hinglish
            </button>
            <button
              onClick={() => setExplanMode("hindi")}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                explanMode === "hindi" ? "bg-[#04AA6D] text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              🇮🇳 हिंदी
            </button>
            <button
              onClick={() => setExplanMode("english")}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                explanMode === "english" ? "bg-[#04AA6D] text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              🇬🇧 English
            </button>
          </div>

        </div>
      </div>

      {/* Main Layout Grid: Left Sidebar + Central Article + Right Reference Sidebar */}
      <div className="container mx-auto px-4 max-w-7xl py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* LEFT SIDEBAR: W3Schools Topic Navigation List */}
          <aside className="md:col-span-3 bg-[#161b22] border border-slate-800 rounded-2xl p-4 sticky top-36 max-h-[calc(100vh-160px)] overflow-y-auto space-y-4">
            
            {/* Header & Tech Title */}
            <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <span>{catalog.icon}</span>
                <span>{catalog.shortName} Topics</span>
              </h2>
              <span className="text-[10px] font-bold text-slate-400 px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800">
                {catalog.lessons.length} Topics
              </span>
            </div>

            {/* Search Input Filter */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics..."
                className="w-full bg-[#0d1117] border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#04AA6D]"
              />
            </div>

            {/* Topic List Links */}
            <div className="space-y-1">
              {filteredLessons.map((les, idx) => {
                const isSelected = activeLessonIndex === idx;
                const isCompleted = completedLessons.includes(les.id);
                return (
                  <button
                    key={les.id}
                    onClick={() => setActiveLessonIndex(idx)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-[#04AA6D] text-white font-bold shadow-md"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <span className="truncate">{les.topicName}</span>
                    {isCompleted && (
                      <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-white" : "text-[#04AA6D]"}`} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Ad Banner placeholder in sidebar */}
            <div className="pt-4 border-t border-slate-800">
              <GoogleAd adSlot="sidebar-ad" adFormat="auto" />
            </div>
          </aside>

          {/* MAIN CENTER CONTENT AREA: W3Schools Article & Try It Yourself Editor */}
          <main className="md:col-span-6 space-y-6">
            
            {/* Top Navigation (< Previous | Next >) */}
            <div className="flex items-center justify-between bg-[#161b22] border border-slate-800 rounded-2xl p-3">
              <button
                onClick={handlePrevLesson}
                disabled={activeLessonIndex === 0}
                className="px-4 py-2 rounded-xl bg-[#04AA6D] hover:bg-[#038d5a] disabled:opacity-30 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
              >
                <ArrowLeft className="w-4 h-4" /> &lt; Previous
              </button>

              <span className="text-xs font-bold text-slate-400">
                Topic {activeLessonIndex + 1} of {catalog.lessons.length}
              </span>

              <button
                onClick={handleNextLesson}
                disabled={activeLessonIndex === catalog.lessons.length - 1}
                className="px-4 py-2 rounded-xl bg-[#04AA6D] hover:bg-[#038d5a] disabled:opacity-30 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
              >
                Next &gt; <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Article Heading & Concept Explanation */}
            <div className="bg-[#161b22] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div>
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="px-3 py-1 rounded-full bg-[#04AA6D]/20 text-[#04AA6D] text-[10px] font-extrabold uppercase border border-[#04AA6D]/30">
                    {currentLesson.level} Level
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    ID: {currentLesson.id}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{currentLesson.title}</h1>
              </div>

              {/* Dynamic Language Explanation Card */}
              <div className="p-5 rounded-2xl bg-[#0d1117] border border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-[#04AA6D] uppercase tracking-wider flex items-center gap-1.5">
                  <Languages className="w-4 h-4" /> Explanation in {explanMode.toUpperCase()}:
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  {currentLesson.explanations[explanMode]}
                </p>
              </div>

              {/* Key Takeaways */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Takeaways & Syntax Rules:</h3>
                <div className="grid grid-cols-1 gap-2">
                  {currentLesson.keyTakeaways.map((takeaway, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300 bg-[#0d1117] p-3 rounded-xl border border-slate-800/80">
                      <CheckCircle2 className="w-4 h-4 text-[#04AA6D] shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* W3SCHOOLS SIGNATURE "TRY IT YOURSELF »" CODE SANDBOX */}
            <div className="bg-[#161b22] border-2 border-[#04AA6D] rounded-3xl overflow-hidden shadow-2xl flex flex-col">
              
              {/* Green Header Bar */}
              <div className="p-4 bg-[#04AA6D] text-white flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-white" />
                  <span className="text-sm font-extrabold tracking-wide">
                    W3Cortex Example & Live Sandbox
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyCode}
                    className="px-3 py-1.5 rounded-lg bg-black/20 hover:bg-black/40 text-white text-xs font-bold flex items-center gap-1 transition-all"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Copied!" : "Copy"}
                  </button>

                  <button
                    onClick={handleResetCode}
                    className="px-3 py-1.5 rounded-lg bg-black/20 hover:bg-black/40 text-white text-xs font-bold flex items-center gap-1 transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Reset
                  </button>

                  <button
                    onClick={handleRunCode}
                    disabled={isExecuting}
                    className="px-5 py-1.5 rounded-lg bg-white text-[#04AA6D] hover:bg-slate-100 font-extrabold text-xs shadow-lg flex items-center gap-1.5 transition-all"
                  >
                    <Play className="w-4 h-4 fill-[#04AA6D]" /> {isExecuting ? "Executing..." : "Try it Yourself »"}
                  </button>
                </div>
              </div>

              {/* Code Textarea Editor */}
              <div className="p-4 bg-[#0d1117] relative">
                <textarea
                  rows={10}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full bg-transparent font-mono text-xs text-emerald-300 focus:outline-none leading-relaxed resize-none selection:bg-[#04AA6D] selection:text-white"
                  spellCheck={false}
                />
              </div>

              {/* Live Output Terminal Console */}
              <div className="border-t border-slate-800 bg-[#090d16] p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <Terminal className="w-4 h-4" /> Live Output Window
                  </span>
                  <span className="text-emerald-400">● W3 Sandbox Live</span>
                </div>
                
                <div className="p-4 rounded-2xl bg-[#0d1117] border border-slate-800 font-mono text-xs text-emerald-400 whitespace-pre-wrap leading-relaxed min-h-[90px]">
                  {consoleOutput}
                </div>
              </div>
            </div>

            {/* W3SCHOOLS INTERACTIVE QUIZ ("TEST YOURSELF WITH EXERCISES") */}
            <div className="bg-[#161b22] border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-white">
                <HelpCircle className="w-5 h-5 text-[#04AA6D]" />
                <h3 className="text-base font-extrabold">Test Yourself With Exercises</h3>
              </div>

              <div className="p-4 rounded-2xl bg-[#0d1117] border border-slate-800 space-y-3">
                <p className="text-xs sm:text-sm font-semibold text-slate-200">
                  {currentLesson.quiz.question}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentLesson.quiz.options.map((option, idx) => {
                    const isSelected = selectedQuizOption === idx;
                    const isCorrect = idx === currentLesson.quiz.correctIndex;
                    let btnClass = "bg-[#161b22] hover:bg-slate-800 text-slate-300 border-slate-800";

                    if (quizSubmitted) {
                      if (isCorrect) {
                        btnClass = "bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold";
                      } else if (isSelected && !isCorrect) {
                        btnClass = "bg-rose-950/80 border-rose-500 text-rose-300";
                      }
                    } else if (isSelected) {
                      btnClass = "bg-[#04AA6D]/20 border-[#04AA6D] text-[#04AA6D] font-bold";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => !quizSubmitted && setSelectedQuizOption(idx)}
                        className={`p-3 rounded-xl border text-xs text-left transition-all flex items-center justify-between ${btnClass}`}
                      >
                        <span>{option}</span>
                        {quizSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={handleQuizSubmit}
                    disabled={selectedQuizOption === null || quizSubmitted}
                    className="px-5 py-2 rounded-xl bg-[#04AA6D] hover:bg-[#038d5a] disabled:opacity-40 text-white font-extrabold text-xs transition-all shadow-md"
                  >
                    Submit Answer »
                  </button>

                  {quizSubmitted && (
                    <span className="text-xs font-bold text-slate-300">
                      {selectedQuizOption === currentLesson.quiz.correctIndex
                        ? "🎉 Correct! Lesson marked completed."
                        : "❌ Incorrect. Try again!"}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Navigation (< Previous | Next >) */}
            <div className="flex items-center justify-between bg-[#161b22] border border-slate-800 rounded-2xl p-3">
              <button
                onClick={handlePrevLesson}
                disabled={activeLessonIndex === 0}
                className="px-4 py-2 rounded-xl bg-[#04AA6D] hover:bg-[#038d5a] disabled:opacity-30 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
              >
                <ArrowLeft className="w-4 h-4" /> &lt; Previous
              </button>

              <button
                onClick={handleNextLesson}
                disabled={activeLessonIndex === catalog.lessons.length - 1}
                className="px-4 py-2 rounded-xl bg-[#04AA6D] hover:bg-[#038d5a] disabled:opacity-30 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
              >
                Next &gt; <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </main>

          {/* RIGHT SIDEBAR: Gamified Stats, Reference Links & Ad Container */}
          <aside className="md:col-span-3 space-y-6">
            
            {/* Gamified Streak Card */}
            <div className="bg-[#161b22] border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
              <h3 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <Trophy className="w-4 h-4 text-emerald-400" /> My Learning Progress
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-[#0d1117] border border-slate-800 text-center">
                  <Flame className="w-5 h-5 text-orange-500 mx-auto mb-1 animate-bounce" />
                  <span className="text-lg font-black text-white">{streakDays} Days</span>
                  <span className="text-[10px] text-slate-400 block font-bold">Learning Streak</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#0d1117] border border-slate-800 text-center">
                  <CheckCircle2 className="w-5 h-5 text-[#04AA6D] mx-auto mb-1" />
                  <span className="text-lg font-black text-white">{completedLessons.length}</span>
                  <span className="text-[10px] text-slate-400 block font-bold">Topics Done</span>
                </div>
              </div>
            </div>

            {/* Quick Reference Panel */}
            <div className="bg-[#161b22] border border-slate-800 rounded-3xl p-5 space-y-3 shadow-xl">
              <h3 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-[#04AA6D]" /> Quick References
              </h3>
              <div className="space-y-2 text-xs">
                <a href="#editor" className="p-2.5 rounded-xl bg-[#0d1117] hover:bg-slate-800 text-slate-300 block flex items-center justify-between">
                  <span>HTML Tags Reference</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
                <a href="#editor" className="p-2.5 rounded-xl bg-[#0d1117] hover:bg-slate-800 text-slate-300 block flex items-center justify-between">
                  <span>CSS Properties List</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
                <a href="#editor" className="p-2.5 rounded-xl bg-[#0d1117] hover:bg-slate-800 text-slate-300 block flex items-center justify-between">
                  <span>JS Array Methods</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </div>
            </div>

            {/* Ad Container */}
            <div className="bg-[#161b22] border border-slate-800 rounded-3xl p-4">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2 text-center">
                Sponsored Advertisement
              </span>
              <GoogleAd adSlot="right-sidebar-ad" adFormat="auto" />
            </div>

          </aside>

        </div>
      </div>

    </div>
  );
}
