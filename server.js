require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // Permite requisições do frontend

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
    const { amigos } = req.body;

    let sorteio = sortearAmigo(amigos);

    try{
        for(let nome in amigos) {
            const email = amigos[nome];
            const amigoSecreto = sorteio[nome];
        
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email, // E-mail do destinatário
                subject: "Sorteio de Amigo Secreto 🎁",
                text: `Olá ${nome},\n\nVocê tirou: ${amigoSecreto}!!\n\nBoa sorte e boas festas!`
            };

            await transporter.sendMail(mailOptions);
            console.log(`E-mail enviado para ${nome} (${email}): Tirou ${amigoSecreto}`);
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
