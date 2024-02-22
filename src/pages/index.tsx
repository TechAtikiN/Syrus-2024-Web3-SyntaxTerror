
import Features from '@/components/landing/Features';
import Hero from '@/components/landing/Hero';
import Navbar from '@/components/landing/Navbar';
import { ArrowUpRightIcon } from 'lucide-react';
import Link from 'next/link';
import { Footer } from 'react-day-picker';

export default function index() {

  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      {/* <Footer /> */}
    </div>
  )
}


