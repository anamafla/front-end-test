import { useLoaderData } from "react-router-dom";
import Categories from "./Categories";
import "./Details.scss";

const Details = () => {
  const { item } = useLoaderData();

  return (
    <div className="item-details-container">
      {item.categories?.length > 0 && (
        <Categories categories={item.categories} />
      )}
      <div className="item-details">
        <div className="item-details__info">
          <div className="item-details-image">
            <img src={item.picture}></img>
          </div>
          <div className="item-details__description">
            <h3> Descripcion del producto</h3>
            <p>{item.description}</p>
          </div>
        </div>
        <div className="item-details__data">
          <small>
            {" "}
            {item.condition}- {item.sold_quantity} vendidos
          </small>
          <h2> {item.title}</h2>
          <p className="item-details__price">
            {" "}
            {item.price?.currency} {item.price?.amount}
          </p>
          <button>Comprar</button>
        </div>
      </div>
    </div>
  );
};
export default Details;

export async function detailsLoader({ params }) {
  const id = params.id;
  const newId = id.substring(1);

  const item = await getDetails(newId);
  return { item };
}

async function getDetails(id) {
  const response = await fetch(`http://localhost:3000/api/items/${id}`);
  const data = await response.json();

  return data.item;
}
