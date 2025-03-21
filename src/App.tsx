import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';

function Page() {
  const [todos, setTodos] = useState<any[]>([]); // Ensure TypeScript handles any[] for now

  useEffect(() => {
    const getTodos = async () => {
      const { data: todos, error } = await supabase.from('todos').select();

      if (error) {
        console.error('Error fetching todos:', error);
      } else if (todos && todos.length > 0) {
        setTodos(todos);
      }
    };

    getTodos(); // Call async function inside useEffect
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.task}</li> 
        ))}
      </ul>
    </div>
  );
}

export default Page;
