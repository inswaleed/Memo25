import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [memos, setMemos] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchMemos();
  }, []);

  const fetchMemos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/memos');
      setMemos(response.data);
    } catch (error) {
      console.error('Error fetching memos:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/memos', { title, content });
      setTitle('');
      setContent('');
      fetchMemos();
    } catch (error) {
      console.error('Error creating memo:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Memo25</h1>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Memo Title"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Memo Content"
            className="w-full p-2 border rounded"
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Memo
        </button>
      </form>

      <div className="grid gap-4">
        {memos.map((memo) => (
          <div key={memo.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-bold">{memo.title}</h2>
            <p className="mt-2">{memo.content}</p>
            <p className="text-sm text-gray-500 mt-2">
              {new Date(memo.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;