"use client"

import { Shield, Clock, Ban, HeartHandshake } from 'lucide-react'

export default function ResponsibleGaming() {
  return (
    <div className="py-16 bg-gradient-to-b from-[#1E1E1E] to-[#2B2B2B]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Responsible Gaming</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We promote safe and responsible gaming practices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-6 rounded-xl bg-[#2B2B2B]/50 border border-[#FF1745]/10">
            <Shield className="w-8 h-8 text-[#FF1745] mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Self-Exclusion</h3>
            <p className="text-gray-400 text-sm">Tools to help you take a break when needed</p>
          </div>

          <div className="p-6 rounded-xl bg-[#2B2B2B]/50 border border-[#FF1745]/10">
            <Clock className="w-8 h-8 text-[#FF1745] mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Time Limits</h3>
            <p className="text-gray-400 text-sm">Set personal time limits for gaming sessions</p>
          </div>

          <div className="p-6 rounded-xl bg-[#2B2B2B]/50 border border-[#FF1745]/10">
            <Ban className="w-8 h-8 text-[#FF1745] mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Deposit Limits</h3>
            <p className="text-gray-400 text-sm">Control your spending with deposit limits</p>
          </div>

          <div className="p-6 rounded-xl bg-[#2B2B2B]/50 border border-[#FF1745]/10">
            <HeartHandshake className="w-8 h-8 text-[#FF1745] mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Support Resources</h3>
            <p className="text-gray-400 text-sm">Access to professional help and resources</p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-[#FF1745] text-white rounded-lg font-semibold hover:bg-[#D90429] transition-colors">
            Learn More About Safe Gaming
          </button>
        </div>
      </div>
    </div>
  )
}
