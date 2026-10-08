import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

const contactLinks = [
  { icon: Mail, label: 'Email', value: 'info@awen28.com', href: 'mailto:info@awen28.com' },
  { icon: Phone, label: 'Phone', value: '+43 677 64059711', href: 'tel:+4367764059711' },
  { icon: MapPin, label: 'Location', value: 'Tirol, Austria', href: '#' },
];

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = '64b0ac3c-c692-4110-b2ad-4e797a4288f3';

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
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
        project: formData.project,
        message: formData.message,
        from_name: 'Elior Website',
        subject: `New Message from ${formData.name} - ${formData.project}`,
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
        setFormData({ name: '', email: '', project: '', message: '' });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 px-8"
      style={{ background: '#F7F3ED' }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 0.18, scale: 1 } : {}}
          transition={{ duration: 1 }}
          className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(210, 180, 136, 0.7) 0%, transparent 70%)',
          }}
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 0.14, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(154, 143, 128, 0.6) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-serif italic text-sm tracking-[0.3em] block mb-6"
            style={{ color: '#BA986A' }}
          >
            Get In Touch
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl leading-tight mb-6"
            style={{ color: '#20201E' }}
          >
            Let us create
            <br />
            <span 
              className="italic"
              style={{ color: '#BA986A' }}
            >
              something with meaning
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-xl max-w-2xl mx-auto"
            style={{ color: 'rgba(32, 32, 30, 0.6)' }}
          >
            Whether you have a project in mind or just want to say hello, we would love to hear from you.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20">
          {/* Contact Info */}
          <div>
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-serif text-3xl mb-10"
              style={{ color: '#20201E' }}
            >
              Contact Information
            </motion.h3>
            <div className="space-y-6">
              {contactLinks.map((link, idx) => (
                <motion.a
                  key={idx}
                  href={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="group flex items-center gap-6 p-6 rounded-2xl transition-all duration-300"
                  style={{
                    background: 'linear-gradient(145deg, rgba(247, 243, 237, 0.95) 0%, rgba(241, 237, 230, 0.85) 100%)',
                    boxShadow: `
                      inset 2px 2px 4px rgba(255, 255, 255, 0.7),
                      inset -2px -2px 5px rgba(154, 143, 128, 0.14),
                      4px 4px 10px rgba(154, 143, 128, 0.20),
                      8px 8px 20px rgba(154, 143, 128, 0.12)
                    `,
                  }}
                >
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{ 
                      background: 'linear-gradient(145deg, rgba(210, 180, 136, 0.3) 0%, rgba(186, 152, 106, 0.18) 100%)',
                      boxShadow: `
                        inset 1px 1px 3px rgba(255, 255, 255, 0.6),
                        inset -1px -1px 3px rgba(154, 128, 80, 0.2),
                        2px 2px 5px rgba(154, 143, 128, 0.15)
                      `,
                    }}
                  >
                    <link.icon className="w-6 h-6" style={{ color: '#BA986A' }} />
                  </div>
                  <div>
                    <p 
                      className="font-sans text-sm mb-1"
                      style={{ color: 'rgba(32, 32, 30, 0.5)' }}
                    >
                      {link.label}
                    </p>
                    <p 
                      className="font-sans text-lg"
                      style={{ color: '#20201E' }}
                    >
                      {link.value}
                    </p>
                  </div>
                  <ArrowRight 
                    className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1"
                    style={{ color: '#BA986A' }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Quick response note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 p-6 rounded-2xl"
              style={{
                background: 'rgba(210, 180, 136, 0.2)',
                boxShadow: `
                  inset 2px 2px 4px rgba(255, 255, 255, 0.6),
                  inset -2px -2px 5px rgba(154, 143, 128, 0.12),
                  3px 3px 8px rgba(154, 143, 128, 0.16)
                `,
              }}
            >
              <p className="font-sans text-sm" style={{ color: 'rgba(32, 32, 30, 0.7)' }}>
                <strong>Quick Response Time:</strong> We typically reply within 24 hours during business days.
              </p>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form 
              ref={formRef}
              onSubmit={handleSubmit} 
              className="p-8 rounded-3xl"
              style={{
                background: 'linear-gradient(145deg, #F7F3ED 0%, #F1EDE6 50%, #E9E2D7 100%)',
                boxShadow: `
                  inset 3px 3px 6px rgba(255, 255, 255, 0.9),
                  inset -3px -3px 8px rgba(154, 143, 128, 0.16),
                  8px 8px 20px rgba(154, 143, 128, 0.22),
                  16px 16px 40px rgba(154, 143, 128, 0.14)
                `,
              }}
            >
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl flex items-center gap-3"
                  style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)' }}
                >
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="text-sm text-green-700">
                    Message sent successfully! We will get back to you soon.
                  </p>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl flex items-center gap-3"
                  style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)' }}
                >
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-sm text-red-700">
                    Something went wrong. Please try again or email us directly.
                  </p>
                </motion.div>
              )}

              <div className="space-y-5">
                <div>
                  <label 
                    htmlFor="name" 
                    className="block font-sans text-sm mb-2"
                    style={{ color: 'rgba(32, 32, 30, 0.6)' }}
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 rounded-xl font-sans text-base transition-all duration-300 focus:outline-none"
                    style={{
                      background: '#F1EDE6',
                      boxShadow: `
                        inset 3px 3px 6px rgba(154, 143, 128, 0.18),
                        inset -2px -2px 5px rgba(255, 255, 255, 0.8)
                      `,
                      color: '#20201E',
                    }}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label 
                    htmlFor="email" 
                    className="block font-sans text-sm mb-2"
                    style={{ color: 'rgba(32, 32, 30, 0.6)' }}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 rounded-xl font-sans text-base transition-all duration-300 focus:outline-none"
                    style={{
                      background: '#F1EDE6',
                      boxShadow: `
                        inset 3px 3px 6px rgba(154, 143, 128, 0.18),
                        inset -2px -2px 5px rgba(255, 255, 255, 0.8)
                      `,
                      color: '#20201E',
                    }}
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div>
                  <label 
                    htmlFor="project" 
                    className="block font-sans text-sm mb-2"
                    style={{ color: 'rgba(32, 32, 30, 0.6)' }}
                  >
                    Project Type *
                  </label>
                  <select
                    id="project"
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 rounded-xl font-sans text-base transition-all duration-300 focus:outline-none cursor-pointer"
                    style={{
                      background: '#F1EDE6',
                      boxShadow: `
                        inset 3px 3px 6px rgba(154, 143, 128, 0.18),
                        inset -2px -2px 5px rgba(255, 255, 255, 0.8)
                      `,
                      color: '#20201E',
                    }}
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="iOS App Development">iOS App Development</option>
                    <option value="Website Development">Website Development</option>
                    <option value="Brand Identity">Brand Identity</option>
                    <option value="AI Integration">AI Integration</option>
                    <option value="Backend Development">Backend Development</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label 
                    htmlFor="message" 
                    className="block font-sans text-sm mb-2"
                    style={{ color: 'rgba(32, 32, 30, 0.6)' }}
                  >
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-5 py-3.5 rounded-xl font-sans text-base transition-all duration-300 focus:outline-none resize-none"
                    style={{
                      background: '#F1EDE6',
                      boxShadow: `
                        inset 3px 3px 6px rgba(154, 143, 128, 0.18),
                        inset -2px -2px 5px rgba(255, 255, 255, 0.8)
                      `,
                      color: '#20201E',
                    }}
                    placeholder="Tell us about your project..."
                    required
                  />
                </div>
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 py-4 rounded-xl flex items-center justify-center gap-3 font-sans text-base transition-all duration-300 disabled:opacity-70 clay-dark"
                style={{ color: '#F7F3ED' }}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
