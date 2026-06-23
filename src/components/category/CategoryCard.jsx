import { Link } from 'react-router-dom';

export default function CategoryCard({ category }) {
  return (
    <Link to={`/category/${category.id}`} className="category-card">
      <img src={category.image} alt="" className="category-card__image" loading="lazy" />
      <div className="category-card__overlay">
        <h3>{category.name}</h3>
        <p>{category.description}</p>
      </div>
    </Link>
  );
}
