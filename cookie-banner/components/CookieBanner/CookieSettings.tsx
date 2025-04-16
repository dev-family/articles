"use client"

import { useState } from "react"

import { CONSENT_TYPE, TConsent } from "./CookieBanner"
import styles from "./CookieBanner.module.scss"

interface CookieSettingsProps {
  consent: TConsent
  onChange: (value: TConsent) => void
  onClose: () => void
}

function CookieSettings({
  consent: initialConsent,
  onChange,
  onClose,
}: CookieSettingsProps) {
  const [consent, setConsent] = useState(initialConsent)

  const handleChange = (type: CONSENT_TYPE) => {
    setConsent((prev) => ({ ...prev, [type]: !prev[type] }))
  }

  const handleSave = () => {
    onChange(consent)
  }

  return (
    <>
      <button onClick={onClose} className={styles.hideSettings}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.5 16.5L4 12M4 12L8.5 7.5M4 12L20 12"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>Назад</span>
      </button>

      <h3 className={styles.title}>Настройки файлов cookie</h3>

      <div className={styles.category}>
        <label className={styles.checkbox}>
          <input type="checkbox" checked={consent.necessary} disabled />
          <span>Технические файлы cookie (обязательные)</span>
        </label>
        <p>
          Эти файлы cookie необходимы для корректной работы сайта и не могут
          быть отключены. Они обеспечивают авторизацию и базовые функции сайта.
          Мы не используем их для маркетинговых целей или отслеживания вашей
          активности на других сайтах. Вы можете настроить браузер для их
          блокировки, но это может привести к некорректной работе сайта.
        </p>
      </div>

      <div className={styles.category}>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={consent.analytics}
            onChange={() => handleChange(CONSENT_TYPE.FUNCTIONAL)}
          />
          <span>Функциональные файлы cookie</span>
        </label>
        <p>
          Эти файлы cookie используются для запоминания ваших предпочтений и
          улучшения пользовательского опыта, например, сохранения выбранного
          языка, региона или настроек отображения. Они делают взаимодействие с
          сайтом более удобным и персонализированным. Отключение этих файлов
          cookie может повлиять на некоторые функции сайта и удобство его
          использования.
        </p>
      </div>

      <div className={styles.category}>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={consent.analytics}
            onChange={() => handleChange(CONSENT_TYPE.ANALYTICS)}
          />
          <span>Аналитические файлы cookie</span>
        </label>
        <p>
          Эти файлы cookie используются для анализа предпочтений пользователей и
          помогают нам улучшать работу сайта. Они позволяют нам лучше понимать,
          какие разделы и функции наиболее востребованы, а также
          персонализировать рекомендации контента. Отключение аналитических
          cookie может повлиять на точность наших предложений и рекомендаций.
        </p>
      </div>

      <div className={styles.category}>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={consent.marketing}
            onChange={() => handleChange(CONSENT_TYPE.MARKETING)}
          />
          <span>Маркетинговые файлы cookie</span>
        </label>
        <p>
          Эти файлы cookie используются для показа персонализированной рекламы,
          анализа эффективности маркетинговых кампаний и определения ваших
          интересов на основе взаимодействия с сайтом. Они помогают нам
          предоставлять вам более релевантные рекламные предложения и
          ограничивать количество повторных показов одних и тех же рекламных
          материалов. Отключение маркетинговых файлов cookie может привести к
          снижению качества отображаемой рекламы.
        </p>
      </div>

      <button
        onClick={handleSave}
        className={`${styles.btn} ${styles.primary}`}
      >
        Сохранить настройки cookie
      </button>
      <p className={styles.notice}>
        Нажимая на кнопку «Сохранить настройки cookie», вы даёте согласие на
        обработку файлов cookie в соответствии с{" "}
        <a href="/" target="_blank" className={styles.link}>
          политикой обработки файлов cookie.
        </a>
      </p>
    </>
  )
}

export default CookieSettings
