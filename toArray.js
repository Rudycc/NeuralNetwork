const Neurona = require('./neurona.js');
const fs = require('fs');


let trainingMatrix = [];
let classes = {
    a: [],
    b: [],
    c: [],
    d: [],
    e: [],
    f: [],
    g: [],
    h: [],
    i: [],
    j: [],
    k: [],
    l: [],
    m: [],
    n: [],
    o: [],
    p: [],
    q: [],
    r: [],
    s: [],
    t: [],
    u: [],
    v: [],
    w: [],
    x: [],
    y: [],
    z: []
};

let initialWeights = {
    a: [],
    b: [],
    c: [],
    d: [],
    e: [],
    f: [],
    g: [],
    h: [],
    i: [],
    j: [],
    k: [],
    l: [],
    m: [],
    n: [],
    o: [],
    p: [],
    q: [],
    r: [],
    s: [],
    t: [],
    u: [],
    v: [],
    w: [],
    x: [],
    y: [],
    z: []
};

let hiddenWeights = {
    first: [],
    second: [],
    third: [],
    fourth: [],
    fifth: []
}

let hiddenLayerValues = [];

const values = {
    a: [0, 0, 0, 0, 0],
    b: [0, 0, 0, 0, 1],
    c: [0, 0, 0, 1, 0],
    d: [0, 0, 0, 1, 1],
    e: [0, 0, 1, 0, 0],
    f: [0, 0, 1, 0, 1],
    g: [0, 0, 1, 1, 0],
    h: [0, 0, 1, 1, 1],
    i: [0, 1, 0, 0, 0],
    j: [0, 1, 0, 0, 1],
    k: [0, 1, 0, 1, 0],
    l: [0, 1, 0, 1, 1],
    m: [0, 1, 1, 0, 0],
    n: [0, 1, 1, 0, 1],
    o: [0, 1, 1, 1, 0],
    p: [0, 1, 1, 1, 1],
    q: [1, 0, 0, 0, 0],
    r: [1, 0, 0, 0, 1],
    s: [1, 0, 0, 1, 0],
    t: [1, 0, 0, 1, 1],
    u: [1, 0, 1, 0, 0],
    v: [1, 0, 1, 0, 1],
    w: [1, 0, 1, 1, 0],
    x: [1, 0, 1, 1, 1],
    y: [1, 1, 0, 0, 0],
    z: [1, 1, 0, 0, 1]
};

let res = [];
let testMatrix = [];
let testVector = [];

const getAllWeights = Neurona.readWeights();

fs.open('info.txt', 'wx', (err) => {
    let toWrite = ''
    for (let key in values) {
        toWrite += key + '\n' + values[key] + '\n';
    }
    fs.writeFile('info.txt', toWrite);
});


const LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader('letter.txt');

lr.on('error', (err) => {
    // 'err' contains error object
});
let cuenta = 0;
lr.on('line', (line) => {
    if (cuenta < 40000) {
        let data = line.split("\t");
        res.push(data[1]);
        let vector = [];
        data.map((number, i) => {
            if (i >= 6) {
                vector.push(parseInt(number));
            }
        });
        vector.pop();
        trainingMatrix.push(vector);
        cuenta += 1;
    } else {
        let data = line.split("\t");
        testVector.push(data[1]);
        let vector = [];
        data.map((number, i) => {
            if (i >= 6) {
                vector.push(parseInt(number));
            }
        });
        vector.pop();
        testMatrix.push(vector);
        cuenta += 1;
    }
});

const testNextVector = (vector, expectedOutput) => {
    let results = Neurona.feedForward(vector, initialWeights, hiddenWeights, hiddenLayerValues);
    let incorrect = values[expectedOutput].some((output, i) => {
        return (results[i] >= 0.5 && output == 0) || (results[i] < 0.5 && output == 1);
    });
    if (!incorrect) {
        /*console.log('expected: ' + expectedOutput);
        console.log(values[expectedOutput]);
        console.log('received:' + results);*/
    }

    return incorrect;
}


lr.on('end', () => {
    /*for (let key in initialWeights) {
        trainingMatrix[0].forEach((element) => {
            initialWeights[key].push(-0.1 + 0.2 * Math.random());
        });
    }*/

    initialWeights = getAllWeights.initialWeights;
    hiddenWeights = getAllWeights.hiddenWeights;


    for (let key in hiddenLayerValues) {
        hiddenLayerValues.push(0);
    }

    /* for (let key in hiddenWeights) {
         for (let key2 in initialWeights) {
             hiddenWeights[key].push(-0.1 + 0.2 * Math.random());
         }
     }*/

    fs.open('classes.txt', 'wx', (err) => {
        let toWrite = ''
        for (let key in classes) {
            toWrite += key + '\n' + classes[key] + '\n';
        }
        fs.writeFile('classes.txt', toWrite);
    });
    let correct = 0;
    let wrong = 0;
    testMatrix.forEach((test, i) => {
        if (testNextVector(test, testVector[i])) {
            wrong += 1;
        } else {
            correct += 1;
        }
    });

    console.log('correctly classified: ' + correct);
    console.log('incorrect guesses: ' + wrong);

    Neurona.trainPerceptron(trainingMatrix, res, initialWeights, hiddenWeights, hiddenLayerValues, values);

    wrong = 0;
    correct = 0;
    testMatrix.forEach((test, i) => {
        if (testNextVector(test, testVector[i])) {
            wrong += 1;
        } else {
            correct += 1;
        }
    });

    console.log('correctly classified: ' + correct);
    console.log('incorrect guesses: ' + wrong);
    /*let weights = Neurona.trainPerceptron(trainingMatrix, classes);
    weights.forEach((weight)=> {
        console.log(weight);
    });
    let falsePositive = 0;
    let falseNegative = 0;
    let noT = 0;
    let unClassified = 0;
    let positive = 0;

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

