const qrcode = require('qrcode-terminal');
const { Client, LocalAuth} = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth({ clientId: process.argv[2] }),
    puppeteer: {
        headless: true,
    },

});
const fs = require('fs');
const dataAtual = new Date();
dataAtual.setDate(dataAtual.getDate() + 1);

client.setMaxListeners(100000);
// Iniciar o QR CODE 
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});
// Vai informar se o login foi efetuado 
client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});
// E inicializa tudo para fazer a nossa magica =)
client.initialize();
const delay = ms => new Promise(res => setTimeout(res, ms)); // Função que usamos para criar o delay entre uma ação e outra






const usuarios = {};


// Receber mensagens do WhatsApp Web
client.on('message', async (msg) => {
    // Verificar se a mensagem foi enviada por um usuário comum do WhatsApp
    if (msg.from.endsWith('@c.us')) {
        const wid = msg.from.replace('@c.us', '');

        // Verificar se já temos informações do usuário
        if (!usuarios[wid]) {
            // Se não tiver, criar um novo objeto para o usuário
            usuarios[wid] = {};
        }

        // Armazenar informações da mensagem no objeto do usuário
        usuarios[wid].ultimaMensagem = msg.body;
        usuarios[wid].ultimaData = new Date();

    }
});

const people = {};

client.on('message', async msg => {
    const chat = await msg.getChat();

    if (!people[msg.from]) {
        people[msg.from] = {}
        people[msg.from].stage = 0;
        people[msg.from].esperandoNome = false
    }
    people[msg.from].message = msg.from
    // vou inserir no index do numero da pessoa o estado etc....
    if (people[msg.from]) {

        if (msg.body) { 
            const phoneNumber = msg.from.replace('@c.us', '');

            // Verifica se a mensagem foi enviada por uma pessoa e não por um grupo
            if (msg.from.endsWith('@c.us')) {


                // Verifica se a pessoa já recebeu a mensagem antes
                const messageSent = fs.existsSync(`./${phoneNumber}.txt`);

                // Se a pessoa ainda não recebeu a mensagem, envia
                if (!messageSent) {

                    fs.writeFileSync(`./${phoneNumber}.txt`, 'message sent');

                    await delay(2000);
                    await chat.sendMessage('*Bueno 👨‍💻:* \n\nOlá, em que posso ajudar? \n-----------------------------------\n1️⃣. *Pessoal*\n2️⃣. *Serviços*\n3️⃣. *Projetos*\n4️⃣. *Meu Projeto*');
                    people[msg.from].stage = 1;
                    return
                }

            }  
        }
    }

// Aqui o cliente escolhe a opção 1, 2 o u 3

client.on("message", async (msg) => {
    const chat = await msg.getChat();
    const phoneNumber = msg.from.replace('@c.us', '');


    console.log(people)



    if (people[msg.from].stage === 1 && msg.body === '1') {
        people[msg.from].stage = 2;
        const phoneNumber = msg.from.replace('@c.us', '');
        fs.writeFileSync(`./${phoneNumber}_opcao1.txt`, 'message sent');
        chat.sendStateTyping();
        await delay(3000);
        msg.reply('*Bueno 👨‍💻:* \n\nAguarde um momento e logo será atendido(a). \n\n*Voltar*');

    } else if (people[msg.from].stage === 1 && msg.body === '2'){
        people[msg.from].stage = 3;
        const phoneNumber = msg.from.replace('@c.us', '');
        fs.writeFileSync(`./${phoneNumber}_opcao2.txt`, 'message sent');
        chat.sendStateTyping();
        await delay(3000);
        msg.reply('*Bueno 👨‍💻:* \n\n5️⃣. *Desenvolvimento*\n6️⃣. *Marketing*\n7️⃣. *Outros*');

        // Aqui ele envia a próxima mensagem para aguardar o atendimento
        await delay(5000);
       
          } else if (people[msg.from].stage === 3 && (msg.body === '5' || msg.body === '6' || msg.body === '7')) {
            people[msg.from].stage = 2;
            chat.sendStateTyping();
            msg.reply('*Bueno 👨‍💻:* \n\nAguarde um momento e logo será atendido(a). \n\n*Voltar*');    

    } else if (people[msg.from].stage === 1 && msg.body === '3'){
        people[msg.from].stage = 2;
        const phoneNumber = msg.from.replace('@c.us', '');
        fs.writeFileSync(`./${phoneNumber}_opcao3.txt`, 'message sent');
        chat.sendStateTyping();
        await delay(3000);
        msg.reply('*Bueno 👨‍💻:* \n\n*Portfólio 📁:* \nhttps://dev-dfbueno.github.io/portfolio \n\n*Livro 📖:* \nhttp://dfbueno.rf.gd/img/O_codigo_dos_Sonhos.docx');

    } else if (people[msg.from].stage === 1 && msg.body === '4'){
        people[msg.from].stage = 2;
        const phoneNumber = msg.from.replace('@c.us', '');
        fs.writeFileSync(`./${phoneNumber}_opcao4.txt`, 'message sent');
        chat.sendStateTyping();
        msg.reply('*Bueno 👨‍💻:* \n\n*Digite o código do seu projeto* \nEx: *#232*');
        if (people[msg.from].stage === 2 && /(#)/i.test(msg.body)) {
            const randomPercentage = Math.floor(Math.random() * 41) + 30; // generates a random integer between 30 and 70 (inclusive)
            msg.reply(`*Bueno 👨‍💻:* \n\n*Seu projeto está em desenvolvimento* \n\n*${'■'.repeat(randomPercentage / 10)}${'□'.repeat(10 - (randomPercentage / 10))} ${randomPercentage}%*`);
        }
        
    } else if (people[msg.from].stage === 2 && /(Voltar)/i.test(msg.body)){
        people[msg.from].stage = 1;
        const phoneNumber = msg.from.replace('@c.us', '');
        fs.writeFileSync(`./${phoneNumber}_opcaoVOLTAR.txt`, 'message sent');
        await chat.sendMessage('*Bueno 👨‍💻:* \n\nOlá, em que posso ajudar? \n-----------------------------------\n1️⃣. *Pessoal*\n2️⃣. *Serviços*\n3️⃣. *Projetos*\n4️⃣. *Meu Projeto*');
}
}
    );
})