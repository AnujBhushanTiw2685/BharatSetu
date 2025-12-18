import { useParams } from "react-router-dom";

const SubCategory = () => {
  const { slug, subSlug } = useParams();

  return (
    <div>
      <h1 className="text-2xl font-bold capitalize">
        {slug} → {subSlug}
      </h1>
      <p className="mt-2">Details about {subSlug}</p>
    </div>
  );
};

export default SubCategory;
