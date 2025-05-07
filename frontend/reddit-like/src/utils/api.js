export async function fetchPosts() {
    const url = "http://localhost:1337/api/posts?populate[0]=author&populate[1]=media";
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
    return data.data;
}

export async function createPost(postContent, postTitle, postImage) {
    const url = "http://localhost:1337/api/posts";
    const token = localStorage.getItem("token");

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            data: {
                title: postTitle,
                description: postContent,
                media: {
                    url: postImage
                }
            }
        }),
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la création du post");
    }

    const data = await response.json();
    return data.data;
}