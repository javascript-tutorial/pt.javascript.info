Precisamos escolher a curva Bezier certa para essa animação. Ela deve ter `y>1` em algum lugar para que o avião *jump out* (pule fora).

Por exemplo, podemos configurar ambos os pontos de controle com `y>1`, como: `cubic-bezier(0.25, 1.5, 0.75, 1.5)`.

O gráfico:

![](bezier-up.svg)
