const camera = document.getElementById('camera');
const photoCanvas = document.getElementById('photo-canvas');
const photo = document.getElementById('photo');
const carregando = document.getElementById('carregando');
function handlePermissao() {
    // Solicita permissão para acessar a câmera
    carregando.style.display = 'flex'
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            camera.srcObject = stream;
            carregando.style.display = 'none';
        })
        .catch((error) => {
            console.error('Erro ao acessar a câmera: ', error);
            carregando.style.display = 'none'
        });
    // carregando.style.display = 'none'
}
window.addEventListener('DOMContentLoaded', handlePermissao)

async function handleFoto() {
    //Exibe a foto capturada
    const context = photoCanvas.getContext('2d');
    photoCanvas.width = camera.videoWidth;
    photoCanvas.height = camera.videoHeight;
    context.drawImage(camera, 0, 0, photoCanvas.width, photoCanvas.height);

    if (photoCanvas.toDataURL('image/png').length < 40) {
        handlePermissao();
        return
    }
    photo.src = photoCanvas.toDataURL('image/png');
    photo.style.display = 'block';
    carregando.style.display = 'none'
    return
}
