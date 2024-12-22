import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostsPage from "./pages/PostsPage";
import CreatePostPage from "./pages/CreatePostPage";
import PostDetailsPage from "./pages/PostDetailsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PostsPage />} />
        <Route path="/create" element={<CreatePostPage />} />
        <Route path="/posts/:postId" element={<PostDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
