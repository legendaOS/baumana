function lab3()
    FX = @(x) (cos(power(x,5) - x + 3 + power(2, 1/3)) + atan( (power(x,3) - 5 * sqrt(2)*x - 4) / (sqrt(6)*x + sqrt(x)) ) + 1.8);
    %FX = @(x) (x-0.777).^12;
    clc();

    a = 0;
    b = 1;
    N = 0;

    start_a = a;
    start_b = b;

    epsilon = 0.000001;

    fprintf('Выбираем пробные точки методом золотого сечения\n');

    tau = (sqrt(5) - 1) / 2;
    l = b - a;
    x1 = b - tau * l;
    x2 = a + tau * l;
    x3 = -a;
    f3 = -a;
    f1 = FX(x1);
    f2 = FX(x2);
    fa = FX(a);
    fb = FX(b);
    N = 4;

    while 1
        if fa >= f1
            if f2 >= f1
                x1 = a;
                x2 = x1;
                x3 = x2;
                f1 = FX(a);
                f2 = f1;
                f3 = f2;
                break;
            end
        end
        if f1 >= f2
            if fb >= f2
                x1 = x1;
                x2 = x2;
                x3 = b;
                f1 = f1;
                f2 = f2;
                f3 = FX(b);
                break;
            end
        end
        
        if f1 <= f2
            b = x2;
            l = b-a;
            x2 = x1;
            f2 = f1;
            x1 = b - tau*l;
            f1 = FX(x1);
            N = N + 1;
        else
            a = x1;
            l = b-a;
            x1 = x2;
            f1 = f2;
            x2 = a + tau*l;
            f2 = FX(x2);
            N = N + 1;

        end

    end

    %график для выбранных точек x1, x2, x3

    fplot(FX, [start_a, start_b]);
    hold on;
    scatter(x1, FX(x1));
    hold on;
    scatter(x2, FX(x2));
    hold on;
    scatter(x3, FX(x3));
    hold on;

    %печать выбранных точек

    fprintf('x1 = %.10f, f(x1) = %.10f\n', x1, f1);
    fprintf('x2 = %.10f, f(x2) = %.10f\n', x2, f2);
    fprintf('x3 = %.10f, f(x3) = %.10f\n', x3, f3);
    fprintf('N = %d\n\n', N);


    %Поиск минимума методом парабол

    a1 = (f2 - f1) / (x2 - x1);
    a2 = ( (f3-f1)/(x3-x1) - (f2-f1)/(x2-x1) ) / (x3 - x2);
    x_ = 1 / (2 * x1 + x2 - (a1/a2) );
    f_ = FX(x_);
    N = N + 1;

    l = abs(x3 - x2);

    while 1
        
        x__ = x_;

        % Выбор новых x1, x2, x3

        if (x_ < x2)
            if (f_ >= f2)
                x1 = x_;
                f1  = f_;
            else
                x3 = x2;
                f3 = f2;
                x2 = x_;
                f2 = f_;
            end
        else
            if (f_ >= f2)
                x3 = x_;
                f3 = f_;
            else
                x1 = x2;
                f1 = f2;
                x2 = x_;
                f2 = f_;
            end
        end

        %поиск нового минимума аппроксимирующей функции


        a1 = (f2 - f1) / (x2 - x1);
        a2 = ((f3 - f1) / (x3 - x1) - a1) / (x3 - x2);
        x_ = (x1 + x2 - a1 / a2) / 2;
        f_ = FX(x_);
        N = N + 1;

        l_ = abs(x3 - x1);

        fprintf('\nN = %d\n', N);
        fprintf('x1 = %.10f, f(x1) = %.10f\n', x1, f1);
        fprintf('x2 = %.10f, f(x2) = %.10f\n', x2, f2);
        fprintf('x3 = %.10f, f(x3) = %.10f\n', x3, f3);
        fprintf('x_ = %.10f, f(x_) = %.10f\n', x_, f_);
        

        if abs(x_ - x__) <= epsilon
            if abs(l - l_) <= 2*epsilon
        
                break;
            end
        end

        l = l_;

    
    end

    res_x = x_;
    res_fx = f_;

    fprintf('N = %d x* = %.10f f* = %.10f\n', N, res_x, res_fx);

    fplot(FX, [start_a, start_b]);
    hold on;
    scatter(res_x, res_fx, '*');
    hold on;