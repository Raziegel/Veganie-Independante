// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

})
.factory("Touriste", function(){
  var Pseudo
  var MotDePasse
  var Nom
  var Prenom
  var NumTel
  var Mail
  var Hotel
  return{
    getNom: function(){
      return this.Nom
    },
    getPrenom: function(){
      return this.Prenom
    },
    getNumTel: function(){
      return this.NumTel
    },
    getMail: function(){
      return this.Mail
    },
    getHotel: function(){
      return this.Hotel
    },
    getPseudo: function(){
      return this.Pseudo
    },
    getMotDePasse: function(){
      return this.MotDePasse
    }
  }
})

.config( function($stateProvider,$urlRouterProvider){

   $stateProvider
   /*à partir d'ici, décrire les différents
états posiibles dans l'application.*/
.state('onglets', {
    url: "/onglets",
    templateUrl: "onglets.html",
    abstract: true
  })
     //Accueil
     .state('onglets.accueil', {
         url: "/accueil",
         views: {
        'accueil-tab': {
          templateUrl: "accueil.html",
          controller: "accueilController"
        }
      }
       })
       //Inscription
       .state('inscription', {
           url: "/inscription",
           templateUrl: "inscription.html",
           controller: "inscriptionController"
         })
       //Connexion
       .state('connexion', {
           url: "/connexion",
           templateUrl: "connexion.html",
           controller: "connexionController"
         })
       // Restauration
       .state('onglets.restauration', {
           url: "/restauration",
           views: {
          'restauration-tab': {
            templateUrl: "restauration.html",
            controller: "restaurationController"
          }}
          })
       // Decouverte
       .state('onglets.decouverte', {
           url: "/decouverte",
           views: {
          'decouverte-tab': {
           templateUrl: "decouverte.html",
           controller: "decouverteController"
         }
       }
       })
       //Mon compte
       .state('onglets.moncompte', {
           url: "/moncompte",
           views: {
          'moncompte-tab': {
           templateUrl: "moncompte.html",
           controller: "moncompteController"
         }
       }
       })
       // un restaurant
       .state('onglets.restaurant', {
           url: "/restaurant",
           views: {
          'restauration-tab': {
           templateUrl: "restaurant.html",
           controller: "restaurantController"
         }
       }
       })
       // une activité
       .state('onglets.activite', {
           url: "/activite",
           views: {
          'decouverte-tab': {
           templateUrl: "activite.html",
           controller: "activiteController"
         }
       }
       })
       // Mes reservations
       .state('onglets.reservations', {
           url: "/reservations",
           views: {
          'reservations-tab': {
           templateUrl: "reservations.html",
           controller: "reservationsController"
         }
       }
       })
   //Par défaut, redirection sur la page d'accueil'
   $urlRouterProvider.otherwise('/connexion')

 })


/*controleur de la page d'accueil,
il sera activé à l'initialisation de celle-ci
dans les paramètres de la fonction,
on ajoute toutes les dépendances
dont on a besoin (ici en exemple $scope et $state)*/
.controller('accueilController', function($scope, $state){
 //Choses à faire à l'initialisation de la page
})

.controller('inscriptionController', function($scope, $state){
 //Choses à faire à l'initialisation de la page
})
.controller('connexionController', function($scope, $state){
 //Choses à faire à l'initialisation de la page
})
.controller('restaurationController', function($scope, $state){
 //Choses à faire à l'initialisation de la page
})
.controller('decouverteController', function($scope, $state){
 //Choses à faire à l'initialisation de la page
})
.controller('moncompteController', function(Touriste, $scope, $state){
  $scope.NomRecu = Touriste.getNom();
  $scope.PrenomRecu = Touriste.getPrenom();
  $scope.MailRecu = Touriste.getMail();
  $scope.TelRecu = Touriste.getNumTel();
  $scope.HotelRecu = Touriste.getHotel();
  $scope.PseudoRecu = Touriste.getPseudo();
  $scope.MotDePasseRecu = Touriste.getMotDePasse();
})
.controller('restaurantController', function($scope, $state){
 //Choses à faire à l'initialisation de la page
})
.controller('activiteController', function($scope, $state){
 //Choses à faire à l'initialisation de la page
})
.controller('reservationsController', function($scope, $state){
 //Choses à faire à l'initialisation de la page
})
.controller('inscriptionFormController', function (Touriste, $scope, $state) {
  $scope.chercher = function (nom, prenom, mail, tel, hotel, pseudo, motdepasse) {
    Touriste.Nom = nom
    Touriste.Prenom = prenom
    Touriste.Mail = mail
    Touriste.NumTel = tel
    Touriste.Hotel = hotel
    Touriste.Pseudo = pseudo
    Touriste.MotDePasse = motdepasse
    $state.go('onglets.accueil')
  }
})

.controller('connexionFormController', function (Touriste, $scope, $state) {
  $scope.seconnecter = function (pseudo, motdepasse) {
    Touriste.Pseudo = pseudo
    Touriste.MotDePasse = motdepasse
    $state.go('onglets.accueil')
  }
})
.controller('restaurantActionController', function($scope, $state, $ionicPopup){
 //controller d'actions au sein de la page
 $scope.showPopup= function(){
var Confirm = $ionicPopup.show({
title : '<div class="bar bar-header bar-dark"><h1 class="title">Effectuer une r&eacute;servation</h1></div>',
template : '<label for="motdepasse" class="item item-input item-stacked-label" style="top: 10px;"><span class="input-label">Votre nom</span><input type="text" ng-model="client.nom" placeholder="Nom" style="background-color: #EAEAEA;" required></label><br><label for="motdepasse" class="item item-input item-stacked-label"><span class="input-label">Nombre de participants</span><input type="number" ng-model="client.participants" placeholder="Nombre de participants" style="background-color: #EAEAEA;" required></label><br><label for="motdepasse" class="item item-input item-stacked-label"><span class="input-label">Date de rerservation</span><input type="datetime-local" ng-model="client.date" style="background-color: #EAEAEA;" required></label>',
buttons: [
       { text: 'Annuler' },
       {
         text: "Envoyer",
         type: "button-dark",
         onTap: function(e) {
          if (!$scope.client.nom && !$scope.client.participants && !$scope.client.date) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
            //do things
          }
       }
}]})
}

})
