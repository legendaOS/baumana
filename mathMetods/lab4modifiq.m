function lab4modifiq()
    clc();

    FX = @(x) (cos(power(x,5) - x + 3 + power(2, 1/3)) + atan( (power(x,3) - 5 * sqrt(2)*x - 4) / (sqrt(6)*x + sqrt(x)) ) + 1.8);
    
    %FX = @(x) (x-0.777)^4;

    N = 0;  
    iter = 0;

    epsilon=0.000001;
    delta = 0.00001;
    a = 0;
    b = 1; 

    f1 = 100;
    f2 = 200;

    x = (a+b)/2;

    FXpd0 = FX(x+delta);
    FXmd0 = FX(x-delta);

    f1x0 = (FXpd0-FXmd0);
    f1x0 = f1x0 / 2;
    f1x0 = f1x0 / delta;

    while 1
        FXpd = FX(x+delta);
        FXmd = FX(x-delta);
        FXx = FX(x);

        N = N + 3;

        %первая производная

        f1 = (FXpd-FXmd);
        f1 = f1 / 2;
        f1 = f1 / delta;

        %вторая производная
        
        f2 = (FXpd-2*FXx+FXmd);
        f2 = f2 / (delta * delta);

        
        x_ = x;

        %очередное приближение

        x = x - f1x0/f2;
        
        iter = iter +1;

        fprintf('х = %.10f, f1 = %.10f итерация %d, обращений к целевой ф-и = %d\n',x , f1 ,iter, N);

        %условие выхода

        if abs(f1)<=epsilon
            %if abs(x_ - x) <= 2*epsilon
                break;
            %end
        end

    end

    res_x = x;
    res_fx = FX(res_x);
    N = N + 1;

    fprintf('\nf1 последнее = %.10f \n',f1);


    fprintf('\n F* = %.10f x* = %.10f iter = %d N = %d\n\n', res_fx, res_x, iter, N);
    fplot(FX, [a, b]);
    hold on;
    scatter(res_x, res_fx, '*');
    hold on;
    

    

    