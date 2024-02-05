const socket = io();

socket.on("connect", () => {
  console.log("Conexión establecida con éxito");
});

const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");

productForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const productName = document.getElementById("productName").value;
  const productAction = document.getElementById("productAction").value;

  socket.emit("productAction", { name: productName, action: productAction });
});

socket.on("updateProducts", (products) => {
  let productHTML = "";

  if (products.length > 0) {
    products.forEach((product) => {
      productHTML += `<li>
        ID: ${product.id}<br>
        Nombre: ${product.product ? product.product.title : product.title}<br>
        Descripción: ${product.product ? product.product.description : product.description}<br>
        Categoría: ${product.product ? product.product.category : product.category}<br>
        Precio: ${product.product ? product.product.price : product.price}<br>
        Imagen: ${product.product ? product.product.thumbnails.join(', ') : product.thumbnails}<br>
        <hr>
      </li>`;
    });
  } else {
    productHTML = "<p>No hay productos disponibles.</p>";
  }

  productList.innerHTML = productHTML;
});
