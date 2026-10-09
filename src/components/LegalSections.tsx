import { type ReactNode } from 'react';

export const LegalSection = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <section className="py-10 border-b" style={{ borderColor: 'rgba(82, 83, 66, 0.1)' }}>
    <h2
      className="font-serif text-xl md:text-2xl mb-4"
      style={{ color: '#4E4F41' }}
    >
      {title}
    </h2>
    <div className="space-y-3 text-[0.95rem] leading-relaxed" style={{ color: 'rgba(82, 83, 66, 0.72)' }}>
      {children}
    </div>
  </section>
);

export const AddressBlock = ({ children }: { children: ReactNode }) => (
  <div
    className="my-2 p-5 rounded-2xl"
    style={{
      background: 'rgba(186, 154, 106, 0.08)',
      border: '1px solid rgba(178, 159, 134, 0.2)',
    }}
  >
    <div className="space-y-1 text-[0.95rem] leading-relaxed" style={{ color: 'rgba(82, 83, 66, 0.85)' }}>
      {children}
    </div>
  </div>
);