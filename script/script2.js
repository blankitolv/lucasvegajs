// evento de "leer más" dentro de las tarjetas muestra mayor contenido
function eventLeerMas(){
     const leerMasAll=document.querySelectorAll(".leermas");
     leerMasAll.forEach(element => {
          element.addEventListener("click",clickLeerMas);
          function clickLeerMas(e){
               e.preventDefault();
               element.setAttribute("style","display:none"); 
               let span=(element.parentNode).querySelector("span");  
               span.setAttribute("style","display:contents")
               let aleermenos=(element.parentNode).querySelector(".leermenos");
               aleermenos.setAttribute("style","display:contents")
          }
     })
}
// evento de "leer menos" dentro de las tarjetas muestra menor contenido
function eventLeerMenos(){
     const leerMenosall=document.querySelectorAll(".leermenos");
     leerMenosall.forEach(element => {
          element.addEventListener("click",clickLeerMenos);
          function clickLeerMenos(e){
               e.preventDefault();
               element.setAttribute("style","display:none"); 
               let span=(element.parentNode).querySelector("span");   
               span.setAttribute("style","display:none")     
               let leermas=(element.parentNode).querySelector(".leermas");
               leermas.setAttribute("style","display:contents")     
          }
     }
)}
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
          for (indice of data){ 
               let largo='';
               indice.altura == "1"? largo='style="width: 18rem;' : largo='style="width: 20rem;'
               contentProducts.innerHTML+=`
               <div class="productos-unidad mx-2 my-2 card" ${largo}">
                    <img src="${indice.imgSource}" class="card-img-top " alt="${indice.alt}">
                    <div class="card-body">
                         <h5 class="card-title">${indice.titulo}</h5>
                         <b>$</b><i>200</i>
                         <p class="card-text" style="font-size:14px;">	
                         ${indice.desc}
                         </p>
                         <a href="#" class="btn btn-dark addToCart">Añadir al Carrito</a>
                         <hr class="my-4">
                    </div>
               </div>
               `
          }
})
//una vez que el dom esté cargado realiza estas acciones
document.onreadystatechange = () => {
     document.onreadystatechange = () => {
          if (document.readyState === 'complete') {
               obtenerDatos();
               eventLeerMas();
               eventLeerMenos();
          }
     };
};
//pregunta si el producto ya existe en el arreglo VENTAS
function existe(productoEnviar){
     for (let i=0;i<=arrayVentas.length-1;i++){
          if (arrayVentas[i].titulo===productoEnviar.titulo){
               console.log("existe");
               return true;
          }
     }
     return false;
}
//SI el articulo NO ESTÁ en ventas, lo agrega a VENTAS y en LS + animación + actualiza testigo
function enviaLocalStorage (articulo){
     if (existe(articulo)==false){
          arrayVentas.push(articulo);
          auxiliar=JSON.stringify(arrayVentas);
          localStorage.setItem('carrito',auxiliar);
          Swal.fire({
               position: 'top-end',
               width: 300,
               // height: 200,
               title: `${articulo.titulo}`,
               text: "Añadido al carrito",
               icon: "success",
               // buttons: false,
               timer: 1500,
          });
          actualizaTestigoCarrito();
     }
}
//si el local storage está vacio asigna [] a ventas, sino vuelca LS en arrayVentas
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
     //separo el botón de la tarjeta
     if (e.srcElement.classList[0]==='btn' && e.srcElement.classList[1]==='btn-dark'){
          const carta = e.target.parentNode.parentNode;
          const dataCarta = e.target.parentNode;
          let articulo = new Articulos ((dataCarta.querySelector("H5").textContent),(carta.querySelector("img").src),(dataCarta.querySelector("I").textContent),1)
          //verifica el localStorage
          verificaLS();
          enviaLocalStorage(articulo);
          insertarDOMcarrito();
     }
}

//genera el evento del [botón] VACIAR EL CARRITO
let botonClear = document.querySelector('#botonClear');
botonClear.addEventListener('click',vaciarDOMcarrito);
function vaciarDOMcarrito(e){
     let muestraCarrito = document.querySelector('.muestraCarrito');
     e.preventDefault();
     while(muestraCarrito.firstChild){
          muestraCarrito.removeChild(muestraCarrito.firstChild);
     }
     localStorage.clear();
     actualizaTestigoCarrito();
}
//genera el evento del [botón] SIGUIENTE y redirecciona 
let botonSiguiente = document.querySelector('#botonSiguiente');
botonSiguiente.addEventListener('click',()=>{
     if (arrayVentas.length!=0){
          Swal.fire({
               title: "La compra a sido cargada",
               text: "redireccionando...",
               icon: "success",
               buttons: false,
               timer: 3000,
          });
          setTimeout(()=>{
               window.location.href = "./carrito.html#main-carrito";
          },2000);
     } else {
          Swal.fire({
               title: "Error al cargar la compra",
               text: "... 404",
               icon: "info",
               buttons: false,
               timer: 3000,
          });
     }
})

//vacía el DOM del carrito para imprimir nuevamente el carrito
function vaciarDOMcarrito2(){
     let muestraCarrito = document.querySelector('.muestraCarrito');
     while(muestraCarrito.firstChild){
          muestraCarrito.removeChild(muestraCarrito.firstChild);
     }
}

//calcula el monto de las ventas
function calculaMonto(ventas){
     let acum=0;
     ventas.forEach(indice => {
          acum+=Number (indice.precio);
     });
     return acum;
}
// luego de hacer click en [agregar al carrito] inserta todas las ventas del arreglo al DOM
function insertarDOMcarrito(){
     let muestraCarrito= document.querySelector('.muestraCarrito');
     vaciarDOMcarrito2();
     for (let i=0;i<=arrayVentas.length-1;i++){
          const div=document.createElement('div');
          div.innerHTML = `
          <img src="${arrayVentas[i].imagen}" width=100>
          <h6>${arrayVentas[i].titulo}</h6>
          `
          // <p>$${arrayVentas[i].precio}</p>
          muestraCarrito.appendChild(div);
     }
     // let monto=calculaMonto(arrayVentas)
     // div=document.createElement('div');
     // div.innerHTML+=`
     // <hr>
     // <p>Monto Actual</p>
     // <hr>
     // <p>$${monto}</p>
     // `
     // muestraCarrito.appendChild(div);
}
// al comenzar, si el arreglo arrayVentas NO está vacío NI es nulo, inserta las ventas al DOM
verificaLS();
if (arrayVentas.length !=null || arrayVentas.length != 0){
     insertarDOMcarrito();
     actualizaTestigoCarrito();
}
//-- testigo carrito de compra
// si se está utilizando "carrito" en el LS calcula las cantidades y lo 
// envia por parametro a muestraTestigoCarrito
function actualizaTestigoCarrito(){
     if (localStorage.getItem('carrito')){
          ventas=JSON.parse(localStorage.getItem('carrito'));
          let aux=0;
          ventas.forEach(element => {
               aux+=element.cant;
          })
          muestraTestigoCarrito(aux);
     } else {
          let aux=0;
          muestraTestigoCarrito(aux);
     }
}
// muestra el testigo
function muestraTestigoCarrito(aux){
     const iconCarrito=document.querySelector('.icon-carrito');
     const etiquetaP=iconCarrito.getElementsByTagName('p')[0];
     if (aux<=9){
          etiquetaP.innerHTML=`0${aux}`
     } else {
          etiquetaP.innerHTML=`${aux}`
     }
}

// ajax dolar
let btnDolar=document.querySelector('#dolar');
btnDolar.addEventListener('click',()=>{
     obtenerDatos();
})

function obtenerDatos(){
     let url=`https://www.dolarsi.com/api/api.php?type=valoresprincipales`;
     const api=new XMLHttpRequest();
     api.open ('GET', url, true);
     api.send();
     api.onreadystatechange=function(){
          if (this.status==200 && this.readyState==4){
               let datajson=JSON.parse(this.responseText);
               oficial(datajson);
          }
     }
}
//Toma los valores de dolar blue y oficial del json
function oficial(datajson){
     datajson.forEach(element => {
          if (element.casa.nombre=='Dolar Oficial' || element.casa.nombre=='Dolar Blue'){
               mostrarDolar(element.casa.nombre,element.casa.compra,element.casa.fecha)
          }
     });
}
//hubica y muestra el dolar
function mostrarDolar(nombre,precio){
     let section=document.querySelector('.section')
     if (nombre=='Dolar Oficial'){
          let oficial=document.querySelector('.precio_oficial')
          oficial.innerHTML=`<b class="precio_oficial">${nombre}: ${precio}<br></b>`
     } else {
          let blue=document.querySelector('.precio_blue')
          blue.innerHTML=`<b class="precio_blue">${nombre}: ${precio}</b>`
     }
}