import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Post from "../components/Posts/ShowPosts";
import FormPost from "../components/Posts/FormPosts";
import MobileNavigation from "../components/Mobile/MobileNav";
import { fetchPosts } from "../utils/Fetchapi";
import { jwtDecode } from "jwt-decode";
import SyncLoader from "react-spinners/SyncLoader";

function Homepage({ user, setUser }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [followedPosts, setFollowedPosts] = useState({});
  const token = localStorage.getItem("token");
  const userId = token ? jwtDecode(token).id : null;

  const [loadingScreen, setLoadingScreen] = useState(true);
  const [citation, setCitation] = useState("");

  // Citations
  const Mearde = {
    Cyril: "Cyril : ''Commit to the bitbucket'' ",
    Laurent: "Laurent : ''Pull request M.A.S.T.E.R'' ",
    Arthur: "Arthur : ''Git commit -m '🥚' '' ",
    Océane: "Océnae : ''Destructive Design'' ",
    William: "William : ''Revert the PC'' ",
  };

  useEffect(() => {
    const randomPhrase =
      Object.values(Mearde)[
        Math.floor(Math.random() * Object.values(Mearde).length)
      ];
    setCitation(randomPhrase);

    const timer = setTimeout(() => setLoadingScreen(false), 1574);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function loadPosts() {
      setLoading(true);
      try {
        const data = await fetchPosts();
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

  if (loadingScreen) {
    return (
      <div className="w-full h-screen bg-gray-500 fixed top-0 left-0 transition-transform duration-700">
        <div className="w-full h-full flex flex-col justify-center items-center gap-8">
          <img
            src="./assets/images/threadly.png"
            alt="Logo"
            className="w-75 h-auto"
          />
          <p className="text-5xl italic font-serif text-gray-300">{citation}</p>
          <SyncLoader
            loading
            color="#D1D5DC"
            margin={5}
            size={30}
            speedMultiplier={1}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e8f4e8] dark:bg-[#111827]">
      <div className="flex">
        <Sidebar setUser={setUser} />
        <div className="w-full md:ml-64">
            <div className="max-w-2xl mx-auto mt-10 p-8 bg-[#7c8b7f] shadow-lg rounded-2xl">
                <h2 className="text-3xl font-bold text-[#242424] mb-6 text-center">
                🔥 Top tendances 🔥
                </h2>
                <p className="text-center text-gray-700">
                  Découvrez les posts les plus populaires de la semaine !
                </p>
            </div>
          <div className="max-w-2xl mx-auto">
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
      </div>
      <MobileNavigation />
    </div>
  );
}

export default Homepage;
