class TableauPixelart extends Tableau{

    preload() {
        super.preload();
        this.load.image('star', 'assets/star.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('sol', 'assets/Sol 4000.png');
        this.load.image('ciel', 'assets/ciel.jpg');
        this.load.image('devant', 'assets/devant.png');
        this.load.image('montagne', 'assets/montagne.png');
        this.load.image('yokai', 'assets/yokai.png');
        this.load.image('bat', 'assets/bat.png');
    }
    create() {
        super.create();

        new Yokai(this,400,300);
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
         this.platforms.create(896,448,'ground').setDisplaySize(10,100).refreshBody();

         //this.platforms.create(50, 250, 'ground');
         
        //quelques étoiles et plateformes qui vont avec
        
        let largeur=128;
        this.stars=this.physics.add.group();
        for(let posX=largeur/2;posX<largeur*32;posX+=largeur)
        {
            this.stars.create(posX ,0,"star");
        }
        this.stars.children.iterate(function (child) 
        {
            child.setBounce(0.3);
            child.setGravity(1);
            child.setCollideWorldBounds(true);
            child.setVelocity(10,Phaser.Math.Between(-100, 100));
            child.setMaxVelocity(0,500);
        });
        this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);
        this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);
        this.physics.add.collider(this.player,this.platforms);
        this.physics.add.collider(this.platforms, this.stars);
        //this.physics.add.collider(this.Yokai, this.platforms);


        //mur pour mobs
        


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