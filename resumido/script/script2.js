let arrayVentas;
class Articulos{
     constructor(titulo,imagen,precio,cant){
          this.titulo=titulo;
          this.imagen=imagen;
          this.precio=precio;
          this.cant=cant;
     }
 }
let contentProducts = document.querySelector('.content-productos')
// se ingresan al html productos, todos los elementos que están en bddata.json
fetch('/bdata/bdata.json')
     .then (response => response.json())
     .then (data => {
          // console.log(data);
          for (indice of data){
               contentProducts.innerHTML+=`
               <div class="productos-unidad" style="width: 15rem;">
                    <img src="${indice.imgSource}" class="card-img-top " alt="${indice.alt}">
                    <div class="card-body">
                         <h5 class="card-title">${indice.titulo}</h5>
                         <b>$</b><i>200</i>
                         <p class="card-text">	
                         ${indice.desc}
                         </p>
                         <a href="#" class="btn btn-dark addToCart">Añadir al Carrito</a>
                         <hr class="my-4">
                    </div>
               </div>
               `
          }
})
//pregunta si el producto ya existe en el arreglo VENTAS
function existe(productoEnviar){
     for (let i=0;i<=arrayVentas.length-1;i++){
          if (arrayVentas[i].titulo===productoEnviar.titulo){
               console.log("existe");
               return true;
          }
     }
     console.log("no existe");
     return false;
}
//SI el articulo NO ESTÁ en ventas, lo agrega al arreglo VENTAS y lo agrega al LOCALSTORAGE
function enviaLocalStorage (articulo){
     if (existe(articulo)==false){
          arrayVentas.push(articulo);
          auxiliar=JSON.stringify(arrayVentas);
          localStorage.setItem('carrito',auxiliar);
     }

}
//si el local storage está vacio asigna [] al arreglo ventas, sino lo asigna desde el LOCALSTORAGE
function verificaLS(){
     if (localStorage.getItem("carrito")===null) {
          arrayVentas=[];
     } else {
          arrayVentas=JSON.parse(localStorage.getItem('carrito'));
     }
}
// toma el evento del botón "agregar al carrito"
contentProducts.addEventListener('click',agregaCarrito)
function agregaCarrito (e){
     e.preventDefault();
     const carta = e.target.parentNode.parentNode;
     const dataCarta = e.target.parentNode;
     let articulo = new Articulos ((dataCarta.querySelector("H5").textContent),(carta.querySelector("img").src),(dataCarta.querySelector("I").textContent),1)
     //verifica el localStorage
     verificaLS();
     enviaLocalStorage(articulo);
     insertarDOMcarrito();
}
//toma el evento del botón VACIAR EL CARRITO
let botonClear = document.querySelector('#botonClear');
botonClear.addEventListener('click',vaciarDOMcarrito);
function vaciarDOMcarrito(e){
     let muestraCarrito = document.querySelector('.muestraCarrito');
     e.preventDefault();
     while(muestraCarrito.firstChild){
          muestraCarrito.removeChild(muestraCarrito.firstChild);
     }
     localStorage.clear();
}
function vaciarDOMcarrito2(){
     let muestraCarrito = document.querySelector('.muestraCarrito');
     while(muestraCarrito.firstChild){
          muestraCarrito.removeChild(muestraCarrito.firstChild);
     }
}
function calculaMonto(ventas){
     let acum=0;
     ventas.forEach(indice => {
          acum+=Number (indice.precio);
     });
     console.log(acum);
     return acum;
}
// inserta todas las ventas del arreglo al DOM
function insertarDOMcarrito(){
     let muestraCarrito= document.querySelector('.muestraCarrito');
     vaciarDOMcarrito2();
     for (let i=0;i<=arrayVentas.length-1;i++){
          const div=document.createElement('div');
          div.innerHTML = `
          <img src="${arrayVentas[i].imagen}" width=100>
          <h6>${arrayVentas[i].titulo}</h6>
          <p>$${arrayVentas[i].precio}</p>
          `
          muestraCarrito.appendChild(div);
     }
     let monto=calculaMonto(arrayVentas)
     div=document.createElement('div');
     div.innerHTML+=`
     <hr>
     <p>Monto</p>
     <hr>
     <p>$${monto}</p>
     `
     muestraCarrito.appendChild(div);
     // let muestraCarrito = document.querySelector('.muestraCarrito');
     // vaciarDOMcarrito2();
     // for (let i=0;i<=arrayVentas.length-1;i++){
     //      const row=document.createElement('tr');
     //      row.innerHTML = `
     //      <td style="font-weight: bold";><img src="${arrayVentas[i].imagen}" width=100></td>
     //      <td  style="color:white; font-weight:bold;"> ${arrayVentas[i].titulo} </td>
     //      <td style="color:white; font-weight:bold;"> $${arrayVentas[i].precio} </td>
     //      <td style="color:white; font-weight:bold;">
     //           <a href="#" class="borrar-producto fas fa-times-circle" data-id="${arrayVentas[i].cant}"></a>
     //      </td>
     //      `
     //      muestraCarrito.appendChild(row);
     // }
}
verificaLS();
// al comenzar, si el arreglo arrayVentas NO está vacío NI es nulo, inserta las ventas al DOM
if (arrayVentas.length !=null || arrayVentas.length != 0){
     insertarDOMcarrito();
     // console.log(arrayVentas.length);

}


// insertarCarrito(producto){
//      const row = document.createElement('tr');
//      row.innerHTML = `
//          <td style="font-weight: bold";>
//              <img src="${producto.imagen}" width=100>
//          </td>
//          <td  style="color:white; font-weight:bold;">${producto.titulo}</td>
//          <td style="color:white; font-weight:bold;">${producto.precio}</td>
//          <td style="color:white; font-weight:bold;">
//              <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
//          </td>
//      `;
//      listaProductos.appendChild(row);
//      this.guardarProductosLocalStorage(producto);
//  }