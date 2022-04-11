import { persons } from "./model.js";

var NumberOdPeople = persons.size ;

export function generateSolution() {
    for (const [key, value] of persons) {
        console.log(key + ' = ' + value.like + ' vs ' + value.dislike)
    }

}



