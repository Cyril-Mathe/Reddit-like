import { useState, useEffect } from "react";

function Sub() {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    async function fetchSubs() {
      try {
        const response = await fetch(
          "http://localhost:1337/api/subs?fields=Name,Description,createdAt&populate=Banner"
        );
        const json = await response.json();

        setSubs(json.data); 
      } catch (error) {
        console.error("Erreur de chargement :", error);
      }
    }

    fetchSubs();
  }, []);

  return (
    <div>
      {subs.map((item) => (
        <div key={item.id}>
          <h2>{item.Name}</h2>
          <p>{item.Description}</p>
          <p>{new Date(item.createdAt).toLocaleString()}</p>
          {item.Banner && item.Banner.url && (
            <img
              src={`http://localhost:1337${item.Banner.url}`}
              alt="banner"
              style={{ width: "300px", height: "auto" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Sub;
