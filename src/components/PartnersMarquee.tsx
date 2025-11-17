import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface Partner {
  id: string;
  name: string;
  logo: string;
  status: 'active' | 'inactive';
}

export function PartnersMarquee() {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    // Load active partners from localStorage
    const storedPartners = localStorage.getItem('ochPartners');
    if (storedPartners) {
      const allPartners = JSON.parse(storedPartners);
      const activePartners = allPartners.filter((p: Partner) => p.status === 'active');
      setPartners(activePartners);
    }
  }, []);

  // If no partners, don't render anything
  if (partners.length === 0) {
    return null;
  }

  // Duplicate partners array to create seamless loop
  const duplicatedPartners = [...partners, ...partners];

  return (
    <div className="w-full bg-slate-900/50 py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <h2 className="text-2xl text-white text-center mb-2">Our Trusted Partners</h2>
        <p className="text-slate-400 text-center">Partnering with industry leaders to deliver excellence</p>
      </div>

      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-900 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-900 to-transparent z-10" />

        {/* Scrolling container */}
        <motion.div
          className="flex gap-12"
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            x: {
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
        >
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="flex-shrink-0 w-48 h-24 bg-slate-800/50 rounded-lg border border-slate-700 flex items-center justify-center p-4 hover:bg-slate-800 transition-colors"
            >
              {partner.logo ? (
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all"
                />
              ) : (
                <span className="text-slate-400">{partner.name}</span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
