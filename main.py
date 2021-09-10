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
    cat = buf[4].split(',')
    nnn = t.Product(buf[1], buf[2], bool(int(buf[3])), cat, buf[5], buf[6], None, None, buf[0])
    nnn.Parent = kv[buf[-1]]


    
    

        

print('all')