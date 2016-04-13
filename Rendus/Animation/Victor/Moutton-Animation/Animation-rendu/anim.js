//https://github.com/Herondil/HTML5GameCoding/tree/master

//déclaration de variables pour le code
var imgFond, perso1;
var fonctionPerso1= "arret",
    code;
var bgCiel, bgBatiments, bgMontagnes, bgCactus, bgSol;
var phase         = "ecran titre";
var oppaciteFondu = 0, oppaciteFonduText=0;
var jeuReady      = false;
var compteurJeu   = 0;

document.body.onload = loadGame;

function loadGame()
{
  //création de la balise canvas
  canvas  = document.createElement("canvas"),
  context = canvas.getContext("2d");
  canvas.width = 1080;
  canvas.height = 600;
  //ajout de la balise au body
  document.body.appendChild(canvas);

  loadImages();

  text = {
  texts    : ["","Victor Sheep","est heureux","de vous présenter","Do'joe"],
  posx     : 0,
  posy     : 0,
  ratio    : 4.47,
  taillex  : 242,
  tailley  : 332,
  step     : 0,
  draw   : function()
    {
      if (dojo.posy>-40){this.step=0;}else
      if (dojo.posy>-160){this.step=1;}else
      if (dojo.posy>-280){this.step=0;}else
      if (dojo.posy>-400){this.step=2;}else
      if (dojo.posy>-520){this.step=0;}else
      if (dojo.posy>-640){this.step=3;}else
      if (dojo.posy>-760){this.step=0;}else
      if (dojo.posy>-883){this.step=4;}


      if(this.step!=0 && this.step!=4)
      {
        context.globalAlpha=1;
        context.fillStyle="#010101";
        context.fillRect(0,0,canvas.width,canvas.height);
      }
      context.globalAlpha=1;
      context.font="60px Helvetica, sans-serif";
      context.fillStyle="#FFF";
      context.fillText(this.texts[this.step],canvas.width/2-120,200);
    }
  }

  setInterval(GameLoop,1000/60);
}

function loadImages()
{

  //import image de fond de l'intro
  window.imgDojo = new Image();
  imgDojo.src = 'dojo.jpg';
  dojo = {
    visuel : imgDojo,
    posx   : 0,
    posy   : 0,
    ratio  : 4.47,
    taillex: 242,
    tailley: 332,
    draw   : function()
    {
      context.drawImage(this.visuel,this.posx,this.posy,this.taillex*this.ratio,this.tailley*this.ratio);
    },
    defilementHaut: function()
    {
      if ((this.posy)>=(canvas.height-this.tailley*this.ratio+0.9))
      this.posy-=0.9;
    }
  }

  //particule pour marche perso
  var particule = context.createImageData(3,3);
  for(var i = 5*5*4; i>=0; i-=4){
    particule.data[i]   = 160;
    particule.data[i+1] = 80;
    particule.data[i+2] = 80;
    particule.data[i+3] = 255;
  }

  //sprite perso
  spritePerso1 = new Image();
  spritePerso1.src = 'spritePerso.png';

  perso1 = {
    visuel : spritePerso1,
    posx   : 0,
    posy   : 360,
    ratio  : 0.5,
    taillex: 242,
    tailley: 332,
    step   : 0,
    stepfloat:0,
    animIntro : function()
    {
      context.drawImage(this.visuel,
        this.taillex*this.step, //
        0,            //
        this.taillex, //
        this.tailley, //
        this.posx,
        this.posy+50,
        this.taillex*this.ratio,
        this.tailley*this.ratio);
      this.stepfloat+=0.22; // vitesse de l'animation
      this.step = Math.floor(this.stepfloat);
      if(this.stepfloat>=9.5) this.stepfloat=0;
      if (this.posx<=(canvas.width-this.tailley*this.ratio))
      this.posx+=5.3; // vitesse de déplacement
    },
    marcheDroite : function()
    {
      context.drawImage(this.visuel,
        this.taillex*this.step, //
        0,            //
        this.taillex, //
        this.tailley, //
        this.posx,
        this.posy,
        this.taillex*this.ratio,
        this.tailley*this.ratio);
      this.stepfloat+=0.22; // vitesse de l'animation
      this.step = Math.floor(this.stepfloat);
      if(this.stepfloat>=9.5) this.stepfloat=0;
      this.posx+=2.9; // vitesse de déplacement
      //particules de terre
      context.putImageData(particule,this.posx-Math.random()*90,this.posy+(this.tailley*this.ratio)-10-Math.random()*55);
    },
    marcheGauche : function()
    {
      context.drawImage(this.visuel,
        this.taillex*this.step, //
        this.tailley*2,         //
        this.taillex, //
        this.tailley, //
        this.posx,
        this.posy,
        this.taillex*this.ratio,
        this.tailley*this.ratio);
      this.stepfloat+=0.22; // vitesse de l'animation
      this.step = Math.floor(this.stepfloat);
      if(this.stepfloat>=9.5) this.stepfloat=0;
      this.posx-=2.9; // vitesse de déplacement
      //particules de terre
      context.putImageData(particule,this.posx+(this.taillex*this.ratio)+Math.random()*90,this.posy+(this.tailley*this.ratio)-10-Math.random()*55);

    },
    arret : function()
    {
      console.log("T'es dans arret !");
      context.drawImage(this.visuel,
        0,            //
        this.tailley, //
        this.taillex, //
        this.tailley, //
        this.posx,
        this.posy,
        this.taillex*this.ratio,
        this.tailley*this.ratio);
    }
  };

  //import images de fond
  imgSol           = new Image();
  imgSol.src       = 'background_0000_Sol.png';
  imgCactus        = new Image();
  imgCactus.src    = 'background_0001_Cactus.png';
  imgMontagnes     = new Image();
  imgMontagnes.src = 'background_0002_Montagnes.png';
  imgBatiments     = new Image();
  imgBatiments.src = 'background_0003_Batiments.png';
  imgCiel          = new Image();
  imgCiel.src      = 'background_0004_Ciel.png';


  function bgImage(visuel,posx,posy,ratio,taillex,tailley){
  this.visuel  = visuel;
  this.posx    = posx;
  this.posy    = posy;
  this.ratio   = ratio;
  this.taillex = taillex;
  this.tailley = tailley;
  };

  var etoileFilante = context.createImageData(4,4);
  for(var i = 5*5*4; i>=0; i-=4){
    etoileFilante.data[i]   = 245;
    etoileFilante.data[i+1] = 245;
    etoileFilante.data[i+2] = 255;
    etoileFilante.data[i+3] = 255;
  }

  bgCiel          = new bgImage(imgCiel,0, 0, 0, imgCiel.width, imgCiel.height);
  bgBatiments     = new bgImage(imgBatiments,0, 0, 0, imgBatiments.width+200, imgBatiments.height);
  bgMontagnes     = new bgImage(imgMontagnes,50, 0, 0, imgMontagnes.width+400, imgMontagnes.height);
  bgCactus        = new bgImage(imgCactus,0, 0, 0, imgCactus.width+400, imgCactus.height);
  bgSol           = new bgImage(imgSol,0,0,0, imgSol.width+400, imgSol.height);

  var bgEtoileFilante =
  {
    visuel   : etoileFilante,
    posx     : 0,
    posy     : 0,
    step     : 0,
    stepfloat: 0,
    animation: function()
    {
      context.putImageData(this.visuel,this.posx+this.stepfloat*15,this.posy+this.stepfloat*15);
      this.stepfloat+=0.2;
      this.step=Math.floor(this.stepfloat);
      if (this.step>=10)
      {
        this.animActiv=false;
        this.stepfloat=0;
      }
    }
  };

  decorFond = 
  {
    visuels : [bgCiel,bgEtoileFilante,bgBatiments,bgMontagnes,bgCactus,bgSol],
    posx   : -50,
    posy   : -170,
    ratio  : 1.4,
    draw: function()
    {
      for (var i = 0; i <= this.visuels.length - 1; i++)
      {
        if (this.visuels[i]==bgEtoileFilante)
        {
          if(bgEtoileFilante.animActiv)
          {
            bgEtoileFilante.animation();
          }
          else
          {
            if(0.01>Math.random()*2)
            {
              bgEtoileFilante.posx=Math.random()*1000;
              bgEtoileFilante.posy=Math.random()*200;
              bgEtoileFilante.animActiv=true;
            }            
          }
        }
        else
        {
          context.drawImage(this.visuels[i].visuel,
          this.visuels[i].posx,
          this.visuels[i].posy,
          this.visuels[i].taillex*this.ratio,
          this.visuels[i].tailley*this.ratio);
        }
      }
    },
    defilementGauche: function()
    {
      for (var i = 0; i <= this.visuels.length - 1; i++)
      {
        this.visuels[i].posx -= i*0.5+0.8;
      }
    },
    defilementDroite: function()
    {
      for (var i = 0; i <= this.visuels.length - 1; i++)
      {
        this.visuels[i].posx += i*0.5+0.8;
      }
    }
  };

  for (var i = 0; i <= decorFond.visuels.length - 1; i++)
  {
    if (decorFond.visuels[i]!=bgEtoileFilante)
    {
      decorFond.visuels[i].ratio = decorFond.ratio;
      decorFond.visuels[i].posx  += decorFond.posx;
      decorFond.visuels[i].posy  += decorFond.posy;
    }
  }
}


document.onkeyup    = getInput;
document.onkeypress = getInput;
function getInput(e)
{
  code = (e.keyCode ? e.keyCode : e.which);
  console.log(code);
  switch (code)
  {
    case 100: // touche d
      fonctionPerso1="marche droite";
    break;

    case 113: // touche q
      fonctionPerso1="marche gauche";
    break;

    case 32: // touche [espace]
      if (jeuReady==true)
      {
        phase="jeu";
      }
    break;

    default:
      fonctionPerso1="arret";
      console.log(code);
    break;
  }
}

function calculPosPerso(){
  switch (fonctionPerso1)
  {
    case "marche droite":
      perso1.marcheDroite();
    break;

    case "marche gauche":
      perso1.marcheGauche();
    break;

    case "arret":
      perso1.arret();
    break;
        
    default:
    break;
  }
}

function GameLoop(){
  selectPhases();
}

function selectPhases()
{
  if (phase=="jeu")
  {
    if(perso1.posx>=canvas.width-perso1.taillex*perso1.ratio)
    {
      phase="fin jeu";
    }
  }
  switch (phase)
  {
    case "ecran titre":
      animIntro();
      drawIntro();
    break;

    case "jeu":
      if (compteurJeu<=0)
      {
        perso1.posx = 20;
        oppaciteFondu = 0;
      }
      drawDecor();
      calculPosPerso();
      calculPosDecor();
      compteurJeu++;
    break;

    case "fin jeu":
      drawFinJeu();
    break;
  }
}


function calculPosDecor(){
  if (fonctionPerso1=="marche droite")
  {
    decorFond.defilementGauche();
  }
  if (fonctionPerso1=="marche gauche")
  {
    decorFond.defilementDroite();
  }
}

function drawDecor(){
  context.globalAlpha=1;
  decorFond.draw();
}

function fondu(){
  context.fillStyle="#010101";
  context.globalAlpha=oppaciteFondu;
  context.fillRect(0,0,canvas.width,canvas.height);
  oppaciteFondu+=1/150;
  if (oppaciteFondu>=1) oppaciteFondu=1;
}

function animIntro(){
  dojo.defilementHaut();
}

function drawIntro(){
  dojo.draw();
  if ((dojo.posy)<=(canvas.height-dojo.tailley*dojo.ratio+0.9))
  {
    fondu();
    context.globalAlpha=1;
    perso1.animIntro();
  }
  text.draw();
  if (oppaciteFondu==1)
  {
    context.font="30px Helvetica, sans-serif";
    context.fillStyle="#FFF";
    context.fillText("[espace] pour jouer",canvas.width/2-165,300);
    jeuReady=true;
  }
}

function drawFinJeu()
{
  fondu();
  if (oppaciteFondu>=0.5)
  {
    context.globalAlpha=1;
    dojo.draw();

    context.fillStyle="#000";
    context.globalAlpha=0.4;
    context.fillRect(0,0,canvas.width,canvas.height);

    context.globalAlpha=1;
    context.font="30px Helvetica, sans-serif";
    context.fillStyle="#FFF";
    context.fillText("Merci d'avoir joué",canvas.width/2-120,200);
    if (oppaciteFondu>=1)
    {
      oppaciteFonduText+=0.08;
      if (oppaciteFonduText>=1){oppaciteFonduText=1;}
      context.globalAlpha=oppaciteFonduText;
      context.fillText("Toute l'équipe espère avoir une très bonne note :)",canvas.width/2-330,300);
    }
  }
}