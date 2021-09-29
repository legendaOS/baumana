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
}

console.log('Дерево')
console.log(root)

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
                    console.log('123')
                
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

    $(".name").click(function(){
        console.log('asd')
        let inhtml = `
                    haha
                    haha
                    haha
                    `
        let t = $(this)
        console.log(t)
    })
})