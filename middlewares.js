import nodemailer from 'nodemailer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const mailNotificationMiddleware = async ({ userName, userEmail, friendEmail, friendName }) => {
  try {
    const res = await transporter.sendMail({
      from: userEmail,
      to: friendEmail,
      subject: `Your friend ${userName} has referred you!!!`,
      html: "<h1>Congratulations!!!</h1>",
      text: `Hey ${friendName}!\nYou've been referred by your friend ${userName}. \nALl the best!!!,\nTeam Accredian`,
    });
    console.log('Message: ', res.messageId);
    const data = res.json();
    return data;
  } catch (err) {
    console.error('Error sending Email: ', err.message);
    throw err;
  }
}


export const referralMiddleware = async (req, res) => {
  try {
    const { userName, userEmail, friendEmail, friendName } = req.body;
    console.log(userName, userEmail, friendEmail, friendName);
    if (!userName || !userEmail || !friendEmail || !friendName) { return res.status(400).json({ message: "Empty Values received" }) }
    const userReferral = await prisma.referral.create({
      data: {
        UserName: userName,
        UserEmail: userEmail,
        FriendName: friendEmail,
        FriendEmail: friendName,
      }
    })

    const result = await mailNotificationMiddleware({ userName, userEmail, friendEmail, friendName })
    console.log(result);
    res.status(200).json({ userReferral, message: "User Referred Successfully" })

  } catch (err) {
    console.log(err);
    res.status(500).json(err.message)
  }
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_MAIL,
    pass: process.env.USER_PASSWORD,
  },
});

