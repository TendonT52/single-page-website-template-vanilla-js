import { persons } from "./model.js";
import { numberOfGroup } from "./selectors.js";

export var NumberOfPeople = persons.size ;
var NumberOfGroup ;
var ArrayPeople = [] ;
var IsExit = new Set() ;
var AnswerGroup = [] ;
var RankingTable = [] ;
var NumberOfEachGroup = new Map() ;

export function generateSolution(InputGroup) {
    NumberOfGroup = InputGroup ;
    IsExit = new Set() ;
    NumberOfEachGroup = new Map() ;
    console.log(NumberOfGroup) ;
    mappingPeopleWithIndex() ;
    for (var i = 0; i < NumberOfPeople; i++) {
        RankingTable[i] = Array(NumberOfPeople).fill(0);
    }
    
    for (const [key, value] of persons) {
        var person1 = findIndex(key) ;
        var scoreMax = NumberOfPeople ;
        for (const valueLike of value.like) {
            var person2 = findIndex(valueLike) ;
            RankingTable[person1][person2] = scoreMax ;
            scoreMax -= 1 ;
        }
        var scoreMin = (-1)*NumberOfPeople ;
        for (const valueDislike of value.dislike) {
            var person3 = findIndex(valueDislike) ;
            RankingTable[person1][person3] = scoreMin ;
            scoreMin += 1 ;
        }
    }

    if (NumberOfGroup > NumberOfPeople) {
        alert("Error!  Maximum number of students is now : " + NumberOfPeople) ;
    } else if (NumberOfGroup <= 0) {
        alert("Error! The Number of group must more than or equal to 1") ;
    } else {
        var number1 = NumberOfPeople/NumberOfGroup ;
        var countNumber1 = NumberOfPeople/number1 ;
        NumberOfEachGroup.set(number1, countNumber1) ;
        if (NumberOfGroup%2 != 0) {
            number1 += 1 ;
            countNumber1 = NumberOfPeople/number1 ;
            NumberOfEachGroup.set(number1, countNumber1) ;
        }
        findGrouping() ;
    }
}

function mappingPeopleWithIndex() {
    var i = 0 ;
    for (const key of persons.keys()) {
        ArrayPeople[i] = key ;
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

function findmax(nameID) {
    var score = -1 ;
    var personIDMax ;
    var tmpArr = RankingTable[nameID] ;
    for (var i = 0; i < tmpArr.length; i++) {
        if (tmpArr[i] > score && !IsExit.has(i)) {
            score = tmpArr[i] ;
            personIDMax = i ;
        }
    }
    return personIDMax ;
}

function myRandom() {
    var newArray = [] ;
    var num = 0 ;
    for (let index = 0; index < ArrayPeople.length; index++) {
        if (!IsExit.has(index)) {
            newArray[num] = index ;
            num += 1 ;
        }
    }
    var newArrayIDX = Math.floor(Math.random() * newArray.length);
    return newArray[newArrayIDX] ;
}

function findGrouping() {
    for (var i = 0; i < numberOfGroup; i++) {       //for the first time
        var PeopleID = myRandom() ;
        IsExit.add(PeopleID) ;
        var tmpArr = [] ;
        tmpArr[0] = ArrayPeople[PeopleID] ;
        AnswerGroup[i] =  tmpArr ;
    }

    for (var i = 0; i < numberOfGroup; i++) {
        console.log(AnswerGroup[i]) ;
    }
}







