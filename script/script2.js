const arrayVentas = [];
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
//5-  viene de (4) verifica que no esté ya cargado el producto
function existe(productoEnviar){
     for (indice of arrayVentas){
          if (indice.titulo===productoEnviar.titulo){
               console.log ("existe");
               return true;
               break;
          }
     }
     console.log ("no existe")
     return false;
}
// 4- envía los productos al local storage
function enviaLocalStorage (productoEnviar){
     if (existe(productoEnviar)==false){
          console.log(arrayVentas.length);
          arrayVentas.push(productoEnviar);
     } else {
          productoEnviar.cantidad+=1;
     }
     console.log(arrayVentas);
     // auxiliar=JSON.stringify(arrayVentas);
     // localStorage.setItem('carrito',auxiliar)
     /*
     auxiliar=JSON.stringify(arrayVentas);
     localStorage.setItem('carrito',auxiliar);
     */

}
contentProducts.addEventListener('click',agregaCarrito)

function agregaCarrito (e){
     e.preventDefault();
     const carta = e.target.parentNode.parentNode;
     const dataCarta = e.target.parentNode;
     const productoEnviar = {
          titulo: dataCarta.querySelector("H5").textContent,
          imagen: carta.querySelector("img").src,
          precio: dataCarta.querySelector("I").textContent,
          cantidad: 1,
     }
     console.log(productoEnviar);
     console.log(typeof (productoEnviar));
     enviaLocalStorage(productoEnviar);
}
