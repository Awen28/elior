import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, ArrowUpRight, CheckCircle, AlertCircle } from 'lucide-react';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = '64b0ac3c-c692-4110-b2ad-4e797a4288f3';

const fieldStyle = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(82, 83, 66, 0.35)',
  borderRadius: 0,
  color: '#525342',
  caretColor: '#C9A97B',
  fontSize: '1.05rem',
  padding: '0.9rem 0.1rem 0.9rem 0.1rem',
  outline: 'none',
  transition: 'border-color 0.3s ease',
} as const;

const labelStyle = {
  color: 'rgba(82, 83, 66, 0.55)',
  letterSpacing: '0.22em',
  fontSize: '0.68rem',
  fontWeight: 600,
  textTransform: 'uppercase' as const,
};

const Contact = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        name: formData.name,
        email: formData.email,
        message: formData.message,
        from_name: 'Elior Website',
        subject: `New Message from ${formData.name} — ${formData.email}`,
        botcheck: '',
      };

      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 6000);
      } else {
        console.error('Web3Forms error:', data);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Web3Forms Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 md:py-44 px-8 overflow-hidden"
      style={{ background: '#BBB1A4' }}
    >
      {/* soft light from above, very quiet */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[140vw] h-[50vh] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 55% at 50% 0%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 70%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-20 md:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow block mb-6"
            style={{
              color: '#BBB1A4',
              textShadow:
                '-1px -1px 1px rgba(255,255,255,0.5), 1px 1px 1px rgba(84,76,66,0.45)',
            }}
          >
            {t('contact.eyebrow')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif font-normal text-5xl md:text-6xl leading-[1.1]"
            style={{
              color: '#BBB1A4',
              textShadow:
                '-1px -1px 2px rgba(255,255,255,0.45), 1px 2px 2px rgba(84,76,66,0.35)',
            }}
          >
            {t('contact.titleA')}
            <span className="italic">{t('contact.titleB')}</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-[1fr_1.15fr] gap-16 md:gap-24 items-start">
          {/* ── Left: statement ─────────────────────────────── */}
          <div className="md:sticky md:top-32">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="font-sans font-light text-[1.05rem] leading-relaxed max-w-md mb-12"
              style={{ color: 'rgba(82, 83, 66, 0.75)' }}
            >
              {t('contact.intro')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-4"
            >
              <a
                href="mailto:info@elior.studio"
                className="inline-flex items-center gap-3 font-sans text-[0.95rem] group"
                style={{ color: 'rgba(82, 83, 66, 0.85)' }}
              >
                <Mail className="w-4 h-4" style={{ color: '#9A7A50' }} />
                <span className="border-b border-transparent group-hover:border-[#9A7A50] transition-colors">
                  info@elior.studio
                </span>
              </a>
              <a
                href="tel:+4367764059711"
                className="inline-flex items-center gap-3 font-sans text-[0.95rem] group"
                style={{ color: 'rgba(82, 83, 66, 0.85)' }}
              >
                <Phone className="w-4 h-4" style={{ color: '#9A7A50' }} />
                <span className="border-b border-transparent group-hover:border-[#9A7A50] transition-colors">
                  +43 677 6405 9711
                </span>
              </a>
            </motion.div>
          </div>

        {/* ── Right: quiet editorial form ─────────────────── */}
        <motion.form
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-9"
          noValidate
        >
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-start gap-3 py-3"
            >
              <CheckCircle className="w-5 h-5 shrink-0" style={{ color: '#7D8B6F' }} />
              <p className="font-sans text-sm" style={{ color: 'rgba(82, 83, 66, 0.85)' }}>
                {t('contact.success')}
              </p>
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-start gap-3 py-3"
            >
              <AlertCircle className="w-5 h-5 shrink-0" style={{ color: '#A4635B' }} />
              <p className="font-sans text-sm" style={{ color: 'rgba(82, 83, 66, 0.85)' }}>
                {t('contact.errorBefore')}
                <a href="mailto:info@elior.studio" className="underline" style={{ color: '#9A7A50' }}>
                  info@elior.studio
                </a>
                {t('contact.errorAfter')}
              </p>
            </motion.div>
          )}

          <div>
            <label htmlFor="name" className="block mb-1" style={labelStyle}>
              {t('contact.name')}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={fieldStyle}
              placeholder={t('contact.namePlaceholder')}
              required
              onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(154, 122, 80, 0.6)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(82, 83, 66, 0.35)')}
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1" style={labelStyle}>
              {t('contact.email')}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={fieldStyle}
              placeholder={t('contact.emailPlaceholder')}
              required
              onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(154, 122, 80, 0.6)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(82, 83, 66, 0.35)')}
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-1" style={labelStyle}>
              {t('contact.project')}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              style={fieldStyle}
              placeholder={t('contact.projectPlaceholder')}
              required
              onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(154, 122, 80, 0.6)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(82, 83, 66, 0.35)')}
            />
          </div>

          <div className="pt-2 flex items-start gap-3">
            <span
              className="mt-2.5 w-3 h-3 shrink-0 rounded-full"
              style={{
                background: '#9A7A50',
                boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.25), inset -1px -1px 2px rgba(255,255,255,0.3)',
              }}
            />
            <p className="font-sans text-xs leading-relaxed" style={{ color: 'rgba(82, 83, 66, 0.6)' }}>
              {t('contact.gdprBefore')}
              <a href="/datenschutz" className="underline" style={{ color: '#9A7A50' }}>
                {t('contact.gdprLink')}
              </a>
              {t('contact.gdprAfter')}
            </p>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group inline-flex items-center gap-3 font-sans text-[0.8rem] tracking-[0.22em] uppercase disabled:opacity-60"
              style={{ color: '#4E4F41' }}
            >
              <span className="border-b border-[#9A7A50] pb-1 group-hover:text-[#8A6A40] transition-colors">
                {isSubmitting ? t('contact.sending') : t('contact.send')}
              </span>
              {isSubmitting ? (
                <span
                  className="w-4 h-4 border-2 border-[#4E4F41]/30 border-t-[#4E4F41] rounded-full animate-spin"
                  style={{ borderRadius: '1rem' }}
                />
              ) : (
                <ArrowUpRight
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  style={{ color: '#9A7A50' }}
                />
              )}
            </button>
          </div>
        </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;