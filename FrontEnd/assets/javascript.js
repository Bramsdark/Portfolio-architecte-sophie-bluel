const url = "http://localhost:5678/api";
const btnLog = document.getElementById("connect");
const btnOut = document.getElementById("sLogout");
const btnMod = document.getElementById("modifImg");
const popup = document.querySelector(".modal");
const popup2 = document.querySelector(".modalAjout");
const btnQpop = document.getElementById("quitAP");
const btnQpop2 = document.getElementById("quitAP2");
const btnApop = document.getElementById("aPhoto");
const deroulant = document.getElementById("selectCate");
const buttonValidation = document.getElementById("validationAjout");
const uploadImage = document.getElementById("buttonAP");
const noImage = document.getElementById("imageNo");
const yesImage = document.getElementById("imageYes");
var ajoutTitre = document.getElementById("titre");
var imageUp; 
var id = localStorage.getItem('id');
var token = localStorage.getItem('token');
var tous = document.getElementById("tous");
var imageToProcess;
let set = new Set();
let set2 = new Set();
let listCatId = {name : set, id : set2};
let idSize = 1;
let works = [];
let eventList = [];
let editImg; // Déclaration de la variable editImg en tant que variable globale






window.onload = function(){worksInit()};


function worksInit()
{
  fetch(url + "/works")
        .then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              
              works = data;
              console.log(works);
              const gallery = document.querySelector(".gallery");
              editImg = document.querySelector(".imageEdit");

              for(let i=0; i < data.length; i++)
              {
                  var fig = document.createElement("figure");
                  var fig2 = document.createElement("figure");

                  fig.classList.add("category" + works[i].categoryId);
                  fig.id = "gallId" + works[i].id;
                  fig2.classList.add("editImg");
                  fig2.id = "modId" + works[i].id;

                  let curSet = works[i].category.name;
                  set.add(curSet);
                  set2.add("category" + works[i].categoryId);

                  gallery.appendChild(fig);
                  editImg.appendChild(fig2);  

                  var img = document.createElement("img");
                  var img2 = document.createElement("img");
                  img.src = works[i].imageUrl;
                  img.alt = works[i].title;
                  img2.src = works[i].imageUrl;
                  img2.alt = works[i].title;

                  var btn = document.createElement("BUTTON");
                  btn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
                  btn.style.marginLeft = "2.5%";
                  btn.style.marginTop = "0.2%";
                  btn.style.position = "absolute";
                  btn.addEventListener("click", function () {
                    deleteWork(works[i]);
                  })
                  fig2.appendChild(btn);

                  fig.appendChild(img);
                  fig2.appendChild(img2);
      
                  var figu = document.createElement("figcaption");
                  figu.textContent = data[i].title;
                  fig.appendChild(figu);
                  //console.log(fig.classList); 
              }

              
              set.forEach((element) => {
                var options = document.createElement("option");
                options.value = element;
                options.text = element;
                deroulant.appendChild(options);
                var button = document.createElement('button');
                button.setAttribute('id', "category" + idSize);
                button.setAttribute('type', 'button');
                button.textContent = element;
                document.getElementById('buttonPort').appendChild(button);
                button.addEventListener("click", function (){
                filtered(button.id)
                }, false);
                eventList.push(document.getElementById(button.id));

                idSize++;
              });
              
            });
          }

          else {
            console.log("Erreur lors de la récupération des données.");
          }
        })
        var buttonTous = document.getElementById("tous");
        buttonTous.style.color = "#FFFFFF";
        buttonTous.style.background = "#1D6154";
        
}



if (btnLog) {
  btnLog.addEventListener("click", () => {
    connexion();
  });
}

if (btnOut) {
  btnOut.addEventListener("click", () => {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
  });
}

if(btnMod)
{
  btnMod.addEventListener("click", function(){
    popup.classList.toggle("active")
  })
}

if(btnQpop){
  btnQpop.addEventListener("click", function() {
    document.getElementById('titre').value = "";
    popup.classList.toggle("active")
    noImage.style.display = "inline";
    yesImage.style.display = "none";
    if(imageUp)
    {
      yesImage.removeChild(imageUp);
    }
    if(imageToProcess)
    {
      imageToProcess = null;
    }
    deroulant.value = "";
    buttonVali();
  })
}

if(btnApop)
{
  btnApop.addEventListener("click", function(){
    popup2.classList.toggle("active")
    popup.classList.toggle("active")
    
  })
}

if(btnQpop2){
  btnQpop2.addEventListener("click", function() {
    document.getElementById('titre').value = "";
    popup2.classList.toggle("active")
    noImage.style.display = "inline";
    yesImage.style.display = "none";
    if(imageUp)
    {
      yesImage.removeChild(imageUp);
    }

    if(imageToProcess)
    {
      imageToProcess = null;
    }
    buttonVali();
    deroulant.value = "";
    console.log(imageUp);
  })
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
          console.log(data);
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

if(id == 1)
{
    var bar = document.getElementById("bandeEdit");
    bar.style.display = "flex";
    var modi1 = document.getElementById("modifImg");
    modi1.style.display = "inline";
    var modi2 = document.getElementById("modifProf");
    modi2.style.display = "flex";
    var slogin = document.getElementById("sLogin");
    slogin.style.display = "none";
    var slogout = document.getElementById("sLogout");
    slogout.style.display = "inline";
    var filtre = document.getElementById("buttonPort");
    filtre.style.display = "none";
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
}


tous.addEventListener("click", () => {
  
  filtered();
  for(var i = 0; i < set.size; i++)
  {
    var k = i + 1;
    var classCat = document.getElementsByClassName("category" + k);
    
    for(var j = 0; j < classCat.length; j++)
    {
      classCat[j].style.display = "inline";
      
    }
  }
   
    var buttonTous = document.getElementById("tous");
    buttonTous.style.color = "#FFFFFF";
    buttonTous.style.background = "#1D6154";
});

function filtered (cat) {
  console.log(cat);

  for(var i = 0; i < set.size; i++)
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
    console.log(idButtonCat);
    
    if(idButtonCat.id == cat)
    {
      console.log("Bouton changer !")
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

function titreVeri()
{
  ajoutTitre = document.getElementById('titre').value;
  console.log(deroulant);
  buttonVali();
}


function deleteWork(worki) {
    console.log(worki.id);
    console.log("Item Deleted");
    var gall = "gallId" + worki.id;
    var mod = "modId" + worki.id;
    console.log(gall);
    console.log(mod);
    const elements = document.getElementById(gall);
    const elements2 = document.getElementById(mod);
    console.log(elements);
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


function buttonVali()
{
  const button = document.querySelector('#validationAjout');
  if(ajoutTitre  != "" && selectCate.value != "" && imageToProcess != null)
  {
    button.disabled = false;
    buttonValidation.style.color = "#FFFFFF";
    buttonValidation.style.background = "#1D6154";
  }
  else
  {
    button.disabled = true;
    buttonValidation.style.color = "#306685";
    buttonValidation.style.background = "#CBD6DC";
  }
}


deroulant.addEventListener("change", buttonVali, false);
uploadImage.addEventListener("change", getImage, false);

function getImage()
{
  imageToProcess = this.files[0];

  let newImage = new Image(imageToProcess.width, imageToProcess.height);
  newImage.src = URL.createObjectURL(imageToProcess);
  newImage.style.width = "222px";
  
  imageUp = newImage;
  yesImage.appendChild(newImage);
  console.log(uploadImage);
  noImage.style.display = "none";
  yesImage.style.display = "inline-flex";
  buttonVali();
}

function textToBin(text) {
  var length = text.length,
      output = [];
  for (var i = 0;i < length; i++) {
    var bin = text[i].charCodeAt().toString(2);
    output.push(bin);
  } 
  return output.join("");
}

function convertImageToBinary(image) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const binaryString = reader.result;
      resolve(binaryString);
    };
    reader.onerror = reject;
    reader.readAsBinaryString(image);
  });
}

buttonValidation.addEventListener("click", () =>{
  var formData = new FormData();
  var binImg = convertImageToBinary(imageToProcess);
  var strTitle = String(ajoutTitre);
  var cat = selectCate.selectedIndex;

  formData.append("image", binImg);
  formData.append("title", ajoutTitre);
  formData.append("category", cat);

  console.log(binImg);

  fetch(url + "/works", {
    method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(formData)
  }).then((response) => response.json())
  .then((responseData) => {
    // Traitement de la réponse
    console.log(responseData);
  })
  .catch((error) => {
    // Gestion des erreurs
    console.error(error);
  });
})
