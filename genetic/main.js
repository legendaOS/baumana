function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

function randomArray(length, max) {
    max -= 1
    return Array.apply(null, Array(length)).map(function() {
        return Math.round(Math.random() * max);
    });
}

function compare(str1, str2){
    let mistakes = 0
    for(ind = 0; ind < N; ind++){
        if(mainFirstString[ind] != randString[ind]) {
            mistakes += 1
        }
    }
    return mistakes
}

let mainFirstString = "Я очень сильно люблю кошечек и собачек, они мне очень нравятся!"
const alphabet = `1 234567890йцукенгшщзхъфывапролджэячсмитьбю,.!:-;`
const N = mainFirstString.length
let randString = ""


$(document).ready(function () {

    //задание начальных значений в html
    $('#main').html(mainFirstString)
    $("#paramFirst").attr({min:1, max:N, value: 1})
    $('#paramFirstVal').html("Кол-во изменений:" + $('#paramFirst').val());

    $("#param2").attr({min:1, max:10, value: 1})
    $('#param2Val').html("Кол-во особей:" + $('#param2').val());

    //создание случайной строки
    let buf = ""
    for(let i = 0; i < N; i++){
        let randInt = getRandomInt(0, alphabet.length)
        buf += alphabet[randInt]
    }
    $("#random").html(buf)
    randString = buf  

});

$(document).on('input change', '#paramFirst', function() {
    $('#paramFirstVal').html("Кол-во изменений:" + $(this).val());
});

$(document).on('input change', '#param2', function() {
    $('#param2Val').html("Кол-во потомков:" + $(this).val());
});