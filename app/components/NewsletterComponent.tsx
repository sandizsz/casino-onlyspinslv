'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const NewsletterComponent = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    
    try {
      const response = await fetch('/api/newsletter-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage(data.message || 'Paldies! Lūdzu, pārbaudiet savu e-pastu apstiprinājumam.');
        setEmail('');
      } else {
        setError(data.error || 'Kaut kas nogāja greizi. Lūdzu, mēģiniet vēlreiz.');
      }
    } catch {
      setError('Tīkla kļūda. Lūdzu, mēģiniet vēlāk.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative rounded-xl overflow-hidden bg-[#000025] p-6">
      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-left max-w-md">
          <h3 className="text-md font-light mb-2 uppercase text-[#F9F5FF]">
            Saņem jaunākos bonusus
          </h3>
          <p className="text-[#9b98df] text-sm leading-relaxed">
            Piesakies jaunumiem un saņem ekskluzīvus bonusu piedāvājumus.
          </p>
        </div>
        <div className="w-full md:w-auto mt-3 md:mt-0">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full">
            <div className="relative flex-grow">
              <input
                type="email"
                placeholder="Tavs e-pasts"
                className="w-full px-3 py-2 rounded-lg bg-[#F9F5FF]/10 border border-[#8126FF]/30 text-[#F9F5FF] placeholder-[#F9F5FF]/40 focus:outline-none focus:border-[#8126FF] focus:ring-1 focus:ring-[#8126FF] transition-all text-sm"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              className="group relative px-4 py-2 bg-[#8126FF] text-[#F9F5FF] text-sm rounded-lg overflow-hidden transition-transform hover:scale-105 backdrop-blur-md bg-opacity-70 whitespace-nowrap flex-shrink-0 disabled:opacity-50 disabled:hover:scale-100"
              disabled={loading}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative flex items-center justify-center">
                {loading ? 'Nosūta...' : 'Pierakstīties'}
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </form>
          
          {message && (
            <div className="mt-2 text-sm text-green-400 bg-green-400/10 p-2 rounded">
              {message}
            </div>
          )}
          
          {error && (
            <div className="mt-2 text-sm text-red-400 bg-red-400/10 p-2 rounded">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterComponent;