import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Post from '../components/Posts/ShowPosts';
import FormPost from '../components/Posts/FormPosts';
import MobileNavigation from '../components/Mobile/MobileNav';
import { fetchPosts, createPost } from '../utils/api';

function Homepage({ user, setUser }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [postTitle, setTitle] = useState("");
    const [postContent, setPostContent] = useState("");
    const [postImage, setPostImage] = useState(null)
    const [followedPosts, setFollowedPosts] = useState({});

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
  
    const handlePostSubmit = async (e) => {
        e.preventDefault();
        try {
            const newPost = await createPost(postContent, postTitle, postImage);
            setPosts([newPost, ...posts]);
            setPostContent("");
            console.log("Post créé avec succès :", newPost);
        } catch (error) {
            console.error("Erreur lors de la création du post :", error);
            setError(error);
        }
    };

    const toggleFollow = (postId) => {
        setFollowedPosts({
            ...followedPosts,
            [postId]: !followedPosts[postId]
        });
    };
    
    // Fonction pour rediriger vers la page Subreddits
    const goToSubreddits = () => {
        navigate('/subreddits');
    };
    
    // Fonction pour rediriger vers la page Messages
    const goToMessages = () => {
        navigate('/messages');
    };
    
    // Fonction pour rediriger vers la page Profile
    const goToProfile = () => {
        navigate('/profile');
    };
    
    // Fonction pour ouvrir le sélecteur de fichiers
    const handleImageClick = () => {
        fileInputRef.current.click();
    };
    
    // Fonction pour gérer la sélection d'image
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        }
    };

    return (
        <div className="min-h-screen bg-[#e8f4e8]">
            <div className="flex">
                <Sidebar setUser={setUser} />
                <div className="w-full md:ml-64">
                    <div className="max-w-2xl mx-auto">
                        <FormPost 
                            postContent={postContent} 
                            setPostContent={setPostContent}
                            postTitle={postTitle}
                            setPostTitle={setTitle}
                            postImage={postImage}
                            setPostImage={setPostImage}
                            handlePostSubmit={handlePostSubmit} 
                        />
                        {loading && <div>Chargement...</div>}
                        {error && <div>Erreur : {error.message}</div>}
                        {!loading && posts.map((post) => (
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

export default Homepage;