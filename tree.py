class MessangerInterface():
    def Message():
        pass

class NodeInterface(MessangerInterface):
    def Function():
        pass

    def __init__(self, name = None, Child = None, Parent = None) -> None:
        self.Parent = Parent
        self.Child = Child
        self.name = name

class Node(NodeInterface):
    def __init__(self, Parent = None, Child = [], name = None) -> None:
        super().__init__(Parent=Parent, Child=Child, name = name)

    def hopa(self, obj):
        self.Child.append(obj)
        obj.Parent = self

    def Function(self):
        pass
        
class Product(NodeInterface):
    def __init__(self, Price = 0, Sale = 0, Available = True,
    Categories = [], Feedback  = [], Adress  = [], 
    Parent = None, Child = None, name = None) -> None:
        super().__init__(Parent=Parent, Child=Child, name = name)
        self.Price = Price
        self.Sale = Sale
        self.Available = Available
        self.Categories = Categories
        self.Feedback = Feedback
        self.Adress = Adress

    def Function(self):
        pass

class Sign():
    def __init__(self, Name = '', Type = 'feedback', Value = 'отлично') -> None:
        self.Name = Name
        self.Type = Type
        self.Value = Value
    
    def Compare(self):
        if self.Type == 'feedback':
            table = {'отлично':5, 'хорошо':4, 
            'нормально':3, 'плохо':2, 'ужасно':1}
            return table[self.Value]

        if self.Type == 'adress':
            return -1



BDProducts = Node()
