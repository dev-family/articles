"use client"

import { CookieValueTypes, getCookie, setCookie } from "cookies-next"
import { useCallback, useEffect, useState } from "react"

import styles from "./CookieBanner.module.scss"
import CookieSettings from "./CookieSettings"

export enum CONSENT_TYPE {
  NECESSARY = "necessary",
  FUNCTIONAL = "functional",
  ANALYTICS = "analytics",
  MARKETING = "marketing",
}

export type TConsent = { [key in CONSENT_TYPE]: boolean }

const CONSENT_TO_USE_COOKIES = "consent-cookies"

function CookieBanner() {
  const [showSettings, setShowSettings] = useState(false)
  const [showBanner, setShowBanner] = useState(false)
  const [consent, setConsent] = useState<TConsent>({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    const cookieConsent = getCookie(CONSENT_TO_USE_COOKIES) as CookieValueTypes
    if (!cookieConsent) {
      setShowBanner(true)
    } else {
      const parsed = JSON.parse(cookieConsent)
      setConsent(parsed)
      updateGtmConsent("update", parsed)
    }
  }, [])

  const updateGtmConsent = (event: "update" | "default", consent: TConsent) => {
    if (typeof window === "undefined" || typeof window.gtag !== "function")
      return

    window.gtag("consent", event, {
      ad_storage: consent.marketing ? "granted" : "denied",
      ad_user_data: consent.marketing ? "granted" : "denied",
      ad_personalization: consent.marketing ? "granted" : "denied",
      analytics_storage: consent.analytics ? "granted" : "denied",
      personalization_storage: consent.functional ? "granted" : "denied", //так же можно отнести к marketing
      functionality_storage: consent.functional ? "granted" : "denied",
      security_storage: consent.necessary ? "granted" : "denied",
    })
  }

  const handleAcceptAll = useCallback(() => {
    const newConsent = { necessary: true, analytics: true, marketing: true, functional: true }

    setConsent(newConsent)
    setCookie(CONSENT_TO_USE_COOKIES, JSON.stringify(newConsent), {
      maxAge: 365,
    })
    updateGtmConsent("update", newConsent)

    setShowBanner(false)
  }, [])

  const handleRejectAll = () => {
    const newConsent = { necessary: true, analytics: false, marketing: false, functional: false }

    setConsent(newConsent)
    setCookie(CONSENT_TO_USE_COOKIES, JSON.stringify(newConsent), {
      maxAge: 365,
    })
    updateGtmConsent("update", newConsent)

    setShowBanner(false)
  }

  const handleOpenSettings = () => {
    setShowSettings(true)
  }

  const handleSettingsChange = useCallback((newConsent: TConsent) => {
    setConsent(newConsent)
    setCookie(CONSENT_TO_USE_COOKIES, JSON.stringify(newConsent), {
      maxAge: 365,
    })
    updateGtmConsent("update", newConsent)

    setShowSettings(false)
    setShowBanner(false)
  }, [])

  const handleCloseSettings = () => {
    setShowSettings(false)
  }

  if (!showBanner) {
    return null
  }

  return (
    <div className={`${styles.banner} ${showBanner && styles.isVisible}`}>
      <div className={styles.content}>
        {!showSettings ? (
          <>
            <h3 className={styles.title}>
              Мы используем cookie, чтобы сделать сайт удобнее 🍪
            </h3>
            <p className={styles.message}>
              Мы используем cookie-файлы для улучшения работы сайта и
              предоставления вам более релевантной информации. Вы можете
              настроить параметры cookie или отказаться от их использования.
              Если вы согласны с{" "}
              <a href="/" target="_blank" className={styles.link}>
                политикой обработки файлов cookie
              </a>
              , нажмите «Принять все cookie». <br />
              <br /> Хотите изменить настройки cookie?{" "}
              <button
                onClick={handleOpenSettings}
                className={styles.showSettings}
              >
                Настроить Cookie
              </button>
            </p>
            <div className={styles.actions}>
              <button
                onClick={handleRejectAll}
                className={`${styles.btn} ${styles.secondary}`}
              >
                Отклонить
              </button>
              <button
                onClick={handleAcceptAll}
                className={`${styles.btn} ${styles.primary}`}
              >
                Принять все cookie
              </button>
            </div>
          </>
        ) : (
          <CookieSettings
            consent={consent}
            onChange={handleSettingsChange}
            onClose={handleCloseSettings}
          />
        )}
      </div>
    </div>
  )
}

export default CookieBanner
