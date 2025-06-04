import nodemailer from 'nodemailer'

const emailOlvidePassword = async (datos) => {

    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
  });

  const {email, nombre, token} = datos;

  const info = await transporter.sendMail({
    //contenido del email
    from: 'APV - Administrador de Pacientes de Veterinario',
    to: email,
        subject: 'Reestablece tu Password',
        text: 'Reestablece tu Password',
        html: `<p>Hola ${nombre}, Has Solicitado Reestablecer el Password</p>
                <p>Sigue el Siguiente Enlace para Reestablecer el Password:
                <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablececr Password</a> </p>
                
                <p>Si tu no creaste esta Cuenta, puedes ignorar este Mensaje</p>`
  });
  console.log('Mensaje Eniviado: %s', info.messageId);      
};

export default emailOlvidePassword; 