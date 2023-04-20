(function(window) {
    let defineLibrary = () => ({
        init : function(galleryId) {
            let container = document.querySelector(galleryId);

            if(! container) {
                console.error('please add the correct element')
                return;
            }

            let firstImage = container.querySelector('.small-preview')
            let zoomedImage = container.querySelector('.zoomed-image');

            if(! zoomedImage) {
                console.error('please add a .zoomed-image tag');
                return;
            }

            if(! firstImage) {
                console.log('please add images with .small-preview class to your gallery');
                return;
            }
            
            zoomedImage.style.backgroundImage = `url(${firstImage.src})`

            container.addEventListener('click' , function(e) {
                let elem = e.target;

                if(elem.classList.contains('small-preview')) {
                    zoomedImage.style.backgroundImage = `url(${elem.src})`
                }
            })

            zoomedImage.addEventListener('mouseenter' , function() {
                this.style.backgroundSize = '250%';
            }) 

            zoomedImage.addEventListener('mousemove' , function(e) {
                let dimentions = this.getBoundingClientRect()

                let x = e.clientX - dimentions.left
                let y = e.clientY - dimentions.top

                x = Math.round(100 / (dimentions.width/ x));
                y = Math.round(100 / (dimentions.height/ y));
              
                this.style.backgroundPosition = `${x}% ${y}%`
            })

            zoomedImage.addEventListener('mouseleave' , function() {
                this.style.backgroundSize = 'cover'
                this.style.backgroundPosition = 'center'
            })
        }
    })

    if(typeof(vanillaZoom) == 'undefined') {
        window.vanillaZoom = defineLibrary();
    } else {
        console.log('library already defined.')
    }
})(window)