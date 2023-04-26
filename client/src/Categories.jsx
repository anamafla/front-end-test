import "./Categories.scss";
import GreaterIcon from "./assets/icons/greater-than.svg";

const Categories = ({ categories }) => {
  return (
    <div className="category-container">
      {categories?.map((category, index) => {
        return (
          <span key={index}>
            <span>{category}</span>
            {index < categories.length - 1 ? (
              <span className="category-container__separator">
                <img
                  className="greater-icon"
                  src={GreaterIcon}
                />
              </span>
            ) : (
              ""
            )}
          </span>
        );
      })}
    </div>
  );
};

export default Categories;
