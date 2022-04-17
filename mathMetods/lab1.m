function lab1()
    clc();

    %Начальные значения

        %Целевая функция описана в файле lab1func.m

    a = 0;
    b = 1;
    epsilon = power(10, -2);

    plot_x = linspace(a,b, 100000);
    plot_fx = FX(plot_x);

    

    plot_xi = [];
    plot_fxi = [];

    % Предварительные вычисления

    delta = (b - a) / 4;
    x0 = a;
    f0 = FX(x0);

    %Решение
    
    while 1

        x1 = x0 + delta;
        f1 = FX(x1);

        plot_xi(end+1) = x1;
        plot_fxi(end+1) = f1;

        if f0 > f1
            x0 = x1;
            f0 = f1;

            if ((x0 > a) && x0 < b)
                continue
            end
        else
            if abs(delta) <= epsilon
                break;
            else
                x0 = x1;
                f0 = f1;
                delta = -delta / 4;
            end
        end
    end

    res_x = x0;
    res_fx = f0;

    %Графики
    
    fprintf('1lb\nX* : %d\nf(X*) : %d', res_x, res_fx);
    plot(plot_x, plot_fx, res_x, res_fx, 'o', plot_xi, plot_fxi, '*');

    


