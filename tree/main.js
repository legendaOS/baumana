class Node{
    Childrens = []
    Parent = undefined

    constructor(_name){
        this.Name = _name
    }

    appended(elem) {
        this.Childrens.push(elem)
    }
    parpend(elem){
        this.Parent = elem
    }
}

class Product{
    Parent = undefined
    
    constructor(_name,_Price,_Sale,_Available,_Categories,_Feedback,_Adress){
        this.Name = _name
        this.Price = _Price
        this.Sale = _Sale
        this.Available = _Available
        this.Categories = _Categories
        this.Feedback = _Feedback
        this.Adress = _Adress
    }

    parpend(elem){
        this.Parent = elem
    }
}

let dislikes = {}


function split_str(stroka, symbol) {
    let positions = []
    let ret = []
    let pos = 0
    while (true) {
        let foundPos = stroka.indexOf(symbol, pos);
        if (foundPos == -1) break;

        positions.push(foundPos)
        pos = foundPos + 1
    }
    
    pos = 0
    len = stroka.length

    for(p of positions){
        ret.push(stroka.slice(pos, p))
        pos = p + 1
    }
    ret.push(stroka.slice(pos, len))

    return ret
}

let categors = {
    'заморозка':'продукты',
    'бакалея':'продукты',
    'для дома':'продукты',
    'напитки':'продукты',
    'рыба':'продукты',
    'замороженная рыба':'заморозка',
    'полуфабрикаты':'заморозка',
    'консервы':'рыба',
    'рыбные продукты':'рыба',
    'свежая рыба':'рыба',
    'товары для животных':'для дома',
    'бытовая химия':'для дома',
    'товары для детей':'для дома',
    'соки':'напитки',
    'алкоголь':'напитки',
    'воды':'напитки',
    'свежевыжатые':'соки',
    'сок в упаковке':'соки',
    'крепкий алкоголь':'алкоголь',
    'пивные напитки':'алкоголь',
    'минеральная вода':'воды',
    'негазированная вода':'воды',
    'лимонады':'воды',
}

let prods = [
    'чебупели;120;15;заморозка,полуфабрикаты;отлично;Пушкина;полуфабрикаты;True',
    'хотдогстеры;110;10;заморозка,полуфабрикаты;отлично;Пушкина;полуфабрикаты;True',
    'круглетсы;100;5;заморозка,полуфабрикаты;отлично;Пушкина;полуфабрикаты;True',
    'пельмени;300;0;заморозка,полуфабрикаты;хорошо;Лермонтова;полуфабрикаты;True',
    'замороженная селедка;500;0;заморозка,рыба;хорошо;Лермонтова;замороженная рыба;True',
    'замороженная камбала;200;6;заморозка,рыба;хорошо;Лермонтова;замороженная рыба;True',
    'замороженная креветка;10;0;заморозка,рыба;хорошо;Лермонтова;замороженная рыба;True',
    'белый хлеб;25;0;бакалея;хорошо;Пушкина;бакалея;True',
    'черный хлеб;25;0;бакалея;хорошо;Пушкина;бакалея;True',
    'перец;20;0;бакалея;хорошо;Пушкина;бакалея;True',
    'Корм для кошек индейка желе;25;0;товары для животных,для дома;нормально;Пушкина;товары для животных;True',
    'Голд Корм для кош паштет курица;50;0;товары для животных,для дома;нормально;Пушкина;товары для животных;True',
    'Kitekat Корм для кошек c говядина в соусе;15;0;товары для животных,для дома;нормально;Пушкина;товары для животных;True',
    'Средство для унитаза Domestos ультраблеск;120;0;бытовая химия,для дома;нормально;Пушкина;бытовая химия;True',
    'Mr. Proper Жидкость моющая для полов и стен Лимон;120;0;бытовая химия,для дома;нормально;Пушкина;бытовая химия;True',
    'Пемолюкс Порошок чистящий Ослепительный белый;120;0;бытовая химия,для дома;нормально;Лермонтова;бытовая химия;True',
    'Фрутоняня Пюре Салатик из фруктов;50;0;товары для детей,для дома;нормально;Лермонтова;товары для детей;True',
    'Фрутоняня Пюре Яблоко Груша;50;0;товары для детей,для дома;нормально;Лермонтова;товары для детей;True',
    'Фрутоняня Пюре Фруктовый салатик;43;0;товары для детей,для дома;нормально;Лермонтова;товары для детей;True',
    'Свежевыжатый сок апельсин;150;0;свежевыжатые,соки,напитки;отлично;Пушкина;свежевыжатые;True',
    'Свежевыжатый сок яблоко;150;0;свежевыжатые,соки,напитки;отлично;Пушкина;свежевыжатые;True',
    'Свежевыжатый сок ананас;150;0;свежевыжатые,соки,напитки;отлично;Пушкина;свежевыжатые;True',
    'Сады придонья Сок яблочный натуральный свежеотжат;85;30;сок в упаковке,соки,напитки;хорошо;Достоевского;сок в упаковке;True',
    'Любимый Напиток Апельсин/ Манго/ Мандарин;130;30;сок в упаковке,соки,напитки;хорошо;Достоевского;сок в упаковке;True',
    'J7 Сок апельсиновый;130;30;сок в упаковке,соки,напитки;хорошо;Достоевского;сок в упаковке;True',
    'Водка Финляндия;550;0;крепкий алкоголь,алкоголь,напитки;хорошо;Достоевского;крепкий алкоголь;True',
    'Водка Славянская мягкая на березовых почках;130;0;крепкий алкоголь,алкоголь,напитки;хорошо;Достоевского;крепкий алкоголь;True',
    'Водка особая Хортиця Ультра Премиум;1000;0;крепкий алкоголь,алкоголь,напитки;хорошо;Достоевского;крепкий алкоголь;True',
    'Водка Медведь;799;0;крепкий алкоголь,алкоголь,напитки;хорошо;Достоевского;крепкий алкоголь;True',
    'Водка Ах ты степь широкая;600;0;крепкий алкоголь,алкоголь,напитки;хорошо;Достоевского;крепкий алкоголь;True',
    'Пиво Клаусталер Ориджинал светлое;80;0;пивные напитки,алкоголь,напитки;хорошо;Достоевского;пивные напитки;True',
    'Пиво Шпатен Мюнхен;120;0;пивные напитки,алкоголь,напитки;хорошо;Достоевского;пивные напитки;True',
    'Пиво Шпатен Мюнхен;150;0;пивные напитки,алкоголь,напитки;хорошо;Достоевского;пивные напитки;True',
    'Пиво Будвайзер Будвар;120;0;пивные напитки,алкоголь,напитки;хорошо;Достоевского;пивные напитки;True',
    'Вода питьевая Святой Источник негаз;30;0;негазированная вода,воды,напитки;хорошо;Лермонтова;негазированная вода;True',
    'Вода природная питьевая Святой Источник;45;0;негазированная вода,воды,напитки;хорошо;Лермонтова;негазированная вода;True',
    'Мин. питьевая вода Пилигрим;25;0;негазированная вода,воды,напитки;хорошо;Лермонтова;негазированная вода;True',
    'Мин. питьевая вода Боржоми газ;60;0;минеральная вода,воды,напитки;хорошо;Лермонтова;минеральная вода;True',
    'Вода питьевая Аква Минерале газ;40;0;минеральная вода,воды,напитки;хорошо;Лермонтова;минеральная вода;True',
    'Вода питьевая Святой Источник газ;35;0;минеральная вода,воды,напитки;хорошо;Лермонтова;минеральная вода;True',
    'Напиток б/а чай Липтон Зеленый;100;0;лимонады,воды,напитки;отлично;Пушкина;лимонады;True',
    'Сильногаз. напиток б/а Спрайт;50;0;лимонады,воды,напитки;отлично;Пушкина;лимонады;True',
    'Сильногаз. напиток б/а Кока-Кола;50;0;лимонады,воды,напитки;отлично;Пушкина;лимонады;True',
    'Сильногаз. напиток б/а Фанта;50;0;лимонады,воды,напитки;отлично;Пушкина;лимонады;True',
    'Напиток б/а чай Липтон Лимон;70;0;лимонады,воды,напитки;отлично;Пушкина;лимонады;True'
]

let paramsToSort = {
    Price: {min: 0, max:1000000},
    Sale: 0,
    Available: true,
    Feedback: 'отлично'
}

function sortRet(arrayOfObj, params){
    let ret = []
    

    for(let productElm of arrayOfObj){
        let currentProd = product_map[productElm[1]]

        console.log(currentProd)

        let curParams = {}
        for(let param in params){
            curParams[param] = false
        }

        
        
        for(let param in curParams){

            if(param == 'Price')
            {
                let pmin = params[param]['min'] ? params[param]['min'] : 0
                let pmax = params[param]['max'] ? params[param]['max'] : 9999999
                if(+currentProd['Price'] >= pmin && +currentProd['Price'] <= pmax)
                {
                    curParams[param] = true
                }
            }
            if(param == "Sale")
            {
                let sal = params[param] ? params[param] : 0
                if(+currentProd['Sale'] >= sal)
                {
                    curParams[param] = true
                }
            }
            if(param == "Available")
            {
                let aval = params[param] ? params[param] : true
                if(currentProd['Available'] == aval)
                {
                    curParams[param] = true
                }                
            }
            if(param == "Feedback")
            {
                let pfid = params[param] ? params[param] : 'отлично'
                if(currentProd['Feedback'] == pfid)
                {
                    curParams[param] = true
                }                
            }
        }

        let flag = true

        for(let param in curParams)
        {
            
            if(curParams[param] == false) flag = false
        }

        if(flag) ret.push(currentProd)


    }


    console.log('11', ret)
    return ret
}


/* создание дерева из нод */

let root = new Node('продукты')
let tree_map = {'продукты':root}
let product_map = {}

for(i in categors){
    buf_node = new Node(i)
    buf_par_name = categors[i]
    tree_map[i] = buf_node
    buf_par = tree_map[buf_par_name]
    buf_par.appended(buf_node)
    buf_node.parpend(buf_par)
}


/* наполнение нод листками */

for(prod of prods){
    buf = split_str(prod, ';')
    let av
    if (buf[7] == "True") av = true
    else av = false
    buf_prod = new Product(buf[0], buf[1], buf[2], av,split_str(buf[3], ','), buf[4], buf[5])
    tree_map[buf[6]].appended(buf_prod)
    buf_prod.parpend(tree_map[buf[6]])
    product_map[buf_prod.Name] = buf_prod
}

//предвывод в консоль

console.log('Дерево')
console.log(root)
console.log('Продукты')
console.log(product_map)

function delete_start_space(stroka){
    buf = ''
    flag = false
    for(i of stroka){
        if(i != ' '){
            flag = true
        }
        if(flag){
            buf += i
        }
    }
    return buf
}


function lol(t){

            if(t.attr('activated') == 0)
            {
                let inhtml
                if(t.attr('class') == 'name')
                {
                
                    map_name = delete_start_space(t.attr('map_name'))
                    console.log(map_name)
                    

                    
                    inhtml = `<ul>`
                    for(elm of tree_map[map_name].Childrens){
                        let c_name
                        if(elm.constructor.name == 'Node'){
                            c_name = 'name'
                        }
                        else{
                            c_name = 'nnnnn'
                        }
                        inhtml +=   `
                                        <li>
                                            <h3 class = '${c_name}' map_name = '${elm.Name}' activated = '0' onclick = 'lol($(this))'>
                                                ${elm.Name} -> ${elm.constructor.name}
                                            </h3>
                                        </li>
                                    `
                    }
                    inhtml += `</ul>`
                
                
                
                }
                else{
                    inhtml =    `
                                    <ul>
                                        <li>Цена - ${elm.Price}</li>
                                        <li>Скидка - ${elm.Sale}</li>
                                        <li>Доступность - ${elm.Available}</li>
                                        <li>Категории - ${elm.Categories}</li>
                                        <li>Отзыв - ${elm.Feedback}</li>
                                        <li>Адрес - ${elm.Adress}</li>
                                    </ul>
                                `
                }

                t.after(inhtml)
                t.attr('activated', 1)
            
            }
            else{
                t.next().html('')
                t.attr('activated', 0)
            }
}


$(document).ready(function () {
    let unvision = true

    $('#btn').click(function () {
        if(unvision){
            let inhtml = `
                        <ul>
                            <h3 class = 'name' map_name = ' ${tree_map['продукты'].Name}' activated = '0' onclick = 'lol($(this))'>
                                ${tree_map['продукты'].Name} -> ${tree_map['продукты'].constructor.name}
                            </h3> 
                        </ul>
                        ` 
            $("#main").html(inhtml)
            unvision = false
        }
        else{
            $("#main").html('')
            unvision = true
        }
        
    })
})

/* меры близости*/

let measure =   {
                    'Расстояние по дереву':'tree_cmp',
                    'Манхэттенское расстояние':'manheth',
                    'Евклидово расстояние':'evklid',
                    'Расстояние Хэмминга':'hemminga',
                    'Расстояние Чебышева':'chebichev',
                    'Комплексное': 'complex'
                }


let adress_len = [
    ['-',           'Пушкина', 'Лермонтова', 'Достоевского'],
    ['Пушкина',         0,          10,           20       ],
    ['Лермонтова',     10,           0,           15       ],
    ['Достоевского',   20,          15,           0        ]
]

function subtract_adress(adr1, adr2){
    a = 0
    for(zn of adress_len[0]){
        if (zn == adr1) break
        a++
    }
    b = 0
    buf_arr = []
    for(i of adress_len){
        buf_arr.push(i[0])
    }
    for(zn of buf_arr){
        if (zn == adr2) break
        b++
    }
    
    return adress_len[a][b]
}

let fed_val = {
    'отлично':5,
    'хорошо':4,
    'нормально':3,
}

let count_mer = 6

function find_name(elem){
    a = elem
    for(i = 0; i < count_mer; i++){if(a[i].checked){return(a[i].value)}}
}

function cmp(obj1, obj2, type_of_cmp){
    /* Комплексное */
    /* 2 по дереву + манхеттн */

    if(type_of_cmp == 'complex'){
        let obj1patch = []
        let obj2patch = []
        let buf1par = obj1.Parent
        let buf2par = obj2.Parent

        while(buf1par != undefined){
            obj1patch.push(buf1par)
            buf1par = buf1par.Parent
        }
        while(buf2par != undefined){
            obj2patch.push(buf2par)
            buf2par = buf2par.Parent
        }

        let p1
        let p2

        while(true){
            p1 = obj1patch.pop()
            p2 = obj2patch.pop()
            if(p1 != p2 || p1 == undefined || p2 == undefined){
                if(p1 != undefined) obj1patch.push(p1)
                if(p2 != undefined) obj2patch.push(p2)
                break
            }
        }
        let po_derevu = (obj1patch.length + obj2patch.length + 2) 

        let ret = 0
        ret += Math.abs(obj1.Price - obj2.Price)
        ret += Math.abs(obj1.Sale - obj2.Sale)
        ret += Math.abs(obj1.Available - obj2.Available)
        ret += Math.abs(fed_val[obj1.Feedback] - fed_val[obj2.Feedback])
        ret += subtract_adress(obj1.Adress, obj2.Adress)

        let result = po_derevu * 10 + ret

        return result

    }



    /* по дереву */
    if(type_of_cmp == 'tree_cmp'){
        let obj1patch = []
        let obj2patch = []
        let buf1par = obj1.Parent
        let buf2par = obj2.Parent

        while(buf1par != undefined){
            obj1patch.push(buf1par)
            buf1par = buf1par.Parent
        }
        while(buf2par != undefined){
            obj2patch.push(buf2par)
            buf2par = buf2par.Parent
        }

        let p1
        let p2

        while(true){
            p1 = obj1patch.pop()
            p2 = obj2patch.pop()
            if(p1 != p2 || p1 == undefined || p2 == undefined){
                if(p1 != undefined) obj1patch.push(p1)
                if(p2 != undefined) obj2patch.push(p2)
                break
            }
        }
        return(obj1patch.length + obj2patch.length + 2)
    }

    /* Манхеттена */
    /* сумме модулей разностей их координат. */

    if(type_of_cmp == 'manheth'){
        let ret = 0
        ret += Math.abs(obj1.Price - obj2.Price)
        ret += Math.abs(obj1.Sale - obj2.Sale)
        ret += Math.abs(obj1.Available - obj2.Available)
        ret += Math.abs(fed_val[obj1.Feedback] - fed_val[obj2.Feedback])
        ret += subtract_adress(obj1.Adress, obj2.Adress)

        return ret
    }

    /* Евклида */

    if(type_of_cmp == 'evklid'){
        let ret = 0
        ret += Math.pow((obj1.Price - obj2.Price), 2) 
        ret += Math.pow((obj1.Sale - obj2.Sale), 2) 
        ret += Math.pow((obj1.Available - obj2.Available), 2) 
        ret += Math.pow((fed_val[obj1.Feedback] - fed_val[obj2.Feedback]), 2) 
        ret += Math.pow((subtract_adress(obj1.Adress, obj2.Adress)), 2) 
        ret = Math.sqrt(ret)

        return ret
    }

    /* Хэмминга */
    /* число позиций, в которых соответствующие символы двух слов одинаковой длины различны */

    if(type_of_cmp == 'hemminga'){
        let ret = 0
        ret += obj1.Price == obj2.Price ? 0 : 1
        ret += obj1.Sale == obj2.Sale ? 0 : 1
        ret += obj1.Available == obj2.Available ? 0 : 1
        ret += obj1.Feedback == obj2.Feedback ? 0 : 1 
        ret += obj1.Adress == obj2.Adress ? 0 : 1 

        return ret
    }


    /* Расстояние Чебышева */
    /* Расстоянием Чебышёва между n-мерными числовыми векторами называется максимум модуля разности компонент этих векторов.  */

    if(type_of_cmp == 'chebichev'){
        let ret = 0
        buf = Math.abs(obj1.Price) - Math.abs(obj2.Price)
        ret = buf > ret ? buf : ret
        buf = Math.abs(obj1.Sale) - Math.abs(obj2.Sale)
        ret = buf > ret ? buf : ret
        buf = Math.abs(obj1.Available) - Math.abs(obj2.Available)
        ret = buf > ret ? buf : ret
        buf = (Math.abs(fed_val[obj1.Feedback]) - Math.abs(fed_val[obj2.Feedback]))
        ret = buf > ret ? buf : ret
        buf = subtract_adress(obj1.Adress, obj2.Adress)
        ret = buf > ret ? buf : ret

        return ret
    }


}


let keys_cpm_vect = 
{
    'Ближайший сосед':'near_sosed',
    'Дальний сосед':'far_sosed',
    'Cредней связи':'sred_svas'
}

function cpm_vect(obj, array_of_obj, type_of_cmp, type_of_cmp_vect){
    if (type_of_cmp_vect == 'near_sosed'){
        let brr = []
        for(i of array_of_obj){
            brr.push(cmp(obj, i, type_of_cmp))
        }
        return(Math.min(...brr))
    }
    
    if (type_of_cmp_vect == 'far_sosed'){
        let brr = []
        for(i of array_of_obj){
            brr.push(cmp(obj, i, type_of_cmp))
        }
        return(Math.max(...brr))
    }

    if (type_of_cmp_vect == 'sred_svas'){
        let brr = 0
        let countbrr = 0
        for(i of array_of_obj){
            brr += cmp(obj, i, type_of_cmp)
            countbrr++
        }
        brr = brr / countbrr

        return brr
    }


}



$('#btn2').click(function(){
    mera = find_name($('.n1'))
    p1 = product_map[$("#p1").val()]
    p2 = product_map[$("#p2").val()]

    $("#rasst").html(cmp(p1, p2, measure[mera]))
})


$("#btn3").click(function(){

    let mera = find_name($('.n1'))
    let ppp = product_map[$("#p3").val()]

    if(!ppp)
    {
        //костыль

        let ptoSort1 = {
            Price: {min: +$('#tt2').val(), max:+$('#tt1').val()},
            Sale: +$('#tt3').val(),
            Available: ($('#tt4').val() == 'да') ? true : false,
            Feedback: $('#tt5').val()
        }

        let kostil = []
        for(i in product_map) kostil.push([0, i])

        let sortedRet = sortRet(kostil, ptoSort1)
        
        console.log(sortedRet)

        let shtml = `Мы нашли продукты для вас <br> <ul>`

        for(i of sortedRet){
            shtml += `<li> ${i['Name']}</li>`
        }

        shtml += `</ul>`
        
        $('#sorted').html(shtml)

        return 0
    }

    let ret = []

    for(buf_name in product_map){
        if(buf_name in dislikes){}
        else{
        if(buf_name == ppp.Name) continue
       product_map[buf_name]
       measure[mera]
       treerttre = cmp(ppp, product_map[buf_name], measure[mera])

       ret.push([treerttre, buf_name])
        }
    }

    ret.sort(function(a,b){return a[0] - b[0]})

    let ptoSort = {
        Price: {min: +$('#tt2').val(), max:+$('#tt1').val()},
        Sale: +$('#tt3').val(),
        Available: ($('#tt4').val() == 'да') ? true : false,
        Feedback: $('#tt5').val()
    }

    console.log(ptoSort)


    let sortedRet = sortRet(ret, ptoSort)
    

    if(sortedRet.length > 0)
    {
        let shtml = `Мы нашли продукты для вас <br> <ul>`

        for(i of sortedRet){
            shtml += `<li> ${i['Name']}</li>`
        }

        shtml += `</ul>`
        
        $('#sorted').html(shtml)
    }
    else{
        let shtml = `Нет ничего подходящего, но возможно вам понравится <br> <ul>`

        for(let t = 0; t < 5; t++){
            shtml += `<li> ${ret[t][1]}</li>`
        }

        shtml += `</ul>`
        
        $('#sorted').html(shtml)
    }

    


    let ihtml = `<ul>`

    for(i of ret){
        ihtml += `<li> ${i[1]}  -- <strong>${i[0]}</strong> </li>`
    }

    ihtml += `</ul>`

    $("#rasst").html(ihtml)
})


function ins_af_b(elm){
    inh = `
    <input type="text" class = 'm1' placeholder="Продукт"> 
    <input type="button" value="Добавить" class="m2" onclick = 'ins_af_b($(this))' >
    `
    elm.after(inh)
}

function fnd_mr(elem){
    a = elem
    for(i = 0; i < elem.length; i++){if(a[i].checked){return(a[i].value)}}
}

function get_znach(class_obj){
    res = []
    for(i = 0; i < class_obj.length; i++){
        res.push(class_obj[i].value)
    }
    return res
}


$("#btn4").click(function(){
    let mera = fnd_mr($('.n1'))
    let mera_nebin = fnd_mr($('.n2'))

    let objes = get_znach($('.m1'))

    let arrObjMeriNeBin = []
    for(e of objes){
        arrObjMeriNeBin.push(product_map[e])
    }


    //to do
    //тупа пробросить cmp на каждый из списка 
    //от каждого из мапы продуктов

    let names = get_znach($('.m1'))

    let ret = []

    for(objfind in product_map){
        if(objfind in dislikes){}
        else{
        buffer__ = cpm_vect(product_map[objfind], arrObjMeriNeBin, measure[mera], keys_cpm_vect[mera_nebin])
        ret.push([buffer__, objfind])
        }
    }

    ret.sort(function(a,b){return a[0] - b[0]})

    let ptoSort = {
        Price: {min: +$('#tt2').val(), max:+$('#tt1').val()},
        Sale: +$('#tt3').val(),
        Available: ($('#tt4').val() == 'да') ? true : false,
        Feedback: $('#tt5').val()
    }

    console.log('111111111111111111', ret)

    let sortedRet = sortRet(ret, ptoSort)
    

    if(sortedRet.length > 0)
    {
        let shtml = `Мы нашли продукты для вас <br> <ul>`

        for(i of sortedRet){
            shtml += `<li> ${i['Name']}</li>`
        }

        shtml += `</ul>`
        
        $('#sorted').html(shtml)
    }
    else{
        let shtml = `Нет ничего подходящего, но возможно вам понравится <br> <ul>`

        for(let t = 0; t < 5; t++){
            shtml += `<li> ${ret[t][1]}</li>`
        }

        shtml += `</ul>`
        
        $('#sorted').html(shtml)
    }

    let ihtml = `<ul>`

    for(i of ret){
        ihtml += `<li> ${i[1]}  -- <strong>${i[0]}</strong> </li>`
    }

    ihtml += `</ul>`

    $("#rasst").html(ihtml)


})


$("#btn5").click(function(){
    let prod = $("#p4").val()
    prod = product_map[prod]


    ret = [] // ха-ха
    res = [] // обьяснять тебе никто не будет что делаю эти переменные

    for(buf_name in product_map){
        if(buf_name == prod.Name) continue
       treerttre = cmp(prod, product_map[buf_name], 'tree_cmp')

       ret.push([treerttre, buf_name])
    }

    for(i = 0; i < ret.length; i++){
        if(ret[i][0] == 2){
            res.push(ret[i])
        }
    }
    

    for(i of res){
        dislikes[product_map[i[1]].Name] = undefined
    }

    dislikes[prod.Name] = undefined

    console.log(dislikes)

})



    /* с этого момента начинается диалоговая система */
    /* поздравляю */

    let vid = 'start'
    let arr_buf
    let buf_answer

    $("#sbm_ii").click(function(){
        let dat_ii = $("#val_to_ii").val()


        if(vid == 'start')
        {
            //выдача

            sh = create_shema(dat_ii)
            sem = create_semant_from_shema(sh)
            arr_of_res_prod = create_res_from_semant(sem)

            if(typeof(arr_of_res_prod) == 'string')
            {
                $("#result_to_ii").html(arr_of_res_prod)
            }

            else
            {
                arr_buf = arr_of_res_prod.slice()

                // закинуть все в дизлайки что бы выдача не выдавала их еще раз
                let buf = 0
                for(elm of arr_of_res_prod)
                {
                    dislikes[elm.Name] = undefined
                    buf++
                    if (buf > 4) break
                }

                // собираем ответ

                html_re = `Мы нашли для вас следующие товары <br> Вас это устраивает? (напишите да или нет) <br> <ul>`

                for(elm of arr_of_res_prod)
                {
                    //добавляем товарчики
                    html_re += `<li> ${elm.Name} по цене ${elm.Price} с отзывами ${elm.Feedback} </li>`
                }

                html_re += `</ul>`

                $("#result_to_ii").html(html_re)

                vid = 'confirm'
            }
            

        }

        if(vid == 'confirm')
        {
            if(dat_ii == 'нет')
            {
                html_re = `очень жаль, в следующей выдаче не будет этих товаров!`
                $("#result_to_ii").html(html_re)
                vid = 'start'
            }
            if(dat_ii == 'да')
            {
                html_re = 'Отлично! всегда рады вам помочь, что-то еще?'
                $("#result_to_ii").html(html_re)
                //очистка дислайков
                for (var variableKey in dislikes){
                    if (dislikes.hasOwnProperty(variableKey)){
                        delete dislikes[variableKey];
                    }
                }
                //сначала
                vid = 'start'
            }
            

        }
       
           
    })

    
    


class Term{
    constructor(type, value){
        this.type = type
        this.value = value
    }
}




let term_categor = {
    'товар':'продукты',
    'проду':'продукты',
"замор":'заморозка',
"бакал":'бакалея',
"дом":'для дома',
"питье":'напитки',
'рыб':'замороженная рыба',
"фабр":'полуфабрикаты',
"жив":'товары для животных',
"корм":'товары для животных',
'быт':'бытовая химия',
'хим':'бытовая химия',
'дет':'товары для детей',

'алк':
['алкоголь','крепкий алкоголь',
'пивные напитки'],
'вод':['воды','минеральная вода',
'негазированная вода',
'лимонады'],

'сок':
['соки','свежевыжатые',
'сок в упаковке',
]
}


let term_products = {

'чебуп':'чебупели',
"хотдогст":'хотдогстеры',
"круглетс":'круглетсы',
"пельмен":'пельмени',
"сел":'замороженная селедка',
"камбал":'замороженная камбала',
"кревет":'замороженная креветка',

"хлеб": 
['белый хлеб', 'черный хлеб'],
"пер":'перец',

'корм': 
['Корм для кошек индейка желе',
'Голд Корм для кош паштет курица',
'Kitekat Корм для кошек c говядина в соусе'],

'Средств':
['Средство для унитаза Domestos ультраблеск',
'Mr. Proper Жидкость моющая для полов и стен Лимон',
'Пемолюкс Порошок чистящий Ослепительный белый'],

'детск':[
    'Фрутоняня Пюре Салатик из фруктов',
    'Фрутоняня Пюре Яблоко Груша',
    'Фрутоняня Пюре Фруктовый салатик'
],

'питан':[
'Фрутоняня Пюре Салатик из фруктов',
'Фрутоняня Пюре Яблоко Груша',
'Фрутоняня Пюре Фруктовый салатик'],

'сок':[
'Свежевыжатый сок апельсин',
'Свежевыжатый сок яблоко',
'Свежевыжатый сок ананас',
'Сады придонья Сок яблочный натуральный свежеотжат',
'Любимый Напиток Апельсин/ Манго/ Мандарин',
'J7 Сок апельсиновый',
'Свежевыжатый сок апельсин'
],

'вод':[
    'Вода питьевая Святой Источник негаз',
    'Вода природная питьевая Святой Источник',
    'Мин. питьевая вода Пилигрим',
    'Мин. питьевая вода Боржоми газ',
    'Вода питьевая Аква Минерале газ',
    'Вода питьевая Святой Источник газ'
],

'водк':[
'Водка Финляндия',
'Водка Славянская мягкая на березовых почках',
'Водка особая Хортиця Ультра Премиум',
'Водка Медведь',
'Водка Ах ты степь широкая'
],

'пив':[
'Пиво Клаусталер Ориджинал светлое',
'Пиво Шпатен Мюнхен',
'Пиво Шпатен Мюнхен',
'Пиво Будвайзер Будвар'
],

'лимон':[
    'Напиток б/а чай Липтон Зеленый',
'Сильногаз. напиток б/а Спрайт',
'Сильногаз. напиток б/а Кока-Кола',
'Сильногаз. напиток б/а Фанта',
'Напиток б/а чай Липтон Лимон'
],

'напит':[
    'Напиток б/а чай Липтон Зеленый',
'Сильногаз. напиток б/а Спрайт',
'Сильногаз. напиток б/а Кока-Кола',
'Сильногаз. напиток б/а Фанта',
'Напиток б/а чай Липтон Лимон'
]

}

let cross = {
    //поиск
    'q':'do',
    'price':'do',
    'feed': 'do',
    'find':'do',
    //условия
    'little': 'price',
    'big':'price',

    'best':'feed',
    'good':'feed',
    'norm':'feed'
}

let trem_q = {
    'цен': 'price',
    'стои': 'price',
    'скольк': 'price',
    'отзы':'feed',
    'рейт':'feed',
    'выбе':'find',
    'пока':'find',
    'най':'find',
    'ест': 'find'
}

let to_price = {
    'деш': 'little',
    'дорог': 'big',
}

let to_feed = {
    'отли' : 'best',
    'хорош' : 'good',
    'норма' : 'norm'
}

let metric = {
    'от': 'start',
    'до': 'end'
}

function isNumber(s)
{
    if(Number(s)) return true
    else return false
}

function find_metric(s){
    //поиск в категориях
    for(bname in metric){
        if(s.startsWith(bname)){
            return({type: 'metric', value: metric[bname]})
        }
    }
    return 0
}


function find_categor(s){
    //поиск в категориях
    for(bname in term_categor){
        if(s.startsWith(bname)){
            return({type: 'categor', value: term_categor[bname]})
        }
    }
    return 0
}

function find_prod(s){
    //поиск в товарах
    for(bname in term_products){
        if(s.startsWith(bname)){
            return({type: 'product', value: term_products[bname]})
        }
    }
    return 0
}

function find_q(s){
    //поиск в вопросах
    for(bname in trem_q){
        if (s.startsWith(bname)){
            return({type: 'q', value: trem_q[bname]})
        }
    }
    return 0
}

function find_q_price(s){
    //поиск в вопросах
    for(bname in to_price){
        if (s.startsWith(bname)){
            return({type: 'price', value: to_price[bname]})
        }
    }
    return 0
}

function find_q_feed(s){
    //поиск в вопросах
    for(bname in to_feed){
        if (s.startsWith(bname)){
            return({type: 'feed', value: to_feed[bname]})
        }
    }
    return 0
}

function create_shema(s){
    let arr = s.split(' ')
    let shema = []
    let buf
    let start_pr, end_pr;
    for(el of arr){
        console.log(el)
        buf = find_q(el)
        if(buf) {shema.push(buf); continue}
        buf = find_q_price(el)
        if(buf) {shema.push(buf); continue}
        buf = find_q_feed(el)
        if(buf) {shema.push(buf); continue}
        buf = find_categor(el)
        if(buf) {shema.push(buf); continue}
        buf = find_prod(el)
        if(buf) {shema.push(buf); continue}
        buf = find_metric(el)
        if(buf) {shema.push(buf); continue}
        buf = isNumber(el)
        if(buf)
        {
            if(start_pr)
            {
                start_pr = Number(el)
                shema.push({type: 'price_w', value: el})
            }
            else{
                end_pr = Number(el)
                shema.push({type: 'price_w', value: el})
            }
            
        }

    }
    return shema
}

function create_semant_from_shema(shema){
    let semant = {
        do: [],
        where: [],
        categor: [],
        products: []
    }
    
    let st_fl = true
    let end_fl = true



    for(index = 0; index < shema.length; index++){
        let elm = shema[index]


        
        if(elm['type'] == 'metric')
        {
            if (st_fl)
            {
                semant['where'].push({what: 'price', who: {start: shema[index+1].value}})
                st_fl = false
            }
            else{
                semant['where'].push({what: 'price', who: {end: shema[index+1].value}})
            }   
            
        }

        

        if(elm['type'] == 'q')
        {
            semant['do'].push({what:cross[elm['value']], who:elm['value']})
        }
        if(elm['type'] == 'price')
        {
            semant['where'].push({what:cross[elm['value']], who:elm['value']})
        }
        if(elm['type'] == 'feed')
        {
            semant['where'].push({what:cross[elm['value']], who:elm['value']})
        }
        if(elm['type'] == 'categor')
        {
            semant['categor'].push(elm['value'])
        }
        if(elm['type'] == 'product')
        {
            semant['products'].push(elm['value'])
        }

    }

        

      //засунуть все в продукты

      //все продукты

      let buffer = []

      for( elem of semant.products)
      {
          if(typeof(elem) == 'string')
          {
              buffer.push(product_map[elem])
              console.log(elem)
          }
          else{
              console.log('arr')
              for(e of elem)
              {
                  buffer.push(product_map[e])
              }
          }
      }

      //все категории в продукты

      let nod_buffer = []

      for(elem of semant.categor)
      {
          if(typeof(elem) == 'string')
          {
            nod_buffer.push(tree_map[elem])
          }
          else{
              for(e of elem)
              {
                  nod_buffer.push(tree_map[e])
              }
          }
          
      }

      

      let pbuf = get_all_products_from_nodes(nod_buffer)

      for(elem of pbuf){
          if(! buffer.includes(elem))
          {
              buffer.push(elem)
          }
      }
      
      semant.products = buffer



        if(!semant['do'][0]){
            semant['do'].push({what:'do', who: 'find'})
        }

    return semant
}

function create_res_from_semant(semant)
{
    let result
    console.log('составим ответ')

    if(!semant.products[0]){
        return('Извините, но я ничем не могу вам помочь, уточните вопрос')
    }

    else{

    


    //сдесь сколобарируются все do в запросе
    //с них будем собирать параметры для сортировки
    //низшими приоритетами обладает действие простого поиска

    let para = {Price: {min:0, max: 1000}} // сюда собираем параметры

    for(se = 0; se < semant.do.length; se++)
    {

        console.log(semant.do[se])

        //если ищем цену
        if(semant.do[se].who == 'price')
        {
            console.log('мы тут ищем цены')
            if(semant.where.length == 0)
            {
                //ищем самые дешевые
                para['Price'] =  {min: +0, max:+100}
                
            }
            else
            {

                // ищем какие указали
                if(semant.where[0]['who'] == "little")
                {
                    para['Price'] =  {min: +0, max:+100}
                }
                if(semant.where[0]['who'] == "big")
                {
                    console.log('большая цена')
                    para['Price'] =   {min: +200, max:+9999}
                }

            }

            console.log(para)
        }

        //если задача поиска продуктов то

        //to do пробегаться по всме where и формировать параметры поиска и в конце найти что-то

        if(semant.do[se].who == 'find') 
        {
            console.log('Вот тут смотрим по поиску')
            
        
            // если нету параметров поиска
            if(semant.where.length == 0)
            {
                // по классике ищем самые дешевые
                para['Price'] = {min: +0, max:+100}
            }
            else
            {
                // если параметры есть то смотрим что это за параметр
            

                for(po = 0; po < semant.where.length; po++)
                {
                    // сюда соберем все параметры поиска

                    if(semant.where[po].what == 'price')
                    {

                        if(typeof(semant.where[po]['who']) != String)
                        {
                            //если не строка
                            if(semant.where[po]['who']['start'])
                            {
                                para['Price']['min'] = Number(semant.where[po]['who']['start'])
                            }
                            if(semant.where[po]['who']['end'])
                            {
                                para['Price']['max'] = Number(semant.where[po]['who']['end'])
                            }
                        }
                        // если смотрим по цене то вот так
                        
                        
                        if(semant.where[po]['who'] == "little")
                        {
                            console.log('малая цена')
                            para['Price'] = {min: +0, max:+100}
                            
                        }
                        if(semant.where[po]['who'] == "big")
                        {
                            console.log('большая цена')
                            para['Price'] = {min: +200, max:+9999}
                            
                        }
                        
                    }

                    if(semant.where[po].what == 'feed')
                    {
                        //работа с рейтингами

                        if(semant.where[po].who == 'best')
                        {
                            para['Feedback'] = 'отлично'
                            
                        }
                        if(semant.where[po].who == 'good')
                        {
                            para['Feedback'] ='хорошо'
                            
                        }
                        if(semant.where[po].who == 'norm')
                        {
                            para['Feedback'] ='нормально'
                        }
                    }
                }
            }
            

            console.log(para)
        }
    }

    console.log(semant.products)

    result = fin_prod_sos(semant.products, para)
    console.log(result)

    

    if(result.length >= 5)
    {
        let resbufdel = []
        for(i = 0; i < 5; i++)
        {
            resbufdel.push(result[i])
        }
        result = resbufdel
    }
    

    return result
    }
}

function fin_prod_sos(pr, para) // сортировка и поиск по продуктам pr с параметрами сортировки para
{
    let mera = fnd_mr($('.n1'))
    let mera_nebin = fnd_mr($('.n2'))

    arrObjMeriNeBin = pr

    // let kostbuf = []
    // for (h of pr){ kostbuf.push(h.Name)}
     

    // let objes = [kostbuf]

    // console.log(objes)

    // let arrObjMeriNeBin = []
    // for(e of objes){
    //     arrObjMeriNeBin.push(product_map[e])
    // }


    // console.log(arrObjMeriNeBin)

    //to do
    //тупа пробросить cmp на каждый из списка 
    //от каждого из мапы продуктов

    let ret = []

    for(objfind in product_map){
        if(objfind in dislikes){}
        else{
        buffer__ = cpm_vect(product_map[objfind], arrObjMeriNeBin, measure[mera], keys_cpm_vect[mera_nebin])
        ret.push([buffer__, objfind])
        }
    }

    ret.sort(function(a,b){return a[0] - b[0]})



    ptoSort = para

    let sortedRet = sortRet(ret, ptoSort)

    console.log('sorted ret st')
    console.log(sortedRet)
    console.log('str ret end')
    

    return sortedRet

 

}

function get_all_products_from_nodes(nodes){
    let ret_nod = []
    let ret_prod = []
    let buf_p_names = []

    for(elm of nodes){
        for(n of elm.Childrens){
            if(n.constructor.name == 'Node')
            {
                ret_nod.push(n)
            }
            else{
                ret_prod.push(n)
            }
        }
    }

    while(ret_nod[0])
    {
        let curnode = ret_nod.shift()
     
        let bc = curnode.Childrens
        
        for(i = 0; i < bc.length; i++)
        {
            if(bc[i].constructor.name == 'Node')
            {
                ret_nod.push(bc[i])
            }
            else
            {
                if(buf_p_names.includes(bc[i].Name))
                {

                }
                else{
                    buf_p_names.push(bc[i].Name)
                    ret_prod.push(bc[i])
                }
            }
        }
        
    }

    return ret_prod
}

