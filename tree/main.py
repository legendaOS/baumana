class Node():
    def __init__(self, name) -> None:
        self.Name = name
    Childrens = []
    Parent = None

class Product():
    def __init__(self,name,Price = None,Sale = None,Available = None,
    Categories = None,Feedback = None,Adress = None) -> None:
        self.Name = name
        self.Price = Price
        self.Sale = Sale
        self.Available = Available
        self.Categories = Categories
        self.Feedback = Feedback
        self.Adress = Adress
    Parent = None

#main

root = Node('продукты')
tree_map = {'продукты': root}

f = open('tree/nodes.txt', 'r', encoding='UTF-8')

for l in f:
    buf = l.split(';')
    buf[-1] = buf[-1].strip()
    b_node = Node(buf[0])
    tree_map[buf[0]] = b_node
    tree_map[buf[1]].Childrens.append(b_node)
    b_node.Parent = tree_map[buf[1]]


print('end...')