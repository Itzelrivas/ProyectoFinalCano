let descuentosBtn = document.getElementById("botonesPri__cda--descuentos")
let descuentoSeccion = document.getElementById("descuentosSeccion")

//Array del correo de los clientes
let clientes = []
let codigosDescuento = []

//Botón de descuentos 
descuentosBtn.addEventListener("click", () => {

    //Seteamos el array de correos de clientes
    if(localStorage.getItem("clientes")){
        clientes = JSON.parse(localStorage.getItem("clientes"))
    }else{
        for(let i=0; i<clientes.length; i++){
            clientes.push(clientes[i])
        }
        localStorage.setItem("clientes", JSON.stringify(clientes))
    }

    //Reseteamos todo para que no se encimen
    productosDiv.innerHTML = ``
    productosAgotados.innerText = ``
    presupuesto.innerText = ``
    oculCatalogoBtn.innerText = ``
    filtroCatalogo.innerText = ``
    aeProductosSeccion.innerText = ``
    modalBodyCarrito.innerText = ``
    carritoTotal.innerText = ``
    btnFinalizar.innerText = ``
    
    Swal.fire({
        title: 'Registrate para obtener un 10% en tu primera compra :)',
        width: 600,
        padding: '3em',
        color: '#716add',
        background: '#fffdf5',
        confirmButtonColor: 'black'
      })
    
    //Formulario para obtener un código de descuento
    let descuentoSeccionDiv = document.createElement("div")
    descuentoSeccionDiv.className = "descuentoSeccionBtns"
    descuentoSeccionDiv.innerHTML = `<div>
    <label class="descuentoLabel">Ingresa tu correo electrónico: <input id="descuentoUsuario" type="text"></label><br>
    <button id="botonDescuento" class="descuentoLabel descuentoBtn">Obtener código :)</button>
    </div>`
    descuentoSeccion.appendChild(descuentoSeccionDiv)

    let btnDescuento = document.getElementById("botonDescuento")
    btnDescuento.addEventListener("click", () => {
        let correoUsuario = document.getElementById("descuentoUsuario").value
        let a=0
        for(let i=0; i < clientes.length; i++)
        {
            //Ese correo ya esta registrado y no se brinda un código de descuento
            if(clientes[i] == correoUsuario)
            {
                Swal.fire({
                    icon: 'warning',
                    title: 'Lo sentimos, ya has tramitado tu código de descuento por primera compra antes.'
                })
                a++
                break
            }
        }
        //Ese correo no esta registrado, se brinda un código de descuento y se pushea al array de clientes
        if(a==0){
            if(localStorage.getItem("codigosDescuento")){
                codigosDescuento = JSON.parse(localStorage.getItem("codigosDescuento"))
              }else{
                codigosDescuento.forEach(objeto =>{
                    codigosDescuento.push(objeto)
                })
                localStorage.setItem("codigosDescuento", JSON.stringify(codigosDescuento)) 
              }

            Swal.fire({
                icon: 'succes',
                title: `Tu código de descuento es primCompra${clientes.length + 1}`,
                text: 'Usalo en tu primera compra para obtener un 10% de descuento. Recuerda que tu código tiene un mes de vigencia y solamente puedes utilizarlo una vez :)',
                footer: '<h5>¡Muchas gracias por interesarte en nuestros productos!</h5>'
            })
            clientes.push(correoUsuario)
            localStorage.setItem("clientes", JSON.stringify(clientes))
            let codigo = `primCompra${clientes.length}`
            codigosDescuento.push(codigo)
            localStorage.setItem("codigosDescuento", JSON.stringify(codigosDescuento))
        }
    })
})