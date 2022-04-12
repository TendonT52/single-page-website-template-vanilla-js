import { AnswerGroup } from "./calculateGroup.js";
import { createBlock } from "./generate.js"

export function addElement() {
    var result_block = document.getElementById('contain3') ;
    for (var idx = 0; idx < AnswerGroup.length; idx++) {
        var sub_block = document.createElement('div');
        sub_block.id = "sub-block" + idx ;
        for (var idx2 = 0; idx2 < AnswerGroup[idx].length; idx2++) {
            var text_node = document.createTextNode(AnswerGroup[idx][idx2]) ;
            sub_block.appendChild(text_node) ;
        }
        //var lineBreak = document.createElement('br');
        //sub_block.appendChild(lineBreak.cloneNode()) ;
        var line_break = document.createTextNode('<br />');
        sub_block.appendChild(line_break) ;
        console.log(sub_block) ;
        result_block.appendChild(sub_block) ;
    }
}