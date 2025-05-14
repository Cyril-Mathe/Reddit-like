import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

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

  async function fetchPostDetails() {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:1337/api/posts/${documentId}?populate=author,media`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setPost(res.data.data);
        const commentsRes = await axios.get(
          `http://localhost:1337/api/comments?filters[comments][documentId][$eq]=${documentId}&populate=author`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (commentsRes.status === 200) {
          setComments(commentsRes.data.data);
        } else {
          throw new Error("Erreur lors de la récupération des commentaires");
        }
      } else {
        throw new Error("Post introuvable");
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
        `http://localhost:1337/api/comments`,
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
        setComments((prevComments) => [...prevComments, res.data.data]);
        setNewComment("");
      }
    } catch (err) {
      console.error("Erreur lors de l'ajout du commentaire :", err);
    }
  }

  useEffect(() => {
    fetchPostDetails();
  }, [documentId]);

  async function handleDeleteComment(documentId) {
    try {
      const res = await axios.delete(
        `http://localhost:1337/api/comments/${documentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.documentId !== documentId)
        );
        alert("Commentaire supprimé avec succès !");
        setNewComment("");
      }
    } catch (err) {
      alert("Vous ne pouvez pas supprimer ce commentaire !");
    }
  }

  async function handleUpdateComment(commentId, updatedText) {
    try {
      const res = await axios.put(
        `http://localhost:1337/api/comments/${commentId}`,
        {
          data: {
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
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.documentId === commentId ? res.data.data : comment
          )
        );
        alert("Commentaire modifié avec succès !");
        setEditCommentId(null);
      }
    } catch (err) {
      alert("Vous ne pouvez pas modifier ce commentaire !");
    }
  }

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-600">{error.message}</p>;

  return (
    <div className="p-4 flex flex-col items-center">
      {post && (
        <div className="mb-6 text-center">
          <h3 className="text-sm mb-2">
            @{post.author?.username || "Anonyme"}
          </h3>
          <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
          <p className="text-violet-700">{post.description}</p>
          {post.media && (
            <div className="rounded-lg overflow-hidden mb-4">
              <img
                src={"http://localhost:1337" + post.media[0].url}
                alt="Illustration"
                className="w-full h-auto"
              />
            </div>
          )}
        </div>
      )}

      <div className="mb-6 w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Commentaires</h2>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="p-3 border-b border-violet-200 flex flex-col"
            >
              <h3 className="text-sm font-semibold text-violet-600">
                @{comment.author?.username || "Anonyme"}
              </h3>
              <div>
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
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    ></textarea>
                    <button
                      type="submit"
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                    >
                      Enregistrer
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteComment(comment.documentId)}
                      className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg"
                    >
                      Supprimer
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditCommentId(null)}
                      className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg"
                    >
                      Annuler
                    </button>
                  </form>
                ) : (
                  <p className="text-gray-700">{comment.Description}</p>
                )}
                {UserId === post.author?.id && (
                  <button
                    onClick={() => handleDeleteComment(comment.documentId)}
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg"
                  >
                    Supprimer
                  </button>
                )}
                {comment.author?.id === UserId && (
                  <button
                    onClick={() => {
                      setEditCommentId(comment.documentId);
                      setEditCommentText(comment.Description);
                    }}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                  >
                    Modifier
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>Aucun commentaire pour le moment.</p>
        )}
      </div>

      <form onSubmit={handleAddComment} className="space-y-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Ajouter un commentaire..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
          rows="4"
        ></textarea>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Ajouter un commentaire
        </button>
      </form>
    </div>
  );
}