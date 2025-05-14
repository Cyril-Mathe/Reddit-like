import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import Sidebar from "../components/Sidebar/Sidebar";
import { SyncLoader } from "react-spinners";
import { fetchSubsPosts } from "../utils/Fetchapi";
import FormPost from "../components/Posts/FormPosts";
import Post from "../components/Posts/ShowPosts";
import MobileNavigation from "../components/Mobile/MobileNav";

function SubPage({ user, setUser }) {
  const { documentId } = useParams();
  const [sub, setSub] = useState(null);
  const [posts, setPosts] = useState([]);
  const [followedPosts, setFollowedPosts] = useState({});
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

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
                  toggleFollow={toggleFollow}
                  followedPosts={followedPosts}
                />
              ))}
          </div>
        </div>
      </div>
      <MobileNavigation />
    </div>
  );
}

export default SubPage;
