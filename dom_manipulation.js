// Variable du jeu
let nombre_tours = 10;
let compteur_tour;
let compteur_partie = 0;
let tour_restant;
let min;
let max;
let nombre_alea;
let nombre_joueur;
let perdu = false;
let from = document.getElementById("from");
let to = document.getElementById("to");
let historique_partie = [];

// Variable de manipulation du DOM
let launch = document.getElementById("launch");
let btn_launch = document.getElementById("btn-launch");
let play = document.createElement("div");
let game = document.getElementById("game");

let choice = document.createElement("input");
let btn_try = document.createElement("button");
let try_left = document.createElement("h4");

let win = document.createElement("div");
let win_msg = document.createElement("h4");
let win_score = document.createElement("p");

let less = document.createElement("div");
let less_text = document.createElement("p");
let less_retry = document.createElement("h5");

let more = document.createElement("div");
let more_text = document.createElement("p");
let more_retry = document.createElement("h5");

let loose = document.createElement("div");
let loose_msg = document.createElement("h4");
let loose_score = document.createElement("p");

let histo = document.getElementById("histo");
let history_table = document.getElementById("history-table");


// Permet d'obtenir un nombre aléatoire entre min et max exclu
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    max++;
    return Math.floor(Math.random() * (max - min)) + min;
}

// Fonction affichant le nombre de tour restant
function showNumberOfTurns(tour_restant){
    try_left.innerHTML = "Il te reste " + tour_restant + " chances";
}

// Fonction supprimant les valeurs de l'intervalle
function rangeDelete(){
    from.value = "";
    to.value = "";
}

// Fonction cachant la div de jeu et réaffichant le bouton de lancement
function restart(){
    // Trouver une solution pour le supprimer et ne pas le cacher, code inutile
    play.className = "display-none";
    launch.classList.remove("display-none");
}

function addResultHistory(win){
    historique_partie.push([win, compteur_tour, nombre_alea, min, max]);
    console.log(historique_partie);
}

function displayNewHistoryLine(win){
    addResultHistory(win);
    if (win){
        history_table.innerHTML += "<tr> <td>" + compteur_partie + "</td> <td> Gagné </td> <td>" + compteur_tour + "</td> <td>" + nombre_alea + "</td> <td>" + min + "</td> <td>" + max + "</td> <tr>";
    }
    else{
        history_table.innerHTML += "<tr> <td>" + compteur_partie + "</td> <td> Perdu </td> <td>" + compteur_tour + "</td> <td>" + nombre_alea + "</td> <td>" + min + "</td> <td>" + max + "</td> <tr>";
    }
}

// Lancement du jeu
btn_launch.addEventListener("click", () => {
    // On lance le jeu uniquement si les valeurs de l'intervalle sont remplies
    if ((from.value != "") && (to.value != "")){
        compteur_partie++;
        //console.log("nombre de partie : " + compteur_partie);
        // On cache le bouton de lancement
        launch.classList.add("display-none");

        // On met la classe play à notre div pour pouvoir la styliser
        play.className = "play";

        // Mise en place de l'input de choix
        choice.className = "input";
        choice.id = "choice";
        choice.placeholder = "Mon choix";
        choice.type = "number";

        // Mise en place du bouton permettant d'envoyer sa réponse
        btn_try.className = "btn";
        btn_try.innerHTML = "essayer";

        // Mise en place de l'affichage du nombre de tour restant
        tour_restant = nombre_tours;
        showNumberOfTurns(tour_restant);

        //On ajoute tous les éléments dans la div play avant de l'ajouter à la page
        play.appendChild(choice);
        play.appendChild(btn_try);
        play.appendChild(try_left);
        game.appendChild(play);

        // Set up du nombre aléatoire
        min = from.value;
        max = to.value;
        nombre_alea = getRandomInt(min, max);
        console.log("nombre aléatoire : " + nombre_alea);

        // Reinitialisation du compteur_tour
        compteur_tour = 0;

        // On cache les potentiels annonces de victoire ou de défaite
        win.className = "display-none";
        loose.className = "display-none";

        // On supprime la potentielle valeur dans l'input de choix
        choice.value = "";
    }
});

// Phase de jeu
btn_try.addEventListener("click", () => {
    // On fait un nouveau tour uniquement si l'input de choix est rempli
    if (choice.value != ""){

        // On caches les potentiels messages supérieur ou inférieur
        more.className = "display-none";
        less.className = "display-none";

        // On rentre la valeur de l'input choix dans la variable nombre_joueur
        nombre_joueur = choice.value;

        // On incrémente le compteur_tour et diminue le nombre de tour restant
        compteur_tour++;
        tour_restant--;
        
        // VICTOIRE
        if (nombre_alea == nombre_joueur){
            // On cache la div de jeu et réaffiche le bouton de lancement
            restart();

            // Mise en place de la div de victoire
            win.classList.remove("display-none");
            win.classList.add("win");
            win_msg.classList.add("win-msg");
            win_msg.innerHTML = "<span>bravo</span> tu as réussi, n’hésites  pas à augmenter la difficulté !";
            win_score.classList.add("win-score");
            win_score.innerHTML = "Tu as trouvé la valeur " + nombre_alea + " en " + compteur_tour + " coup.s";
    
            // On supprime l'intervalle
            rangeDelete();
    
            //On affiche la div de victoire
            win.appendChild(win_msg);
            win.appendChild(win_score);
            game.appendChild(win);
            displayNewHistoryLine(true);
        }
    
        // DEFAITE
        else if (tour_restant == 0){
            // On cache la div de jeu et réaffiche le bouton de lancement
            restart();
    
            // Mise en place de la div de défaite
            loose.classList.remove("display-none");
            loose.classList.add("loose")
            loose_msg.classList.add("loose-msg");
            loose_msg.innerHTML = "<span>dommage</span> tu ne m'as pas déchiffré, penses à baisser la difficulté !";
            loose_score.classList.add("loose-score");
            loose_score.innerHTML = "La valeur à trouver était " + nombre_alea;
    
            // On supprime l'intervalle
            rangeDelete();
    
            //On affiche la div de défaite
            loose.appendChild(loose_msg);
            loose.appendChild(loose_score);
            game.appendChild(loose);
            displayNewHistoryLine(false);
        }
    
        // CHOIX TROP GRAND
        else if (nombre_alea < nombre_joueur){
            // Mise en place de la div "trop grand"
            less.classList.remove("display-none");
            less.classList.add("less");
            less_text.classList.add("less-text");
            less_text.innerHTML = "Ta valeur est trop grande";
            less_retry.classList.add("less-retry");
            less_retry.innerHTML = "Ressaye";
    
            //On affiche la div "trop grand"
            less.appendChild(less_text);
            less.appendChild(less_retry);
            // game.appendChild(less);
            play.appendChild(less);
        }
    
        // CHOIX TROP PETIT
        else if (nombre_alea > nombre_joueur){
            // Mise en place de la div "trop petit"
            more.classList.remove("display-none");
            more.classList.add("more");
            more_text.classList.add("more-text");
            more_text.innerHTML = "Ta valeur est trop petite";
            more_retry.classList.add("more-retry");
            more_retry.innerHTML = "Ressaye";
    
            //On affiche la div "trop petit"
            more.appendChild(more_text);
            more.appendChild(more_retry);
            // game.appendChild(more);
            play.appendChild(more);
        }
    
        // AFFICHAGE TOUR RESTANT
        if (tour_restant != 0){
            showNumberOfTurns(tour_restant);
        }
        
        // On supprime la valeur dans l'input de choix
        choice.value = "";
    }
});