
const puppeteer = require('puppeteer');
const randomUseragent = require('random-useragent');
const fs = require('fs')

let user = []

let username = 'pablo.ortiz.barra'
let pass = 'Exxx'


saveCookies = (data) => {
    let cookies = []
    data.map(value => {
        cookies.push(value)
    })
    fs.writeFile('cookies.txt', JSON.stringify(cookies), (err) =>{
        if (err) return console.error(err);
    });
}

const init = async () => {
    const header = randomUseragent.getRandom() //nuevo user agent (simula el comportamiento humano al navegar)
   
    const browser = await puppeteer.launch({
        headless: false,
        ignoreHTTPSErrors: true,
      
    });  //nuevo navegador
    
    const page = await browser.newPage(); // nueva pestaña
    
    await page.setUserAgent(header) // usa el header que se genero anteriormente

    await page.setViewport({ width: 1920, height: 1080}); //visualizar con la siguiente resolucion.

    await page.goto('https://www.jumbo.cl/login',) // sitio 

    await page.screenshot({ path: 'example.png'}); //screenshot de la pagina

    await browser.close();

}

//init();


const simularlogin = async () =>{


    const header = randomUseragent.getRandom() //nuevo user agent (simula el comportamiento humano al navegar)
 
    const browser = await puppeteer.launch({
        headless: false,
        ignoreHTTPSErrors: true,
    });  //nuevo navegador

    const page = await browser.newPage(); // nueva pestaña
    
    await page.setUserAgent(header) // usa el header que se genero anteriormente

    await page.setViewport({ width: 1920, height: 1080}); //visualizar con la siguiente resolucion.

    await page.goto('https://www.jumbo.cl/login-page',) // sitio  

    const loginInput = await page.waitForSelector('input[name="email"]');

    const loginPassword = await page.waitForSelector('input[name="Clave"]');

    await loginInput.type(username);

    await loginPassword.type(pass); 

    await page.click("button[type=submit]"); //login enter click por class css

    await page.screenshot({ path: 'example.png'}); //screenshot de la pagina
  
    const cookies = await page.cookies();
   
    saveCookies(cookies);

    const closeModal = '.new-modal-close';
    await page.waitForSelector(closeModal);
    await page.click( closeModal);
    await page.goto('https://www.jumbo.cl/mis-datos',) // url datos del usuario

    await page.waitForSelector('.user-info');
    const usuario = await page.$$('.info-row')

        for (const content of usuario){

            const datos = await content.$('span')
            const getUser = await page.evaluate(datos => datos.innerText, datos)
           
            //console.log(getUser);
            user.push(getUser)

          
        }
    //guardo en un achivo los datos de usuario obtenidos   
    console.log(user);
    fs.writeFile('usuario.txt', JSON.stringify(user), (err) =>{
        if (err) return console.error(err);
    });
     //guardo en un achivo los datos de usuario obtenidos
    let token = await page.evaluate(() => {
        return localStorage.getItem("tokenEmail");
      });
    console.log(token);
    fs.writeFile('token.txt', JSON.stringify(token), (err) =>{
        if (err) return console.error(err);
    });
    await page.screenshot({ path: 'datos.png'});

    await browser.close();
   

}

const loginCookies = async () =>{

    const header = randomUseragent.getRandom() //nuevo user agent (simula el comportamiento humano al navegar)
 
    const browser = await puppeteer.launch({
        headless: false,
        ignoreHTTPSErrors: true,
    });  //nuevo navegador

    const page = await browser.newPage(); // nueva pestaña
    
    await page.setUserAgent(header) // usa el header que se genero anteriormente

    await page.setViewport({ width: 1920, height: 1080}); //visualizar con la siguiente resolucion.

    const readCookie = fs.readFileSync('cookies.txt', 'utf8')

    const parseCookie = JSON.parse(readCookie)
    console.log(readCookie)
    console.log(JSON.parse(readCookie));  
    
    await page.setCookie(...parseCookie);

    await page.goto('https://www.jumbo.cl/mis-tarjetas',) // sitio  

   

}


simularlogin()


 
