function lab4()
    clc();

    FX = @(x) (cos(power(x,5) - x + 3 + power(2, 1/3)) + atan( (power(x,3) - 5 * sqrt(2)*x - 4) / (sqrt(6)*x + sqrt(x)) ) + 1.8);
    
    
    epsilon = 0.000001;
    dx = 0.01;

    a = 0;
    b = 1;

    x = b;


    
    while 1
        F1 = (FX(x + dx) - FX(x - dx) ) / 2 * dx;
        F2 = (FX(x - dx) - 2* FX(x) + FX(x + dx)) / dx*dx;
        if abs(F1) < epsilon
            break
        end
        x_ = x;
        x = x_ - (F1 / F2);
        if abs(x - x_) < epsilon
            break
        end
    end

    

    

    fplot(FX, [a, b]);
    hold on;
    scatter(x, FX(x), 'x');
    hold on;
    scatter(fminbnd(FX, 0, 1), FX(fminbnd(FX, 0, 1)));

    fprintf('%d\n', x);

    fprintf('%d', fminbnd(FX, 0, 1));
    

    

    