import { useEffect } from "react";

function App() {
  const posts = [
    {
      title: "Networking Truths",
      description:
        "Stop networking only when you need a job. Build genuine relationships when you want nothing from them. True professional networks are built on mutual value created over years. Reach out to one old colleague today just to check in.",
    },
    {
      title: "Simplifying Work",
      description:
        "Complexity is often mistaken for deep intelligence. True expertise is explaining a highly complicated topic to a five-year-old child. Strip away the corporate jargon from your next presentation. Your audience will thank you for the absolute clarity.",
    },
    {
      title: "Mentorship Impact",
      description:
        "A great mentor does not give you all the answers. They challenge you by asking the right open-ended questions. One conversation can alter the entire trajectory of a career. Who is the one person who changed your professional path?",
    },
    {
      title: "Burnout Warning",
      description:
        "Working 60 hours a week is not a badge of honor. It is often a sign of poor boundaries or broken processes. Consistent rest is an essential component of high performance. Protect your weekend to ensure you can sustain your long-term career growth.",
    },
    {
      title: "AI Collaboration",
      description:
        "Artificial intelligence will not replace human professionals. Instead, professionals using AI will replace those who refuse to adapt. Treat these new tools as interns that require clear direction and critical review. How are you using automation today?",
    },
  ];

  // setInterval(() => {
  //   posts.push({
  //     title: "ABC",
  //     description: "XYZ",
  //   });
  //   console.log(posts.length);
  // }, 1000);

  return (
    <div style={{ paddingLeft: "100px", paddingRight: "100px" }}>
      <h1 style={{ textAlign: "center" }}>Posts</h1>
      {/* {Post()} this will work also */}
      {posts.map((p, index) => (
        <Post key={index} title={p.title} content={p.description} />
      ))}
    </div>
  );
}

function Post(props) {
  return (
    <div
      style={{
        border: "1px solid white",
        borderRadius: "20px",
        padding: "20px",
        margin: "10px",
      }}
    >
      <h2>{props.title}</h2>
      <p>{props.content}</p>
      <button>Read more...</button>
    </div>
  );
}

export default App;
