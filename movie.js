

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




