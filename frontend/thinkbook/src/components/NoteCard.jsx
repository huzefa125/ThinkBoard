import { PenSquareIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/utils.js";
import api from "../lib/axios.js";
import toast from "react-hot-toast";

const NoteCard = ({ note,setNotes }) => {
    const handleClick = async (e,id) => {
        e.preventDefault()
        if(!window.confirm("Are you sunre to deleted this")) return;
        try{
            await api.delete(`/notes/${id}`)
            setNotes((prev)=> prev.filter((note)=> note._id !== id))
            toast.success("deleted succesfuuly")
        }catch(error){
            toast.error("unable to delete")
            console.log(error);
            
        }
    }
  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00ff90] p-4 rounded-lg"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70">{note.content.slice(0, 100)}...</p>

        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(note.createdAt)}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button className="btn btn-ghost btn-xs text-error">
              <Trash2Icon className="size-4" onClick={(e)=>handleClick(e,note._id)} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
