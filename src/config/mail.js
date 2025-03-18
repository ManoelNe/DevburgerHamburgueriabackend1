import nodemailer from 'nodemailer';

// Configuração do transporte para o Mailtrap
const mailConfig = {
  host: 'sandbox.smtp.mailtrap.io',  // Host do Mailtrap
  port: 587,                         // Porta com STARTTLS
  secure: false,                     // Usando STARTTLS
  auth: {
    user: 'd8c4f37318ffea',          // Nome de usuário fornecido pelo Mailtrap
    pass: '********b23d',            // Senha fornecida pelo Mailtrap
  },
};

// Criando o transporte
const transporter = nodemailer.createTransport(mailConfig);

// Função para enviar e-mail
const sendMail = async (to, token) => {
  const mailOptions = {
    from: 'seuemail@dominio.com',     // Remetente (pode ser um e-mail qualquer)
    to: to,                           // Destinatário
    subject: 'Recuperação de Senha',   // Assunto
    text: `Seu código de recuperação de senha é: ${token}`,  // Corpo do e-mail
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail enviado:', info.messageId);
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    throw new Error('Falha ao enviar e-mail.');
  }
};

export { sendMail };
export default transporter;
