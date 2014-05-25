var venfix = require('venfix'),
    cssTranslate = require('css-translate');

function Sprite(image){
    var sprite = this;

    sprite.element = document.createElement('span');
    sprite.element.style.display = 'inline-block';
    sprite.element.style.overflow = 'hidden';

    if(typeof image === 'string'){
        var src = image;
        image = new Image();
        image.src = src;
    }

    image = image.cloneNode();
    sprite.image = image;

    if(image.height > 0 || image.width > 0){
        sprite.ready();
        return;
    }

    image.addEventListener('load', function(){
        sprite.ready();
    });
}

Sprite.prototype.ready = function(){
    this.element.style.height = this.image.height;
    this.element.style.width = this.image.height;
    this.element.appendChild(this.image);
};

Sprite.prototype.animate = function(callback){

    var sprite = this,
        theActualyFuckRightShit = parseFloat(this.element.style.width),
        steps = this.image.width / theActualyFuckRightShit,
        currentStep = 1;

    function step(){

        sprite.image.style[venfix('transform')] = cssTranslate('3d', -theActualyFuckRightShit * currentStep, 0, 0);
        currentStep++;
        if(currentStep > steps){
            if(callback){
                callback();
            }
            return;
        }

        requestAnimationFrame(step);
    }

    step();
};

module.exports = Sprite;