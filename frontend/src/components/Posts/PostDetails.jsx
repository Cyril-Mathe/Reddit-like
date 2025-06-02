import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Sidebar from "../Sidebar/Sidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PostDetails() {
  const { documentId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const UserId = token ? jwtDecode(token).id : null;

  useEffect(() => {
    fetchPostDetails();
  }, [documentId]);

  async function fetchPostDetails() {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_NEON_URL}/api/posts/${documentId}?populate=author,media`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200) {
        setPost(res.data.data);

        const commentsRes = await axios.get(
          `${import.meta.env.VITE_NEON_URL}/api/comments?filters[comments][documentId][$eq]=${documentId}&populate=author`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (commentsRes.status === 200) {
          setComments(commentsRes.data.data);
        } else {
          throw new Error("Erreur lors de la récupération des commentaires");
        }
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddComment(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_NEON_URL}/api/comments`,
        {
          data: {
            Description: newComment,
            post: post.id,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setComments((prev) => [...prev, res.data.data]);
        setNewComment("");
      }
    } catch (err) {
      setError(err);
      console.error("Erreur lors de l'ajout du commentaire :", err);
    }
  }

  async function handleDeleteComment(commentId) {
    try {
      await axios.delete(`${import.meta.env.VITE_NEON_URL}/api/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (err) {
      console.log(err)
      toast.warning("Vous ne pouvez pas supprimer ce commentaire !");
    }
  }

  async function handleUpdateComment(commentId, updatedText) {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_NEON_URL}/api/comments/${commentId}`,
        {
          data: {
            author: UserId,
            post: post.id,
            Description: updatedText,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        setComments((prev) =>
          prev.map((c) => (c.documentId === commentId ? res.data.data : c))
        );
        setEditCommentId(null);
      }
    } catch (err) {
      console.log(err)
      toast.warning("Vous ne pouvez pas modifier ce commentaire !");
    }
  }

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Chargement...</p>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-red-600">{error.message}</p>
      </div>
    );


  return (
    <div className=" flex flex-col items-center p-4 ml-64 dark:bg-[#111827]">
      <Sidebar />
      {post && (
        <div className="mb-6 w-[50%] dark:bg-[#e8f4e8] bg-[#111827] rounded-lg p-4 flex flex-col justify-center items-center">
          <h3 className="text-sm mb-1 dark:text-[#242424] text-white">
            @{post.author?.username || "Anonyme"}
          </h3>
          <h1 className="text-2xl font-bold mb-2 dark:text-[#242424] text-white">
            {post.title}
          </h1>
          <p className="mb-4 dark:text-[#242424] text-white">
            {post.description}
          </p>
          {post.media?.[0]?.url && (
            <img
              src={`${import.meta.env.VITE_NEON_URL}${post.media[0].url}`}
              alt="Illustration"
              className="w-full rounded-lg"
            />
          )}
        </div>
      )}

      <div className="mb-6 w-[100%] flex flex-col items-center">
        <h2 className="text-xl w-[75%] font-bold mb-4 dark:text-white">Commentaires</h2>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.documentId}
              className="mb-4 p-3 w-[75%] bg-gray-100 rounded-lg dark:bg-[#334155] dark:text-white items-center justify-between flex flex-row"
            >
              <div className="w-20% flex flex-col items-start">
              <h4 className="text-sm font-semibold text-violet-600 dark:text-white">
                @{comment.author?.username || "Anonyme"}
              </h4>
              <p className="text-xs text-gray-500 dark:text-white">
                {new Date(comment.createdAt).toLocaleString("fr-FR", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </p>
              
              {editCommentId === comment.documentId ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdateComment(comment.documentId, editCommentText);
                  }}
                >
                  <textarea
                    value={editCommentText}
                    onChange={(e) => setEditCommentText(e.target.value)}
                    className="w-full mt-2 p-2 border rounded "
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Enregistrer
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditCommentId(null)}
                      className="bg-gray-400 text-white px-3 py-1 rounded"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              ) : (
                <p className="mt-1">{comment.Description}</p>
              )}
              </div>
              {(UserId === comment.author?.id || UserId === post.author?.id) &&
                editCommentId !== comment.documentId && (
                  <div className="flex flex-col items-end gap-2 mt-2 w-[20%]">
                    {UserId === comment.author?.id && (
                      <button
                        onClick={() => {
                          setEditCommentId(comment.documentId);
                          setEditCommentText(comment.Description);
                        }}
                        className="bg-blue-600 text-white px-3 py-1 rounded w-[100px]"
                      >
                        Modifier
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteComment(comment.documentId)}
                      className="bg-red-600 text-white px-3 py-1 rounded w-[100px]"
                    >
                      Supprimer
                    </button>
                    
                  </div>
                )}
            </div>
          ))
        ) : (
          <p>Aucun commentaire pour le moment.</p>
        )}
      </div>

      <form onSubmit={handleAddComment} className="space-y-4 w-[100%] flex flex-col items-center">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Ajouter un commentaire..."
          className="p-3 border rounded dark:bg-[#334155] dark:text-white w-[75%]"
          rows="3"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded dark:text-white"
        >
          Ajouter un commentaire
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
