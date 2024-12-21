"use client"

import Link from "next/link";
import Image from "next/image";
import { monaSans } from "@/app/fonts/monaSans";
import { motion } from "framer-motion";
import { imageAnimation, bodyAnimation } from "@/components/animations/animations";
import { AnimatedWords } from "@/components/animations/AnimatedWords";
import { Mail } from "lucide-react";

export const Hero = () => {
    return (
        <>
            <motion.section
                className="relative z-10 flex h-screen w-screen items-stretch justify-center bg-[url('/images/hero.jpg')] bg-cover bg-center py-0 backdrop-blur-lg"
                id="hero"
                initial="initial"
                animate="animate"
            >
                <motion.div className="absolute left-0 top-0 right-0 bottom-0 h-full w-full bg-[#0E1016] mix-blend-color"></motion.div>

                <div className="absolute top-10 flex justify-between sm:w-[80%] lg:max-w-[1440px]">
                    <div>
                        <Link
                            href="mailto:auliaikhsantirta@gmail.com"
                            target="_blank"
                            aria-label="Mail"
                        >
                            <motion.button
                                className="hidden rounded-md border-2 border-[#e4ded7] py-2 px-4 text-[14px] font-semibold text-[#e4ded7] sm:block  md:text-[16px] lg:flex flex-row gap-3"
                                variants={bodyAnimation}
                            >
                                <Mail />
                                <span>Mail</span>
                            </motion.button>
                        </Link>
                    </div>

                    <div className="flex gap-10 text-[#e4ded7] sm:gap-12 md:gap-14 lg:gap-14">
                        <Link
                            href="https://www.instagram.com/withtirta/"
                            target="_blank"
                            aria-label="View GitHub Profile"
                        >
                            <motion.p
                                className="text-[16px] font-bold text-[#e4ded7] md:text-[16px]"
                                variants={bodyAnimation}
                            >
                                IG
                            </motion.p>
                        </Link>
                        <Link
                            href="https://www.tiktok.com/@withtirta"
                            target="_blank"
                            aria-label="View LinkedIn Profile"
                        >
                            <motion.p
                                className="text-[16px] font-bold text-[#e4ded7] md:text-[16px]"
                                variants={bodyAnimation}
                            >
                                TK
                            </motion.p>
                        </Link>
                        <Link
                            href="https://www.linkedin.com/in/aulia-ikhsan-tirta-793b26206/"
                            target="_blank"
                            aria-label="View Twitter Profile"
                        >
                            <motion.p
                                className="text-[16px] font-bold text-[#e4ded7] md:text-[16px]"
                                variants={bodyAnimation}
                            >
                                LN
                            </motion.p>
                        </Link>
                        <Link
                            href="https://x.com/senchou21"
                            target="_blank"
                            aria-label="View Contra Profile"
                        >
                            <motion.p
                                className="text-[16px] font-bold text-[#e4ded7] md:text-[16px]"
                                variants={bodyAnimation}
                            >
                                TW
                            </motion.p>
                        </Link>
                    </div>
                </div>

                <div className="-mt-36 flex flex-col items-center justify-center sm:-mt-20 lg:my-40 lg:-mt-2 lg:py-40 ">
                    <div
                        className={`relative flex flex-col items-center justify-center  ${monaSans.className}`}
                    >
                        <AnimatedWords
                            title="AULIA IKHSAN TIRTA"
                            style="inline-block overflow-hidden pt-1 -mr-4 sm:-mr-5 md:-mr-7 lg:-mr-9 -mb-1 sm:-mb-2 md:-mb-3 lg:-mb-4"
                        />
                        <motion.div
                            className="absolute bottom-[-110px] mx-auto sm:bottom-[-100px] md:bottom-[-130px] lg:bottom-[-150px]"
                            variants={imageAnimation}
                        >
                            <Image
                                src={"/images/background.jpg"}
                                priority
                                width={600}
                                height={600}
                                alt="Victor's headshot"
                                data-blobity-tooltip="Giga Chad"
                                data-blobity-invert="false"
                                className=" w-[150px] rounded-[16px] grayscale hover:grayscale-0 md:w-[200px] md:rounded-[32px] lg:w-[245px] aspect-square object-cover opacity-80 hover:opacity-100 transition-all duration-300 ease-in-out"
                            />
                        </motion.div>
                    </div>
                </div>

                <div
                    className="absolute bottom-10 flex items-center justify-center md:bottom-10 lg:w-[90%] lg:max-w-[1440px] lg:justify-between"
                >
                    <motion.div
                        className="  max-w-[350px] md:max-w-[400px] lg:max-w-[400px]"
                        variants={bodyAnimation}
                    >
                        <p className="z-50 text-center text-[16px] font-medium text-[#e4ded7] md:text-[20px] lg:text-left">
                        Videographer, Photographer, Media Specialist, WEB3 Enthusiast.
                        </p>
                    </motion.div>

                    <motion.div
                        className="  hidden max-w-[500px] lg:block lg:max-w-[420px]"
                        variants={bodyAnimation}
                    >
                        <p className="text-right text-[16px] font-semibold text-[#e4ded7] md:text-[20px]">
                            With great power, comes great responsibility
                        </p>
                    </motion.div>
                </div>
            </motion.section>
        </>
    );
};