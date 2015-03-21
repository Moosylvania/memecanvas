var image = require('./lib/image');
var fs = require('fs');

var outputDirectory = './tmp';
var appendedFilename = '-meme';

var endsWith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

var drawText = function(context, pos, text, width, height) {
    var fontSize = 100;
    context.textAlign = "center";
    context.fillStyle = "#fff";
    context.strokeStyle = "#000";
    context.lineWidth = 6;

    while(1) {
        context.font = "bold " + fontSize + "px Impact";
        if( (context.measureText(text).width < (width-15)) && (fontSize < height/10) ) {
            break;
        }
        fontSize-=2;
    }

    var y;
    if(pos == "top") {
        y = fontSize + 15;
    } else if(pos == "bottom") {
        y = height - 15;
    }

    context.strokeText(text, width/2, y);
    context.fillText(text, width/2, y);
    return context;
};

var memecanvas = module.exports;

memecanvas.init = function(output, append){
    outputDirectory = output;
    appendedFilename = append;
};

memecanvas.generate = function(file, topText, bottomText, next){
    image.get(file, function(img){
        if(img){
            try{
                var ctx = image.ctx(img.canvas.width, img.canvas.height);
                ctx.drawImage(img.canvas, 0, 0);
                ctx = drawText(ctx, 'top', topText, img.canvas.width, img.canvas.height);
                ctx = drawText(ctx, 'bottom', bottomText, img.canvas.width, img.canvas.height);

                var memefilename = file.split('/');
                memefilename = memefilename[memefilename.length-1];

                var parts = memefilename.split('.');
                parts.pop();
                parts.push(appendedFilename+'.png');

                memefilename = parts.join('');

                if(!fs.existsSync(outputDirectory)){
                    fs.mkdirSync(outputDirectory);
                }

                if(!endsWith(outputDirectory, '/')){
                    outputDirectory = outputDirectory + '/';
                }

                image.save(ctx, outputDirectory + memefilename, function() {
                    ctx = null;
                    return next(null, outputDirectory+memefilename);
                });
            } catch(e){
                return next(e, null);
            }

        } else {
            return ('could not open the image provided', null);
        }

    });
};
