import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use SSL
    auth: {
        user: 'nahomhabtamu147@gmail.com', // Use your Gmail address
        pass: 'ilmp fako hyiv foch' // Use the app password
    }
});