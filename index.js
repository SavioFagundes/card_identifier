// ...existing code...
const BRANDS = [
    { name: 'American Express', regex: /^3[47]\d{13}$/ },
    { name: 'Diners Club', regex: /^3(?:0[0-5]|[68]\d)\d{11}$/ },
    { name: 'JCB', regex: /^35(2[89]|[3-8]\d)\d{12}$/ },
    { name: 'Discover', regex: /^(?:6011|65|64[4-9]|622(?:12[6-9]|1[3-9]\d|[2-8]\d{2}|9[01]\d|92[0-5]))\d{0,}$/ },
    { name: 'MasterCard', regex: /^(?:5[1-5]\d{14}|2(?:2[2-9]|[3-6]\d|7[01]|720)\d{12})$/ },
    { name: 'Visa', regex: /^4\d{12,18}$/ },
    // Common Brazilian / legacy brands (best-effort)
    { name: 'Hipercard', regex: /^(?:606282|3841)\d{8,12}$/ },
    { name: 'Aura', regex: /^50\d{14,17}$/ },
    { name: 'EnRoute', regex: /^2014\d{10}$/ },
    { name: 'Voyager', regex: /^8699\d{10}$/ }
];

function clean(number) {
    return String(number).replace(/[^\d]/g, '');
}

function luhnCheck(number) {
    let sum = 0;
    let alt = false;
    for (let i = number.length - 1; i >= 0; i--) {
        let n = parseInt(number[i], 10);
        if (alt) {
            n *= 2;
            if (n > 9) n -= 9;
        }
        sum += n;
        alt = !alt;
    }
    return sum % 10 === 0;
}

function detectBrand(raw) {
    const num = clean(raw);
    if (!/^\d{12,19}$/.test(num)) return { brand: 'Número inválido', number: num, validLuhn: false };
    for (const b of BRANDS) {
        if (b.regex.test(num)) return { brand: b.name, number: num, validLuhn: luhnCheck(num) };
    }
    return { brand: 'Desconhecida', number: num, validLuhn: luhnCheck(num) };
}

// CLI
const input = process.argv.slice(2).join(' ').trim();
if (!input) {
    console.log('Uso: node index.js "NUMERO_DO_CARTAO"');
    process.exit(1);
}

const result = detectBrand(input);
console.log(`${result.number} -> ${result.brand} (Luhn: ${result.validLuhn ? 'válido' : 'inválido'})`);
// ...existing code...