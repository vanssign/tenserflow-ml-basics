var data;

function preload(){
    data=loadJSON('../json/movies.json');
}

function setup(){
    noCanvas();
    console.log(data);
}