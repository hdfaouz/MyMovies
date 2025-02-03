

const Title = document.getElementById('Nom');
const genre = document.getElementById('Categorie');
const Real = document.getElementById('temps');
const Statut = document.getElementById('statut');
const anSort = document.getElementById('sort'); 
const imgUpload = document.getElementById('img');

let imagePath = '';
let editIndex =-1;

const Movies = JSON.parse(localStorage.getItem("Movies")) || [];



function Ajout() {
    
    const titleValue = Title.value.trim();
    const genreValue = genre.value.trim();
    const RealValue = Real.value.trim();
    const StatutValue = Statut.value.trim();
    const anSortValue = anSort.value.trim();

    if (!titleValue || !genreValue || !RealValue || !anSortValue) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    // Création de l'objet film
    const objet = {
        titleValue,
        genreValue,
        RealValue,
        StatutValue,
        anSortValue,
        image: imagePath || 'images/default.jpg' // Image par défaut si aucune image n'est ajoutée
    };
   if(editIndex === -1){
    Movies.push(objet);
    }
    else{
        Movies[editIndex] = objet;
        editIndex = -1;
    }
    localStorage.setItem("Movies", JSON.stringify(Movies));
    afficherFilms(); 
    clearData();

    }


// Fonction pour afficher l'aperçu de l'image
function showPreview(event) {
    if (event.target.files.length > 0) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            imagePath = e.target.result;
            document.getElementById("file-image").src = imagePath;
            document.getElementById("file-image").style.display = "block";
            document.getElementById("file-image").style.borderRadius = "10px";
        };

        reader.readAsDataURL(file);
    }
}


function clearData(){

    Title.value = '';
    genre.vlue = '';
    Real.value = '';
    Statut.value = '';
    anSort.value = '';
    imagePath = '';
    document.getElementById("file-image").style.display ="none";

}

// Fonction pour afficher les films sur la page d'accueil
function afficherFilms() {
    const filmsContainer = document.querySelector("#film-list");
    
    if (!filmsContainer) {
        console.error("Erreur : filmsContainer est introuvable !");
        return;
    }
    filmsContainer.innerHTML ="";
    const Movies = JSON.parse(localStorage.getItem("Movies")) || [];

    Movies.forEach((film , index) => {
        const filmElement = document.createElement("div");
        filmElement.classList.add("film");

        filmElement.innerHTML = `
        
        <div class="test"  style: display=flex; >
            <img src="${film.image}" alt="${film.titleValue}" Style=" width: 200px;height: 200px; margin-top:200px; display: flex;">
            <h3>${film.titleValue}</h3>
           
            <button id ="edit-button" onclick="modifierFilm(index)"class="Modifier">Modifier</button>
            <button onclick="location.href=''" class="Supprimer">Supprimer</button>
            <button  class="detail" onclick="location.href='detail.html?index=${index}'">Detail</button>
            </div>
            
        `;

        filmElement.querySelector(".Supprimer").addEventListener("click" , () => supprimerFilm(index));
        filmElement.querySelector(".Modifier").addEventListener("click" , () => modifierFilm(index));

        filmsContainer.appendChild(filmElement);
    });
}

// Fonction pour supprimer un film
function supprimerFilm(index) {
    let Movies = JSON.parse(localStorage.getItem("Movies")) || [];
    Movies.splice(index, 1);
    localStorage.setItem("Movies", JSON.stringify(Movies));
    afficherFilms();
}

// Fonction pour modifier un film (redirection vers une page de modification)
function modifierFilm(index) {
    const film = Movies[index];
    Title.value = film.titleValue;
    genre.value = film.genreValue;
    Real.value = film.RealValue;
    Statut.value = film.StatutValue;
    anSort.value = film.anSortValue;
    imagePath = film.image;
    document.getElementById("file-image").src = imagePath;
    document.getElementById("file-image").style.display = "block";
    document.getElementById("file-image").style.borderRadius = "10px";
    editIndex = index;
    console.log('Editing film at index : ${index}');
}

function afficherDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get('index');
    const Movies = JSON.parse(localStorage.getItem("Movies")) || [];

    if (index !== null && Movies[index]) {
        const film = Movies[index];

        document.getElementById('title').innerText = `titre: ${film.titleValue}`;
        document.getElementById('genre').innerText = `genre: ${film.genreValue}`;
        document.getElementById('real').innerText = `Réalisateur: ${film.RealValue}`;
        document.getElementById('statut').innerText = `Statut: ${film.StatutValue}`;
        document.getElementById('description').innerText = `Année de sortie : ${film.anSortValue}`;
    } else {
        console.error("Film not found ");
    }
}



const button = document.getElementById("btn_ajouter");
button?.addEventListener('click', ()=>{
    Ajout();
    clearData();

});
    


document.addEventListener("DOMContentLoaded", afficherFilms);

if(window.location.pathname.endsWith('detail.html')){
    document.addEventListener("DOMContentLoaded" , afficherDetail);
}



