import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios.js";

const EditNote = () => {
  const [note, setNote] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        toast.error("Failed to fetch note");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  // ✅ FIXED delete
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await api.delete(`/notes/${id}`);
        toast.success("Note deleted successfully");
        navigate("/");
      } catch (error) {
        toast.error("Failed to delete note");
      }
    }
    navigate("/")
  };


  const handleSave = async (e) => {
    e.preventDefault();
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title and content");
      return;
    }
    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
    } catch (error) {
      toast.error("Failed to update");
    } finally {
      setSaving(false);
    }
    navigate("/")
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-6">

          {/* Back Button */}
          <div className="flex items-center justify-between">
            <Link className="btn btn-ghost" to={"/"}>
              <ArrowLeftIcon className="size-5 mr-2" />
              Back to Notes
            </Link>
          </div>

          {/* Edit Form */}
          <form
            onSubmit={handleSave}
            className="card bg-base-100 shadow-xl p-6 space-y-4"
          >
            <h1 className="text-2xl font-bold mb-4">Edit Note</h1>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
                className="input input-bordered w-full"
                placeholder="Enter note title"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Content</span>
              </label>
              <textarea
                value={note.content}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
                rows={6}
                className="textarea textarea-bordered w-full"
                placeholder="Enter note content"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={saving}
                className="btn btn-primary"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="btn btn-error btn-outline flex items-center gap-2"
              >
                <Trash2Icon className="size-5" />
                Delete Note
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditNote;
