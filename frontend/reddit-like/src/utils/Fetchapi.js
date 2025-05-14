export async function fetchPosts() {
    const url = "http://localhost:1337/api/posts?populate[0]=author&populate[1]=media&populate[2]=comments&populate[3]=sub";
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

export async function fetchSubsPosts(documentId) {
    const url = `http://localhost:1337/api/posts?filters[sub][documentId][$eqi]=${documentId}&populate[0]=author&populate[1]=media&populate[2]=comments&populate[3]=sub`;
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
    console.log(data);
    const postsWithCommentCount = data.data.map(post => ({
        ...post,
        commentCount: post.comments ? post.comments.length: 0,
    }));

    postsWithCommentCount.sort((a, b) => b.commentCount - a.commentCount);
    return postsWithCommentCount;
}