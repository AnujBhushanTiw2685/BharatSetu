import { useParams } from "react-router-dom";

const Article = () => {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-2xl font-bold">Article ID: {id}</h1>
      <p className="mt-2">Article content will go here.</p>
    </div>
  );
};

export default Article;
