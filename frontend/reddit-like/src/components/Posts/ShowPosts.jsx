import { useState } from "react";
import { Link } from "react-router";

function Post({ post, toggleFollow, followedPosts, userId }) {
  const [showLinks, setShowLinks] = useState(false);
  return (
    <div className="bg-white m-3 rounded-xl shadow-sm overflow-hidden dark:bg-[#334155] dark:text-white">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
            <img
              src={
                post.author?.Profilpic?.url
                  ? `http://localhost:1337${post.author.Profilpic.url}`
                  : "https://randomuser.me/api/portraits/men/1.jpg"
              }
              alt="Profil"
              className="w-full h-full object-cover"
            />
          </div>
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
            className={`px-3 py-1 rounded-full text-sm font-medium dark:bg-[#10B981]	 ${followedPosts[post.id]
              ? "bg-gray-200 text-gray-800"
              : "bg-[#e8f4e8] text-gray-700"
              }`}
          >
            {followedPosts[post.id] ? "Unfollow" : "Follow"}
          </button>
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
        <p className="text-gray-700 mb-4 dark:text-white">{post.description}</p>
        {post.media && (
          <div className="rounded-lg overflow-hidden mb-4">
            <img
              src={"http://localhost:1337" + post.media[0].url}
              alt="Illustration"
              className="w-full h-auto"
            />
          </div>
        )}
        <div className="flex gap-[1rem]">
          <Link to={`/post/${post.documentId}`} className="text-gray-500">
            💬 <span>{post.commentCount || 0}</span>
          </Link>
          {post?.author && post.author.id === userId && ( // rajout condition sinon marche po will
            <>
              <button
                onClick={() => setShowLinks(!showLinks)}
                className="text-gray-500"
              >
                {showLinks ? "👌" : "🚽"}
              </button>
              {showLinks && (
                <div className="flex gap-[1rem] mt-2">
                  <Link to={`/homepage/${post.documentId}`} className="text-green-500">
                    Modifier
                  </Link>
                  <Link to={`/homepage/supp/${post.documentId}`} className="text-red-500">
                    Supprimer
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
        <div className="text-xs text-gray-500">
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
