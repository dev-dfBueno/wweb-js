const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client();
client.stage = 0;

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Cliente conectado!');
});
setTimeout(() => {
client.on('message', async message => {
    if (message.from.endsWith('@g.us')) {
        console.log('Mensagem de grupo recebida. Ignorando...');
        return;
    }

    const stage = client.stage;
    const messageBody = message.body.trim();

    switch(stage) {
        case 0:
            console.log('O bot acabou de ser ativado pelo usuário:', message.from);
            await message.reply('*Grupo ShopMaq* 🧵: \n\nSeja Bem-Vindo ao *atentimento virtual* do *Grupo ShopMaq*. \nEm que podemos ajudar? 👨‍🔧 \n-----------------------------------\n1️⃣. *VENDAS*\n2️⃣. *VENDAS ONLINE*\n3️⃣. *FINANCEIRO*\n4️⃣. *GERÊNCIA*\n');
            client.stage = 1;
            break;
            case 1:
                if (messageBody === '1') {
                  const randomNum = '#' + Math.floor(Math.random() * 100000);
                  await message.reply(`*Grupo ShopMaq* 🧵: \n\nO protocolo do seu atendimento é: *${randomNum}* \n*Você deseja falar com um atendente?* \nResponda com *"Sim"* ou *"Não"*.`);
                  client.stage = 2;
                } else if (messageBody === '2') {
                  // código para a opção 2
                  const randomNum = '#' + Math.floor(Math.random() * 100000);
                  await message.reply(`*Grupo ShopMaq* 🧵: \n\nO protocolo do seu atendimento é: *${randomNum}* \n*Você deseja falar com um atendente?* \nResponda com *"Sim"* ou *"Não"*.`);
                  client.stage = 2;

                } else if (messageBody === '3') {
                  // código para a opção 3
                  const randomNum = '#' + Math.floor(Math.random() * 100000);
                  await message.reply(`*Grupo ShopMaq* 🧵: \n\nO protocolo do seu atendimento é: *${randomNum}* \n*Você deseja falar com um atendente?* \nResponda com *"Sim"* ou *"Não"*.`);
                  client.stage = 2;

                } else if (messageBody === '4') {
                  // código para a opção 4
                  const randomNum = '#' + Math.floor(Math.random() * 100000);
                  await message.reply(`*Grupo ShopMaq* 🧵: \n\nO protocolo do seu atendimento é: *${randomNum}* \n*Você deseja falar com um atendente?* \nResponda com *"Sim"* ou *"Não"*.`);
                  client.stage = 2;

                } else {
                  await message.reply('*Grupo ShopMaq* 🧵: \n\nEscolha uma opção válida: 1, 2, 3 ou 4');
                }
                break;
              
              case 2:
                if (messageBody.toLowerCase() === 'sim') {
                  await message.reply('*Grupo ShopMaq* 🧵: \n\nAguarde um momento enquanto transfiro seu atendimento para o setor responsável.');
                  client.stage = 3;
                } else if (messageBody.toLowerCase() === 'não') {
                  await message.reply('*Grupo ShopMaq* 🧵: \n\nTudo bem, estamos à disposição para ajudá-lo quando precisar.');
                  client.stage = 0;
                } else {
                  await message.reply('*Grupo ShopMaq* 🧵: \n\nResponda com "Sim" ou "Não".');
                }
                break;
        case 2:
            await message.reply('*Grupo ShopMaq* 🧵: \n\nAguarde um momento enquanto transfiro seu atendimento para o setor responsável.');
            client.stage = 3;
            break;
        case 3:
            // comportamento para o quarto estágio
            break;
        // adicione quantos estágios quiser
        default:
            // comportamento padrão caso o estágio atual seja inválido
            await message.reply('*Grupo ShopMaq* 🧵: \n\nDesculpe, não entendi o que você quis dizer');
            break;
    }
});

}, 10000);

client.initialize();
