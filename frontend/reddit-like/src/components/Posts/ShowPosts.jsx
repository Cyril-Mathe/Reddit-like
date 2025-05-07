import React from 'react';

function Post({ post, toggleFollow, followedPosts }) {
    return (
        <div className="bg-white m-3 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                        <img 
                            src={post.user?.profilePic || "https://randomuser.me/api/portraits/men/1.jpg"} 
                            alt="Profil" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <div className="font-medium text-sm">@{post.author?.username || "Anonyme"}</div>
                    </div>
                </div>
                <div>
                    <button 
                        onClick={() => toggleFollow(post.id)} 
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                            followedPosts[post.id] 
                                ? 'bg-gray-200 text-gray-800' 
                                : 'bg-[#e8f4e8] text-gray-700'
                        }`}
                    >
                        {followedPosts[post.id] ? 'Unfollow' : 'Follow'}
                    </button>
                </div>
            </div>
            <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-700 mb-4">{post.description}</p>
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
        </div>
    );
}

export default Post;