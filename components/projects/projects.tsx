"use client";

import styles from "./style.module.scss";
import { useState, useEffect, useRef } from "react";
import { Project } from "./components/project/project";
import { motion } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import { RoundedButton } from "../../common/RoundedButton/rounded-button";

interface ProjectType {
  title: string;
  src: string;
  color: string;
}

interface ModalState {
  active: boolean;
  index: number;
}

interface GSAPAnimation {
  (value: number): void;
}

const projects: ProjectType[] = [
  {
    title: "Contoh 1",
    src: "background.jpg",
    color: "#000000"
  },
  {
    title: "Contoh 2",
    src: "background.jpg",
    color: "#8C8C8C"
  },
  {
    title: "Contoh 3",
    src: "background.jpg",
    color: "#EFE8D3"
  },
  {
    title: "Contoh 4",
    src: "background.jpg",
    color: "#706D63"
  }
];

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] }
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] }
  }
};

export const Projects: React.FC = () => {
  const [modal, setModal] = useState<ModalState>({ active: false, index: 0 });
  const { active, index } = modal;

  const modalContainer = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorLabel = useRef<HTMLDivElement>(null);

  const xMoveContainer = useRef<GSAPAnimation | null>(null);
  const yMoveContainer = useRef<GSAPAnimation | null>(null);
  const xMoveCursor = useRef<GSAPAnimation | null>(null);
  const yMoveCursor = useRef<GSAPAnimation | null>(null);
  const xMoveCursorLabel = useRef<GSAPAnimation | null>(null);
  const yMoveCursorLabel = useRef<GSAPAnimation | null>(null);

  useEffect(() => {
    if (!modalContainer.current || !cursor.current || !cursorLabel.current) return;

    // Move Container
    xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.8,
      ease: "power3"
    });
    yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.8,
      ease: "power3"
    });
    // Move cursor
    xMoveCursor.current = gsap.quickTo(cursor.current, "left", {
      duration: 0.5,
      ease: "power3"
    });
    yMoveCursor.current = gsap.quickTo(cursor.current, "top", {
      duration: 0.5,
      ease: "power3"
    });
    // Move cursor label
    xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3"
    });
    yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3"
    });
  }, []);

  const moveItems = (x: number, y: number): void => {
    if (
      !xMoveContainer.current ||
      !yMoveContainer.current ||
      !xMoveCursor.current ||
      !yMoveCursor.current ||
      !xMoveCursorLabel.current ||
      !yMoveCursorLabel.current
    )
      return;

    xMoveContainer.current(x);
    yMoveContainer.current(y);
    xMoveCursor.current(x);
    yMoveCursor.current(y);
    xMoveCursorLabel.current(x);
    yMoveCursorLabel.current(y);
  };

  const manageModal = (active: boolean, index: number, x: number, y: number): void => {
    moveItems(x, y);
    setModal({ active, index });
  };

  return (
    <section
      id="projects"
      onMouseMove={(e: React.MouseEvent) => {
        moveItems(e.clientX, e.clientY);
      }}
      className={styles.projects}
    >
      <div className={styles.body}>
        {projects.map((project, index) => (
          <Project
            index={index}
            title={project.title}
            manageModal={manageModal}
            key={index}
          />
        ))}
      </div>
      <div className="mb-20">
        <RoundedButton>
          <p>More work</p>
        </RoundedButton>
      </div>
      <>
        <motion.div
          ref={modalContainer}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}
          className={styles.modalContainer}
        >
          <div
            style={{ top: `${index * -100}%` }}
            className={styles.modalSlider}
          >
            {projects.map((project, index) => {
              const { src, color } = project;
              return (
                <div
                  className={styles.modal}
                  style={{ backgroundColor: color }}
                  key={`modal_${index}`}
                >
                  <Image
                    src={`/images/${src}`}
                    width={300}
                    height={0}
                    alt="image"
                  />
                </div>
              );
            })}
          </div>
        </motion.div>
        <motion.div
          ref={cursor}
          className={styles.cursor}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}
        />
        <motion.div
          ref={cursorLabel}
          className={styles.cursorLabel}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}
        >
          View
        </motion.div>
      </>
    </section>
  );
};