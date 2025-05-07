import React from 'react';

function FormPost({ postContent, setPostContent, postTitle, setPostTitle, handlePostSubmit, setPostImage }) {
    return (
        <div className="p-4 bg-white m-3 rounded-xl shadow-sm">
            <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                <div className="text-gray-500">Qu'avez-vous en tête ?</div>
            </div>
            <form onSubmit={handlePostSubmit}>
                <input 
                    className="w-full p-3 bg-[#f5f5f5] border border-gray-200 rounded-lg focus:outline-none"
                    rows="2"
                    placeholder="Un titre ?"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)} />
                <textarea 
                    className="w-full p-3 bg-[#f5f5f5] border border-gray-200 rounded-lg focus:outline-none"
                    rows="2"
                    placeholder="Partagez vos pensées..."
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                ></textarea>
                <input 
                    type="file" 
                    className="w-full p-3 bg-[#f5f5f5] border border-gray-200 rounded-lg focus:outline-none mt-3"
                    onChange={(e) => setPostImage(e.target.files[0])}
                />
                <div className="flex justify-between mt-3">
                    <button 
                        type="submit"
                        className="px-4 py-2 bg-gray-800 text-white rounded-full text-sm font-medium"
                    >
                        Publier
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormPost;