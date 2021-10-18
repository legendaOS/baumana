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
    if(str1.length != str2.length) return false
    for(i = 0; i < str1.length; i++){
        if(str1[i] != str2[i]) mistakes += 1
    }
    return mistakes
}


//создаем потомков к одной строке и отбираем лучших
function oneChange(str, childs, changes, mainstr){
    let ret = []
    let buf_arr
    let buf_str
    let min_comp = mainstr.length + 100
    for(iter = 0; iter < childs; iter++){
        
        inds = randomArray(changes, str.length)

        buf_arr = str.split('')

        for(r of inds){
            buf_arr[r] = alphabet[getRandomInt(0, alphabet.length)]
        }

        buf_str = buf_arr.join('')

        bcmp = compare(buf_str, mainstr)

        if(bcmp < min_comp){
            ret = []
            ret.push([bcmp, buf_str])
            min_comp = bcmp
        }
        else if(bcmp == min_comp){
            ret.push([bcmp, buf_str])
        }
        
    }
    return ret
}


//создаем для всех кто был потомков и отбираем лучших
function allChange(arr_of_str, count_of_best, childs, changes, mainstr){
    let ret = {mistakes: undefined, arr:[]}
    buf = []
    let end_buf123 = []
    let min_comp = undefined

    for(element of arr_of_str){
        g = oneChange(element[1], childs, changes, mainstr)
        for(gg of g) buf.push(gg)
    }


    for(elm of buf){
        if(elm[0] < min_comp || min_comp == undefined){
            end_buf123 = []
            min_comp = elm[0]
            end_buf123.push(elm)
        }
        else if(elm[0] == min_comp){
            end_buf123.push(elm)
        }
    }

    ret.mistakes = min_comp

    if(end_buf123.length <= count_of_best){
        for(ll in end_buf123) ret.arr.push(ll)
    }
    else{
        for(counter = 0; counter < count_of_best; counter++){
            let rn = getRandomInt(0, end_buf123.length)
            ret.arr.push(end_buf123[rn])
            end_buf123.splice(rn, 1)
        }
    }

    return ret
}




//MAIN

let mainFirstString = "12345"
const alphabet = `1234567890`
let N = mainFirstString.length
let randString = ""
let childrens


$(document).ready(function () {

    //задание начальных значений в html
    $('#main').html(mainFirstString)
    $("#paramFirst").attr({min:1, max:N, value: 1})
    $('#paramFirstVal').html("Кол-во изменений:" + $('#paramFirst').val());

    $("#param2").attr({min:1, max:100, value: 1})
    $('#param2Val').html("Кол-во особей:" + $('#param2').val());

    $("#param3").attr({min:1, max:30, value: 1})
    $('#param3Val').html("Кол-во лучших:" + $('#param3').val());

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
    childrens = +$('#param2').val()
});

$(document).on('input change', '#param3', function() {
    $('#param3Val').html("Кол-во лучших:" + $(this).val());
    childrens = +$('#param2').val()
});

$('#replbut').click(function (e) { 

    
    mainFirstString = $("#replval").val()
    $("#main").html(mainFirstString)
    N = mainFirstString.length

    buf = ""
    for(let i = 0; i < N; i++){
        let randInt = getRandomInt(0, alphabet.length)
        buf += alphabet[randInt]
    }
    $("#random").html(buf)
    randString = buf

    console.log(mainFirstString)
    console.log(randString)

    $("#paramFirst").attr({min:1, max:N, value: 1})
    $('#paramFirstVal').html("Кол-во изменений:" + $('#paramFirst').val());

});

let data123123 = []
let rangedata = []
let iterpro = 0

$("#resb").click(function (e) { 
    let hahachilds = +$("#param2").val()
    let hahamax = +$("#param3").val()
    let hahareplaces = +$("#paramFirst").val()
    

    console.log(mainFirstString)
    console.log(randString)
    console.log(hahachilds)
    console.log(hahareplaces)

    let hahabuf = oneChange(randString, hahachilds, hahareplaces, mainFirstString)

    let rrbuf

    console.log('-----')

    while(true){
        rrbuf = allChange(hahabuf, hahamax, hahachilds, hahareplaces, mainFirstString)
        
        rangedata.push(iterpro)
        iterpro += 1


        data123123.push(rrbuf.mistakes)
        console.log(data123123)

        if(rrbuf.mistakes == 0){
            break
        }
        if(iterpro > 100){
            console.log('выход по счетчику')
            break
        }
    }

    console.log('-----')

    console.log(data123123)
    console.log(rangedata)

    let popCanvas = $("#popChart");

    var barChart = new Chart(popCanvas, {
        type: 'bar',
        data: {
          labels: rangedata,
          datasets: [{
            label: 'Ошибки',
            data: data123123,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)'
            ]
          }]
        }
      });

      delete barChart
    
});