const url = "http://localhost:5678/api";
const btnOut = document.getElementById("sLogout");
const btnMod = document.getElementById("modifImg");
const modal = document.querySelector(".modal");
var deroulant;
var ajoutTitre = document.getElementById("titre");
var modi = document.getElementById("modifProf");
var id = localStorage.getItem('id');
var token = localStorage.getItem('token');
var tous = document.getElementById("tous");
var imageToProcess;
var categoryList;
var gallery = document.querySelector(".gallery");
var pagePath = window.location.pathname;
var fileName = pagePath.substring(pagePath.lastIndexOf('/') + 1);
let works = [];


window.onload = async function(){
  
  if(fileName === 'index.html')
  {
    try{
      works = await worksInit();
    }
    catch(err){
      console.log('err', err);
    }
  
    try {
      categoryList = await invokCat();
    } 
    catch (err) {
      console.log('err', err);
    }
  
    buttonInit();
    affichage();
  }
  
  initProfil();
};

function invokCat()
{
  return new Promise((resolve) => {
    fetch(url + "/categories")
      .then((response) => {
        if(response.ok)
        {
          response.json().then((data) =>{
            resolve(data);
          })
        }
      })
  })
  
}

function worksInit()
{
  return new Promise((resolve) => {
    fetch(url + "/works")
        .then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              resolve(data);
            });
          }

          else {
            console.log("Erreur lors de la récupération des données.");
          }
        })
  })
}

function buttonInit()
{
  invokCat();
  var buttonTous = document.getElementById("tous");
  buttonTous.style.color = "#FFFFFF";
  buttonTous.style.background = "#1D6154";
  categoryList.forEach((element) => {
    var button = document.createElement('button');
    button.setAttribute('id', "category" + element.id);
    button.setAttribute('type', 'button');
    button.textContent = element.name;
    document.getElementById('buttonPort').appendChild(button);
    button.addEventListener("click", function (){filtered(button.id)}, false);
  });
}


function affichage()
{
  for(let i=0; i < works.length; i++)
  {
      var fig = document.createElement("figure");
      
      fig.classList.add("category" + works[i].categoryId);
      fig.id = "gallId" + works[i].id;
      
      gallery.appendChild(fig);

      var img = document.createElement("img");
      
      img.src = works[i].imageUrl;
      img.alt = works[i].title;

      fig.appendChild(img);
      var figu = document.createElement("figcaption");
      figu.textContent = works[i].title;
      fig.appendChild(figu);
       
  }
}

function createModal()
{
  var sec = document.createElement("section");
  sec.id = ("popup");
  modal.appendChild(sec);
  afficheModal1();
}
function afficheModal1()
{
  var sec = document.getElementById("popup");

  var btn = document.createElement("BUTTON");
  btn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  btn.id = "quitAP";
  modal.appendChild(btn);

  sec.appendChild(btn);

  var textH3 = document.createElement("h3");
  textH3.textContent = "Galerie photo";
  sec.appendChild(textH3);

  var divGallery = document.createElement("div");
  divGallery.classList.add("imageEdit");
  sec.appendChild(divGallery);

  for(let i=0; i < works.length; i++)
  {
    var btn3 = document.createElement("BUTTON");
    btn3.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    btn3.style.marginLeft = "2.5%";
    btn3.style.marginTop = "0.2%";
    btn3.style.position = "absolute";
    var fig2 = document.createElement("figure");
    fig2.classList.add("editImg");
    fig2.id = "modId" + works[i].id;
    divGallery.appendChild(fig2);
    var img2 = document.createElement("img");
    img2.src = works[i].imageUrl;
    img2.alt = works[i].title;
    img2.style.objectFit = "cover";
    fig2.appendChild(btn3);
    fig2.appendChild(img2);
    btn3.addEventListener("click", function () {
      deleteWork(works[i]);
    })
  }
  
  

  var btn2 = document.createElement("BUTTON");
  btn2.id = "aPhoto";
  btn2.textContent = "Ajouter une photo";
  sec.appendChild(btn2);

  var psuppr = document.createElement("p");
  psuppr.id = "suppr";
  asupp = document.createElement("a");
  asupp.href = "#";
  asupp.innerHTML = 'Supprimer la galerie';

  asupp.addEventListener("click", function()
  {
    for(var i = 0; i < works.length; i++)
    {
      deleteWork(works[i]);
    }
  })

  psuppr.appendChild(asupp);
  sec.appendChild(psuppr);
  
  btnQ = document.getElementById("quitAP");
  btnQ.addEventListener("click", function(){
    deleteModal();
  })
  
  btnA = document.getElementById("aPhoto");

  btnA.addEventListener("click", function(){
    clearModal();
    afficheModal2();
  })
}

function afficheModal2(){
  var btnAjout = document.createElement("BUTTON");
  btnAjout.id = "validationAjout";
  btnAjout.textContent = "Valider";

  var inputP = document.createElement("input");
  inputP.type = "file";
  inputP.id = "buttonAP";
  inputP.accept = ".jpg, .png";

  var lab = document.createElement("label");
  lab.id = "buttonAPV";
  lab.htmlFor = "buttonAP";
  lab.textContent = "+ Ajouter photo";
  
  var btnReturn = document.createElement("BUTTON");
  btnReturn.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
  btnReturn.id = "returnBtn";


  var popup = document.getElementById("popup");
  var btn = document.createElement("BUTTON");
  btn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  btn.id = "quitAP";

  var inputTitre = document.createElement("input");
  inputTitre.type = "titre";
  inputTitre.id = "titre";
  inputTitre.name = "titre";
  inputTitre.value = "";

  var selection = document.createElement("select");
  selection.id = "selectCate";
  selection.name = "categorie";
  
  var option = document.createElement("option");
  option.value = "";
  selection.appendChild(option);

  categoryList.forEach((element) => {
    var options = document.createElement("option");
    options.value = element.id;
    options.text = element.name;
    selection.appendChild(options);
  })

  btnReturn.addEventListener("click", function(){
    clearModal();
    afficheModal1();
  })

  btn.addEventListener("click", function(){
    deleteModal();
  })
  popup.appendChild(btnReturn);
  popup.appendChild(btn);

  var aP = document.createElement("h3");
  aP.textContent = "Ajout photo";
  popup.appendChild(aP);

  var formAP = document.createElement("form");
  formAP.id = "photoAjout";
  popup.appendChild(formAP);

  formAP.innerHTML = '<i class="fa-solid fa-image"></i><br>';

  
  formAP.appendChild(lab);

  
  formAP.appendChild(inputP);
  inputP.addEventListener("change",function() {
    getImage(inputP, btnAjout);
  });

  var pMax = document.createElement("p");
  pMax.textContent = "jpg, png : 4mo max";
  formAP.appendChild(pMax);

  var formTitre = document.createElement("form");
  formTitre.id = "divTitre";
  popup.appendChild(formTitre);

  var labTitre = document.createElement("label");
  labTitre.textContent = "Titre";
  formTitre.appendChild(labTitre);

  
  inputTitre.addEventListener("input", function(){
    titreVeri(btnAjout);
  }, true);
  formTitre.appendChild(inputTitre);

  var formCat = document.createElement("form");
  formCat.id = "divCategorie";
  popup.appendChild(formCat);

  deroulant = selection;
  
  selection.addEventListener("change",function() {
    buttonVali(btnAjout);
  });

  
  formCat.appendChild(selection);

  popup.appendChild(btnAjout);

  btnAjout.addEventListener("click", function(){
    uploadImage();
    deleteModal();
  })
}

function deleteModal()
{
  modal.classList.toggle("active");
    while (modal.firstChild) {
      modal.removeChild(modal.firstChild);
    }
}

function clearModal()
{
  sec = document.getElementById("popup");
  while (sec.firstChild) {
    sec.removeChild(sec.firstChild);
  }
}

function initProfil(){
  if(fileName === 'index.html')
  {
    if(id == 1)
    {
      var bar = document.getElementById("bandeEdit");
      bar.style.display = "flex";
      var modi1 = document.getElementById("modifImg");
      modi1.style.display = "inline";
      modi.style.display = "flex";
      var slogin = document.getElementById("sLogin");
      slogin.style.display = "none";
      var slogout = document.getElementById("sLogout");
      slogout.style.display = "inline";
      var filtre = document.getElementById("buttonPort");
      filtre.style.display = "none";
      btnOut.addEventListener("click", () => {
        localStorage.removeItem('id');
        localStorage.removeItem('token');
      });
      
      btnMod.addEventListener("click", () => {
        createModal();
        modal.classList.toggle("active");
      });
    }
    else
    {
      var bar = document.getElementById("bandeEdit");
      bar.style.display = "none";
      var modi1 = document.getElementById("modifImg");
      modi1.style.display = "none";
      var modi2 = document.getElementById("modifProf");
      modi2.style.display = "none";
      var slogin = document.getElementById("sLogin");
      slogin.style.display = "inline";
      var slogout = document.getElementById("sLogout");
      slogout.style.display = "none";
      var filtre = document.getElementById("buttonPort");
      filtre.style.display = "flexbox";
      
      tous.addEventListener("click", () => {
      
        for(var i = 0; i < categoryList.length; i++)
        {
          var k = i + 1;
          var classCat = document.getElementsByClassName("category" + k);
          var idButtonCat = document.getElementById("category" + k);
          
          for(var j = 0; j < classCat.length; j++)
          {
            classCat[j].style.display = "inline";
            
          }
        
          idButtonCat.style.color = "#000000";
          idButtonCat.style.background = "#FFFFFF";
        
        }
      
        var buttonTous = document.getElementById("tous");
        buttonTous.style.color = "#FFFFFF";
        buttonTous.style.background = "#1D6154";
      });
    }
  }
  
  else
  {
    var btnLog = document.getElementById("connect");
    btnLog.addEventListener("click", () => {
      connexion();
    });
  }
}

function connexion() {
  var data = {
    email: document.getElementById("email2").value,
    password: document.getElementById("password").value
  };

  fetch(url + "/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          id = data.userId;
          token = data.token;

          localStorage.setItem("id", id);
          localStorage.setItem("token", token);

          window.location.href = "../index.html";
        });
      } 
      
      else {
        var incor = document.getElementById("mdpincorrect");
        incor.style.display = "block"; 
      }
    })
    .catch((error) => console.error(error));
}


function filtered (cat) {

  for(var i = 0; i < categoryList.length; i++)
  {
    var k = i + 1;
    var classCat = document.getElementsByClassName("category" + k);
    
    
    for(var j = 0; j < classCat.length; j++)
    {
      if(classCat[j].classList == cat)
      {
        classCat[j].style.display = "inline";
      }

      else
      {
        classCat[j].style.display = "none";
      }
    }

    var buttonTous = document.getElementById("tous");
    buttonTous.style.color = "#000000";
    buttonTous.style.background = "#FFFFFF";

    var idButtonCat = document.getElementById("category" + k);
    
    if(idButtonCat.id == cat)
    {
      idButtonCat.style.color = "#FFFFFF";
      idButtonCat.style.background = "#1D6154";
    }

    else
    {
      idButtonCat.style.color = "#000000";
      idButtonCat.style.background = "#FFFFFF";
    }
  }
}

function titreVeri(button)
{
  ajoutTitre = document.getElementById('titre').value;
  buttonVali(button);
}

function deleteWork(worki) {
    var gall = "gallId" + worki.id;
    var mod = "modId" + worki.id;

    const elements = document.getElementById(gall);
    const elements2 = document.getElementById(mod);

    elements.remove();
    elements2.remove();
    

  
  fetch(url + "/works/" + worki.id, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + `${token}`,
    }
  })
  .then((response) => {
    if (response.status == 200) {
      
      
    }
  })
  .catch((error) => {
    console.error("Error occurred while deleting the item:", error);
  });
}

function buttonVali(button)
{
  if(ajoutTitre  != "" && deroulant.value != "" && imageToProcess != null)
  {
    button.disabled = false;
    button.style.color = "#FFFFFF";
    button.style.background = "#1D6154";
  }
  else
  {
    button.disabled = true;
    button.style.color = "#306685";
    button.style.background = "#CBD6DC";
  }
}

function getImage(inputP, button)
{
  yesImage = document.getElementById("photoAjout");
  imageToProcess = inputP.files[0];

  let newImage = new Image(imageToProcess.width, imageToProcess.height);
  newImage.src = URL.createObjectURL(imageToProcess);
  newImage.style.width = "222px";
  newImage.style.height = "279px";
  newImage.style.objectFit = "cover";
  
  while (yesImage.firstChild) {
    yesImage.removeChild(yesImage.firstChild);
  }
  yesImage.appendChild(newImage);
  buttonVali(button);
}

function uploadImage(){
  var formData = new FormData();
  var strTitle = String(ajoutTitre);
  var cat = selectCate.value;

  formData.append("image", imageToProcess);
  formData.append("title", strTitle);
  formData.append("category", cat);

  fetch(url + "/works", {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
    },
    body: formData
  })
  .then((response) => response.json())
  .then((responseData) => {
    cleanData();
  })
  .catch((error) => {
    
    console.error(error);
  });
}

async function cleanData()
{
  while (gallery.firstChild) {
    gallery.removeChild(gallery.firstChild);
  }
  works = await worksInit();
  affichage();
  var titre = document.getElementById('titre');
  titre = "";
  deroulant.value = "";
}

