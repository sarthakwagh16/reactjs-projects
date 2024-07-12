import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

// Configure the body parser middleware before the routes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Configure the database client
const db = new pg.Client({
  host: "localhost",
  user: "postgres",
  password: "sarthak16",
  port: 5432,
  database: "world_capital"
});

db.connect();

// Define routes
app.get('/', async (req, res) => {
  const result = await db.query("select country_code from visited_countries");
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  console.log(result.rows);
  res.render("index.ejs", { countries: countries, total: countries.length });
});

async function checkVisited() {
  const result = await db.query("SELECT country_code FROM visited_countries");

  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

app.post("/add", async (req, res) => {
  const input = req.body["country"];
  try {
    const result = await db.query("select country_code from countries where country_name=$1", [input]);
    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query("insert into visited_countries (country_code) values ($1)", [countryCode]);
      res.redirect("/");
    } catch (err) {
      console.log(err);
      const countries= await checkVisited();
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "Country has already been added, try again."

      });
    }

  } catch (err) {
    console.log(err);
    const countries= await checkVisited();
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "Country name does not exist, try again."

    });
  }


});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
