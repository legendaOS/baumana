from os import name
import tree as t

class f():
    def __init__(self) -> None:
        self.x = False

def findelm(root, name, flag):
    buf = root
    if buf.name == name:
        flag.x = True
        return buf
    for children in buf.Child:
        res = findelm(children, name, flag)
        if flag.x:
            return res
    

root = t.Node(name='prod')
root.insert(t.Node(name='lol'))
root.insert(t.Node(name='kek'))



buf = findelm(root, 'lol', f())
print(buf.name)

print('end')

# f = open('nodes.txt', 'r')

# for l in f:
#     if(l[0] == '#'):
#         continue
#     buf = l.split(';')
#     if buf[-1][-1] == '\n':
#         buf[-1] = buf[-1][0:-1]
#     print(buf)