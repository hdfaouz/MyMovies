

const Title =document.getElementById('Nom');
const genre = document.getElementById('Categorie');
const Real = document.getElementById('temps');
const Statut = document.getElementById('statut');
const anSort = document.getElementById('statut');
const imag = document.getElementById('img');


const Movies = JSON.parse(localStorage.getItem ('Movies')) || [];


function Ajout(){

    const titleValue = Title.value.trim();
    const genreValue = genre.value.trim();
    const RealValue = Real.value.trim();
    const StatutValue = Statut.value.trim();
    const anSortValue = anSort.value.trim();
    

    //Objet
    

    const objet = {titleValue , genreValue, RealValue, StatutValue,anSortValue};
    Movies.push(objet); // ajout de l'objet dans la list Movies 10
    localStorage.setItem('Movies', JSON.stringify(Movies));//Mdifier liste 
    console.log(Movies);  
    
}

const button = document.getElementById("btn_ajouter");
button.addEventListener('click', () => {
    Ajout();
});


function Affichage(){

}