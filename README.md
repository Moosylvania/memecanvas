# memecanvas
Node.js Meme Generator that uses Node-Canvas to render the final image.

# To Install
        $ npm install memecanvas

# Requirements
memecanvas utilizes Automattic's node-canvas module which has some pre-requisites that must be installed on your machine.  To find out more please check out their [Wiki](https://github.com/Automattic/node-canvas/wiki) and then come back here.

# API

* init(outputDirectoryName, fileAppendedName) <br/> The outputDirectoryName is where the meme file will be written to on your file system.<br/><br/>fileAppendedName is a string that will be appended to the original file name. eg - if fileAppendedName = '-meme', photo.png will write out to photo-meme.png
* generate(file, topText, bottomText, callback)<br/>file is the filename and location - eg. __dirname + 'public/images/photo.png'<br/><br/>topText and bottomText are the text that will be overlayed on the top and bottom of the photo respectively.<br/> callback will return the filename or an error

# Example Uses -
    var memecanvas = require('memecanvas');
    memecanvas.init('./tmp', '-meme');
    memecanvas.generate('./photo.png', 'Top of Meme', 'Bottom of Meme', function(error, memefilename){
        if(error){
            console.log(error);
        } else {
            console.log(memefilename);
        }
    });
