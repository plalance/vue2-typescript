## Les technologies et outils


| Technologie / Composants   |     Doc         |     Infos supplémentaires         |
| :------------ | :-------------: |:-------------: |
|VueJs2        |https://vuejs.org/v2/guide/| Framework Front-End|
|Axios         |https://github.com/axios/axios|Pour les promesses de requettes HTTP PUT / GET / POST|
|Vue-Axios     |https://www.npmjs.com/package/vue-axios|Wrapper Axios VueJs 2|
|Lodash         |https://lodash.com/|Librairie facilitant la manipulation / opérations sur les objets javascripts|
|Vue I18n|https://kazupon.github.io/vue-i18n/|Plugin d'internationalisation d'appli Vue|
|Vue-X|https://vuex.vuejs.org/guide/|Gestionnaire de State et Commit / Dispatcher d'objets JS dans tous les composants Vue|
|Vue-Cookie| https://github.com/alfhen/vue-cookie | Plugin Vue-JS de manipulation de cookies |

## Utile

| Technologie   |     Doc         |     Infos supplémentaires         |
| :------------ | :-------------: |:-------------: |
| Extension Chrome : Restlet Client|https://chrome.google.com/webstore/detail/restlet-client-rest-api-t/aejoelaoggembcahagimdiliamlcdmfm|Extension chrome : Testeur d'API, POST, GET, PUT...|
| Extension Chrome : Vue.Js devtools: Debug d'appli Vue et Vue2 |https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd||


#### Prérequis
- NodeJs / Npm (voir https://nodejs.org/en/download/ pour installatateur windows)
- Avoir mis à jour sa version npm (https://www.npmjs.com/package/latest-version)
		npm install --save latest-version
- Installation de Brunch pour compilation des assets, JS, et Scss, templates Vue
		npm install -g brunch
- Git installé (gitflow optionnel)
        
## Install

        git clone <rrepos>  ...Fichiers source
        yarn install        ...Dépendancess NPM
        npm run dev OU yarn run dev
        Lancer la page index.html /web/index.html OU appeler l'url du site.
        
## Structure du projet

## Structure fichiers SASS et notation BEM

#### Structure

La structure sass est la suivante :

UN fichier main.scss principal.

Les modules scss (partials) doivent être préfixés d'un underscore " _ " pour ne pas être compilés 2 fois par brunch.

Les fichiers suivants : _exemple.scss ne sont pas compilés sauf s'ils sont inclus dans un autre.

Exemple :

Dans main.scss

@import "./components/button";

Dans /build/scss/components/button.scss :

.button{
    ...
}

#### Notation BEM

J'ai choisi d'utiliser la notation OOCS (Object Oriented CSS), elle n'est pas obligatoire.

Exemple avec sass :

    <div class="component">
      <div class="component__child-element"></div>
    </div>
    <div class="component">
      <div class="component__child-element"></div>
    </div>
    
    .component {
      display: block;
      max-width: 30rem;
       
      &__child-element {
        border-radius: 50%;
        position: absolute;
        top: 50%;
      }
    }

Les éléments de premier rang sont les <strong>conteneurs<strong/>.

Les élements avec double underscore " __ " sont des <strong>objets<strong/>.

Les éléments avec " -- " sont des <strong>mofifiers</strong> 

Exemple de "conteneur" / "éléments" / élément avec "modifier" :

Un "modifier" permet de définir le style d'un élément dans un contexte particulier ou qui possède différentes variantes.

Exemple : les modifiers --blue, --large, --hidden

Exemple complet :

    .block{             // Block est conteneur
        
        &__title{       // Title est élément. Correspond à .block__title
            ...
        }
        
        &__button {     // Button est un autre élément. Correspond à .block__button
            ...
            
            &--large {  // Modifier --large. Correspond à .block__button--large
                ...
            }
        }
        
    }
    
## Le Store VueX

### Le store

A la manière de Redux (et du pattern architectural Flux de Facebook dont il est largement inspiré), Vuex impose un flux de données unidirectionnel, dont le principe est opposé au magique “two-way bindings” de la directive v-model de Vue.js :

Les concepts manipulés sont les suivants :

le state, l’arbre unique des attributs constitutifs de l’état qui sera partagé entre les composants ;
les mutations, les seules fonctions par lesquelles on peut passer pour modifier le state et dans lesquelles seules des actions synchrones peuvent être effectuées ;
les actions, des fonctions qui déclenchent une ou plusieurs mutations et faisant potentiellement des appels complémentaires, en particulier des appels asynchrones.
En complément, les getters sont les fonctions par lesquelles ont peut “lire” le state.


### Configuration

Définition d'un state ( = Variable qui sera manipulée par VueX au travers de méthodes, méthodes appelées par nos composants)

Ici on déclare simplement la variable qui permettra à tout nos composants de savoir si la sidebar doit être fermée ou ouverte.

        const state = {
            sideNavActive: false,
        };

Pour pouvoir effectuer des opérations sur un state, (modififier, mettre à null, ajouter un élément a un tableau..), on utilise la notion de mutation;

Une mutation ne peut être appelée que par VueX, pas par un composant. Ici la mutation permettra de mettre à true ou false le state "sideNavActive".

        const mutations = {
            TOGGLE_SIDENAV: (state, value) => {
                state.sideNavActive = value;
            }
         };

Pour que nos composants puissent récupérer les valeurs des states. On déclare les getters.

        const getters = {
            sideNavActive: (state) => state.sideNavActive
        };
 
 Enfin, pour demander au store d'effectuer une mutation, j'ai déclarer les "actions". Elles sont appelable depuis les composants.
 
    actions: {
        toggleSideNav: (store, value) =>{
            store.commit('TOGGLE_SIDENAV', value);
        }
    }

### Appels au Store / Récupération des States et Actions dans les composants Vue
    
Voici le processus à suivre:

1. Le store fournit un esemble de variables, les "state", accessibles, mais non modifiables.
2. Pour effectuer des opérations sur un state, le store passe par une mutation.
3  Une action peut être définie, pour être appelée par un composant. Action qui va appeler des mutations.

Car concret :

- Le state de "livres" est un tableau vide.
- l'action getDatabaseStates du store peut récupérer les livres stockés en base (appels d'API ou autre..) puis appeler une mutation en lui passant en paramètre le tableau de données.
- La mutation va ensuite mettre à jour le state avec les données.

Une action du store est appelable dans un composant via : this.$store.dispatch('ma Methode');

Mais il existe un moyen plus simple pour appeler les getters / actions du store : les mapActions et mapGetters

Les getters sont récupérables de la même manière, au moyen du mapGetters que l'on peut attribuer au computed de Vue.

Exemple complet du script du composant header (simplifié) :

    <script>
                     import {mapGetters, mapActions} from 'vuex';
                 
                     export default {
                         name: 'Header',
                         data() {
                             return {}
                         },
                         computed: {
                             ...mapGetters([
                                 'sideNavActive'             // La valeur du state est transmise grace au getter
                                                             // Appelable via this.sideNavActive
                             ])
                         },
                         methods: {
                             ...mapActions([
                                 'toggleSideNav'             // La méthode du store est déosormais
                                                             // appelable via this.toggleSideNav();
                                                             
                             ]),
                             testAction(){***}               // Méthode à appeler via this.testAction();
                             // Mes autres méthoedes ici
                         },
                     };
                 </script>

On peut mapper les actions du store pour leur donner un nouveau nom au sein de notre composant. POur ne aps entrer en conflit au cas ou :

    ...mapActions({
          maMethodeRenomme:'toggleSideNav'             // La méthode du store toggleSideNav est déosormais
                                                         // mappée et appelable via this.maMethodeRenomme();
                                      
      }),

A noter que poura voir accès au mapAction et mapGetters dans un composant, il faut les importer depuis VueX

    import {mapGetters, mapActions} from 'vuex';
 
## traduction (Vue - I18n)

Les éléments de l'interface sont traduits à la volée grâce au composant core vue-i18n implémenté dans app.js.

Emplacement : web/traductions
Format des fichiers : json

Les deux fichiers sont inclus par require('fichier.json') grâce au plugin json-brunch.

Process :
Les fichiers sont required lors de l'initialisation de l'instance Vue (app.js)

Les trableaux issus de ces json sont stockés et définis en propriété globale Vue, accessible dans tout l'application.

Exemple :

        // Inclusion des json de traduction
       let fr_traductions = require('../../web/traductions/fr.json');
       
       // Mise sous forme d'objet javascript structuré
       const trads = {
           fr: {
               api_choices: fr_traductions.trads.api_choices,
               routes: fr_traductions.trads.routes,
               interface: fr_traductions.trads.interface,
               language: fr_traductions.trads.language,
               forms: fr_traductions.trads.forms,
               action: fr_traductions.trads.action,
               nvms_codes: fr_traductions.trads.nvms_codes,
           }
       };
       
       // Traductions chargées dans le composant Vue I128n
       let i18n = new VueI18n({
           locale: 'fr, // set locale
           fallbackLocale: 'fr', // locale if default not found
           messages: trads, // set locale messages
       });
       
L'instance vue-i18n est associée à l'instance vue dès le départ. Ainsi pas besoin d'inclure i18n dans chaque composant enfant.

Utilisation dans un template Vue SFC (Single File Component) :

        <div id="app">
          <p>{{ $t("api_choices[0].name") }}</p>
        </div>
        
Ici la locale est fr, I18 ira donc chercher dans trads.fr.api_choices le premier objet et affichera son nom.
Il affichera donc "Vérification" (voir exemple de fichier de traduction ci dessous)

#### Structure du fichier de traduction

        {
          "trads": {
            "api_choices": [
              {
                "name": "Vérification",
                "code": "G110"
              },
              {
                "name": "Distribution",
                "code": "G120",
                "codeUndo": "G121",
                "codeManual": "G122",
                "codeUndoManual": "G123"
               }
               ...
            ],
            "routes": {
              "home": "Accueil",
              "singlepack": "Traitement unitaire",
              "bulk": "Traitement par lot"
              ...
            },
            "interface": {
              "send_button": "Envoyer",
              "erase_button": "Effacer",
              ...
             },
            "language": {
              "en": "Anglais",
              "fr": "Français"
            },
            "action": {
              "type": "Procédure",
              ...
            },
            "forms": {
              "service_selection": "Choix du service",
              "singlepack": {
                "product_code": "Code produit",
                "pack_serialnumber": "Numéro de l'article",
                "batch_id": "Identifiant du lot",
                "batch_expedition_date": "Date d'expédition du lot (JJ/MM/AAAA)"
              }
            },
            "nvms_codes": {
              "NMVS_SUCCESS": "Opération effectuée avec succès.",
              "NMVS_TI_AU_01": "Erreur NMVS : L'authentification à échoué.",
               ...
            }
          }
        }
    
## Définition des services accessibles dans l'interface

Les services d'API listés dans l'application sont ceux définit dans les fichiers de traduction fr.json / en.json

Si les services ne sont aps définis dans ces fichiers, l'application ne fonctionnepa, car le tabelau d'objet API_CHOICES est tiré du json fr.json parsé.

Format pour un service dans api_choices: 
La génération des choix "manual", "undo" est automatique selon la structure de l'objet.
Si codeUndo n'est pas présent, l'utilisateur ne voit pas l'option "Undo" dans la catégorie de service.

    {
        name: 'Example of service',
        code: 'G120',
        codeManual: 'G122',
        codeUndo: 'G121',
        codeUndoManual: 'G125'
    }

Implémenter le même service dans le ficher en.json pour que tout fonctionne correctement en front.
 
    
## Routeur spécifique

J'ai implémenté le router de vue (vue-router) sous la forme d'un module javascript.
        
        /build/vue/Router

router.js : Définit l'implémentation du vue-router et les règles de routing. Accepter ou non certaines routes / redirections / règles de sécurité... à définir.
routing.js : Définition des routes sous forme d'objet javascript :

    {
        path: '/',
        name: 'home',
        meta: {
            title: 'Accueil',
            admin: false,
            visible: true,
            icon: 'dashboard'
        },
        component: require('../Pages/Home')
    },
        
| Propriété   |     Infos      |
| :------------ |:-------------: |
| path    | url de la route |
| name | Nom technique de la route. Utile pour faire des redirection / appels via le nom de route.|
|meta.title| Nom public de la route|
|meta.admin| Si défini, le vue router bloque l'accès si le MODE_ADMIN n'est pas défini dans config.js C'est un mode admin de développement. Pas en lien avec des quelconques droits d'accès utilisateur|
|meta.visible| Définit si la page est accessible ou non dans les rendus de listes des routes (router-link) |
|meta.icon| Défini l'icone à utiliser (icones du framework materialize CSS) |
|meta.accessible| Boolean : Définit si la page est accessible ou non via le router-view |
|component| Le composant au format SCF (Single File Component) à monter dans l'instance vue par vue-router quand cette route est appelée.|
|meta.requireAuth| Permet de définir si une route / page associée est acccesible ou non sans que l'utilisateur soit connecté. |


## Authentification

L'authentification sur cette application est faite de manière "state less" avec l'utilisation de token. (JJson Web Token)

Pour des raison pratiques / de sécurité les demandes d'authentification sont faite à un unique point : le store Vue X.

Dans le store se trouvent différentes méthodes permettant l'auhtentification / la déconnexion :

        authRequest: ({commit, dispatch}, user) => {

            return new Promise((resolve, reject) => { // The Promise used for router redirect in login
                // Loading time for demo
                // todo remove loader
                window.setTimeout(function () {

                    // todo replace if else with API call to backend
                    // todo repalce fake token with API response token

                    if (user.username === "toto" && user.password === "totopass") {
                        // todo replace fake token with API response token
                        let token = "toto_token_12345";
                        // todo replace fake user with api response user
                        let userAuth = {
                            username: user.username
                        };
                        let params = {
                            user: userAuth,
                            payload: token
                        };

                        commit('AUTH_SUCCESS', params);

                        // Send Success notif
                        dispatch('toastText', [true, 'Authentification réussie.']);

                        resolve('200');
                    } else {
                        commit('AUTH_ERROR');
                        // Send Error login notif
                        dispatch('toastText', [false, 'Connection impossible. Vérifiez vos identifiants / mots de passe.']);

                        reject('401');
                    }
                }, 1000);
            });

Pour l'authentification :

2 state : token et cookieToken (pour le stockage soit dans le localStorage soit dans les cookies)
2 mutations : AUTH_SUCCESS et AUTH_ERROR qui permettent de sotcker / supprimer le token du navigateur et actualiser les states concernés.

        AUTH_SUCCESS(state, params) {
           state.status = 'success';
           state.token = params.payload;
           state.cookieToken = params.payload;
           state.user = params.user;
           // Set Token in cookies
           VueCookie.set('token', params.payload, 10);
           // Set token in HTML5 LocalStorage
           localStorage.setItem("token", params.payload);
           localStorage.setItem("user", JSON.stringify(params.user));
       },
       AUTH_ERROR(state) {
           state.status = 'error';
           state.token = null;
           state.user = null;
           state.cookieToken = null;
           // Remove token from cookies
           VueCookie.delete('token');
           // Remove token from localstorage
           localStorage.removeItem("token");
           localStorage.removeItem("user");
       }
       
La méthode authRequest doit être complétée avec un appel vers l'API qui gère l'authentification, pour retourner un token valide.

De plus : la présence de token dans le local storage permet de définir toutes les entêtes de reqûetes axios avec le bon token.
Ainsi chaque appel à l'API sera facile à déchiffrer pour le serveur, qui aura le token en en-têtede requête.

Exemple :
        
         axios.defaults.headers.common['Authorization'] = token;
         
### Contrôle d'accès

Selon les routes établies dans routing.js, chaque route peut être configurée pour être visible / accessible / requiert d'être authentifié :

Exemple de la page singlepack qui est accessible (donc sera chargée par le router-view), qui est visible (donc qui sera listé dans le menu de gauche)
et qui possède le requireAuth à true : Ce qui implique qu'au niveau du router de l'application. L'accès sera redirigé vers la page d'accueil si les conditions ne sont pas remplies.

    {
         path: '/singlepack',
         name: 'singlepack',
         meta: {
             title: 'Traitement unitaire',
             admin: false,
             visible: true,
             accessible: true,
             icon: 'filter_1',
             requireAuth: true
         },
         component: require('../Pages/SinglePack')
     },
     
## Animations

3 animations sont présentes sur tuote l'applciation et sont controlables intégralement par le store.

- Le loader d'applciation (pleine page)
- Le loader d'action (en haut à droite, circulaire)
- les notifications en haut à droite (appelés Toasts)

#### Pour envoyer un toast

Dans un composant Vue : 

    // true = success green notif | false = red error notif
    this.$store.dispath('toasttext', [  true, 'Texte de la notification'] );
    
Exemple de la notification de conenxion réussie appelée par le store : <br>
Ici this.$store est rempalcé par dispatch, car dans une action l'objet dispatch est accessible directement.

    // Send Success notif
    dispatch('toastText', [true, 'Authentification réussie.']);
    