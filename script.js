


let scoreCount = document.querySelector(".scoreCount") ;

score = 0 ;

cross = true ;

bg_audio = new Audio("bgmusicCat.mp3");
audio_gameOver = new Audio("cat_dying.mp3");

let bg_started = false ;






document.onkeydown = function(e){
    
    if (!bg_started) {
        bg_audio.play();
        bg_started = true;
    }
    console.log("Key code is: " , e.code); 
    if(e.key == "ArrowUp" || e.key == " "){
        e.preventDefault() ;
    dino = document.querySelector(".dino");
    dino.classList.add("animateDino");
    setTimeout(() => {
        dino.classList.remove("animateDino");
    }, 700);    
}   
    if(e.key == "ArrowRight"){
        dino = document.querySelector(".dino");
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
        dino.style.left = dinoX + 112 + "px";
    }
    if(e.key == "ArrowLeft"){
        dino = document.querySelector(".dino");
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
        dino.style.left = (dinoX - 112) + "px";
    }
}

setInterval(() => {
    dino = document.querySelector(".dino");
    gameOver = document.querySelector(".gameOver");
    obstacle = document.querySelector(".obstacle");

    dx = parseInt(window.getComputedStyle(dino , null).getPropertyValue("left"));
    dy = parseInt(window.getComputedStyle(dino , null).getPropertyValue("top"));

    ox = parseInt(window.getComputedStyle(obstacle ,  null).getPropertyValue("left"));
    oy = parseInt(window.getComputedStyle(obstacle , null).getPropertyValue("top"));

    offsetX = Math.abs(dx-ox);
    offsetY = Math.abs(dy-oy);
    console.log("Offset X: " , offsetX);
    console.log("Offset Y: " , offsetY);

    if(offsetX < 80 && offsetY < 150){
        gameOver.style.visibility = "visible";
        obstacle.classList.remove("obstacleAny");
        obstacle.style.animation = "none";
        obstacle.style.left = ox + "px";
        audio_gameOver.play();
        setTimeout(() => {
            audio_gameOver.pause();
            bg_audio.pause();
            alert("Game Over! Your score is " + score + ". Reload to play again.");
        }
        , 5000);
        bg_audio.pause();
    }
    else if(offsetX < 145 && cross) {
        score += 1 ; 
        updateScore(score) ;
        cross = false ;
        setTimeout(() => {
            cross = true ;
        }, 1000);
        
        setTimeout(()=> {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue("animation-duration"));
            newDur = aniDur - 0.1 ;
            obstacle.style.animationDuration = newDur + "s";
            console.log("New animation duration: " , newDur);

        })
    }

}, 100);


function updateScore(score){
    scoreCount.innerHTML = "Score is " + score 

}
    
