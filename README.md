# 🔎 Card Brand Detector – Regex + Luhn

Utilitário em Node.js para detectar a bandeira de um cartão de crédito usando expressões regulares e validar o número com o algoritmo de Luhn.

---

## ✨ Funcionalidades

- Remove caracteres não numéricos (espaços, traços etc.)
- Detecta bandeiras via regex:
  - American Express
  - Diners Club
  - JCB
  - Discover
  - MasterCard
  - Visa
  - Hipercard
  - Aura
  - EnRoute
  - Voyager
- Validação pelo algoritmo de Luhn
- Uso simples via CLI

---

## 📦 Instalação

```bash
git clone https://github.com/seu-repo/card-brand-detector.git
cd card-brand-detector
```
▶️ Como usar
```
node index.js "4111 1111 1111 1111"
```
Exemplo:
```
4111111111111111 -> Visa (Luhn: válido)
```

Outro:
```
node index.js "3782 822463 10005"
```
```
378282246310005 -> American Express (Luhn: válido)
```
📂 Como funciona
BRANDS

Lista de bandeiras com regex.

clean(number)

Remove tudo que não é dígito.

luhnCheck(number)

Implementa o algoritmo de Luhn.

detectBrand(raw)

Retorna:
```
{
  "brand": "Visa",
  "number": "4111111111111111",
  "validLuhn": true
}
```
