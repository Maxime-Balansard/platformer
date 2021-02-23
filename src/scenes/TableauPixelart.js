class TableauPixelart extends Tableau{

    preload() {
        super.preload();
        this.load.image('star', 'assets/star.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('sol', 'assets/Sol 4000.png');
        this.load.image('ciel', 'assets/ciel.jpg');
        this.load.image('devant', 'assets/devant.png');
        this.load.image('montagne', 'assets/montagne.png');
        this.load.image('bat', 'assets/bat.png');
        this.load.image('saut', 'assets/saut.png');
        this.load.image('saut128', 'assets/saut128.png');
        //monstres
        this.load.image('yokai', 'assets/yokai.png');
        this.load.image('lanterne', 'assets/lanterne.png');
        this.load.image('onii', 'assets/onii.png');
        this.load.image('monster-fly', 'assets/monster-fly.png');

    }
    create() {
        super.create();

        
        
        //on définit la taille du tableau
        let largeurDuTableau=4000;
        let hauteurDuTableau=448; //la hauteur est identique au cadre du jeu
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);

        this.cameras.main.startFollow(this.player, false, 0.05, 0.05);


         //des plateformes etoiles player
         this.platforms = this.physics.add.staticGroup();
         this.platforms.create(2270, 320, 'ground').setDisplaySize(290,20).refreshBody();
         this.platforms.create(2270, 225, 'ground').setDisplaySize(230,14).refreshBody();
           //1er tableau
         this.platforms.create(300,300,'saut').setDisplaySize(60,15).refreshBody().setDepth(10);
         this.platforms.create(600,300,'saut128').setDisplaySize(128,15).refreshBody().setDepth(10);
           //2eme tableau
        this.platforms.create(1150,300,'saut128').setDisplaySize(128,15).refreshBody().setDepth(10);
        this.platforms.create(1600,300,'saut128').setDisplaySize(128,15).refreshBody().setDepth(10);
        this.platforms.create(1300,220,'saut').setDisplaySize(60,15).refreshBody().setDepth(10);
        this.platforms.create(1450,220,'saut').setDisplaySize(60,15).refreshBody().setDepth(10);
        this.platforms.create(1375,120,'saut').setDisplaySize(60,15).refreshBody().setDepth(10);

        //3eme tableau
        this.platforms.create(2020,300,'saut').setDisplaySize(60,15).refreshBody().setDepth(10);
        this.platforms.create(2520,300,'saut').setDisplaySize(60,15).refreshBody().setDepth(10);

        //quelques étoiles 
        
        let largeur=128;
        this.stars=this.physics.add.group();
        //1er tableau
        this.stars.create(300,0,"star").setCollideWorldBounds(true).setBounce(0.4);
        this.stars.create(450,300,"star").setCollideWorldBounds(true);
        this.stars.create(600,0,"star").setCollideWorldBounds(true).setBounce(0.4);
         //2eme tableau
         this.stars.create(1150,200,"star").setCollideWorldBounds(true).setBounce(0.4);
         this.stars.create(1600,200,"star").setCollideWorldBounds(true).setBounce(0.4);
         this.stars.create(1375,100,"star").setCollideWorldBounds(true).setBounce(0.4);
         //3eme tableau
         this.stars.create(2200,100,"star").setCollideWorldBounds(true).setBounce(0.4);
         this.stars.create(2340,100,"star").setCollideWorldBounds(true).setBounce(0.4);
         this.stars.create(2270,250,"star").setCollideWorldBounds(true).setBounce(0.4);

         this.stars.create(2200,350,"star").setCollideWorldBounds(true).setBounce(0.4);
         this.stars.create(2340,350,"star").setCollideWorldBounds(true).setBounce(0.4);
         this.stars.create(2270,350,"star").setCollideWorldBounds(true).setBounce(0.4);
         //4eme tableau


        
        this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this); 
        this.physics.add.collider(this.player,this.platforms);
        this.physics.add.collider(this.platforms, this.stars);
        


        
        


        let sol=this.physics.add.sprite(0,height-64,"sol");
        sol.setDisplaySize(largeurDuTableau,64)//taille de l'objet
        sol.setOrigin(0,0);//pour positionner plus facilement
        sol.body.allowGravity=0; //la gravité n'a pas d'effet ici
        sol.setImmovable(true); //ne bouge pas quand on rentre dedans
        this.physics.add.collider(this.player, sol);//le joueur rebondit dessus
        this.physics.add.collider(this.stars, sol);//les étoiles rebondissent dessus


        let maison=this.physics.add.sprite(2110,height-320,"bat");
        maison.setDisplaySize(320,256)//taille de l'objet
        maison.setOrigin(0,0);//pour positionner plus facilement
        maison.body.allowGravity=0; //la gravité n'a pas d'effet ici
        maison.setImmovable(true); //ne bouge pas quand on rentre dedans
        
        //on change de ciel, on fait une tileSprite ce qui permet d'avoir une image qui se répète
        this.sky=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'montagne'
        );
        this.sky.setOrigin(0,0);
        this.sky.setScrollFactor(0);//fait en sorte que le ciel ne suive pas la caméra
        //on ajoute une deuxième couche de ciel
        this.sky2=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'ciel'
        );
        this.sky2.setScrollFactor(0);
        this.sky2.setOrigin(0,0);
        this.sky2.alpha=0.2;
        //this.sky.tileScaleX=this.sky.tileScaleY=0.8;

        this.sky3=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'devant'
        );
        this.sky3.setOrigin(0,0);
        this.sky3.setScrollFactor(0);

       
        
    

        //fait passer les éléments devant le ciel
        //this.platforms.setDepth(10)
        this.stars.setDepth(10)
        sol.setDepth(10)
        maison.setDepth(9)
        this.player.setDepth(10)
        
        //tout les tableaux
        new MonsterYokai(this,400,300);

        //1er tableau 2
       new Oni(this,200,416);
       //2eme tableau
       new Oni(this,1100,416);
       new MonsterFly(this,1100,200)
       //new MonsterFly(this,1200,100)
      
       //3eme tableau
       new Lanterne(this,2400,120);
       new Lanterne(this,2540,120);
            


        
    }


    
    update(){
        super.update();
        //le ciel se déplace moins vite que la caméra pour donner un effet paralax
        this.sky3.tilePositionX=this.cameras.main.scrollX//*0.6;
        this.sky3.tilePositionY=this.cameras.main.scrollY//*0.2;
        //le deuxième ciel se déplace moins vite pour accentuer l'effet
        this.sky2.tilePositionX=this.cameras.main.scrollX*0.6//*0.3+500;
        this.sky2.tilePositionY=this.cameras.main.scrollY+24//*0.1;

        //le ciel se déplace moins vite que la caméra pour donner un effet paralax
        this.sky.tilePositionX=this.cameras.main.scrollX;//0.15;
        this.sky.tilePositionY=this.cameras.main.scrollY;//*0.05;
        
    }



}