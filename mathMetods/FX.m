function [fx] = FX(x)
buf = cos(power(x,5) - x + 3 + power(2, 1/3));
buf = buf + atan( (power(x,3) - 5 * sqrt(2)*x - 4) / (sqrt(6)*x + sqrt(x)) );
buf = buf + 1.8;
fx = buf;
end

