import { Link, useLoaderData } from "react-router-dom";
import Categories from "./Categories";
import FreeIcon from "./assets/icons/free-delivery.svg";
import "./ResultList.scss";

const ResultList = () => {
  const { results } = useLoaderData();

  return (
    <>
    {results.items.length > 0 &&
    <div className="results-container">
      {results.categories?.length > 0 && (
        <Categories categories={results.categories} />
      )}
      <div className="items-container">
        {results.items?.map((result, index) => {
          return (
            <Link to={`/items/:${result.id}`} key={result.id}>
              <div id={result.id} className="item-container">
                <img src={result.picture} alt={result.title} />
                <div className="item-data">
                  <p>
                    <span>
                      {result.price.currency} {result.price.amount}
                    </span>
                    <span className="item-data__shipping">
                      {result.free_shipping ? (
                        <img className="delivery-icon" src={FreeIcon} />
                      ) : (
                        ""
                      )}
                    </span>
                  </p>
                  <p>{result.title}</p>
                </div>
                <div>
                  <small>{result.state}</small>
                </div>
              </div>
              {index < results.items.length - 1 ? <hr></hr> : ""}
            </Link>
          );
        })}
      </div>
    </div>
  }
  </>
  );
};

export default ResultList;

export async function resultsLoader({ request }) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search");
  const results = await getResults(search);

  return { results };
}

async function getResults(search) {
  const response = await fetch(`http://localhost:3000/api/items?q=${search}`);
  const data = await response.json();
  return data;
}
