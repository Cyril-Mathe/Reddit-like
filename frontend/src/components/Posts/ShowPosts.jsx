import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
// import { fetchUserAvatar } from "../../utils/Fetchapi";

function Post({ post, toggleFollow, followedPosts, userId }) {
  const [showLinks, setShowLinks] = useState(false);
  // const [AvatarAuthor, setAvatarAuthor] = useState(null);
  // const [AvatarUrls, setAvatarUrls] = useState(null);
  const menuRef = useRef(null);

  // useEffect(() => {
  //   async function fetchAvatar() {
  //     try {
  //       const {AvatarAuthor, AvatarUrls} = await fetchUserAvatar();
  //       setAvatarAuthor(AvatarAuthor);
  //       setAvatarUrls(AvatarUrls);
  //     } catch (error) {
  //       console.error("Erreur lors de la récupération de l'avatar :", error);
  //     }
  //   }
  //   fetchAvatar();
  // }, []);

  // Gestionnaire qui permet de fermer le menu quand on clique ailleurs sur la page
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowLinks(false);
      }
    }
    
    if (showLinks) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLinks]);

  return (
    <div className="bg-white m-3 rounded-xl shadow-sm overflow-hidden dark:bg-[#334155] dark:text-white">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {post.author?.avatar && (
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
            <img
              src={
                `${import.meta.env.VITE_NEON_URL}` + post.author?.avatar.url ||
                "https://randomuser.me/api/portraits/men/1.jpg"
              }
              alt="Profil"
              className="w-full h-full object-cover"
            />
          </div>
          )}
          <div>
            <div className="font-medium text-sm">
              @{post.author?.username || "Anonyme"}
            </div>
            <div className="text-xs text-gray-500">
              {post.sub?.Name || "Sans sous-forum"}
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={() => toggleFollow(post.id)}
            className={`px-3 py-1 rounded-full text-sm font-medium dark:bg-[#10B981] ${
              followedPosts[post.id]
                ? "bg-gray-200 text-gray-800"
                : "bg-[#e8f4e8] text-gray-700"
            }`}
          >
            {followedPosts[post.id] ? "Unfollow" : "Follow"}
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
          {post.author?.id === userId && (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowLinks(!showLinks)}
                className="text-gray-500 flex justify-center items-center p-1"
              >
                <span className="font-bold tracking-tighter">•••</span>
              </button>
              
              {showLinks && (
                <div className="absolute right-0 top-10 z-10 bg-white dark:bg-gray-800 rounded-md shadow-md w-28">
                  <Link 
                    to={`/homepage/${post.documentId}`} 
                    className="block w-full py-2 px-3 text-sm text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700"
                  >
                    Modifier
                  </Link>
                  <Link 
                    to={`/homepage/supp/${post.documentId}`} 
                    className="block w-full py-2 px-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Supprimer
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
        <p className="text-gray-700 mb-4 dark:text-white break-all">{post.description}</p>
        {post?.media && (
          <div className="rounded-lg overflow-hidden mb-4">
            <img
              src={`${import.meta.env.VITE_NEON_URL}` + post.media[0].url}
              alt="Illustration"
              className="w-full h-auto"
            />
          </div>
        )}
        <div className="flex gap-[1rem] justify-between items-center h-6">
          <Link to={`/post/${post.documentId}`} className="text-gray-500">
            💬 <span>{post.commentCount || 0}</span>
          </Link>
        </div>
        <div className="text-xs mt-2 text-gray-500 dark:text-white">
          {new Date(post.createdAt).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;