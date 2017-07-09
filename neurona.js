var Math = require('mathjs');



var feedForward = function(bytes, initialWeights, hiddenWeights, hiddenLayerValues){
    //Obtener resultados de las primeras 26 neuronas
    var index = 0;
    for(var key in initialWeights){
        var dot = 0;
        bytes.map((byte, i)=>{
            dot += byte * initialWeights[key][i];
        });
        hiddenLayerValues[index] = actionFunction(dot);
        index += 1;
    }
    //Resultados de las primeras neuronas obtenidos
    var results = [];

    for(var key in hiddenWeights){
        var output = 0;
        hiddenLayerValues.forEach((value,i) => {
            output += value * hiddenWeights[key][i];
        });
        results.push(actionFunction(output));
    }
    return results;
};

var actionFunction = function(output){
    return 1.0 / (1 + Math.exp(-output));
}

var hiddenActionFunction = (output) => {
    return output > 0.5? 1:0;
}

var dsigmoid = function(output){
    return output*(1-output);
}

var backPropagation = function(error, input, output, initialWeights, hiddenWeights, hiddenLayerValues){
    const learningRate = 0.01;
    var outputDelta = output.map((out,i) => {
        return dsigmoid(out) * error[i];
    });
    var ind = 0;
    for(var key in hiddenWeights){
        hiddenWeights[key] = hiddenWeights[key].map((weight,i) => {
            return weight + (hiddenLayerValues[i] * learningRate * outputDelta[ind]);
        });
        ind += 1;
    }

    ind = 0;
    var hiddenDeltas = [];
    for(var key in hiddenWeights){
        var delta = hiddenWeights[key].map((weight,i) => {
            return dsigmoid(hiddenLayerValues[i]) * weight * outputDelta[ind];
        });
        hiddenDeltas.push(delta);
        ind += 1;
    }
    
    ind = 0;
    for(var key in initialWeights){
        initialWeights[key] = initialWeights[key].map((initial,i) => {
            var actual = 0;
            hiddenDeltas.forEach((delta) => {
                actual += (input[i] * learningRate * delta[ind]); 
            });
            return initial += (actual/hiddenDeltas.length);
        });
        
        ind += 1;
    }

    /*return weights = weights.map((weight,i) => {
        return weight + (input[i] * outputDelta * learningRate);
    });*/
}

var trainPerceptron = function(trainingMatrix, classes, initialWeights, hiddenWeights, hiddenLayerValues, values){
    var hits = 0;
    var actual = 0;
    while (trainingMatrix.length > hits) {
        hits = 0;
        trainingMatrix.map((trainingVector, i) => {
            var output = feedForward(trainingVector, initialWeights, hiddenWeights, hiddenLayerValues);
            var expectedOutput = values[classes[i]];
            var error = output.map((out,i) => {
                return expectedOutput[i] - out;
            });
        
            
            if(error.some((element) => { return Math.abs(element) > 0.5; })){
                var newError = error.map((err) => {
                    if(Math.abs(err) <= 0.5){
                        return 0;
                    }else{
                        return err;
                    }
                });
                backPropagation(newError, trainingVector, output, initialWeights, hiddenWeights, hiddenLayerValues);
            } else{
                hits += 1;
            }
        });
        
        if (actual >= 5){
            break;
        } else{
            actual++;
            console.log('Number of correct hits: '+ hits);
            console.log((actual/2) + '%');
        }

    }
}

module.exports = {
    feedForward,
    actionFunction,
    trainPerceptron,
}