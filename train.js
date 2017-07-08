const Neurona = require('./neurona.js');

var trainingMatrix = [[1,0,0],[1,0,1],[1,1,0],[1,1,1]];
var classes = [1,1,1,0];

var weights = Neurona.trainPerceptron(trainingMatrix, classes);


console.log(weights);