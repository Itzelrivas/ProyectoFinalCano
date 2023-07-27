//Toda la parte del filtro: categoría(todos los productos, bolsas, camisas, cremas y lociones, vestidos y zapatos)
function filtrarPor(){
    let filtroProductosDiv = document.createElement("div")
    filtroProductosDiv.className = "filtroProductosDiv"
    //Estructura de la parte del filtro
    filtroProductosDiv.innerHTML = `<div class="container-fluid">
      <h7 id="filtroDiv__texto" class="row col-12 col-xl-12 tituloFiltros">Filtrar por:</h7>
  
      <div class="contenedorFiltros">
        <div class="col-12 col-xl-3 classBtnFiltro">
          <button class="btn btn-secondary dropdown-toggle btnFiltroCategoria" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Categoría
          </button>
          <ul class="dropdown-menu dropdown-menu-dark">
            <li><a id="filtroTodos" class="dropdown-item">Todos los productos</a></li>
            <li><a id="filtroBolsas" class="dropdown-item">Bolsas</a></li>
            <li><a id="filtroCamisas" class="dropdown-item">Camisas</a></li>
            <li><a id="filtroCremas" class="dropdown-item">Cremas y lociones</a></li>
            <li><a id="filtroVestidos" class="dropdown-item">Vestidos</a></li>
            <li><a id="filtroZapatos" class="dropdown-item">Zapatos</a></li>
          </ul>
        </div>

        <div class="col-12 col-xl-3 classBtnFiltro">
          <button id="categoriaPrecio" class="filtroDiv__Precios">Precio</button>
        </div>

        <div class="col-12 col-xl-3 classBtnFiltro">
          <button id="categoriaOrdenPrecios" class="filtroDiv__Precios">Menor a mayor precios</button>
        </div>
      </div>

    </div>`
    filtroCatalogo.appendChild(filtroProductosDiv)
  
    //Categoría: todos los productos disponibles
    let filtroTodosBtn = document.getElementById("filtroTodos")
    filtroTodosBtn.addEventListener("click", () => {
      productosDiv.innerHTML = ``
      productosAgotados.innerText = ``
      presupuesto.innerText = ``
      mostrarCatalogo(catalogoProductos)
    })

    //Categoría: bolsas
    let filtroBolsasBtn = document.getElementById("filtroBolsas")
    filtroBolsasBtn.addEventListener("click", () => {
      productosDiv.innerHTML = ``
      productosAgotados.innerText = ``
      presupuesto.innerText = ``
      let productosBolsas = catalogoProductos.filter(
        (producto) => producto.categoria == "bolsas"
      )
      if(productosBolsas.length == 0){
        let noProductos = document.createElement("div")
        noProductos.innerHTML = `<h4 class="noProductosStock">¡Oh no! Todos las bolsas se han agotado :(</h4>`
        productosAgotados.appendChild(noProductos)
      }
      else{
        mostrarCatalogo(productosBolsas)
      }
    })

    //Categoría: camisas
    let filtroCamisasBtn = document.getElementById("filtroCamisas")
    filtroCamisasBtn.addEventListener("click", () => {
      productosDiv.innerHTML = ``
      productosAgotados.innerText = ``
      presupuesto.innerText = ``
      let productosCamisas = catalogoProductos.filter(
        (producto) => producto.categoria == "camisas"
      )
      if(productosCamisas.length == 0){
        let noProductos = document.createElement("div")
        noProductos.innerHTML = `<h4 class="noProductosStock">¡Oh no! Todos las camisas se han agotado :(</h4>`
        productosAgotados.appendChild(noProductos)
      }
      else{
        mostrarCatalogo(productosCamisas)
      }
    })

    //Categoría: cremas y lociones
    let filtroCremasLocionesBtn = document.getElementById("filtroCremas")
    filtroCremasLocionesBtn.addEventListener("click", () => {
      productosDiv.innerHTML = ``
      productosAgotados.innerText = ``
      presupuesto.innerText = ``
      let productosCremasLociones = catalogoProductos.filter(
        (producto) => producto.categoria == "cremasLociones"
      )
      if(productosCremasLociones.length == 0){
        let noProductos = document.createElement("div")
        noProductos.innerHTML = `<h4 class="noProductosStock">¡Oh no! Todos las cremas y lociones se han agotado :(</h4>`
        productosAgotados.appendChild(noProductos)
      }
      else{
        mostrarCatalogo(productosCremasLociones)
      }
    })

    //Categoría: vestidos
    let filtroVestidosBtn = document.getElementById("filtroVestidos")
    filtroVestidosBtn.addEventListener("click", () => {
      productosDiv.innerHTML = ``
      productosAgotados.innerText = ``
      presupuesto.innerText = ``
      let productosVestidos = catalogoProductos.filter(
        (producto) => producto.categoria == "vestidos"
      )
      if(productosVestidos.length == 0){
        let noProductos = document.createElement("div")
        noProductos.innerHTML = `<h4 class="noProductosStock">¡Oh no! Todos los vestidos se han agotado :(</h4>`
        productosAgotados.appendChild(noProductos)
      }
      else{
        mostrarCatalogo(productosVestidos)
      }
    })

    //Categoría: zapatos
    let filtroZapatosBtn = document.getElementById("filtroZapatos")
    filtroZapatosBtn.addEventListener("click", () => {
      productosDiv.innerHTML = ``
      productosAgotados.innerText = ``
      presupuesto.innerText = ``
      let productosZapatos = catalogoProductos.filter(
        (producto) => producto.categoria == "zapatos"
      )
      if(productosZapatos.length == 0){
        let noProductos = document.createElement("div")
        noProductos.innerHTML = `<h4 class="noProductosStock">¡Oh no! Todos los zapatos se han agotado :(</h4>`
        productosAgotados.appendChild(noProductos)
      }
      else{
        mostrarCatalogo(productosZapatos)
      }
    })


    //Filtro de acuerdo al presupuesto del usuario
    let filtroPrecioBtn = document.getElementById("categoriaPrecio")
    filtroPrecioBtn.addEventListener("click", () => {
      productosDiv.innerHTML = ``
      productosAgotados.innerText = ``
      let presupuestoInput = document.createElement("div")
      presupuestoInput.className = "inputPresupuesto"
      presupuestoInput.innerHTML = `<div>
      <label class="presuUsuarioLabel">Ingresa tu presupuesto:<input id="presuUsuario" class="presupuestoInput" type="text"></label><br></div>
      <div class="btnPresupuesto">
        <button id="botonPresu">Filtrar</button>
      </div`
      presupuesto.appendChild(presupuestoInput)
      let botonPresu = document.getElementById("botonPresu")
      botonPresu.addEventListener("click", () => {
        productosAgotados.innerText = ``
        productosDiv.innerText = ``
        let presu = document.getElementById("presuUsuario").value
        let productosPresupuesto = catalogoProductos.filter(
          (producto) => producto.precio <= presu
        )
        if(productosPresupuesto.length == 0){
          let noProductos = document.createElement("div")
          noProductos.innerHTML = `<h4 class="noProductosStock">¡Oh no! Por el momento no esta disponible ningún producto dentro de tu presupuesto:(</h4>`
          productosAgotados.appendChild(noProductos)
        }
        else{
          mostrarCatalogo(productosPresupuesto)
        }
      })
    })


    //Filtro que ordena los productos de menor a mayor precio
    let ordenPreciosBtn = document.getElementById("categoriaOrdenPrecios")
    ordenPreciosBtn.addEventListener("click", () => {
      productosDiv.innerText = ``
      productosAgotados.innerText = ``
      presupuesto.innerText = ``
      const menorMayor = [].concat(catalogoProductos)
      menorMayor.sort((a,b) => a.precio - b.precio)
      mostrarCatalogo(menorMayor)
    })
  }