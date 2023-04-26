const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const urlCurrency = `https://api.mercadolibre.com/currencies/`;

const getCurrency = async (currencyId) => {
  const response = await fetch(urlCurrency + currencyId);
  const data = await response.json();
  return data;
};

app.use(cors());

app.get("/api/items", async (req, res) => {
  const query = req.query.q;

  const url = `https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=4`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const promises = data.results.map(async (item) => {
      const currency = await getCurrency(item.currency_id);

      return {
        id: item.id,
        title: item.title,
        price: {
          currency: currency.symbol,
          amount: item.price,
          decimals: currency.decimal_places,
        },
        picture: item.thumbnail,
        condition: item.condition,
        state: item.address.state_name,
        free_shipping: item.shipping.free_shipping,
      };
    });

    const dataFormated = await Promise.all(promises);
    const dataCategories = data.filters[0]?.values[0]?.path_from_root.map(
      (item) => {
        return item.name;
      }
    );

    res.send({
      author: {
        name: "Ana",
        lastname: "Mafla",
      },
      categories: dataCategories,
      items: dataFormated,
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/items/:id", async (req, res) => {
  const id = req.params.id;
  const url = `https://api.mercadolibre.com/items/${id}`;
  const urlDescription = `https://api.mercadolibre.com/items/${id}/description`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const responseDescription = await fetch(urlDescription);
    const dataDescription = await responseDescription.json();
    const currency = await getCurrency(data.currency_id);

    const urlCategories = `https://api.mercadolibre.com/categories/${data.category_id}`;
    const responseCategories = await fetch(urlCategories);
    const dataCategories = await responseCategories.json();

    const dataFormated = {
      id: data.id,
      title: data.title,
      price: {
        currency: currency.symbol,
        amount: data.price,
        decimals: currency.decimal_places,
      },
      picture: data.pictures[0]?.url,
      condition: data.condition,
      free_shipping: data.shipping.free_shipping,
      sold_quantity: data.sold_quantity,
      description: dataDescription.plain_text,
      categories: [dataCategories.name],
    };

    res.send({
      author: {
        name: "Ana",
        lastname: "Mafla",
      },
      item: dataFormated,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
