const readlineSync = require('readline-sync');
const puppeteer = require('puppeteer');

async function bot() {
    console.log("Conversor de moeda");
    const moedaBase = readlineSync.question('Informe uma moeda base: ') || 'dolar';
    const moedaFinal = readlineSync.question('Informe uma moeda desejada para comparacao: ') || 'real';
    const url = `https://www.google.com/search?q=${moedaBase}+para+${moedaFinal}&rlz=1C1ONGR_pt-PTBR1087BR1087&oq=dolar+para+real&gs_lcrp=EgZjaHJvbWUyDAgAEEUYORixAxiABDIHCAEQABiABDIHCAIQABiABDIHCAMQABiABDIHCAQQABiABDIHCAUQABiABDIHCAYQABiABDIHCAcQABiABDIHCAgQABiABDIHCAkQABiABNIBCDIxMTlqMGo5qAIAsAIA&sourceid=chrome&ie=UTF-8`;
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(url);
    const resultado = await page.evaluate(() => {
        return document.querySelector('.lWzCpb.a61j6').value;
    });

    console.log(`O valor de 1 ${moedaBase} equivale a ${resultado} ${moedaFinal}`)
    await browser.close();
}

bot()