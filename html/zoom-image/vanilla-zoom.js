(function(window) {
    let defineLibrary = () => ({
        init : function(imageId) {
            let image = document.querySelector(imageId);
            if(! image ) {
                console.error(`image element dosen't exist`);
                return;
            }

            let zoomContainer , zoomResult , zoomLens;

            image.addEventListener('mouseenter' , function(e) {
                
                let imageBox = this.getBoundingClientRect();

                zoomContainer = document.createElement('div');
                zoomContainer.classList.add('zoom-container');
                zoomContainer.style.width = `${imageBox.width}px`
                zoomContainer.style.height = `${imageBox.height}px`
                zoomContainer.style.position = 'absolute';
                zoomContainer.style.top = `${imageBox.top + window.pageYOffset}px`
                zoomContainer.style.left = `${imageBox.left + window.pageXOffset}px`

                zoomLens = document.createElement('div')
                zoomLens.classList.add('img-zoom-lens');

                zoomResult = document.createElement('div');
                zoomResult.classList.add('img-zoom-result')
                zoomResult.style.top = `${imageBox.bottom + window.pageYOffset}px`
            
                zoomContainer.insertAdjacentElement('afterbegin' , zoomResult)
                zoomContainer.insertAdjacentElement('afterbegin' , zoomLens)

                document.querySelector('body').insertAdjacentElement('beforeend' , zoomContainer)

                let cx = zoomResult.offsetWidth / zoomLens.offsetWidth;
                let cy = zoomResult.offsetHeight / zoomLens.offsetHeight;

                zoomResult.style.backgroundImage = `url('${image.src}')`
                zoomResult.style.backgroundSize = `${image.width * cx}px ${image.height * cy}px`;

                zoomContainer.addEventListener('mousemove' , function(e) {

                    let x = e.clientX - imageBox.left;
                    let y = (e.clientY + window.pageYOffset) - imageBox.top;

                    x = x - (zoomLens.offsetWidth / 2)
                    y = y - ( zoomLens.offsetHeight / 2)

                    if( x > image.width - zoomLens.offsetWidth) { x = image.width - zoomLens.offsetWidth}
                    if(x < 0) { x = 0}
                    if(y > image.height - zoomLens.offsetWidth) { y = image.height - zoomLens.offsetWidth}
                    if(y < 0) { y = 0 }
                   
                    zoomLens.style.top = `${y}px`;
                    zoomLens.style.left = `${x}px`;
                
                    zoomResult.style.backgroundPosition = `-${x * cx}px -${y * cy}px`
                })

                zoomContainer.addEventListener('mouseleave' , function(e) {
                    this.remove()
                })
            })

        }
    })

    if(typeof(vanillaZoom) == 'undefined') {
        window.vanillaZoom = defineLibrary();
    } else {
        console.log('library already defined.')
    }
})(window)