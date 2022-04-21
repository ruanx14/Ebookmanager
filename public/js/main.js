// Menu mobile

let mobileBtnMenu = document.querySelector("#show-menu-items");
let nav = document.querySelector(".menu");

let navStatus = 0;

//Botão home
nav.onclick = (e) => {
   // if(e.target.id === "btn-home"){
   //    window.scrollTo(0,0);
   // }
   //Esconde o menu quando algum link é clicado
   if(e.target.nodeName == "A" || e.target.nodeName == "BUTTON") {
      showHideMenu();
   }
}

//Esconde os itens do menu se a tela for redimensionada
window.onresize = () => {
   navStatus = 1;
   showHideMenu();
}

//Menu hamburger
mobileBtnMenu.onclick = () => {
   showHideMenu();
}

//Função para mostrar os links escondidos do menu
function showHideMenu () {
   if(navStatus == 0){
      var links = nav.innerHTML.split("a href").length - 2;
      nav.style.height = 40 + 58 + (51 * links) + "px";
      navStatus = 1;
      mobileBtnMenu.style.backgroundImage = "url(../img/cancel.svg)";
   } else {
      nav.style.height = "40px";
      navStatus = 0;
      mobileBtnMenu.style.backgroundImage = "url(../img/menu.svg)";
   }
}

//Esconde ou mostra o elemento nav no evento de scroll
var initial = nav.offsetHeight;
var oldPosition = 0;

window.onscroll = function (e) {
   navStatus = 1;
   showHideMenu();
   var newPosition = window.scrollY;

   if(newPosition > oldPosition && newPosition > initial){
      nav.style.transform = "translateY(-60px)";
   }else {
      nav.style.transform = "translateY(0)";
   }
   oldPosition = newPosition;
}


//Nova tela de login com opção cadastrado e n cadastrado
   div = document.querySelector('.div-new-login').children;

   div[0].onclick = function(){
      div[1].style.display = "block";
      div[0].style.display = "none";
      document.getElementById('hideOr').style.display = "none";
      document.getElementById('hideOr').children[0].setAttribute("type","hidden");
      document.getElementById('hideOr').children[0].setAttribute("disabled",true);
      //document.getElementById('hideOr').children[0].style.display = "none"; 
   }
   div[1].onclick = function(){
      div[0].style.display = "block";
      div[1].style.display = "none";
      document.getElementById('hideOr').style.display = "flex";
      document.getElementById('hideOr').children[0].setAttribute("type","email");
      document.getElementById('hideOr').children[0].removeAttribute("disabled");
   }