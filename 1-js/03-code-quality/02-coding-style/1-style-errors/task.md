importance: 4

---

# Mau estilo

O que há de errado com o código abaixo?

```js no-beautify
function pow(x,n)
{
  let result=1;
  for(let i=0;i<n;i++) {result*=x;}
  return result;
}

let x=prompt("x?",''), n=prompt("n?",'')
if (n<=0)
{
  alert(`A potência de ${n} não é suportada, por favor insira um número inteiro maior do que zero`);
}
else
{
  alert(pow(x,n))
}
```

Modifique-o.
