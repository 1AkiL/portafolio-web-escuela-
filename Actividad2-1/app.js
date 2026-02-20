const URL = 'https://fakestoreapi.com/products';
const contenedor = document.getElementById('contenedor');
async function obtenerProductos() {
const respuesta = await fetch(URL);
const datos = await respuesta.json();
renderizar(datos);
}
function renderizar(productos) {
productos.forEach(prod => {

// AQUÍ ESTÁ LA MAGIA DE BOOTSTRAP
// col-12: En celular ocupa todo el ancho.
// col-md-6: En Tablet ocupa la mitad.
// col-lg-3: En PC ocupa un cuarto (4 columnas).
contenedor.innerHTML += `
<div class="col-12 col-md-6 col-lg-3 mb-4">
<div class="card h-100 shadow-sm">
<img src="${prod.image}" class="card-img-top p-3" style="height:200px; object-fit:co
<div class="card-body d-flex flex-column">
<h5 class="card-title text-truncate">${prod.title}</h5>
<p class="card-text fw-bold text-success">$${prod.price}</p>
<a href="#" class="btn btn-primary mt-auto">Comprar</a>
</div>
</div>
</div>
`;
});
}
obtenerProductos();