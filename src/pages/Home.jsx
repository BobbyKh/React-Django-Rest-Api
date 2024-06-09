import { useState , useEffect } from "react";
import api from "../api";

function Home() {
    const [notes , setNotes] = useState([])
    const [content , setContent] = useState("")
    const [title , setTitle] = useState("")

    useEffect(() => {
        getNotes()
    }, [])


    const getNotes = async () => {
        try {
            const response = await api.get("/api/notes/");
            setNotes(response.data);
        } catch (error) {
            console.error(error);
        }
    };


    const deleteNote = async (id) => {
        try {
            const response = await api.delete(`/api/notes/delete/${id}`);
            if (response.status === 204) {
                alert("Note deleted");
            } else {
                alert("Failed to delete note");
            }
            getNotes();
        } catch (error) {
            alert("Failed to delete note");
        }
    };
        
  

    

    const createNote = async () => {
        try {
            const response = await api.post("/api/notes/", { content, title });
            if (response.status === 201) {
                alert("Note created");
                getNotes();
            } else {
                alert("Failed to create note");
            }
        } catch (error) {
            alert("Failed to create note");
        }
    };


    return (
        <>

        
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold mb-6 text-indigo-700">Notes App</h1>  
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
                            Title
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="title"
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="content">
                            Content
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="content"
                            placeholder="Content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                            onClick={createNote}
                        >
                            Create Note
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold mb-6">Notes</h1>
                    <ul className="list-none">
                        {notes.map((note) => (
                            <li
                                key={note.id}
                                className="border-b border-gray-200 py-4"
                            >
                                <h2 className="text-lg font-medium">{note.title}</h2>
                                <p className="text-gray-600">{note.content}</p>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    onClick={() =>  deleteNote(note.id)}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )

    
}

export default Home