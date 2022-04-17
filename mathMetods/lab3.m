function lab3()
    clc();

    a = 0;
    b = 1;
    epsilon = power(10, -4);

    plot_x = linspace(a,b);
    plot_fx = FX(plot_x);

    x1 = 0.05;
    x2 = 0.5;
    x3 = 0.95;

    f1 = FX(x1);
    f2 = FX(x2);
    f3 = FX(x3);

    a1 = (f2 - f1) / (x2 - x1);
    a2 = () %стоп