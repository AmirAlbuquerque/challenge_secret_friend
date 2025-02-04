require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const { text } = require("body-parser");

const app = express();
app.use(express.json());
app.use(cors()); // Permite requisições do frontend
app.use(cors({
    origin: "*", // Permite todas as origens (apenas para testes, pode restringir depois)
    methods: ["GET", "POST"]
}));

// Configuração do Nodemailer (Gmail como exemplo)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Email do remetente (Definir no .env)
        pass: process.env.EMAIL_PASS  // Senha ou App Password (Definir no .env)
    }
});

// Rota para enviar e-mail
app.post("/enviar-email", async (req, res) => {
    const { sorteio } = req.body;

    try{
        for(let nome in sorteio) {
            const {email, sorteado} = sorteio[nome];
        
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email, // E-mail do destinatário
                subject: "Sorteio de Amigo Secreto 🎁",
                text: `Olá, ${nome}! 👋 \n\nO momento tão esperado chegou... e temos o resultado do seu amigo secreto! 🎉\n\nVocê tirou: ${sorteado}! 🤩\n\nAgora é hora de se preparar para a grande surpresa, que tal? \n💖 Que essa troca de presentes seja repleta de alegria e boas vibrações! 🌟\nNão se esqueça, o mais importante é espalhar amor e carinho! Que a diversão e o espírito de amizade marquem esse momento. 😄\n\nFeliz Amigo Secreto! 🎁🎉\n\nCom carinho,\nEquipe do Amigo Secreto`
            };

            await transporter.sendMail(mailOptions);
            console.log(`E-mail enviado para ${nome} (${email}): Tirou ${sorteado}`);
        };

        res.status(200).json({ message: "E-mail enviado com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao enviar o e-mail", error });
    }
});

// Inicia o servidor
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
