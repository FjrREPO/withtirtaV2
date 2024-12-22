"use client";
import React from "react"
import styles from "./style.module.scss";
import Link from "next/link";

interface ProjectProps {
    index: number
    title: string
    manageModal: (active: boolean, index: number, x: number, y: number) => void
    path: string
}

export const Project = ({ index, title, manageModal, path }: ProjectProps) => {

    return (
        <Link href={path} onMouseEnter={(e) => { manageModal(true, index, e.clientX, e.clientY) }} onMouseLeave={(e) => { manageModal(false, index, e.clientX, e.clientY) }} className={styles.project}>
            <h2>{title}</h2>
            <p>Digital Creator</p>
        </Link>
    )
}
