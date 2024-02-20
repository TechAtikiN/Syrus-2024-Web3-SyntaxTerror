import React from 'react'
import styles from "@/styles/loader.module.css";

const DashboardLoader = () => {
  return (
    <div className='flex w-full h-full justify-center items-center'>
    <div className={styles.spinner}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    </div>
    </div>
  )
}

export default DashboardLoader