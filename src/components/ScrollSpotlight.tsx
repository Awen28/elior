import { Fragment, useRef, type CSSProperties } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
  type UseScrollOptions,
} from 'framer-motion';

const GLOW_OFF = '0 0 0px rgba(201, 169, 123, 0)';
const GLOW_ON = '0 0 18px rgba(201, 169, 123, 0.35)';

type WordProps = {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  dimColor: string;
  litColor: string;
  glow: boolean;
};

const Word = ({ word, progress, range, dimColor, litColor, glow }: WordProps) => {
  const color = useTransform(progress, range, [dimColor, litColor]);
  const textShadow = useTransform(progress, range, [GLOW_OFF, glow ? GLOW_ON : GLOW_OFF]);
  return (
    <motion.span className="inline-block" style={{ color, textShadow }}>
      {word}
    </motion.span>
  );
};

export type ScrollSpotlightProps = {
  text: string;
  className?: string;
  style?: CSSProperties;
  dimColor?: string;
  litColor?: string;
  glow?: boolean;
  offset?: UseScrollOptions['offset'];
};

export function ScrollSpotlight({
  text,
  className,
  style,
  dimColor = '#6F6D5A',
  litColor = '#F2EBDC',
  glow = true,
  offset = ['start end', 'center 0.7'],
}: ScrollSpotlightProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const words = text.split(' ');
  const n = words.length;

  if (reducedMotion) {
    return (
      <p ref={ref} className={className} style={{ ...style, color: litColor }}>
        {text}
      </p>
    );
  }

  return (
    <p ref={ref} className={className} style={style}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <Word
            word={word}
            progress={scrollYProgress}
            range={[i / n, Math.min((i + 1.4) / n, 1)]}
            dimColor={dimColor}
            litColor={litColor}
            glow={glow}
          />
          {i < n - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </p>
  );
}

export default ScrollSpotlight;
