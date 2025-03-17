// app/api/newsletter-signup/route.ts
import { NextResponse } from 'next/server';
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY || '',
});

// Admin email to receive notifications
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'support@balticslots.com';
// Email address to send from (must be verified in MailerSend)
const FROM_EMAIL = process.env.FROM_EMAIL || 'jaunumi@balticslots.com';
const FROM_NAME = process.env.FROM_NAME || 'Balticslots';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Nepieciešama derīga e-pasta adrese' },
        { status: 400 }
      );
    }

    // 1. Send confirmation email to the subscriber
    await sendConfirmationEmail(email);
    
    // 2. Send notification email to the admin
    await sendAdminNotification(email);

    return NextResponse.json({ 
      message: 'Paldies par pierakstīšanos! Lūdzu pārbaudiet savu e-pastu.' 
    });
  } catch (error) {
    console.error('Newsletter signup error:', error);
    return NextResponse.json(
      { error: 'Neizdevās apstrādāt jūsu pieteikumu. Lūdzu, mēģiniet vēlāk.' },
      { status: 500 }
    );
  }
}

// Email sending functions
async function sendConfirmationEmail(subscriberEmail: string) {
  const sentFrom = new Sender(FROM_EMAIL, FROM_NAME);
  const recipient = new Recipient(subscriberEmail);

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo([recipient])
    .setSubject('Paldies par pierakstīšanos bonusu jaunumiem!')
    .setHtml(`
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #8126FF;">Paldies par pierakstīšanos!</h1>
        <p>Jūs esat veiksmīgi pierakstījies mūsu jaunumu saņemšanai.</p>
        <p>Drīzumā saņemsiet ekskluzīvus bonusu piedāvājumus un jaunākās ziņas.</p>
        <hr style="border: 1px solid #eee; margin: 20px 0;" />
        <p style="color: #777; font-size: 12px;">
          Ja jūs neesat pieteicies šim pakalpojumam, lūdzu, ignorējiet šo e-pastu.
        </p>
      </div>
    `)
    .setText('Paldies par pierakstīšanos mūsu jaunumu saņemšanai. Drīzumā saņemsiet ekskluzīvus bonusu piedāvājumus!');

  return await mailerSend.email.send(emailParams);
}

async function sendAdminNotification(subscriberEmail: string) {
  const sentFrom = new Sender(FROM_EMAIL, 'Balticslots.com');
  const recipient = new Recipient(ADMIN_EMAIL);

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo([recipient])
    .setSubject('Jauns jaunumu abonents')
    .setHtml(`
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #8126FF;">Jauns jaunumu abonents</h2>
        <p>Jauns lietotājs ir pierakstījies jaunumu saņemšanai:</p>
        <p style="background: #f5f5f5; padding: 10px; border-radius: 4px;">${subscriberEmail}</p>
      </div>
    `)
    .setText(`Jauns jaunumu abonents: ${subscriberEmail}`);

  return await mailerSend.email.send(emailParams);
}