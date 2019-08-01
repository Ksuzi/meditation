const app = () =>{
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    //SOUNDS//
    const sounds = document.querySelectorAll('.sound-picker button');
    //TIME DISPLAY// 
    const timeDisplay = document.querySelector('.time-display');
    //TIME SELECT//
    const timeSelect = document.querySelectorAll('.time-select button');
    //GET THE LENGTH OF THE OUTLINE//
    const outlineLength = outline.getTotalLength();
    //DURATION//
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;
    
    //pick different sounds//
    sounds.forEach(sound => {
        sound.addEventListener('click', function(){
            song.src = this.dataset.sound;
            video.src = this.dataset.video;
            checkPlaying(song);
        });
    });
    
    //play sound//
    play.addEventListener('click', () => {
        checkPlaying(song);
    })

    //select sound//
    timeSelect.forEach(option => {
        option.addEventListener('click', function(){
            song.currentTime = 0;
            fakeDuration = this.dataset.time;
            timeDisplay.textContent=`${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
        })
    })

    //toggle sound//
    const checkPlaying = song => {
        if(song.paused){
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        }else{
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
        }
    };

    //DISPLAY TIME LEFT//
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        //ANIMATE THE CIRCLE//
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;
        //ANIMATE THE TEXT//
        timeDisplay.textContent = `${minutes}:${seconds <10 ? '0'  + seconds : seconds}`;

        if(currentTime>=fakeDuration){
            song.pause();
            video.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg';
        }
    };
}

app();