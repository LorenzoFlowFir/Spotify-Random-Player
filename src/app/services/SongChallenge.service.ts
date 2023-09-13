import { Injectable } from '@angular/core';
import SpotifyWebApi from 'spotify-web-api-js';
import { AppComponent } from '../app.component';

@Injectable({providedIn: 'root'})
export class SongChallengeService {
    public loader = false;

    constructor() { }
    
    public spotifyWebApi = new SpotifyWebApi();

    public getCreationDateFromTitle(title: any):any {
        // Extrait le numéro du jour à partir du titre
        let dayNumberMatch = title.match(/Day #(\d+)/);
        if (dayNumberMatch === null) {
            return null;
        }
        let dayNumber = parseInt(dayNumberMatch[1]);
    
        // La date de départ ("Day #001") est le 19 août 2021
        let startDate = new Date('2021-09-20');
        startDate.setDate(startDate.getDate() + (dayNumber - 1));  // Soustraire 1 car "Day #001" est le jour de départ
    
        // Formatte la date de sortie en dd/mm/yyyy
        let day = ("0" + startDate.getDate()).slice(-2);
        let month = ("0" + (startDate.getMonth() + 1)).slice(-2); // Les mois sont indexés à partir de zéro en JavaScript
        let year = startDate.getFullYear();
    
        return `${day}/${month}/${year}`;
   }

   public songChallenge(accessToken:any) {
    const userId = 'zwm5ckwimgvmvl1r2ih4xko25'; // Remplacez par l'ID de l'utilisateur
    
    fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const latestPlaylist = data.items; // La dernière playlist se trouve en première position
        console.log(`La dernière playlist de ${userId} est "${latestPlaylist[0].name}" `);
        console.log(latestPlaylist[0]);

        const playlistDiv = document.getElementById("songchallenge-details");

        const img = document.createElement("img");
        img.src = latestPlaylist[0].images[0].url;
        img.alt = `Cover de ${latestPlaylist[0].name}`;
        img.style.width = "100%";
        img.style.height = "100%";
        playlistDiv?.appendChild(img);

        const title = document.createElement("h3");
        title.textContent = latestPlaylist[0].name;
        playlistDiv?.appendChild(title);

        const date = document.createElement("h4");
        const nom = latestPlaylist[0].name;
        date.textContent = this.getCreationDateFromTitle(nom);
        playlistDiv?.appendChild(date);

        const btnAccess = document.createElement("a");
        btnAccess.href = latestPlaylist[0].external_urls.spotify;
        btnAccess.target = "_blank";
        btnAccess.classList.add("btn");
        btnAccess.classList.add("btn-success");
        btnAccess.textContent = "Accéder à la playlist";
        btnAccess.id = "btnAccess";
        playlistDiv?.appendChild(btnAccess);

        const shareBtn = document.createElement("button");
        shareBtn.classList.add("btn");
        shareBtn.classList.add("btn-primary");
        shareBtn.id = "shareBtn";
        if (window.matchMedia("(max-width: 428px)").matches) {
            shareBtn.textContent = "Partager ce challenge";
            shareBtn.onclick = async function() {
                try {
                    const response = await fetch(img.src);
                    const blob = await response.blob();
                    const file = new File([blob], 'spotify-playlist-cover.png', { type: blob.type });
                    const filesArray = [file];
                    
                    if (navigator.canShare && navigator.canShare({ files: filesArray })) {
                        navigator.share({
                            files: filesArray,
                            title: 'Voici une superbe playlist Spotify!',
                            text: `Jetez un coup d'œil à cette playlist: "${latestPlaylist[0].name}"`,
                        })
                        .then(() => console.log('Partage réussi'))
                        .catch((error) => console.log('Erreur de partage', error));
                    } else {
                        console.log('Votre navigateur ne supporte pas l\'API de partage Web pour les fichiers');
                    }
                } catch(err: unknown) {
                    if (err instanceof Error) {
                        console.error(err.message);
                    } else {
                        console.error('An unknown error occurred:', err);
                    }
                }
            }; 
        }else {
            shareBtn.textContent = "Partager la playlist";
            shareBtn.onclick = function() {
                if (navigator.share) {
                    navigator.share({
                        title: 'Voici une superbe playlist Spotify!',
                        text: `Jetez un coup d'œil à cette playlist: "${latestPlaylist[0].name}"`,
                        url: latestPlaylist[0].external_urls.spotify,
                    })
                    .then(() => console.log('Partage réussi'))
                    .catch((error) => console.log('Erreur de partage', error));
                } else {
                    console.log('Votre navigateur ne supporte pas l\'API de partage Web');
                }
            };
        }
               
        

        playlistDiv?.appendChild(shareBtn);

        /*
        const sendInput = document.createElement("input");
        sendInput.type = "text";
        sendInput.id = "sendInput";
        sendInput.placeholder = "Entrez le lien de votre musique";
        playlistDiv?.appendChild(sendInput);*/

        const moreBtn = document.createElement("button");
        moreBtn.classList.add("btn");
        moreBtn.classList.add("btn-primary");
        moreBtn.id = "moreBtn";
        moreBtn.textContent = "Plus de challenge";
        let first = false;
        moreBtn.onclick = () => {
            if (moreBtn.textContent=="Plus de challenge" && !first) {
                moreBtn.textContent = "Retour";
                const divmore = document.createElement("div");
                divmore.style.display = "flex";  
                divmore.style.flexDirection = "row";  
                divmore.style.justifyContent = "space-between";  
                divmore.style.alignItems = "center";  
                divmore.style.flexWrap = "wrap";

                const overlay = document.createElement('div'); // Création d'un div en overlay
                overlay.style.position = 'fixed';
                overlay.style.display = 'none';
                overlay.style.width = '100%';
                overlay.style.height = '100%';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.right = '0';
                overlay.style.bottom = '0';
                overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
                overlay.style.zIndex = '2';
                overlay.style.cursor = 'pointer';

                const largeImage = document.createElement('img'); // Création de l'élément d'image en grand
                largeImage.style.position = 'absolute';
                largeImage.style.top = '50%';
                largeImage.style.left = '50%';
                largeImage.style.transform = 'translate(-50%,-50%)';
                largeImage.style.maxHeight = '80%';
                largeImage.style.maxWidth = '80%';
                largeImage.style.zIndex = '3';

                document.body.appendChild(overlay);
                overlay.appendChild(largeImage);

                for (let i = 1; i < 10; i++) {
                    const p = document.createElement('p');
                    const img = document.createElement('img');
                    const innerDiv = document.createElement('div');
                    img.src = latestPlaylist[i].images[0].url;
                    img.alt = `Cover de ${latestPlaylist[i].name}`;
                    img.style.width = "100px";
                    innerDiv.appendChild(img);
                    innerDiv.appendChild(p);
                    innerDiv.style.display = "flex";
                    innerDiv.style.flexDirection = "column";
                    innerDiv.style.justifyContent = "center";
                    innerDiv.style.alignItems = "center";
                    p.appendChild(document.createTextNode(this.getCreationDateFromTitle(latestPlaylist[i].name)));
                    divmore.appendChild(innerDiv);

                    img.addEventListener('click', () => {  // Ajout d'un gestionnaire d'événements click sur chaque image
                        largeImage.src = img.src;  // Changer le src de l'image en grand pour correspondre à l'image cliquée
                        overlay.style.display = 'block';  // Afficher l'overlay
                    });
                }

                document.getElementById("moreChallenge")?.appendChild(divmore);
                document.getElementById("moreChallenge")!.style.display = "block";

                // Fermer l'overlay quand on clique en dehors de l'image
                overlay.addEventListener('click', (event) => {
                    if (event.target == overlay) {
                        overlay.style.display = 'none';
                    }
                }); 
                first = true;   
            } else if (moreBtn.textContent=="Retour") {
                document.getElementById("moreChallenge")!.style.display = "none";
                moreBtn.textContent = "Plus de challenge";
            } else if (moreBtn.textContent=="Plus de challenge") {
                moreBtn.textContent = "Retour";
                document.getElementById("moreChallenge")!.style.display = "block";
            }
        };
        playlistDiv?.appendChild(moreBtn);
        
        


        document.getElementById('loadersongchallenge')!.style.display = "none";
    })
    .catch(error => console.error('Erreur :', error));

}
   
}