$(function() {
    
    var sndSwitch = new Audio('sound/sound_switch.mp3'); 
    var sndShield = new Audio('sound/sound_shield.wav');
    var sndHit = new Audio('sound/sound_hit.mp3');
    var sndFootstep = new Audio('sound/sound_footstep.mp3');
    var sndWin = new Audio('sound/sound_win.wav');

    // Cache la zone de texte pour le combat
    $('#boutonAttaque').hide();
    $('#boutonDefense').hide();
    $('#combatText').hide();

    // Créer un objet Weapons couteau (arme de base)

    var couteau = new Weapons(10, 'couteau');

    // Créer un objet Players joueurRouge

    var joueurRouge = new Players(100,10,'red',couteau);

    // Créer un objet Players joueurBleu

    var joueurBleu = new Players(100,10,'blue',couteau);

    // Créer un objet Canvas canvas avec ses paramètres lignes, colonnes, obstacle et le joueur qui commence

    var canvas = new Canvas(10,10,20, joueurBleu);

    // Créer le canvas avec pour paramètre false pour le redraw

    canvas.canvasCreate(false);

    // Créer un objet Walls murs

    var murs = new Walls();

    // Afficher les murs sur le canvas

    murs.drawWalls(canvas);

    // Spawn du joueur rouge

    joueurRouge.spawnPlayer(canvas);

    // Spawn du joueur bleu

    joueurBleu.spawnPlayer(canvas);

    // Créer l'objet Weapon baton

    var baton = new Weapons(20, 'baton');

    // Spawn l'arme baton

    baton.spawnWeapon(canvas);

    // Créer l'objet Weapon sabre

    var sabre = new Weapons(25,'sabre');

    // Spawn l'arme sabre

    sabre.spawnWeapon(canvas);

    // Créer l'objet Weapon masse

    var masse = new Weapons(35, 'masse');

    // Spawn l'arme masse

    masse.spawnWeapon(canvas);

    // Créer l'objet Weapon hallebarde

    var hallebarde = new Weapons(50, 'hallebarde');

    // Spawn l'arme hallebarde

    hallebarde.spawnWeapon(canvas);

    // Créer l'objet Movement movement

    var movement = new Movement();

    // Créer l'objet Fight combat

    var combat = new Fight();

    // Jquery qui se lance si on clique sur le bouton start
    // Lance le mouvement des joueurs
    // Affiche toutes les infos joueurs dans les box prévues à cet effet

    $( "#start" ).click(function(){
        var weaponDamage = 10;
        //Affiche les cases de mouvement du joueur actif
        movement.move(canvas);
        $('#blue').find('.life').html('Vie : ' + canvas.player.life);
        $('#red').find('.life').html('Vie : ' + canvas.player.life);
        $('#blue').find('.weapon').html('Arme : ' + canvas.player.weapon.id);
        $('#red').find('.weapon').html('Arme : ' + canvas.player.weapon.id);
        $('#blue').find('.imgWeapon').attr('src', 'img/weapon_' + couteau.id + '.png');
        $('#red').find('.imgWeapon').attr('src', 'img/weapon_' + couteau.id + '.png');
        $('#blue').find('.weaponDamage').html('Dégats : ' + couteau.damages.toFixed(2));
        $('#red').find('.weaponDamage').html('Dégats : ' + couteau.damages.toFixed(2));
        $('#start').hide();
    });



    // Event listener onclick sur le canvas

    canvas.canvas.onclick = function(e) {
        event = e;
        var clickedCaseID = checkClick(event, canvas.column, canvas.cellSize);
        var isClickable = canvas.plateau[clickedCaseID].clickable;

        // Si on clique sur une case cliquable

        if(isClickable == true)
        {
            $('#boutonAttaque').hide();
            $('#boutonDefense').hide();
            // Sauvegarde la case du joueur actif, la case d'origine et la case de destination sur laquelle on a cliqué
            var playerCase = getPlayerCase(canvas);
            var caseOrigin = canvas.plateau[playerCase];
            var caseDest = canvas.plateau[clickedCaseID];
            canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.canvasCreate(true);
            murs.redrawWalls(canvas);

            // Si la case de destination (case cliquée) est une arme
            if(caseDest.type == 'weapon')
            {  

                // Sauvegarde temporairement l'arme de la case de destination
                let saveArme = caseDest.arme;
                // Change l'arme de la case de destination par l'arme portée actuellement par le joueur
                caseDest.arme = canvas.player.weapon;
                // Change l'arme et les dégats du joueur par l'arme sauvegardée
                canvas.player.weapon = saveArme;
                canvas.player.damages = Weapons.damages;

                // Met à jour les infos joueurs 
                $('#' + canvas.player.color).find('.weapon').html('Arme : ' + canvas.player.weapon.id);
                $('#'+ canvas.player.color).find('.imgWeapon').attr('src', 'img/weapon_' + canvas.player.weapon.id + '.png');
                $('#'+ canvas.player.color).find('.weaponDamage').html('Dégats : ' + canvas.player.weapon.damages.toFixed(2));
            }

            // Change le type de la case de destination par la couleur du joueur
            caseDest.type = canvas.player.color;

            // Si la case d'origine possèdait une arme dans ce cas, le type de la case d'origine est une arme
            if(caseOrigin.arme != 'aucune')
            {
                caseOrigin.type = 'weapon';
            }
            // Sinon le type de la case est vide
            else
            {
                caseOrigin.type = 'vide';
            }


            // Vérifie si un combat est possible
            combat.fight(canvas);


            // Re-dessine tout le canvas, armes, joueurs, murs, canvas
            baton.respawnWeapons(canvas);
            sabre.respawnWeapons(canvas);
            masse.respawnWeapons(canvas);
            hallebarde.respawnWeapons(canvas);
            couteau.respawnWeapons(canvas);
            joueurRouge.respawnPlayer(canvas);
            joueurBleu.respawnPlayer(canvas);
            resetClickable(canvas);


            // Switch du joueur actif
            if(canvas.player.color == "red"){
                canvas.player = joueurBleu;
            }else{
                canvas.player = joueurRouge;
            }
            
            //Je lance le son de changement de joueur
            sndSwitch.play();

            //Si l'affichage du combat est caché on peut continuer a bouger
            if($('#combatText').is(':hidden'))
            {   
                movement.move(canvas);
            }
            
            //Je lance le son de pas
            sndFootstep.play();
            switchColor(canvas);
        }
    }

    //Fonction qui se lance si on clique sur le bouton Attaque
    $( "#boutonAttaque" ).click(function(){

        if(canvas.player == joueurRouge){
            var adversaire = joueurBleu;
        }
        else{
            var adversaire = joueurRouge;
        }

        combat.attaque(canvas.player, adversaire);
        
        if(adversaire.life > 0){
            // Switch player
            canvas.player = adversaire;
            sndHit.play();
        }
        else{
            $('#boutonAttaque').hide();
            $('#boutonDefense').hide();
            $('#start').hide();
            $('#tutorial').hide();
            $('.imgWin').attr('src', 'img/' + canvas.player.color + '_player_win.png');
            sndWin.play();
        }
    switchColor(canvas);
    });
     
    //Fonction qui se lance si on clique sur le bouton Defense
     $( "#boutonDefense" ).click(function(){
         combat.defense(canvas, canvas.player);
         $('#combatText').prepend("Le joueur " + canvas.player.color + " bloque !\n");
         sndShield.play();
         // Switch du joueur actif
            if(canvas.player.color == "red"){
                canvas.player = joueurBleu;
            }else{
                canvas.player = joueurRouge;
            }
         
        switchColor(canvas);
        sndSwitch.play();
    });
    

    
});