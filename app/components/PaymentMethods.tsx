"use client"

import Image from 'next/image'

interface PaymentMethod {
  _id: string;
  name: string;
  image: {
    asset: {
      url: string;
    };
  };
}

interface PaymentMethodsProps {
  paymentMethods: PaymentMethod[];
}

export default function PaymentMethods({ paymentMethods }: PaymentMethodsProps) {
  // Filter payment methods to only include those with images
  const methodsWithImages = paymentMethods.filter(method => method.image?.asset?.url);

  // If no payment methods with images, don't render anything
  if (methodsWithImages.length === 0) {
    return null;
  }

  return (
    <div className="py-16 bg-[#0D0D0D]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-light mb-4 bg-clip-text text-transparent uppercase bg-[linear-gradient(91.63deg,#773DFF,#362FFF)]">
            Populārākās maksājumu metodes
          </h2>
          <p className="text-[#F9F5FF]/70 max-w-2xl mx-auto text-lg leading-relaxed">
          Ātras un drošas maksājumu iespējas iemaksām un izmaksām
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          {methodsWithImages.map((method) => (
            <div 
              key={method._id}
              className="w-[calc(50%-8px)] md:w-[calc(25%-12px)] lg:w-[calc(25%-14px)] p-4 rounded-xl bg-[#1D053F]/80 backdrop-blur-sm border border-[#8126FF]/20 hover:border-[#8126FF]/40 hover:shadow-[0_0_15px_rgba(129,38,255,0.2)] transition-all duration-300"
            >
              <div className="relative w-full h-12 bg-white/5 rounded-lg flex items-center justify-center overflow-hidden p-2">
                <div className="relative w-full h-full">
                  <Image
                    src={method.image.asset.url}
                    alt={method.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 16vw"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
