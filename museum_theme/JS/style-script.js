let buttons = null;
let description = null;
let bi = null;
let back_Div = null;
let works = null;


document.addEventListener('DOMContentLoaded', function() {
    description = document.getElementById('sketch-image-description');
    buttons = document.getElementById('controls');
    bi = document.querySelector('img').src;
    back_Div = document.getElementById('back-image');
    works = document.getElementsByClassName('works');

    for (let i = 0; i<works.length;i++){
        let currentImg = works[i].getElementsByTagName('img');
        let currentImgW = currentImg[0].clientWidth;
        let currentImgH = currentImg[0].clientHeight;
        if (currentImgW > currentImgH){
            if ((currentImgW-currentImgH) > 250){
                currentImg[0].style.maxWidth = '90%';
                currentImg[0].style.height = 'auto';
            }
            else{
                currentImg[0].style.maxWidth ='90%';
                currentImg[0].style.maxHeight ='90%';
            }
        }
        else{
            if ((currentImgH-currentImgW) > 250){
                currentImg[0].style.maxHeight = '80%';
                currentImg[0].style.width = 'auto';
            }
            else{
                currentImg[0].style.maxHeight = '80%';
                currentImg[0].style.width = '80%';
            }
        }
    }

    back_Div.style.backgroundImage = "url('"+bi+"')";
    impostaDimensioniSfondo();


    window.addEventListener('resize', function (){
        impostaDimensioniSfondo();
    })



})


function impostaDimensioniSfondo(){
    let width = (isNaN(parseFloat(canvas.width)) ? 0 : parseFloat(canvas.width) ) + 4;
    let height = (isNaN(parseFloat(canvas.height)) ? 0 : parseFloat(canvas.height) ) + 4;

    back_Div.style.backgroundSize = width +'px'+ ' ' +height+'px';
}