import { ArrowRight } from 'lucide-react';


const NewsletterComponent = () => {
  return (
    <div className="relative rounded-xl overflow-hidden bg-[#000025] p-6">
     
      
      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-left max-w-md">
          <h3 className="text-md font-light mb-2  uppercase text-[#F9F5FF]">
            Saņem jaunākos bonusus
          </h3>
          <p className="text-[#9b98df] text-sm leading-relaxed">
            Piesakies jaunumiem un uzzini pirmais par ekskluzīviem bonusiem.
          </p>
        </div>
        
        <div className="w-full md:w-auto mt-3 md:mt-0">
          <form className="flex flex-col sm:flex-row gap-2 w-full">
            <div className="relative flex-grow">
              <input 
                type="email" 
                placeholder="Tavs e-pasts" 
                className="w-full px-3 py-2 rounded-lg bg-[#F9F5FF]/10 border border-[#8126FF]/30 text-[#F9F5FF] placeholder-[#F9F5FF]/40 focus:outline-none focus:border-[#8126FF] focus:ring-1 focus:ring-[#8126FF] transition-all text-sm" 
                required 
              />
            </div>
            <button 
              type="submit" 
              className="group relative px-4 py-2 bg-[#8126FF] text-[#F9F5FF] text-sm rounded-lg overflow-hidden transition-transform hover:scale-105 backdrop-blur-md bg-opacity-70 whitespace-nowrap flex-shrink-0"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative flex items-center justify-center">
                Pierakstīties
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsletterComponent;
