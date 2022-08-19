let canvas;
let context;
let controls;
let social;
let canvasDrawing = null;
let coloreSelezionato;
let larghezzaLinea = 5;
let trasparenza = 1;
let tratto = 'round';
let puntoInizioDisegnoX = null;
let puntoInizioDisegnoY = null;
let posizioneCorrenteX = null;
let posizioneCorrenteY = null;

let mouseIsDown = false;


document.addEventListener('DOMContentLoaded', function(){

    canvas = document.getElementById('areaDiDisegno');
    context = canvas.getContext('2d');
    controls = document.getElementById('controls');
    social = document.getElementById('social');

    let headerHeight = document.getElementById('museum-header').offsetHeight;
    let backImg = document.getElementById('right-container').getElementsByTagName('img')[0];
    let maxHeight = window.visualViewport.height - headerHeight;
    let ratio = backImg.width / backImg.height;

    calcolaDimensioniCanvas(ratio, maxHeight);

    window.addEventListener('resize', function (){
        calcolaDimensioniCanvas(ratio,maxHeight);
    })


    controls.addEventListener('click', function (e){
        const id = e.target.id;
        if (id === 'buttonWhite'){
            coloreSelezionato = 'white';
        }
        if (id === 'bottoneCancella'){
            cancella();
        }
        if(id === 'buttonColor'){
            coloreSelezionato = e.target.value;
        }
        if (id === 'bottoneSalva') {
            context.save();
            let imageUri = canvas.toDataURL("image/png");
            imageUri = imageUri.replace(/^data:image\/(png|jpg);base64,/, "");

            let js_src = null;
            let scripts = document.getElementsByTagName('script'),
                script = scripts[2];

            if (script.getAttribute.length !== undefined) {
                js_src = script.src;
            } else
                js_src = script.getAttribute('src', -1);
            js_src = js_src.split('JS')[0];
            let src = js_src + 'Get_handler.php';
            let xhttp = new XMLHttpRequest();
            xhttp.open('POST', src, true);
            xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhttp.onload = function () {
                if (this.readyState === 4 && this.status === 200) {
                    let response = this.responseText;
                    canvasDrawing = js_src+response;
                    console.log(canvasDrawing);
                }
            }

            let data = 'imageUri='+imageUri;
            xhttp.send(data);
        }
    })

    controls.addEventListener('change', function (e){
        let id = e.target.id;
        if(id === 'buttonColor'){
            coloreSelezionato = e.target.value;
        }
        if(id === 'buttonSize'){
            larghezzaLinea = e.target.value;
        }
        if (id === 'buttonDetails'){
            trasparenza = e.target.value/100;
        }
        if (id === 'circle'){
            tratto = e.target.value;
        }
        if (id === 'square'){
            tratto = e.target.value;
        }
        if (id === 'highlighter'){
            tratto = e.target.value;
        }
    })



    canvas.addEventListener('mousemove', function(e){
        calcolaCoordinateDesktop(e);
    });
    canvas.addEventListener('mousedown', function(e){
        calcolaCoordinateDesktop(e);
    });
    canvas.addEventListener('mouseup', function(e){
        calcolaCoordinateDesktop(e);
    });
    canvas.addEventListener('mouseout', function(e){
        calcolaCoordinateDesktop(e);
    });



    canvas.addEventListener('touchmove', function(e){
        calcolaCoordinateMobile(e);
    });

    canvas.addEventListener('touchstart', function(e){
        calcolaCoordinateMobile(e);
    });

    canvas.addEventListener('touchend', function(e){
        calcolaCoordinateMobile(e);
    });

    social.addEventListener('click', function (e){
        let id = e.target.id;
        if (id === 'fbShare'){
            let t = ' '
            window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(canvasDrawing)+'&t='+encodeURIComponent(t),'sharer','toolbar=0,status=0,width=626,height=436');
        }
        if (id === 'twShare'){
            window.open( "https://twitter.com/intent/tweet?url="+canvasDrawing,'sharer','toolbar=0,status=0,width=626,height=436');
        }
    })
});


function calcolaCoordinateDesktop(e){

    switch(e.type) {
        case 'mousemove':
            if (mouseIsDown) {

                posizioneCorrenteX = e.clientX - canvas.getBoundingClientRect().left;
                posizioneCorrenteY = e.clientY - canvas.getBoundingClientRect().top;
                disegna();
                puntoInizioDisegnoX = posizioneCorrenteX;
                puntoInizioDisegnoY = posizioneCorrenteY;
            }
            break;
        case 'mousedown':
            mouseIsDown = true;
            puntoInizioDisegnoX = e.clientX - canvas.getBoundingClientRect().left;
            puntoInizioDisegnoY = e.clientY - canvas.getBoundingClientRect().top;
            break;
        case 'mouseup':
            mouseIsDown = false;
            break;
        case 'mouseout':
            mouseIsDown = false;
            break;
    }
}

function calcolaCoordinateMobile(e){
    console.log(e);

    switch(e.type) {
        case 'touchmove':
            var touch = e.touches[0];
            var mouseEvent = new MouseEvent('mousemove', {
                clientX: touch.pageX,
                clientY: touch.pageY
            });
            canvas.dispatchEvent(mouseEvent);
            e.preventDefault();

            break;
        case 'touchstart':
            puntoInizioDisegnoX = e.touches[0].pageX - canvas.getBoundingClientRect().left;
            puntoInizioDisegnoY = e.touches[0].pageY - canvas.getBoundingClientRect().top;

            var touch = e.touches[0];
            var mouseEvent = new MouseEvent('mousedown', {
                clientX: touch.pageX,
                clientY: touch.pageY
            });
            canvas.dispatchEvent(mouseEvent);
            break;

        case 'touchend':
            var mouseEvent = new MouseEvent("mouseup", {});
            canvas.dispatchEvent(mouseEvent);
            break;
        default:
            console.log("no touch event");
    }
}


function disegna(){
    console.log('disegna');
    context.beginPath();
    context.moveTo(puntoInizioDisegnoX, puntoInizioDisegnoY);
    context.lineTo(posizioneCorrenteX, posizioneCorrenteY);
    context.strokeStyle = coloreSelezionato;
    context.lineWidth = larghezzaLinea;
    context.lineCap = tratto;
    context.globalAlpha = trasparenza;
    context.stroke();
    context.closePath();
}

function cancella(){
    const finestraConferma = confirm('Vuoi davvero cancellare?');
    if(finestraConferma) {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function calcolaDimensioniCanvas(ratio, maxHeight){
    canvas.height = maxHeight - 70;
    canvas.width = canvas.height * ratio;
    if (window.visualViewport.width < canvas.width) {
        canvas.width = window.visualViewport.width - 20;
        canvas.height = canvas.width / ratio;
    }
}
