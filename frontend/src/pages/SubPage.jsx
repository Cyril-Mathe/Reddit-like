import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import { fetchSubsPosts } from "../utils/Fetchapi";
import FormPost from "../components/Posts/FormPosts";
import Post from "../components/Posts/ShowPosts";
import MobileNavigation from "../components/Mobile/MobileNav";
import { jwtDecode } from "jwt-decode";

function SubPage({ setUser }) {
  const { documentId } = useParams();
  const [posts, setPosts] = useState([]);
  const [followedPosts, setFollowedPosts] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const userId = token ? jwtDecode(token).id : null;

  const addPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  useEffect(() => {
    async function loadPosts() {
      setLoading(true);
      try {
        const data = await fetchSubsPosts(documentId);
        setPosts(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  const toggleFollow = (postId) => {
    setFollowedPosts({
      ...followedPosts,
      [postId]: !followedPosts[postId],
    });
  };

  return (
    <div className="min-h-screen bg-[#e8f4e8] dark:bg-[#111827]">
      <div className="flex">
      <Sidebar setUser={setUser} />
      <div className="w-full md:ml-64">
          <div className="max-w-2xl mx-auto">
            <FormPost addPost={addPost} documentId={documentId} />
            {loading && <div>Chargement...</div>}
            {error && <div>Erreur : {error.message}</div>}
            {!loading &&
              posts.map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  userId={userId}
                  toggleFollow={toggleFollow}
                  followedPosts={followedPosts}
                />
              ))}
          </div>
        </div>
        <Link to="/subs" className="fixed bottom-6 right-6 bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-800 transition">
              Retour aux Threads
        </Link>
      </div>
      <MobileNavigation />
    </div>
  );
}

export default SubPage;
