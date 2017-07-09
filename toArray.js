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
var testMatrix = [];
var testVector = [];

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
        var vector = [];
        data.map((number, i) => {
            if(i>=6){
                vector.push(parseInt(number));
            }
        });
        vector.pop();
        trainingMatrix.push(vector);
        cuenta+=1;
    } else {
        var data = line.split("\t");
        testVector.push(data[1]);
        var vector = [];
        data.map((number, i) => {
            if(i>=6){
                vector.push(parseInt(number));
            }
        });
        vector.pop();
        testMatrix.push(vector);
        cuenta+=1;
    }
});

var testNextVector = (vector,expectedOutput) => {
    var results = Neurona.feedForward(vector,initialWeights,hiddenWeights,hiddenLayerValues);
    var incorrect = values[expectedOutput].some((output,i) => {
        return (results[i] >= 0.5 && output == 0) || (results[i] < 0.5 && output == 1);
    });
    if(!incorrect){
        console.log('expected: ' + expectedOutput);
        console.log(values[expectedOutput]);
        console.log('received:' + results);
    }
    
    return incorrect;
}


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
    var correct = 0;
    var wrong = 0;
    testMatrix.forEach((test,i) => {
        if(testNextVector(test,testVector[i])){
            wrong += 1;
        }else {
            correct += 1;
        }
    });

    console.log('correctly classified: ' + correct);
    console.log('incorrect guesses: ' + wrong);
    
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

