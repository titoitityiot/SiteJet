// Creamos variables, una para el formulario y otra para el boton que envía el formulario
let formulario = document.querySelector("#formulario");
let btnSubmit = document.querySelector("#btnSubmit");

// Cuando clickemos el botón del formulario se ejecuta esta función
btnSubmit.addEventListener("click", (evento)=>{
  // Se previene el envío del formulario
  evento.preventDefault();

  // Se ejecuta la función validar que especificamos después
  valido = validar();

  // Si todo está correcto entonces devuelve true y podemos enviar el formulario
  if(valido == true){
    formulario.submit();
  }
});

function validar(){
  // Creamos variables en las que obtenemos el valor de cada input del formuklario para luego verificar que cumplen con los requisitos
  let name = document.getElementById("name").value;
  let surname = document.getElementById("surname").value;
  let phone = document.getElementById("phone").value;
  let mail = document.getElementById("mail").value;
  let interval = document.getElementById("interval").value;
  let policyCheck = document.getElementById("policyCheck");

  // Con condicionales verificamos que se cumplan los requisitos y, en caso contrario, ser devolveria false por lo que no se enviaría el formulario como vimos antes. 
  if(name == null || name.trim() == "" || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,15}$/.test(name)){
    alert("Introduzca un nombre válido");
    return false;
  }

  if(surname == null || surname.trim() == "" || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,40}$/.test(surname)){
    alert("Introduzca un apellido válido");
    return false;
  }

  if(phone == null || phone.trim() == "" || !/^[0-9]{9,11}$/.test(phone)){
    alert("Introduzca un número telefónico válido");
    return false;
  }

  if(mail == null || mail.trim() == "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)){
    alert("Introduzca un correo electrónico válido");
    return false;
  }

  if(interval == null || interval.trim() == ""){
    alert("Especifique el plazo de entrega");
    return false;
  }

  if(!policyCheck.checked){
    alert("Debe aceptar la política de privacidad");
    return false;
  }

  // Si ninguna de las anteriores ha devuelto false pongo un return true para que la función validar sea true y se envíe el formulario
  return true;
}

// Creo la función para actualizar el formulario de presupuesto con jquery
$(document).ready(function() {
  function updatePresupuesto() {
    // Creamos la variable con jquery para obtener el valor del producto escogido y el numero de meses que el usuario ha puesto en el plazo de entrega
    let product = parseFloat($("#product").val());
    let interval = $("#interval").val();
    
    // Con condicinales nos aseguramos de que el plazo de entrega no está vacío o sea nulo
    if(interval == "" || interval == null) {
      interval = 0;
    }

    // Con jquery vemos si los check están marcados y en caso de que lo estén modifica el precio que luego se sumará
    let domain = 0;
    if($("#domain").is(":checked")) {
      domain = 20;
    }
      
    let seo = 0;
    if($("#SEO").is(":checked")) {
      seo = 50;
    }
      
    let maintenance = 0;
    if($("#maintenance").is(":checked")) {
      maintenance = 150;
    }
    
    let basePrice = product;
    let discount = 0;

    // Con estos condicinales hacemos que, dependiendo del plazo de meses de entrega que nos aporte el usuario, le aplique un descuento mayor cuanto mayor sea el plazo
    if(interval > 2 && interval < 6){ 
      discount = 0.05;
    }else if(interval > 5 && interval < 12){ 
      discount = 0.10;
    }else if(interval == 12){
      discount = 0.20;
    }

    // Se hace el cálculo del total sumando cada una de las variables que importan a la hora de determuinar el precio
    let total = basePrice + domain + seo + maintenance;

    // Se clacula el precio final después del descuento
    total = total - (total * discount);
    
    // Se inserta el precio total en el <h3>
    $("#precioTotal").text("Total: " + total.toFixed(2) + "€");
  }
  
  // Si se detecta algún cambio en el formulario se vuelve a ejecutar la función para actualizar el precio
  $("#product, #interval, #domain, #SEO, #maintenance").on("change", function() {
    updatePresupuesto();
  });

  updatePresupuesto();
});