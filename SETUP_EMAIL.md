# Contact Form Setup Guide

## Option 1: Web3Forms (Empfohlen - Kostenlos) ✅

### Schritt 1: Web3Forms Access Key erhalten

1. Gehe zu [web3forms.com](https://web3forms.com)
2. Klicke auf "Get Started" oder "Create Access Key"
3. Gib deine E-Mail ein: **info@elior.studio**
4. Du erhältst sofort einen **Access Key** (z.B. `abc123-def456-ghi789`)

### Schritt 2: Access Key konfigurieren

#### Für lokale Entwicklung:
1. Öffne `.env.local` im Projektordner
2. Ersetze `your_access_key_here` mit deinem echten Access Key:
   ```
   VITE_WEB3FORMS_ACCESS_KEY=abc123-def456-ghi789
   ```
3. Starte den Dev Server neu: `npm run dev`

#### Für Vercel Deployment:
1. Gehe zu deinem Vercel Project
2. Settings → Environment Variables
3. Füge hinzu:
   - **Name:** `VITE_WEB3FORMS_ACCESS_KEY`
   - **Value:** Dein Access Key
   - **Scope:** Production, Preview, Development
4. Redeploy das Projekt

### Schritt 3: Testen
- Fülle das Formular aus und sende eine Test-Nachricht
- Du erhältst die E-Mail an **info@elior.studio**

---

## Option 2: EmailJS (Alternative)

### Schritt 1: EmailJS Account erstellen
1. Gehe zu [emailjs.com](https://www.emailjs.com)
2. Registriere dich (kostenlos bis 200 E-Mails/Monat)
3. Erstelle einen Email Service (z.B. Gmail)
4. Erstelle ein Email Template

### Schritt 2: Installation
```bash
npm install @emailjs/browser
```

### Schritt 3: Code in Contact.tsx ersetzen:
```typescript
import emailjs from '@emailjs/browser';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'info@elior.studio',
      },
      'YOUR_PUBLIC_KEY'
    );

    toast.success('Message sent successfully!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  } catch (error) {
    toast.error('Failed to send message.');
  } finally {
    setIsSubmitting(false);
  }
};
```

---

## Option 3: Formspree (Sehr einfach)

1. Gehe zu [formspree.io](https://formspree.io)
2. Registriere dich (kostenlos bis 50 Submissions/Monat)
3. Erstelle ein neues Formular für **info@elior.studio**
4. Kopiere die Form Endpoint URL

### Code in Contact.tsx:
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      }),
    });

    if (response.ok) {
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      throw new Error('Failed');
    }
  } catch (error) {
    toast.error('Failed to send message.');
  } finally {
    setIsSubmitting(false);
  }
};
```

---

## Empfehlung

**Web3Forms** ist am einfachsten:
- ✅ Keine Registrierung nötig
- ✅ Unbegrenzte E-Mails
- ✅ Keine Installation
- ✅ Spam-Schutz
- ✅ E-Mail-Bestätigung

## Support
Bei Fragen: info@elior.studio
