
function lab1()

    %FX = @(x) (cos(power(x,5) - x + 3 + power(2, 1/3)) + atan( (power(x,3) - 5 * sqrt(2)*x - 4) / (sqrt(6)*x + sqrt(x)) ) + 1.8);
     FX = @(x) (x-0.777).^6;
    clc();

    %Начальные значения


    a = 0;
    b = 1;
    epsilon = 0.000001;

    N = 1;

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

        N = N + 1;
        x1 = x0 + delta;
        f1 = FX(x1);

        fprintf('N = %d e = %f x* = %.10f f(x*) = %f\n\n\n', N, epsilon, x1, f1);

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
    
    fprintf('N = %d e = %f x* = %f f(x*) = %f\n\n\n', N, epsilon, res_x, res_fx);
    res_x - 0.777
    %plot(plot_x, plot_fx, res_x, res_fx, 'o', plot_xi, plot_fxi, '*');

    fplot(FX, [a, b]);
    hold on;
    scatter(res_x, res_fx);
    hold on;
    plot(plot_xi, plot_fxi, '*');

    


