// app/page.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { DM_Sans, Forum } from "next/font/google";
import { Icon } from "@iconify-icon/react";
import Script from "next/script";

const forum = Forum({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  function openForum() {
    const formId = "war572";
    // @ts-expect-error: Tally is not defined in the current scope
    // eslint-disable-next-line no-undef
    Tally.openPopup(formId, {
      layout: "modal",
    });
  }

  return (
    <>
      {/* Font Awesome CDN */}
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          rel="stylesheet"
        />
        <Script
          src="https://tally.so/widgets/embed.js"
          strategy="afterInteractive"
        />
      </head>

      <div className="flex items-center justify-center md:h-screen md:overflow-hidden overflow-x-hidden my-10 md:my-0">
        <motion.div
          style={{
            backgroundImage: "url('/images/event-gradient.png')",
            borderRadius: "50%",
            aspectRatio: "1 / 1",
          }}
          className="text-center md:p-10 shadow-lg p-20 flex items-center justify-center flex-col bg-cover bg-center bg-no-repeat relative w-[800px] h-[800px] md:w-[110vh] md:h-[110vh]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col w-[98vw] justify-center items-center gap-y-[32px] px-[16px]">
            <motion.div
              className="flex items-center justify-center space-x-2 mb-4"
              variants={itemVariants}
            >
              <img src="/images/logo.svg" alt="Simplr Events Logo" />
              <span className="text-red-500 text-[32px] font-bold">❤️</span>
              <span
                className={`text-white text-[32px] font-normal ${forum.className}`}
              >
                COLDPLAY
              </span>
            </motion.div>
            <div className="flex flex-col justify-center items-center gap-y-3">
              <motion.h1
                className={`text-[64px] text-white font-bold ${forum.className} tracking-[-3%] leading-[100%]`}
                variants={itemVariants}
              >
                Get in before it&apos;s gone.
              </motion.h1>

              <motion.p
                className={`text-[#FFFEA8] text-[32px] font-normal ${forum.className} tracking-[-2%] leading-[100%]`}
                variants={itemVariants}
              >
                Simplr Events offers verified tickets,
                <br /> transparent pricing, hassle-free buying.
              </motion.p>

              <motion.p
                className={`text-white text-[16px] ${dmSans.className} leading-[23.2px]`}
                variants={itemVariants}
              >
                Life rarely gives do-overs, but hey, we&apos;re feeling
                generous.
                <br />
                Missed those Coldplay tickets? There&apos;s always someone
                selling an extra ticket.
                <br />
                We&apos;re giving you a second chance—don&apos;t blow it.
                <span className="text-yellow-400"> 😉 </span>
              </motion.p>
            </div>
            <motion.div variants={itemVariants}>
              {/* <div className="flex md:flex-row flex-col md:items-center md:justify-between w-full max-w-[540px] md:py-1 md:pl-6 md:pr-1 gap-x-2 gap-y-2">
								<input
									type="email"
									placeholder="Enter your email for early access..."
									className="p-4 md:py-4 flex-1 rounded-[16px] text-gray-700 md:pr-4 w-full outline-none"
								/>
							</div> */}
              <button
                onClick={openForum}
                className="h-full bg-gradient-to-r from-[#EEFFBC] to-[#FFFC45] p-[6px] text-text-blue text-lg font-bold rounded-full flex items-center shadow-inner-custom w-full md:w-auto"
              >
                <div className="justify-center py-[10px] px-[18px] bg-gradient-to-r from-[#DEFF3B] to-[#EEFFBC] rounded-full flex items-center gap-x-2 w-full md:w-auto">
                  <Icon icon="mdi:ticket" width={32} height={32} />
                  Get Early Access
                </div>
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
