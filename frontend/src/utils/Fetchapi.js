export async function fetchPosts() {
    const url = `${import.meta.env.VITE_NEON_URL}/api/posts?populate=author.avatar&populate=media&populate=sub&populate=comments`;

    const token = localStorage.getItem("token");

    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error("Erreur réseau");
    }

    const data = await response.json();
    
    const postsWithCommentCount = data.data.map(post => ({
        ...post,
        commentCount: post.comments ? post.comments.length: 0,
    }));

    postsWithCommentCount.sort((a, b) => b.commentCount - a.commentCount);
    console.log(postsWithCommentCount);
    return postsWithCommentCount;
}

export async function fetchSubsPosts(documentId) {
    const url = `${import.meta.env.VITE_NEON_URL}/api/posts?filters[sub][documentId][$eqi]=${documentId}&populate[0]=author.avatar&populate[1]=media&populate[2]=comments&populate[3]=sub`;
    const token = localStorage.getItem("token");

    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error("Erreur réseau");
    }

    const data = await response.json();
    const postsWithCommentCount = data.data.map(post => ({
        ...post,
        commentCount: post.comments ? post.comments.length: 0,
    }));

    postsWithCommentCount.sort((a, b) => b.commentCount - a.commentCount);
    return postsWithCommentCount;
}

export async function fetchSubAuthor(subDocumentId) {
    const url = `${import.meta.env.VITE_NEON_URL}/api/subs?filters[documentId][$eqi]=${subDocumentId}&populate[0]=author&populate[1]=posts`;
    const token = localStorage.getItem("token");

    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error("Erreur réseau");
    }

    const data = await response.json();
    return data;
}

export async function fetchUserAvatar() {

    const url = `${import.meta.env.VITE_NEON_URL}/api/posts?populate[0]=comments&populate[author][populate][0]=avatar`;    
    const token = localStorage.getItem("token");

    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error("Erreur réseau");
    }

    const data = await response.json();

    const avatarAuthor = data.data.map(post => {
        if (post.author) {
            return post.author.avatar
        }
    })

    const avatarUrls = data.data.map(post => {
        if (post.author.avatar) {
            return post.author.avatar.url;
        }
    });
    return {avatarUrls, avatarAuthor};
}