import config from '@/config/site'
import Mail from '@/emails/verify'
import prisma from '@/lib/prisma'
import { generateSerial } from '@/lib/serial'
import { getErrorResponse } from '@/lib/utils'
import { isEmailValid } from '@/lib/validator'
import { NextRequest, NextResponse } from 'next/server'
// Assume this uses validator.js
import nodemailer from 'nodemailer'
import { ZodError } from 'zod'

// Configure nodemailer to use Gmail
const transporter = nodemailer.createTransport({
   service: 'Gmail',
   auth: {
      user: process.env.MAIL_SMTP_USER, // Your Gmail address
      pass: process.env.MAIL_SMTP_PASSWORD, // Your Gmail password or App password
   },
})

export async function POST(req: NextRequest) {
   try {
      const { email } = await req.json()
      const OTP = generateSerial({})

      if (isEmailValid(email)) {
         await prisma.owner.update({
            where: { email },
            data: {
               OTP,
            },
         })

         // Render the email content using your email template
         const emailContent = Mail({ code: OTP, name: config.name })

         // Send email
         await transporter.sendMail({
            from: `"${config.name}" <${process.env.MAIL_SMTP_USER}>`, // Sender address
            to: email, // Recipient address
            subject: 'Verify your email.', // Subject line
            html: emailContent.toString(), // Email content in HTML
         })

         return new NextResponse(
            JSON.stringify({
               status: 'success',
               email,
            }),
            {
               status: 200,
               headers: { 'Content-Type': 'application/json' },
            }
         )
      } else {
         return getErrorResponse(400, 'Invalid Email Format')
      }
   } catch (error) {
      console.error(error)
      if (error instanceof ZodError) {
         return getErrorResponse(400, 'Failed validations', error)
      }

      return getErrorResponse(500, 'Internal Server Error')
   }
}
