const Neurona = require('./neurona.js');
const fs = require('fs');


var trainingMatrix = [];
var classes = {
    a:[],
    b:[],
    c:[],
    d:[],
    e:[],
    f:[],
    g:[],
    h:[],
    i:[],
    j:[],
    k:[],
    l:[],
    m:[],
    n:[],
    o:[],
    p:[],
    q:[],
    r:[],
    s:[],
    t:[],
    u:[],
    v:[],
    w:[],
    x:[],
    y:[],
    z:[]
};

var initialWeights = {
    a:[],
    b:[],
    c:[],
    d:[],
    e:[],
    f:[],
    g:[],
    h:[],
    i:[],
    j:[],
    k:[],
    l:[],
    m:[],
    n:[],
    o:[],
    p:[],
    q:[],
    r:[],
    s:[],
    t:[],
    u:[],
    v:[],
    w:[],
    x:[],
    y:[],
    z:[]
};

var hiddenWeights = {
    first:[],
    second:[],
    third:[],
    fourth:[],
    fifth:[]
}

var hiddenLayerValues = [];

const values = {
    a:[0,0,0,0,0],
    b:[0,0,0,0,1],
    c:[0,0,0,1,0],
    d:[0,0,0,1,1],
    e:[0,0,1,0,0],
    f:[0,0,1,0,1],
    g:[0,0,1,1,0],
    h:[0,0,1,1,1],
    i:[0,1,0,0,0],
    j:[0,1,0,0,1],
    k:[0,1,0,1,0],
    l:[0,1,0,1,1],
    m:[0,1,1,0,0],
    n:[0,1,1,0,1],
    o:[0,1,1,1,0],
    p:[0,1,1,1,1],
    q:[1,0,0,0,0],
    r:[1,0,0,0,1],
    s:[1,0,0,1,0],
    t:[1,0,0,1,1],
    u:[1,0,1,0,0],
    v:[1,0,1,0,1],
    w:[1,0,1,1,0],
    x:[1,0,1,1,1],
    y:[1,1,0,0,0],
    z:[1,1,0,0,1]
};
var res = [];

fs.open('info.txt', 'wx', (err) => {
    var toWrite = ''
    for (var key in values){
        toWrite += key + '\n' + values[key] + '\n';       
    }
    fs.writeFile('info.txt',toWrite);
});


var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader('letter.txt');

lr.on('error', function (err) {
    // 'err' contains error object
});
var cuenta = 0;
lr.on('line', function (line) {
    if(cuenta < 40000){
        var data = line.split("\t");
        res.push(data[1]);
        /*if(data[1] == 'a'){
            classes.a.push(1);
        }else{
            classes.a.push(0);
        }
        if(data[1] == 'b'){
            classes.b.push(1);
        }else{
            classes.b.push(0);
        }
        if(data[1] == 'c'){
            classes.c.push(1);
        }else{
            classes.c.push(0);
        }
        if(data[1] == 'd'){
            classes.d.push(1);
        }else{
            classes.d.push(0);
        }
        if(data[1] == 'e'){
            classes.e.push(1);
        }else{
            classes.e.push(0);
        }
        if(data[1] == 'f'){
            classes.f.push(1);
        }else{
            classes.f.push(0);
        }
        if(data[1] == 'g'){
            classes.g.push(1);
        }else{
            classes.g.push(0);
        }
        if(data[1] == 'h'){
            classes.h.push(1);
        }else{
            classes.h.push(0);
        }
        if(data[1] == 'i'){
            classes.i.push(1);
        }else{
            classes.i.push(0);
        }
        if(data[1] == 'j'){
            classes.j.push(1);
        }else{
            classes.j.push(0);
        }
        if(data[1] == 'k'){
            classes.k.push(1);
        }else{
            classes.k.push(0);
        }
        if(data[1] == 'l'){
            classes.l.push(1);
        }else{
            classes.l.push(0);
        }
        if(data[1] == 'm'){
            classes.m.push(1);
        }else{
            classes.m.push(0);
        }
        if(data[1] == 'n'){
            classes.n.push(1);
        }else{
            classes.n.push(0);
        }
        if(data[1] == 'o'){
            classes.o.push(1);
        }else{
            classes.o.push(0);
        }
        if(data[1] == 'p'){
            classes.p.push(1);
        }else{
            classes.p.push(0);
        }
        if(data[1] == 'q'){
            classes.q.push(1);
        }else{
            classes.q.push(0);
        }
        if(data[1] == 'r'){
            classes.r.push(1);
        }else{
            classes.r.push(0);
        }
        if(data[1] == 's'){
            classes.s.push(1);
        }else{
            classes.s.push(0);
        }
        if(data[1] == 't'){
            classes.t.push(1);
        }else{
            classes.t.push(0);
        }
        if(data[1] == 'u'){
            classes.u.push(1);
        }else{
            classes.u.push(0);
        }
        if(data[1] == 'v'){
            classes.v.push(1);
        }else{
            classes.v.push(0);
        }
        if(data[1] == 'w'){
            classes.w.push(1);
        }else{
            classes.w.push(0);
        }
        if(data[1] == 'x'){
            classes.x.push(1);
        }else{
            classes.x.push(0);
        }
        if(data[1] == 'y'){
            classes.y.push(1);
        }else{
            classes.y.push(0);
        }
        if(data[1] == 'z'){
            classes.z.push(1);
        }else{
            classes.z.push(0);
        }*/
        var vector = [];
        data.map((number, i) => {
            if(i>=6){
                vector.push(parseInt(number));
            }
        });
        vector.pop();
        trainingMatrix.push(vector);
        cuenta+=1;
    }
});


lr.on('end', function () {
    for(var key in initialWeights){
        trainingMatrix[0].forEach((element) => {
            initialWeights[key].push(-0.1+ 0.2 * Math.random());
        });
    }

    for(var key in hiddenLayerValues){
        hiddenLayerValues.push(0);
    }

    for(var key in hiddenWeights){
        for(var key2 in initialWeights){
            hiddenWeights[key].push(-0.1+ 0.2 * Math.random());
        }
    }

    fs.open('classes.txt', 'wx', (err) => {
        var toWrite = ''
        for (var key in classes){
            toWrite += key + '\n' + classes[key] + '\n';       
        }
        fs.writeFile('classes.txt',toWrite);
    });
    Neurona.trainPerceptron(trainingMatrix, res, initialWeights, hiddenWeights, hiddenLayerValues, values);
    /*var weights = Neurona.trainPerceptron(trainingMatrix, classes);
    weights.forEach((weight)=> {
        console.log(weight);
    });
    var falsePositive = 0;
    var falseNegative = 0;
    var noT = 0;
    var unClassified = 0;
    var positive = 0;

    trainingMatrix.forEach((train, i) => {
        output = Neurona.feedForward(train, weights);
        actual = Neurona.actionFunction(output);
        if(actual < 0.5){
            noT +=1;
        }
        if(actual <= 0.49 && classes[i] == 1){
            falseNegative += 1;
        }else if(actual >= 0.5 && classes[i] == 0){
            falsePositive += 1;
        }else if(actual>0.5 && actual<0.5){
            unClassified += 1;
        }else if(actual>=0.5){
            positive+=1;
        }
    });

    console.log('falsePositive: ' + falsePositive);
    console.log('falseNegative: ' + falseNegative);
    console.log('Positivos: '+ positive);
    console.log('Sin Clasificar: '+ unClassified);
    console.log('Numero de no t: ' + noT);*/
});

