function [diffx1] = firstDiff(func,x,delta_x)
    diffx1 = (func(x + delta_x) - func(x + delta_x)) / 2*delta_x;
end

