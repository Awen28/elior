import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const olive = '#525342';

type Props = {
  variant?: 'desktop' | 'mobile';
};

const LanguageToggle = ({ variant = 'desktop' }: Props) => {
  const { i18n } = useTranslation();
  const current = i18n.resolvedLanguage?.startsWith('de') ? 'de' : 'en';

  const setLang = (lng: 'en' | 'de') => {
    if (lng === current) return;
    i18n.changeLanguage(lng);
  };

  const mobile = variant === 'mobile';
  const base = mobile ? 'rgba(237, 232, 221, 0.5)' : 'rgba(82, 83, 66, 0.5)';
  const active = mobile ? '#EDE8DD' : olive;
  const separator = mobile ? 'rgba(237, 232, 221, 0.25)' : 'rgba(82, 83, 66, 0.25)';

  return (
    <div
      className="flex items-center gap-2 font-sans text-[0.68rem] tracking-[0.22em] uppercase select-none"
      aria-label="Language"
    >
      {(['de', 'en'] as const).map((lng, idx) => (
        <span key={lng} className="flex items-center gap-2">
          {idx > 0 && (
            <span style={{ color: separator }} aria-hidden>
              /
            </span>
          )}
          <motion.button
            type="button"
            onClick={() => setLang(lng)}
            whileTap={{ scale: 0.94 }}
            className="transition-colors"
            style={{ color: current === lng ? active : base }}
            aria-pressed={current === lng}
          >
            {lng.toUpperCase()}
          </motion.button>
        </span>
      ))}
    </div>
  );
};

export default LanguageToggle;
