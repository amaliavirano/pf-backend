const App = require("./app");
const CartsRoutes = require("./routes/carts.routes");
const ProductRoutes = require("./routes/products.routes");
const ViewRoutes = require("./routes/views.routes");

const app = new App([new ProductRoutes(),new CartsRoutes(), new ViewRoutes()]);

app.listen();