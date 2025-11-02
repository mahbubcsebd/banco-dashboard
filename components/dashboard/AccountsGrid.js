'use client';

import { accounts } from '@/data/mockData';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import AccountCard from './AccountCard';

export default function AccountsGrid() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const x = useMotionValue(0);

  const handleDragEnd = (event, info) => {
    const threshold = 50;
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    if (Math.abs(velocity) > 500 || Math.abs(offset) > threshold) {
      if (offset > threshold || velocity > 500) {
        setDirection(-1);
        if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
        } else {
          setCurrentIndex(accounts.length - 1);
        }
      } else if (offset < -threshold || velocity < -500) {
        // Swipe left - go to next
        setDirection(1);
        if (currentIndex < accounts.length - 1) {
          setCurrentIndex(currentIndex + 1);
        } else {
          setCurrentIndex(0);
        }
      }
    }

    // Reset position
    animate(x, 0, { type: 'spring', stiffness: 300, damping: 30 });
  };

  // Transform for rotation based on drag
  const rotateY = useTransform(x, [-200, 0, 200], [20, 0, -20]);
  const scale = useTransform(x, [-200, 0, 200], [0.9, 1, 0.9]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-gray-900">My Accounts</h2>
        </div>
        <Link href="/my-accounts">
          <motion.div
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1 text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors duration-200 px-3 py-1.5 rounded-lg hover:bg-orange-50"
          >
            View All
            <ChevronRight className="w-3.5 h-3.5" />
          </motion.div>
        </Link>
      </div>

      <div className="hidden sm:grid sm:grid-cols-2 md:hidden lg:grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
        {accounts.map((account, index) => (
          <motion.div
            key={account.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <AccountCard account={account} index={index} />
          </motion.div>
        ))}
      </div>

      <div className="sm:hidden md:block lg:hidden">
        <div className="relative h-[210px] perspective-1000">
          <div className="absolute inset-0 pointer-events-none">
            {currentIndex + 2 < accounts.length && (
              <motion.div
                initial={{ scale: 0.86, y: 16, opacity: 0.3 }}
                animate={{ scale: 0.86, y: 16, opacity: 0.3 }}
                className="absolute inset-0 px-2"
                style={{ filter: 'brightness(0.7)' }}
              >
                <div className="h-full rounded-2xl overflow-hidden shadow-xl">
                  <AccountCard
                    account={accounts[currentIndex + 2]}
                    index={currentIndex + 2}
                  />
                </div>
              </motion.div>
            )}

            {currentIndex + 1 < accounts.length && (
              <motion.div
                initial={{ scale: 0.93, y: 8, opacity: 0.6 }}
                animate={{ scale: 0.93, y: 8, opacity: 0.6 }}
                className="absolute inset-0 px-2"
                style={{ filter: 'brightness(0.85)' }}
              >
                <div className="h-full rounded-2xl overflow-hidden shadow-xl">
                  <AccountCard
                    account={accounts[currentIndex + 1]}
                    index={currentIndex + 1}
                  />
                </div>
              </motion.div>
            )}
          </div>

          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            style={{
              x,
              rotateY,
              scale,
              transformStyle: 'preserve-3d',
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <motion.div
              className="h-full rounded-2xl overflow-hidden shadow-2xl"
              whileTap={{ scale: 0.98 }}
            >
              <AccountCard
                account={accounts[currentIndex]}
                index={currentIndex}
              />
            </motion.div>
          </motion.div>

          <button
            onClick={() => {
              setDirection(-1);
              setCurrentIndex(
                currentIndex > 0 ? currentIndex - 1 : accounts.length - 1
              );
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center z-10 opacity-0 hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-4 h-4 rotate-180 text-gray-700" />
          </button>

          <button
            onClick={() => {
              setDirection(1);
              setCurrentIndex(
                currentIndex < accounts.length - 1 ? currentIndex + 1 : 0
              );
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center z-10 opacity-0 hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-4 h-4 text-gray-700" />
          </button>
        </div>

        {/* Enhanced Pagination Dots */}
        <div className="flex justify-center items-center gap-1.5 mt-6">
          {accounts.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-6 bg-linear-to-r from-orange-500 to-orange-600 shadow-sm'
                  : 'w-1.5 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}
