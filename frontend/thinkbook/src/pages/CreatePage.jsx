import { ArrowLeft } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import api from '../lib/axios';


const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

 const naviage = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault(e)
    setLoading(true)

    if(!title || !content){
      toast.error("Feilds Are Missing")
      setLoading(false)
      return
    }
    try {
      await api.post("/notes",{
        title,content
      })
      toast.success("Note Created Successfully")
      naviage()
    } catch (error) {
      toast.error("Failed to Connect with Server")      
    }
    finally{
      setLoading(false)
     
    }
    
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          
          {/* Back Button */}
          <Link to="/" className='btn btn-ghost mb-6 flex items-center gap-2'>
            <ArrowLeft className='size-5' />
            Back to Notes
          </Link>

          {/* Note Form */}
          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title font-bold mb-4'>Create a New Note</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <input 
                  type="text"
                  placeholder="Enter title"
                  className="input input-bordered w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />

                {/* Content */}
                <textarea
                  placeholder="Enter content"
                  className="textarea textarea-bordered w-full min-h-[150px]"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  
                ></textarea>

                {/* Submit Button */}
                <div className='card-actions justify-end'>

              <button className='btn btn-primary' type='submit' disabled={loading}>
                {/* {loading ? "Creating..." : "Create Note "} */}
                {loading ? "Ctreating..." : "Create a Note"}
              </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreatePage;
