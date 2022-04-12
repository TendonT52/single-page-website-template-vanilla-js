import { persons } from "./model.js";
import { numberOfGroup } from "./selectors.js";

export var NumberOfPeople = persons.size ;
export var AnswerGroup = [] ;
var NumberOfGroup ;
var ArrayPeople = [] ;
var RankingTable = [] ;
var dataCollected = [] ;

export function generateSolution(InputGroup) {
    NumberOfGroup = InputGroup ;
    console.log(" --> " + NumberOfGroup) ;
    mappingPeopleWithIndex() ;
    for (var i = 0; i < NumberOfPeople; i++) {
        RankingTable[i] = Array(NumberOfPeople).fill(1);
        dataCollected[i] = Array(NumberOfPeople).fill(0);
    }
    
    for (const [key, value] of persons) {
        var person1 = findIndex(key) ;
        for (const valueLike of value.like) {
            var person2 = findIndex(valueLike) ;
            RankingTable[person1][person2] = 2;
        }
        for (const valueDislike of value.dislike) {
            var person3 = findIndex(valueDislike) ;
            RankingTable[person1][person3] = 0;
        }
    }

    for (var i = 0; i < RankingTable.length; i++) {
        for (var j = 0; j < RankingTable.length; j++) {
            var a = RankingTable[i][j] ;
            var b = RankingTable[j][i] ;
            if (a == 2 && b == 2) {
                dataCollected[i][j] = 6 ;
                dataCollected[j][i] = 6 ;
            } else if ((a == 2 && b == 1) || (a == 1 && b == 2)) {
                dataCollected[i][j] = 5 ;
                dataCollected[j][i] = 5 ;
            } else if (a == 2 && b == 0 || (a == 0 && b == 2)) {
                dataCollected[i][j] = 4 ;
                dataCollected[j][i] = 4 ;
            } else if (a == 1 && b == 1) {
                dataCollected[i][j] = 3 ;
                dataCollected[j][i] = 3 ;
            } else if (a == 1 && b == 0 || (a == 0 && b == 1)) {
                dataCollected[i][j] = 2 ;
                dataCollected[j][i] = 2 ;
            } else {
                dataCollected[i][j] = 1 ;
                dataCollected[j][i] = 1 ;
            }
        }
    }
    /*
    for (var i = 0; i < RankingTable.length; i++) {
        console.log(RankingTable[i]) ;
    }
    console.log("-------") ;
    for (var i = 0; i < RankingTable.length; i++) {
        console.log(dataCollected[i]) ;
    }
    */

    if (NumberOfGroup > NumberOfPeople) {
        alert("Error!  Maximum number of students is now : " + NumberOfPeople) ;
    } else if (NumberOfGroup <= 0) {
        alert("Error! The Number of group must more than or equal to 1") ;
    } else {
        var answer = [] ;
        maximumSpaningTree(answer) ;

        var numberInEachGroup1 = math.floor(NumberOfPeople/NumberOfGroup) ;
        var numberInEachGroup2 = numberInEachGroup1 + 1 ;
    }
}

function mappingPeopleWithIndex() {
    var i = 0 ;
    for (const key of persons.keys()) {
        ArrayPeople[i] = key ;
        //console.log(i + " --> " + ArrayPeople[i]) ;
        i += 1 ;
    }
   
    ArrayPeople.length = i ;
    NumberOfPeople = i ;
}

function findIndex(name) {
    for (let i = 0; i < ArrayPeople.length; i++) {
        if (ArrayPeople[i] == name) {
            return i ;
        }
    }
    return -1 ;
}

function maximumSpaningTree(answer) {
    var distance = [] ;
    var inMST = [] ;
    var parent = [] ;
    var color = []
    for (var i = 0; i < NumberOfPeople; i++) {
        distance[i] = -1 ;
        inMST[i] = false ;
        parent[i] = -1 ;
        color[i] = 0 ;
    }
    var start = Math.floor(Math.random() * NumberOfPeople);
    distance[start] = 0 ;
    parent[start] = start ;

    for (var i = 0; i < NumberOfPeople; i++) {
        var maxIndex ;
        var maxPath = -1 ;
        for (var j = 0; j < NumberOfPeople; j++) {
            if (distance[j] > maxPath) {
                maxPath = distance[j] ;
                maxIndex = j ;
            }
        }
        distance[maxIndex] = -1 ;
        inMST[maxIndex] = true ;

        for (var j = 0; j < NumberOfPeople; j++) {
            if (!inMST[j] && dataCollected[maxIndex][j] > distance[j]) {
                distance[j] = dataCollected[maxIndex][j] ;
                parent[j] = maxIndex ;
            }
        }
    }
    //------------Create GraphData-------------
    var graphData  = [];
    for (var i = 0; i < NumberOfPeople; i++) {
        graphData[i] = [] ;
    }
    for (var i = 0; i < NumberOfPeople; i++) {
        graphData[parent[i]].push(i) ;
    }

    //------------Create Answer Array-------------
    for (var i = 0; i < NumberOfPeople; i++) {
        var vertex = myRandom(color) ;
        if (color[vertex] != 0) {
            continue ;
        }
        dfs(graphData, vertex, color, answer) ;
    }
}

function dfs(graphData, vertex, color, answer) {
    color[vertex] = 1 ;
    for (var i = 0; i < graphData[vertex].length; i++) {
        if (color[graphData[vertex][i]] == 0) {
            dfs(graphData, graphData[vertex][i], color, answer) ;
        }
    }
    answer.push(vertex) ;
}

function myRandom(color) {
    var newArray = [] ;
    var num = 0 ;
    for (let index = 0; index < ArrayPeople.length; index++) {
        if (color[index] == 0) {
            newArray[num] = index ;
            num += 1 ;
        }
    }
    var newArrayIDX = Math.floor(Math.random() * newArray.length);
    return newArray[newArrayIDX] ;
}







