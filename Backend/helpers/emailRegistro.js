import nodemailer from 'nodemailer'

const emailRegistro = async (datos) => {

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

  //Enviar email
  const info = await transporter.sendMail({
    //contenido del email
    from: 'APV - Administrador de Pacientes de Veterinario',
    to: email,
        subject: 'Comprueba tu Cuenta en APV',
        text: 'Comprueba tu Cuenta en APV',
        html: `<p>Hola ${nombre}, Comprueba tu Cuenta en APV.</p>
                <p>Tu Cuenta Ya Esta Lista solo debes Comprobarla en el Siguiente Enlace:
                <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a> </p>
                
                <p>Si tu no creaste esta Cuenta, puedes ignorar este Mensaje</p>`
  });
  console.log('Mensaje Eniviado: %s', info.messageId);      
};

export default emailRegistro; 