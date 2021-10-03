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
                    'Расстояние Чебышева':'chebichev'
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

let count_mer = 5

function find_name(elem){
    a = elem
    for(i = 0; i < count_mer; i++){if(a[i].checked){return(a[i].value)}}
}

function cmp(obj1, obj2, type_of_cmp){
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

    let ret = []

    for(buf_name in product_map){
        if(buf_name == ppp.Name) continue
       product_map[buf_name]
       measure[mera]
       treerttre = cmp(ppp, product_map[buf_name], measure[mera])

       ret.push([treerttre, buf_name])
    }

    ret.sort(function(a,b){return a[0] - b[0]})

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
        buffer__ = cpm_vect(product_map[objfind], arrObjMeriNeBin, measure[mera], keys_cpm_vect[mera_nebin])
        ret.push([buffer__, objfind])
    }

    ret.sort(function(a,b){return a[0] - b[0]})

    let ihtml = `<ul>`

    for(i of ret){
        ihtml += `<li> ${i[1]}  -- <strong>${i[0]}</strong> </li>`
    }

    ihtml += `</ul>`

    $("#rasst").html(ihtml)


})