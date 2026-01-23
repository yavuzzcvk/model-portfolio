import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const contactReceiver = process.env.CONTACT_RECEIVER_EMAIL;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

/**
 * SADECE TEST İÇİN
 * Tarayıcıdan açınca çalışır (GET)
 */
export async function GET() {
  return Response.json({
    status: 'API çalışıyor',
    message: 'GET methodu aktif'
  });
}

/**
 * GERÇEK İŞ
 * Mail gönderimi (POST)
 */
export async function POST(req: Request) {
  try {
    if (!resend || !contactReceiver) {
      console.error('Missing RESEND_API_KEY or CONTACT_RECEIVER_EMAIL');
      return Response.json({ error: 'Server mail ayarı eksik' }, { status: 500 });
    }

    const payload = await req.json();
    const name = typeof payload.name === 'string' ? payload.name.trim() : '';
    const email = typeof payload.email === 'string' ? payload.email.trim() : '';
    const message = typeof payload.message === 'string' ? payload.message.trim() : '';

    if (!name || !email || !message) {
      return Response.json(
        { error: 'Eksik alan var' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { error: 'Geçerli bir email girin' },
        { status: 400 }
      );
    }

    const safe = (value: string) =>
      value.replace(/[&<>"]+/g, (char) => {
        switch (char) {
          case '&':
            return '&amp;';
          case '<':
            return '&lt;';
          case '>':
            return '&gt;';
          case '"':
            return '&quot;';
          default:
            return char;
        }
      });

    await resend.emails.send({
      from: 'Website <onboarding@resend.dev>',
      to: [contactReceiver],
      replyTo: email,
      subject: 'Yeni İletişim Formu Mesajı',
      html: `
        <p><strong>İsim:</strong> ${safe(name)}</p>
        <p><strong>Email:</strong> ${safe(email)}</p>
        <p><strong>Mesaj:</strong><br/>${safe(message)}</p>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('RESEND ERROR:', error);
    return Response.json(
      { error: 'Mail gönderilemedi' },
      { status: 500 }
    );
  }
}
