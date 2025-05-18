import { v4 as uuidv4 } from "uuid";
import type { Snippet } from "./snippetStorage";

/**
 * Sample snippets for new users to explore when they first use the app
 */
export const sampleSnippets: Snippet[] = [
  // JavaScript - React Hook
  {
    id: uuidv4(),
    title: "React useState Hook Example",
    content: `import React, { useState } from 'react';

function Counter() {
  // Declare a state variable named "count" with initial value 0
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default Counter;`,
    language: "javascript",
    tags: ["react", "hooks", "frontend"],
    liked: true,
    description: "A simple example of React's useState hook for managing component state",
    createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
    updatedAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
  },
  
  // TypeScript - Interface
  {
    id: uuidv4(),
    title: "TypeScript Interface Example",
    content: `// Define an interface for a User object
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: Date;
  roles?: string[]; // Optional property
}

// Function that accepts a User object
function createUser(user: User): User {
  // Implementation...
  return {
    ...user,
    isActive: true,
    createdAt: new Date()
  };
}

// Usage
const newUser = createUser({
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  isActive: false,
  createdAt: new Date()
});

console.log(newUser);`,
    language: "typescript",
    tags: ["typescript", "interfaces", "types"],
    liked: false,
    description: "Example of TypeScript interfaces for type-safe object definitions",
    createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000, // 5 days ago
    updatedAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
  },
  
  // Python - Data Analysis
  {
    id: uuidv4(),
    title: "Python Pandas Data Analysis",
    content: `import pandas as pd
import matplotlib.pyplot as plt

# Load data from CSV
df = pd.read_csv('data.csv')

# Display basic statistics
print(df.describe())

# Clean data - remove rows with missing values
df_clean = df.dropna()

# Group by a column and calculate mean
grouped = df_clean.groupby('category').mean()

# Create a simple visualization
plt.figure(figsize=(10, 6))
grouped['value'].plot(kind='bar')
plt.title('Average Value by Category')
plt.ylabel('Value')
plt.tight_layout()
plt.savefig('analysis_result.png')
plt.show()`,
    language: "python",
    tags: ["python", "pandas", "data-analysis"],
    liked: true,
    description: "Basic data analysis workflow using Python's Pandas library",
    createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000, // 3 days ago
    updatedAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
  },
  
  // CSS - Flexbox Layout
  {
    id: uuidv4(),
    title: "CSS Flexbox Layout",
    content: `.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.item {
  flex: 1 1 300px;
  min-height: 150px;
  background-color: #3498db;
  color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}`,
    language: "css",
    tags: ["css", "flexbox", "responsive"],
    liked: false,
    description: "Modern CSS flexbox layout with responsive design",
    createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
    updatedAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
  },
  
  // SQL - Query Example
  {
    id: uuidv4(),
    title: "SQL Join Query Example",
    content: `-- Find all customers and their orders with product details
SELECT 
  c.customer_id,
  c.first_name,
  c.last_name,
  c.email,
  o.order_id,
  o.order_date,
  p.product_name,
  p.price,
  oi.quantity,
  (p.price * oi.quantity) AS subtotal
FROM 
  customers c
LEFT JOIN 
  orders o ON c.customer_id = o.customer_id
LEFT JOIN 
  order_items oi ON o.order_id = oi.order_id
LEFT JOIN 
  products p ON oi.product_id = p.product_id
WHERE 
  o.order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
ORDER BY 
  c.customer_id, o.order_date DESC;`,
    language: "sql",
    tags: ["sql", "database", "joins"],
    liked: true,
    description: "SQL query example showing joins between multiple tables",
    createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 day ago
    updatedAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
  }
];

/**
 * Function to initialize the app with sample snippets
 * @returns Promise<boolean> indicating success or failure
 */
export const initializeSampleSnippets = async (
  saveFunction: (snippets: Snippet[]) => Promise<boolean>
): Promise<boolean> => {
  try {
    return await saveFunction(sampleSnippets);
  } catch (error) {
    console.error("Error initializing sample snippets:", error);
    return false;
  }
};
