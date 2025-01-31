

const Title = document.getElementById('Nom');
const genre = document.getElementById('Categorie');
const Real = document.getElementById('temps');
const Statut = document.getElementById('statut');
const anSort = document.getElementById('sort'); 
const imgUpload = document.getElementById('img');

let imagePath = '';

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

    Movies.push(objet);
    localStorage.setItem("Movies", JSON.stringify(Movies));

    console.log(Movies);

    afficherFilms(); // Mettre à jour l'affichage

    window.location.href ="movie.html";
 
}

// Fonction pour afficher l'aperçu de l'image
function showPreview(event) {
    if (event.target.files.length > 0) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            imagePath = e.target.result;
            document.getElementById("file-image").src = imagePath; // Correction ici
            document.getElementById("file-image").style.display = "block";
            document.getElementById("file-image").style.borderRadius = "10px";
        };

        reader.readAsDataURL(file);
    }
}

//Clear input 



function clearData(){

    Title.value = '';
    genre.vlue = '';
    Real.value = '';
    Statut.value = '';
    anSort.value = '';

}

// Fonction pour afficher les films sur la page d'accueil
function afficherFilms() {
    const filmsContainer = document.querySelector("#film-list");
    
    if (!filmsContainer) {
        console.error("Erreur : filmsContainer est introuvable !");
        return;
    }
    filmsContainer.innerHTML =""; // Vider le conteneur avant d'ajouter les nouveaux films
    const Movies = JSON.parse(localStorage.getItem("Movies")) || [];

    Movies.forEach((film) => {
        const filmElement = document.createElement("div");
        filmElement.classList.add("film");

        filmElement.innerHTML = `
        
        <div class="test"  style: display=flex; >
            <img src="${film.image}" alt="${film.titleValue}" Style=" width: 200px;height: 200px; margin-top:200px; display: flex;">
            <h3>${film.titleValue}</h3>
           
            <button onclick="location.href=''"class="Modifier">Modifier</button>
            <button onclick="location.href=''" class="Supprimer">Supprimer</button>
            <button  class="detail" onclick="location.href='detail.html'">Detail</button>
            </div>
            
        `;

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
    localStorage.setItem("filmModifier", index);
    window.location.href = "modifier.html";
}

// Ajouter un événement au bouton pour ajouter un film
const button = document.getElementById("btn_ajouter");
button?.addEventListener('click', ()=>{
    Ajout();
    clearData();

});
    

// Charger les films au démarrage de la page
// document.addEventListener("DOMContentLoaded", afficherFilms);



