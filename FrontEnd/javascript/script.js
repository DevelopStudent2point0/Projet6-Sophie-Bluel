/* Variables globales*/
const gallery = document.querySelector (".gallery");
const categoriesContainer = document.querySelector (".categoriesContainer")
const url = "http://localhost:5678/api/works"
let allWorks = []

//Avec cette méthode je vais chercher les works pour les afficher dans la galerie
const getWorks = async()=>{
    try{
        const result = await fetch(`${url}`)
        const data = await result.json()
        allWorks = data
        console.log("L'ensemble des works est ", allWorks)
        for(let work of allWorks){
            const figure = figureGallery(work)
            gallery.appendChild(figure)

        }

    }catch(error){
        console.error(error)
    }

}
getWorks()

const displayWorks = (works) => {
    gallery.innerHTML = ""; // Effacer le contenu actuel de la galerie
    works.forEach((work) => {
      const figureWork = figureGallery(work);
      gallery.appendChild(figureWork);
    });
  };

const figureGallery = (work)=>{
    const figure = document.createElement("figure")
    const image = document.createElement("img")
    image.src = work.imageUrl
    image.alt = work.title
    figure.appendChild(image)
    const figureCaption = document.createElement("figcaption")
    figureCaption.innerHTML = work.title
    figure.appendChild(figureCaption)
    return figure
}

const API_CATEGORY = "http://localhost:5678/api/categories"
let categories = []
// Ici je viens récupérer les catégories
const getCategories = async ()=>{
    try {
        const resultCategories = await fetch(`${API_CATEGORY}`);
        const dataCategories = await resultCategories.json();
        categories = dataCategories
        categories.unshift({
            id : 0 ,
            name : "Tous"
        })
        console.log("on ajoute le bouton tous",categories)
        categories.forEach(cat => {
            const buttonFiltre = document.createElement("button")
            buttonFiltre.setAttribute("categorie-id",cat.id)
            buttonFiltre.innerHTML = cat.name
            categoriesContainer.appendChild(buttonFiltre)
        });
        addEventListenerToButton()
    } catch (error) {
        console.error(error);
    }
    
}
getCategories()

const addEventListenerToButton = ()=> {
const buttonArray = document.querySelectorAll(".categoriesContainer button") 
console.log("le tableau contient",buttonArray)
buttonArray.forEach((button)=>{
    button.addEventListener("click",()=>{
        //On retire la classe active de tous les boutons
        buttonArray.forEach((btn)=>btn.classList.remove("filter-active"))
        //On ajoute la classe active sur le bouton sélectionné
        button.classList.add("filter-active")
        
 // Filtrer les œuvres par catégorie
 const categoryId = button.getAttribute("categorie-id");
 if (categoryId !== "0") {
   const filteredWorks = allWorks.filter((work) => work.categoryId == categoryId);
   displayWorks(filteredWorks);
 } else {
    console.log("Les works sont",allWorks)
   displayWorks(allWorks); // Afficher tous les works si "Tous" est cliqué
 }
    })
})
}