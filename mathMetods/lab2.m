function lab2()
    FX = @(x) (cos(power(x,5) - x + 3 + power(2, 1/3)) + atan( (power(x,3) - 5 * sqrt(2)*x - 4) / (sqrt(6)*x + sqrt(x)) ) + 1.8);
    clc();

    

    a = 0;
    b = 1;

    start_a = a;
    start_b = b;

    epsilon = power(10, -6);

    plot_x = linspace(a,b, 99999);
    plot_fx = FX(plot_x);

    plot_a_x = [];
    plot_a_y = [];
    plot_b_x = [];
    plot_b_y = [];


    tau = (sqrt(5) - 1) / 2;
    l = b - a;

    x1 = b - tau * l;
    x2 = a + tau * l;
    f1 = FX(x1);
    f2 = FX(x2);

    while 1
        if l > 2 * epsilon
            
            if f1 <= f2
                b = x2;
                l = b - a;
                x2 = x1;
                f2 = f1;
                x1 = b - tau * l;
                f1 = FX(x1);
            else
                a = x1;
                l = b - a;
                x1 = x2;
                f1 = f2;
                x2 = a + tau * l;
                f2 = FX(x2);
            end
            plot_a_x(end+1) = a;
            plot_a_y(end+1) = FX(a);
            plot_b_x(end+1) = b;
            plot_b_y(end+1) = FX(b);
            
        else
            break
        end

    end

    res_x = (a + b) / 2;
    res_fx= FX(res_x);

    fprintf('2lb\nX* : %d\nf(X*) : %d\n', res_x, res_fx);
    fprintf('diff : %d', res_fx - min(plot_fx));
    

    %plot(plot_x, plot_fx, res_x, res_fx, 'o', plot_a_x, plot_a_y, '*', plot_b_x, plot_b_y, '*');
    fplot(FX, [start_a, start_b]);
    hold on;
    scatter(res_x, res_fx);
    hold on;
    plot(plot_a_x, plot_a_y, '*', plot_b_x, plot_b_y, '*');
    