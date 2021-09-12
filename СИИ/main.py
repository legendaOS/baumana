from os import name
import tree as t


def findelm(root, name):
    if root.name == name:
        return root
    for children in root.Child:
        res = findelm(children, name)
        if res!=None:
            return res
    return None
    



f = open('nodes.txt', 'r', encoding='UTF-8')


root = t.Node(name = 'продукты')
kv = {'продукты':root}

for l in f:
    buf = l.split(';')
    buf[-1] = buf[-1].strip()
    kv[buf[0]] = t.Node(name=buf[0])
    kv[buf[1]].hopa(kv[buf[0]])
    
    
f.close()
f = open('product.txt', 'r', encoding='UTF-8')
for l in f:
    buf = l.split(';')
    buf[-1] = buf[-1].strip()
    cat = buf[3].split(',')
    # Price = 0, Sale = 0, Available = True,
    # Categories = [], Feedback  = [], Adress  = [], 
    # Parent = None, Child = None, name = None
    dos = False
    if buf[-1] == "True":
        dos = True
    buf_product = t.Product(buf[1], buf[2], dos, cat, buf[4], buf[5], name = buf[0])
    b_categ = buf[6]
    kv[b_categ].hopa(buf_product)

print('end')

    
    

        

print('all')