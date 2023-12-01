//Rules PopUp
let rules_popup = document.querySelector('.rules');
let popupbox = document.querySelector('.rulesbox');
let cancel = document.querySelector('.cancel');

rules_popup.addEventListener('click',()=>openrules());
function openrules(){
    popupbox.style.display='block';
    cancel.style.display='flex';
}

cancel.addEventListener('click',()=>disapperbox());
function disapperbox(){
    popupbox.style.display='none';
    cancel.style.display='none';
}
let options_arr=['rockCircle','paperCircle','scissorCircle'];
//ScoreBoard
let my_score = parseInt(localStorage.getItem('my_score')) || 0;
let pc_score = parseInt(localStorage.getItem('pc_score')) || 0;
let compScore = document.querySelector('.compScore');
let myScore = document.querySelector('.myScore');

// Clear scores in localStorage on page load
// localStorage.removeItem('my_score');
// localStorage.removeItem('pc_score');

compScore.innerText = pc_score;
myScore.innerText = my_score;

//Play-games
let mychoice='';
let compchoice='';

let circle=document.querySelector('.circle');
let picked=document.querySelector('.picked');
let scissordisplay = document.querySelector('.scissorCircle');
let paperdisplay = document.querySelector('.paperCircle');
let rockdisplay = document.querySelector('.rockCircle');

circle.addEventListener('click',function(event){
    mychoice=event.target.id;
    if(mychoice==''){
        return;
    }
    ComputerTurn();
});

function ComputerTurn(){
    let idx=Math.floor(Math.random()*3);
    compchoice=options_arr[idx];
    CheckWinner();
}

function CheckWinner(){
    if(mychoice==compchoice){
        console.log("Tie UP");
        goToTieUp(); //tie up
    }
    else if((mychoice=="rockCircle" && compchoice=="scissorCircle") ||
            (mychoice=="scissorCircle" && compchoice=="paperCircle") ||
            (mychoice=="paperCircle" && compchoice=="rockCircle")) {
            //I am winner
            goToYouWin();
        }
        else if(options_arr.includes(mychoice)){
            //Computer Winner
            goToYouLost();
        }
}
//Replay-PlayAgain Button
let replaybtn = document.querySelector('.replaybutton');
replaybtn.addEventListener('click', ()=>getBackToIndex());
function getBackToIndex(){
    mychoice='';
    compchoice='';
    //get back to index
    scoreboard.style.display='flex';
    circle.style.display='flex';
    picked.style.display='none';
    youwin_page.style.display='none';
    tieup_page.style.display='none';
    youlost_page.style.display='none';
    hurray_page.style.display='none';
    replaybtn.style.display='none';
    rules_popup.style.left='1200px';
}

//Tie Up Page
let tieup_page=document.querySelector('.tieup_page');
let mychoice_tieup=document.querySelector('.mychoice_tieup');
let compchoice_tieup=document.querySelector('.compchoice_tieup');

function goToTieUp(){   
    mychoice_tieup.innerHTML = '';
    compchoice_tieup.innerHTML = '';
    circle.style.display='none';
    picked.style.display='block';
    replaybtn.style.display='block';
    replaybtn.innerText='REPLAY';
    let circle_tag = document.querySelector(`.${mychoice}`).cloneNode(true);
    mychoice_tieup.appendChild(circle_tag.cloneNode(true));
    compchoice_tieup.appendChild(circle_tag.cloneNode(true)); 
    tieup_page.style.display='block';
}

//You Lost Page
let youlost_page=document.querySelector('.youlost_page');
let mychoice_ulost=document.querySelector('.mychoice_ulost');
let compchoice_ulost=document.querySelector('.compchoice_ulost');
function goToYouLost(){
    mychoice_ulost.innerHTML='';
    compchoice_ulost.innerHTML='';
    circle.style.display='none';
    picked.style.display='block';
    replaybtn.style.display='block';
    replaybtn.innerText='PLAY AGAIN';
    //Display & Store the updated score in local storage
    pc_score += 1;
    compScore.innerText = pc_score;
    localStorage.setItem('pc_score', pc_score);

    let circle_tag1 = document.querySelector(`.${mychoice}`).cloneNode(true);
    mychoice_ulost.appendChild(circle_tag1.cloneNode(true));

    let circle_tag2 = document.querySelector(`.${compchoice}`).cloneNode(true);
    compchoice_ulost.appendChild(circle_tag2.cloneNode(true));
    youlost_page.style.display='block';
}

//You Win page
let youwin_page=document.querySelector('.youwin_page');
let youwin_mychoice=document.querySelector('.youwin_mychoice');
let youwin_compchoice=document.querySelector('.youwin_compchoice');
function goToYouWin(){
    youwin_mychoice.innerHTML='';
    youwin_compchoice.innerHTML='';
    circle.style.display='none';
    picked.style.display='block';
    replaybtn.style.display='block';
    replaybtn.innerText='PLAY AGAIN';
// Display & Store the updated score in local storage
    my_score += 1;
    myScore.innerText = my_score;
    localStorage.setItem('my_score', my_score);

    let mycircle_tag=document.querySelector(`.${mychoice}`).cloneNode(true);
    youwin_mychoice.appendChild(mycircle_tag.cloneNode(true));
    let compcircle_tag=document.querySelector(`.${compchoice}`).cloneNode(true);
    youwin_compchoice.appendChild(compcircle_tag.cloneNode(true));
    youwin_page.style.display='block';
    rules_popup.style.left='1050px';
}

//Hurray Page
let scoreboard = document.querySelector('.scoreboard');
let nextbtn = document.querySelector('.nextbtn');
let hurray_page=document.querySelector('.hurray_page');
nextbtn.addEventListener('click',goToHurray);

function goToHurray(){
    youwin_mychoice.innerHTML='';
    youwin_compchoice.innerHTML='';
    youwin_page.style.display='none';
    picked.style.display='none';
    scoreboard.style.display='none';
    rules_popup.style.left='1200px';
    hurray_page.style.display='block';
}