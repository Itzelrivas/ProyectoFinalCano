//Capturamos al dom la sección de agregar y eliminar productos
let aeProductosSeccion = document.getElementById("aeProductosSeccion")
let aeProductosBtn = document.getElementById("botonesPri__cda--aeproductos")

//Función del boton agregar y eliminar productos
aeProductosBtn.addEventListener("click", () => {
    productosDiv.innerHTML = ``
    productosAgotados.innerText = ``
    presupuesto.innerText = ``
    oculCatalogoBtn.innerText = ``
    filtroCatalogo.innerText = ``
    descuentoSeccion.innerText = ``
    modalBodyCarrito.innerText = ``
    carritoTotal.innerText = ``

    //Contraseña para tener acceso a la función 
    let contraseñaProductos = document.createElement("div")
    contraseñaProductos.className = "conProductosSeccion"
    contraseñaProductos.innerHTML = `
    <label class="conSeccion">Ingresa la contraseña: <input id="contraseñaIngresada" type="text"></label><br>
    <button id="botonContraseña" class="btnContraseña">Cargar</button>
    `
    aeProductosSeccion.appendChild(contraseñaProductos)
    let botonConIngresada = document.getElementById("botonContraseña") 
    botonConIngresada.addEventListener("click", () => {
        let contraseñaIn = document.getElementById("contraseñaIngresada").value
        if(contraseñaIn == "1183"){
            aeProductosSeccion.innerText = ``
            let seleccionAgregar = document.createElement("div")
            seleccionAgregar.className = "seleccionAgregarDiv"
            seleccionAgregar.innerHTML = `
            <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Agregar o eliminar productos
            </button>
            <ul class="dropdown-menu dropdown-menu-dark">
              <li><a id="agregar" class="dropdown-item">Agregar :)</a></li>
              <li><a id="eliminar" class="dropdown-item">Eliminar :(</a></li>
            </ul>
          </div>
            `
            aeProductosSeccion.appendChild(seleccionAgregar)

            let agregarProductosBtn = document.getElementById("agregar")
            let eliminarProductosBtn = document.getElementById("eliminar")

            //Agregar productos
            agregarProductosBtn.addEventListener("click", () => {
                aeProductosSeccion.innerText = ``
                let formularioAgregar = document.createElement("div")
                formularioAgregar.className = "formAgregarEliminarDiv"
                formularioAgregar.innerHTML = `
                <label class="formAgregar">Producto: <input id="formAgregarProducto" type="text"></label><br>
                <label class="formAgregar">Categoría (bolsas, camisas, cremasLociones, vestidos, zapatos): <input id="formAgregarCategoria" type="text"></label><br>
                <label class="formAgregar">Marca: <input id="formAgregarMarca" type="text"></label><br>
                <label class="formAgregar">Precio: <input id="formAgregarPrecio" type="text"></label><br>
                <label class="formAgregar">Talla: <input id="formAgregarTalla" type="text"></label><br>
                <label class="formAgregar">Nombre del archivo de la imagen + .png: <input id="formAgregarImagen" type="text"></label><br>
                <button id="btnFormAgregar" class="formAgregar">Cargar nuevo producto</button>
                `
                aeProductosSeccion.appendChild(formularioAgregar)

                let botonAgregar = document.getElementById("btnFormAgregar")
                botonAgregar.addEventListener("click", () => {

                    let nuevoProducto = document.getElementById("formAgregarProducto").value
                    let nuevoCategoria = document.getElementById("formAgregarCategoria").value
                    let nuevoMarca = document.getElementById("formAgregarMarca").value
                    let nuevoPrecio = parseInt(document.getElementById("formAgregarPrecio").value)
                    let nuevoTalla = document.getElementById("formAgregarTalla").value
                    let nuevoImagen = document.getElementById("formAgregarImagen").value
                    const productoNuevo = new Producto(nuevoProducto, nuevoCategoria, nuevoMarca, nuevoPrecio, nuevoTalla, catalogoProductos.length+1, nuevoImagen)
                    catalogoProductos.push(productoNuevo)
                    localStorage.setItem("catalogoProductos", JSON.stringify(catalogoProductos))
                    aeProductosSeccion.innerText = ``
                    mostrarCatalogo(catalogoProductos)

                    let btnCerrar = document.createElement("div")
                    btnCerrar.className = "botonCerrarForm"
                    btnCerrar.innerHTML = `
                    <button id="btnCerrarA" class="cerrarForm">Cerrar</button>
                    `
                    aeProductosSeccion.appendChild(btnCerrar)

                    let botonCerrarA = document.getElementById("btnCerrarA")
                    botonCerrarA.addEventListener("click", () => {
                        productosDiv.innerHTML = ``
                        aeProductosSeccion.innerText = ``
                        aeProductosSeccion.appendChild(seleccionAgregar)
                    })
                })

            })

            //Eliminar productos
            eliminarProductosBtn.addEventListener("click", () => {
                aeProductosSeccion.innerText = ``
                mostrarCatalogo(catalogoProductos)
                let formularioEliminar = document.createElement("div")
                formularioEliminar.className = "formAgregarEliminarDiv"
                formularioEliminar.innerHTML = `
                <label class="formAgregar">Ingresa el código del producto que deseas eliminar: <input id="formEliminarCodigo" type="text"></label><br>
                <button id="btnFormEliminar" class="formAgregar">Eliminar producto</button>
                `
                aeProductosSeccion.appendChild(formularioEliminar)
                let btnEliminar = document.getElementById("btnFormEliminar")
                btnEliminar.addEventListener("click", () => {
                    let codigo = document.getElementById("formEliminarCodigo").value

                    let catalogoProductosCodigo = catalogoProductos.map(producto => producto.codigo)
                    let indice = catalogoProductosCodigo.indexOf(codigo)
                    catalogoProductos.splice(indice, 1)
                    localStorage.setItem("catalogoProductos", JSON.stringify(catalogoProductos))
                    mostrarCatalogo(catalogoProductos)

                    let carritoProductos = productosEnCarrito.map(productoCarrito => productoCarrito.codigo)
                    let indiceCarrito = carritoProductos.indexOf(codigo)
                    productosEnCarrito.splice(indiceCarrito,1)
                    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))

                    let btnCerrar = document.createElement("div")
                    btnCerrar.className = "botonCerrarForm"
                    btnCerrar.innerHTML = `
                    <button id="btnCerrarA" class="cerrarForm">Cerrar</button>
                    `
                    aeProductosSeccion.appendChild(btnCerrar)

                    let botonCerrarA = document.getElementById("btnCerrarA")
                    botonCerrarA.addEventListener("click", () => {
                        productosDiv.innerHTML = ``
                        aeProductosSeccion.innerText = ``
                        aeProductosSeccion.appendChild(seleccionAgregar)
                    })
                })
            })
        } 
        else{
            Swal.fire({
                icon: 'warning',
                title: '¡Oh no! Parece que no tienes acceso a esta función, ya que la constraseña fue incorrecta.'
            })
        }
    })
})