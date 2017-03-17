// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true)
    }
    if (window.StatusBar) {
      StatusBar.styleDefault()
    }
  })

})
.factory( 'Restau', function(){
  var id
  return{
    getid: function () {
      return this.id
    }}
  })
  .factory( 'Decouv', function(){
    var id
    return{
      getid: function () {
        return this.id
      }}
    })
    .factory('Touriste', function () {
      var Id
      var Pseudo
      var MotDePasse
      var Nom
      var Prenom
      var NumTel
      var Mail
      var Hotel
      return{
        getId: function () {
          return this.Id
        },
        getNom: function () {
          return this.Nom
        },
        getPrenom: function () {
          return this.Prenom
        },
        getNumTel: function () {
          return this.NumTel
        },
        getMail: function () {
          return this.Mail
        },
        getHotel: function () {
          return this.Hotel
        },
        getPseudo: function () {
          return this.Pseudo
        },
        getMotDePasse: function () {
          return this.MotDePasse
        }
      }
    })
    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
      $ionicConfigProvider.platform.android.tabs.position('bottom')
      $stateProvider
      /* à partir d'ici, décrire les différents
      états posiibles dans l'application. */
      .state('onglets', {
        url: '/onglets',
        templateUrl: 'onglets.html',
        abstract: true
      })
      // Accueil
      .state('onglets.accueil', {
        url: '/accueil',
        views: {
          'accueil-tab': {
            templateUrl: 'accueil.html',
            controller: 'accueilController'
          }
        }
      })
      // Inscription
      .state('inscription', {
        url: '/inscription',
        templateUrl: 'inscription.html',
        controller: 'inscriptionController'
      })
      // Connexion
      .state('connexion', {
        url: '/connexion',
        templateUrl: 'connexion.html',
        controller: 'connexionController'
      })
      // Restauration -- linting
      .state('onglets.restauration', {
        url: '/restauration',
        views: {
          'restauration-tab': {
            templateUrl: 'restauration.html',
            controller: 'restaurationController'
          }}
        })
        // Decouverte
        .state('onglets.decouverte', {
          url: '/decouverte',
          views: {
            'decouverte-tab': {
              templateUrl: 'decouverte.html',
              controller: 'decouverteController'
            }
          }
        })
        //Mon compte
        .state('onglets.moncompte', {
          url: '/moncompte',
          views: {
            'moncompte-tab': {
              templateUrl: 'moncompte.html',
              controller: 'moncompteController'
            }
          }
        })
        // Modifier mes informations
        .state('onglets.modifinfos', {
          url: '/modifinfos',
          views: {
            'moncompte-tab': {
              templateUrl: 'modifinfos.html',
              controller: 'modifinfosController'
            }
          }
        })
        // un restaurant
        .state('onglets.restaurant', {
          url: '/restaurant',
          views: {
            'restauration-tab': {
              templateUrl: 'restaurant.html',
              controller: 'restaurantController'
            }
          }
        })

        // une activité
        .state('onglets.activite', {
          url: '/activite',
          views: {
            'decouverte-tab': {
              templateUrl: 'activite.html',
              controller: 'activiteController'
            }

          }
        })
        // Mes reservations
        .state('onglets.reservations', {
          url: '/reservations',
          views: {
            'reservations-tab': {
              templateUrl: 'reservations.html',
              controller: 'reservationsController'
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
      .controller('accueilController', function (Decouv, Restau,Touriste, $scope, $state, $http) {
        $scope.NomRecu = Touriste.getNom()
        $scope.PrenomRecu = Touriste.getPrenom()
        $scope.activites = [];

        $scope.randomActivites = function () {
          return Math.floor(Math.random() * 5)
        }

        var urlr = 'https://ke-services.azurewebsites.net/tables/Restauration/?ZUMO-API-VERSION=2.0.0'
        $http.get(urlr)
        .success(function (response) {
          var rd = $scope.randomActivites()
          var maReponseRecue1 = response;
          $scope.exRestau = maReponseRecue1[rd]
          Restau.id = $scope.exRestau.Id

        })

        var urld = 'https://ke-services.azurewebsites.net/tables/Decouverte?ZUMO-API-VERSION=2.0.0'
        $http.get(urld)
        .success(function (response) {
          var rd = $scope.randomActivites()
          var maReponseRecue2 = response;
          $scope.exDecou = maReponseRecue2[rd]
          Decouv.id = $scope.exDecou.Id
        })

      })


      .controller('inscriptionController', function ($scope, $state) {
        //Choses à faire à l'initialisation de la page
      })

      .controller('connexionController', function ($scope, $state) {
        document.getElementById("pseudo").value = "";
        document.getElementById("motdepasse").value = "";
      })

      .controller('restaurationController', function ($scope, $state, $http) {
        //Popup d'annulation de la réservation
        $scope.confirmPopup= function(){
          var Confirm = $ionicPopup.confirm({
            title : '<div class="bar bar-header bar-dark"><h1 class="title">Confirmer l\'annulation</h1></div>',
            template : "<br />",
            buttons: [
              { text: 'Retour' },
              {
                text: "Annuler l'évènement",
                type: "button-dark",
                onTap: function() {
                  // supprimer l'évènement dans la bdd
                }
              }
            ]

          })
        }
        //Choses à faire à l'initialisation de la page
        var url = 'https://ke-services.azurewebsites.net/tables/Restauration?ZUMO-API-VERSION=2.0.0'
        $http.get(url)
        .success(function (response) {
          console.log(response)
          $scope.maReponseRecue = response

        })
        .error(function (data, status, headers, config) {
          alert('erreur')
          alert(data)
          alert(status)
          alert(headers)
          alert(config)
        })
      })
      .controller('decouverteController', function ($scope, $state, $http) {
        //Popup d'annulation de la réservation
        $scope.confirmPopup= function(){
          var Confirm = $ionicPopup.confirm({
            title : '<div class="bar bar-header bar-dark"><h1 class="title">Confirmer l\'annulation</h1></div>',
            template : "<br />",
            buttons: [
              { text: 'Retour' },
              {
                text: "Annuler l'évènement",
                type: "button-dark",
                onTap: function() {
                  // supprimer l'évènement dans la bdd
                }
              }
            ]

          })
        }
        //Choses à faire à l'initialisation de la page
        var url = 'https://ke-services.azurewebsites.net/tables/Decouverte?ZUMO-API-VERSION=2.0.0'
        $http.get(url)
        .success(function (response) {
          console.log(response)
          $scope.maReponseRecue = response

        })
        .error(function (data, status, headers, config) {
          alert('erreur')
          alert(data)
          alert(status)
          alert(headers)
          alert(config)
        })
      })

      .controller('moncompteController', function (Touriste, $scope, $state, $ionicPopup, $ionicHistory) {
        $scope.IdRecu = Touriste.getId()
        $scope.NomRecu = Touriste.getNom()
        $scope.PrenomRecu = Touriste.getPrenom()
        $scope.MailRecu = Touriste.getMail()
        $scope.TelRecu = Touriste.getNumTel()
        $scope.HotelRecu = Touriste.getHotel()
        $scope.PseudoRecu = Touriste.getPseudo()
        $scope.MotDePasseRecu = Touriste.getMotDePasse()
        $scope.deconnexion = function () {
          Touriste.Id = ""
          Touriste.Nom = ""
          Touriste.Prenom = ""
          Touriste.Mail = ""
          Touriste.NumTel = ""
          Touriste.Hotel = ""
          Touriste.Pseudo = ""
          Touriste.MotDePasse = ""
          $ionicHistory.clearCache()
          $state.go('connexion',  {}, {reload: true});
        }

        //ici on créer le modèle de la popup
        $scope.confirmPopup = function(){
          var Confirm = $ionicPopup.confirm({
            title : '<div class="bar bar-header bar-dark"><h1 class="title">Confirmer l\'annulation</h1></div>',
            template : "<br>Confirmez vous l'annulation de cet évènement ?",
            buttons: [
              { text: 'Retour' },
              {
                text: "Annuler l'évènement",
                type: "button-dark",
                onTap: function() {
                  // supprimer l'évènement dans la bdd
                }
              }
            ]
          })
          Confirm.then(function(res){
            if(res){
              //si "ok" pressé
              //si vide ferme juste la popup
            }else{
              // si "cancel" pressé
              //si vide ferme juste la popup
            }
          })
        }



    $scope.confirmPopup1 = function(){
      var Confirm = $ionicPopup.confirm({
        title : '<div class="bar bar-header bar-dark"><h1 class="title">Confirmer la déconnexion</h1></div>',
        template : "<br>Confirmez vous la déconnexion ?",
        buttons: [
          { text: 'Non' },
          {
            text: "Oui",
            type: "button-dark",
            onTap: function() {
               $scope.deconnexion()
            }
          }
        ]
      })
      Confirm.then(function(res){
        if(res){
          $scope.deconnexion()
        }else{
          // si "cancel" pressé
          //si vide ferme juste la popup
        }
      })
    }
      })
      .controller('modifinfosController', function (Touriste, $scope, $state, $http) {
        var url = 'https://ke-services.azurewebsites.net/tables/Etablissement?ZUMO-API-VERSION=2.0.0'
        $http.get(url).success(function (response) {
          $scope.etablissements = response
        })
        $scope.IdRecu = Touriste.getId()
        $scope.NomRecu = Touriste.getNom()
        $scope.PrenomRecu = Touriste.getPrenom()
        $scope.MailRecu = Touriste.getMail()
        $scope.TelRecu = Touriste.getNumTel()
        $scope.HotelRecu = Touriste.getHotel()
        $scope.PseudoRecu = Touriste.getPseudo()
        $scope.MotDePasseRecu = Touriste.getMotDePasse()

        $scope.modifierInfos = function(nom, prenom, mail, tel, hotel, pseudo, mdp){
          $scope.etablissements.forEach(function(hotel) {
            if($scope.hotel == hotel.Nom){
              $scope.idhotel = hotel.Id
            }
          })
          console.log(nom)
          Touriste.Nom = nom
          Touriste.Prenom = prenom
          Touriste.Mail = mail
          Touriste.NumTel = tel
          Touriste.Hotel = hotel
          Touriste.Pseudo = pseudo
          Touriste.MotDePasse = mdp
          var url = "http://ke-services.azurewebsites.net/tables/Utilisateur?ZUMO-API-VERSION=2.0.0"
          data = JSON.stringify({
            "Id": Touriste.Id,
            "Nom": Touriste.Nom,
            "Prenom": Touriste.Prenom,
            "NumTel": Touriste.NumTel,
            "Mail": Touriste.Mail,
            "Pseudo": Touriste.Pseudo,
            "Password": Touriste.MotDePasse,
            "Id_Etablissement": $scope.idhotel
          })
          console.log(data)
          $http({
            method: "PATCH",
            url: "http://ke-services.azurewebsites.net/tables/Utilisateur?ZUMO-API-VERSION=2.0.0",
            data: data,
            headers: {"Content-Type": 'application/json' },
            timeout: 10000
          })
          .success(function(data, status, headers, config){
          })
          .error(function(data, status, headers, config){
          })
          $state.go('onglets.moncompte')
        }
  })

  .controller('modifinfosController', function (Touriste, $scope, $state, $http) {
    var url = 'https://ke-services.azurewebsites.net/tables/Etablissement?ZUMO-API-VERSION=2.0.0'
    $http.get(url).success(function (response) {
      $scope.etablissements = response
    })
    $scope.IdRecu = Touriste.getId()
    $scope.NomRecu = Touriste.getNom()
    $scope.PrenomRecu = Touriste.getPrenom()
    $scope.MailRecu = Touriste.getMail()
    $scope.TelRecu = Touriste.getNumTel()
    $scope.HotelRecu = Touriste.getHotel()
    $scope.PseudoRecu = Touriste.getPseudo()
    $scope.MotDePasseRecu = Touriste.getMotDePasse()

    $scope.modifierInfos = function(nom, prenom, mail, tel, hotel, pseudo, mdp){
      $scope.etablissements.forEach(function(hotel) {
        if($scope.hotel == hotel.Nom){
          $scope.idhotel = hotel.Id
        }
      })
      console.log(nom)
      Touriste.Nom = nom
      Touriste.Prenom = prenom
      Touriste.Mail = mail
      Touriste.NumTel = tel
      Touriste.Hotel = hotel
      Touriste.Pseudo = pseudo
      Touriste.MotDePasse = mdp
      var url = "http://ke-services.azurewebsites.net/tables/Utilisateur?ZUMO-API-VERSION=2.0.0"
      data = JSON.stringify({
        "Id": Touriste.Id,
        "Nom": Touriste.Nom,
        "Prenom": Touriste.Prenom,
        "NumTel": Touriste.NumTel,
        "Mail": Touriste.Mail,
        "Pseudo": Touriste.Pseudo,
        "Password": Touriste.MotDePasse,
        "Id_Etablissement": $scope.idhotel
      })
      console.log(data)
      $http({
        method: "PATCH",
        url: "http://ke-services.azurewebsites.net/tables/Utilisateur?ZUMO-API-VERSION=2.0.0",
        data: data,
        headers: {"Content-Type": 'application/json' },
        timeout: 10000
      })
      .success(function(data, status, headers, config){
      })
      .error(function(data, status, headers, config){
      })
      $state.go('onglets.moncompte')
    }
})
  .controller('restaurantController', function (Restau, $scope, $state, $http) {
    //Choses à faire à l'initialisation de la page
    var idr = Restau.getid()
    console.log(idr)
    console.log(Restau.getid())
    var url = 'https://ke-services.azurewebsites.net/tables/Restauration/' + idr + '?ZUMO-API-VERSION=2.0.0'
    console.log(url)
    $http.get(url).success(function (response) {
      console.log("ok")
      console.log(response);
      $scope.restau = response
    }).error(function(data, status, headers, config){
      console.log(data)
      console.log(status)
      console.log(headers)
      console.log(config)
    })

  })
  .controller('activiteController', function (Decouv, $scope, $state, $http) {
    //Choses à faire à l'initialisation de la page
    //Choses à faire à l'initialisation de la page
    var idr = Decouv.getid()
    console.log(idr)
    console.log(Decouv.getid())
    var url = 'https://ke-services.azurewebsites.net/tables/Decouverte/' + idr + '?ZUMO-API-VERSION=2.0.0'
    console.log(url)
    $http.get(url).success(function (response) {
      console.log("ok")
      console.log(response);
      $scope.decouv = response
    }).error(function(data, status, headers, config){
      console.log(data)
      console.log(status)
      console.log(headers)
      console.log(config)
    })
  })
  .controller('reservationsController', function ($scope, $state) {
    //Choses à faire à l'initialisation de la page
  })
  .controller('inscriptionFormController', function (Touriste, $scope, $state, $http) {
    var url = 'https://ke-services.azurewebsites.net/tables/Etablissement?ZUMO-API-VERSION=2.0.0'
    $http.get(url).success(function (response) {
      $scope.etablissements = response
    })

    $scope.chercher = function (nom, prenom, mail, tel, hotel, pseudo, motdepasse) {
      Touriste.Id = Math.floor(Math.random() * 3000)
      Touriste.Nom = nom
      Touriste.Prenom = prenom
      Touriste.Mail = mail
      Touriste.NumTel = tel
      Touriste.Hotel = hotel
      Touriste.Pseudo = pseudo
      Touriste.MotDePasse = motdepasse
      $scope.etablissements.forEach(function(hotel) {
        if(hotel.Nom == hotel){
          $scope.idhotel = hotel.Id
        }
      })
      var url = "http://ke-services.azurewebsites.net/tables/Utilisateur?ZUMO-API-VERSION=2.0.0"
      data = JSON.stringify({
        "Id": Touriste.Id,
        "Nom": Touriste.Nom,
        "Prenom": Touriste.Prenom,
        "NumTel": Touriste.NumTel,
        "Mail": Touriste.Mail,
        "Pseudo": Touriste.Pseudo,
        "Password": Touriste.MotDePasse,
        "Id_Etablissement": $scope.idhotel

      })
      console.log(data)
      $http({
        method: "POST",
        url: "http://ke-services.azurewebsites.net/tables/Utilisateur?ZUMO-API-VERSION=2.0.0",
        data: data,
        headers: {"Content-Type": 'application/json' },
        timeout: 10000
      })
      .success(function(data, status, headers, config){
      })
      .error(function(data, status, headers, config){
      })
      $state.go('onglets.accueil')
    }
  })

  .controller('connexionFormController', function (Touriste, $scope, $state, $http) {
    //Choses à faire à l'initialisation de la page
    var connexionOK = false
    var url = 'https://ke-services.azurewebsites.net/tables/Utilisateur?ZUMO-API-VERSION=2.0.0'
    $http.get(url).success(function (response) {
      $scope.maReponseRecue = response
    })
    $scope.seconnecter = function(pseudo, motdepasse){
      $scope.maReponseRecue.forEach(function(user) {
        if(user.Pseudo == pseudo){
          if(user.Password == motdepasse){
            Touriste.Id = user.Id
            Touriste.Nom = user.Nom
            Touriste.Prenom = user.Prenom
            Touriste.Mail = user.Mail
            Touriste.NumTel = user.NumTel
            Touriste.Pseudo = user.Pseudo
            Touriste.MotDePasse = user.Password
            var url = 'https://ke-services.azurewebsites.net/tables/Etablissement/' + user.Id_Etablissement + '?ZUMO-API-VERSION=2.0.0'
            $http.get(url).success(function (response) {
              $scope.hotelrecu = response
              Touriste.Hotel = $scope.hotelrecu.Nom
            })
            connexionOK = true
            $state.go('onglets.accueil')
          } else {
            $scope.mauvaismdp()
          }
        }
      });
      if (!connexionOK){
        $scope.mauvaismdp()
      }
    }
    $scope.mauvaismdp = function(){
      document.getElementById('erreur').innerHTML = "Pseudo ou mot de passe non reconnu(s)";
    }
  })

  .controller('restaurantActionController', function ($scope, $state, $ionicPopup, $http) {
    //controller d'actions au sein de la page

    var url = 'https://ke-services.azurewebsites.net/tables/Restauration/' +  + '?ZUMO-API-VERSION=2.0.0'
    $http.get(url).success(function (response) {
      $scope.restau = response
    })

    $scope.showPopup = function () {
      Confirm = $ionicPopup.show({
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
        $scope.EmmenePopup = function () {
          pop2 = $ionicPopup.show({
            title: "<div class='bar bar-header bar-dark'><h1 class='title'>Commander un transport</h1></div>",
            template: '<label for="motdepasse" class="item item-input item-stacked-label" style="top: 10px;"><span class="input-label">Votre nom</span><input type="text" ng-model="client.nom" placeholder="Nom" style="background-color: #EAEAEA;" required></label><br><label for="motdepasse" class="item item-input item-stacked-label"><span class="input-label">Nombre de participants</span><input type="number" ng-model="client.participants" placeholder="Nombre de participants" style="background-color: #EAEAEA;" required></label><br><label for="motdepasse" class="item item-input item-stacked-label"><span class="input-label">Date de rerservation</span><input type="datetime-local" ng-model="client.date" style="background-color: #EAEAEA;" required></label>',
            buttons: [
              { text: 'Annuler' },
              {
                text: 'Envoyer',
                type: 'button-dark',
                onTap: function (e) {
                  if (!$scope.client.nom && !$scope.client.participants && !$scope.client.date) {
                    //don't allow the user to close unless he enters wifi password
                    e.preventDefault()
                  } else {
                    //do things
                  }
                }
              }]
            })
          }
        })
        .controller('activiteActionController', function ($scope, $state, $ionicPopup) {
          //controller d'actions au sein de la page
          $scope.showPopup = function () {
            pop1 = $ionicPopup.show({
              title : "<div class='bar bar-header bar-dark'><h1 class='title'>Effectuer une r&eacute;servation</h1></div>",
              template : '<label for="motdepasse" class="item item-input item-stacked-label" style="top: 10px;"><span class="input-label">Votre nom</span><input type="text" ng-model="client.nom" placeholder="Nom" style="background-color: #EAEAEA;" required></label><br><label for="motdepasse" class="item item-input item-stacked-label"><span class="input-label">Nombre de participants</span><input type="number" ng-model="client.participants" placeholder="Nombre de participants" style="background-color: #EAEAEA;" required></label><br><label for="motdepasse" class="item item-input item-stacked-label"><span class="input-label">Date de rerservation</span><input type="datetime-local" ng-model="client.date" style="background-color: #EAEAEA;" required></label>',
              buttons: [
                { text: 'Annuler' },
                {
                  text: 'Envoyer',
                  type: 'button-dark',
                  onTap: function (e) {
                    if (!$scope.client.nom && !$scope.client.participants && !$scope.client.date) {
                      //don't allow the user to close unless he enters wifi password
                      e.preventDefault()
                    } else {
                      //do things
                    }
                  }
                }]})
              }
              $scope.EmmenePopup = function () {
                pop2 = $ionicPopup.show({
                  title: "<div class='bar bar-header bar-dark'><h1 class='title'>Commander un transport</h1></div>",
                  template: '<label for="motdepasse" class="item item-input item-stacked-label" style="top: 10px;"><span class="input-label">Votre nom</span><input type="text" ng-model="client.nom" placeholder="Nom" style="background-color: #EAEAEA;" required></label><br><label for="motdepasse" class="item item-input item-stacked-label"><span class="input-label">Nombre de participants</span><input type="number" ng-model="client.participants" placeholder="Nombre de participants" style="background-color: #EAEAEA;" required></label><br><label for="motdepasse" class="item item-input item-stacked-label"><span class="input-label">Date de rerservation</span><input type="datetime-local" ng-model="client.date" style="background-color: #EAEAEA;" required></label>',
                  buttons: [
                    { text: 'Annuler' },
                    {
                      text: 'Envoyer',
                      type: 'button-dark',
                      onTap: function (e) {
                        if (!$scope.client.nom && !$scope.client.participants && !$scope.client.date) {
                          //don't allow the user to close unless he enters wifi password
                          e.preventDefault()
                        } else {
                          //do things
                        }
                      }
                    }]
                  })
                }

              })
              .controller('restaurationActionController', function (Restau,$scope, $state, $ionicPopup,$http) {
                $scope.EmmenePopup = function () {
                  var pop2 = $ionicPopup.show({
                    title: "<div class='bar bar-header bar-dark'><h1 class='title'>Commander un transport</h1></div>",
                    template: '<label for="motdepasse" class="item item-input item-stacked-label" style="top: 10px;"><span class="input-label">Votre nom</span><input type="text" ng-model="client.nom" placeholder="Nom" style="background-color: #EAEAEA;" required></label><br><label for="motdepasse" class="item item-input item-stacked-label"><span class="input-label">Nombre de participants</span><input type="number" ng-model="client.participants" placeholder="Nombre de participants" style="background-color: #EAEAEA;" required></label><br><label for="motdepasse" class="item item-input item-stacked-label"><span class="input-label">Date de rerservation</span><input type="datetime-local" ng-model="client.date" style="background-color: #EAEAEA;" required></label>',
                    buttons: [
                      { text: 'Annuler' },
                      {
                        text: 'Envoyer',
                        type: 'button-dark',
                        onTap: function (e) {
                          if (!$scope.client.nom && !$scope.client.participants && !$scope.client.date) {
                            //don't allow the user to close unless he enters wifi password
                            e.preventDefault()
                          } else {
                            //do things
                          }
                        }
                      }]
                    })
                  }
                  $scope.Factpushing = function(id){
                    console.log(id)
                    Restau.id = id
                  }
                })
                .controller('decouverteActionController', function (Decouv, $scope, $state, $ionicPopup, $http) {
                  $scope.EmmenePopup = function () {
                    pop2 = $ionicPopup.show({
                      title: "<div class='bar bar-header bar-dark'><h1 class='title'>Commander un transport</h1></div>",
                      template: '<label for="motdepasse" class="item item-input item-stacked-label" style="top: 10px;"><span class="input-label">Votre nom</span><input type="text" ng-model="client.nom" placeholder="Nom" style="background-color: #EAEAEA;" required></label><br><label for="motdepasse" class="item item-input item-stacked-label"><span class="input-label">Nombre de participants</span><input type="number" ng-model="client.participants" placeholder="Nombre de participants" style="background-color: #EAEAEA;" required></label><br><label for="motdepasse" class="item item-input item-stacked-label"><span class="input-label">Date de rerservation</span><input type="datetime-local" ng-model="client.date" style="background-color: #EAEAEA;" required></label>',
                      buttons: [
                        { text: 'Annuler' },
                        {
                          text: 'Envoyer',
                          type: 'button-dark',
                          onTap: function (e) {
                            if (!$scope.client.nom && !$scope.client.participants && !$scope.client.date) {
                              //don't allow the user to close unless he enters wifi password
                              e.preventDefault()
                            } else {
                              //do things
                            }
                          }
                        }]
                      })
                    }
                    $scope.Factpushing = function(id){
                      console.log(id)
                      Decouv.id = id
                    }
                  })
