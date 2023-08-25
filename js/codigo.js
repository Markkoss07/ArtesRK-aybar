
// CARRITO

const btnCart = document.querySelector('.iconoCarrito');
const containerCartProducts = document.querySelector('.conteinercarroProducto');

btnCart.addEventListener('click', () => {
	containerCartProducts.classList.toggle('carritoOculto');
});

/* ========================= */
const cartInfo = document.querySelector('.carritoProducto');
const rowProduct = document.querySelector('.filadeProducto');

// // Lista de los contenedores de productos
const productsList = document.querySelector('.ventadeProductos');


let allProducts = [];

const valorTotal = document.querySelector('.totalPagar');

const countProducts = document.querySelector('#contadordeProductos');

const cartEmpty = document.querySelector('.carritoVacio');
const cartTotal = document.querySelector('.carritoTotal');

productsList.addEventListener('click', e => {
	if (e.target.classList.contains('botonComprar')) {
		const product = e.target.parentElement;

		const infoProduct = {
			quantity: 1,
			title: product.querySelector('.tituloProducto').textContent,
			price: product.querySelector('.precio').textContent,
		};

		Toastify({
			text: "Agregaste al carrito",
			duration: 2000,
			destination: "",
			newWindow: true,
			close: false,
			gravity: "top",
			position: "right", 
			stopOnFocus: true, 
			style: {
			  background: "linear-gradient(to right, #00b09b, #96c93d)",
			},
			onClick: function(){}
		  }).showToast();

		const exits = allProducts.some(
			product => product.title === infoProduct.title
		);

		if (exits) {
			const products = allProducts.map(product => {
				if (product.title === infoProduct.title) {
					product.quantity++;
					return product;
				} else {
					return product;
				}
			});
			allProducts = [...products];
		} else {
			allProducts = [...allProducts, infoProduct];
		}

		showHTML();
	}
});

rowProduct.addEventListener('click', e => {
	if (e.target.classList.contains('cerrarIcono')) {
		const product = e.target.parentElement;
		const title = product.querySelector('p').textContent;

		allProducts = allProducts.filter(
			product => product.title !== title
		);
		
		Toastify({
			text: "Eliminaste un producto",
			duration: 3000,
			destination: " ",
			newWindow: true,
			close: false,
			gravity: "bottom",
			position: "right", 
			stopOnFocus: true, 
			style: {
			  background: "linear-gradient(to right, #b02600, #f5c60a)",
			},
			onClick: function(){}
		  }).showToast();

		console.log(allProducts);

		showHTML();
	}
});

// // mostrar  HTML
const showHTML = () => {
	if (!allProducts.length) {
		cartEmpty.classList.remove('oculto');
		rowProduct.classList.add('oculto');
		cartTotal.classList.add('oculto');
	} else {
		cartEmpty.classList.add('oculto');
		rowProduct.classList.remove('oculto');
		cartTotal.classList.remove('oculto');
	}

	// limpiar HTML
	rowProduct.innerHTML = '';

	let total = 0;
	let totalOfProducts = 0;

	allProducts.forEach(product => {
		const containerProduct = document.createElement('div');
		containerProduct.classList.add('carritoProducto');

		containerProduct.innerHTML = `
            <div class="info-carrito-producto">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="cerrarIcono"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;

		rowProduct.append(containerProduct);

		total =
			total + parseInt(product.quantity * product.price.slice(1));
		totalOfProducts = totalOfProducts + product.quantity;
	});

	valorTotal.innerText = `$${total}.000`;
	countProducts.innerText = totalOfProducts;
};
