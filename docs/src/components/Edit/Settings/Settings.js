import React, { useEffect, useState } from 'react'
import { useSpring, animated, config } from 'react-spring'
import styles from './Settings.module'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons'
import { BackgroundClickDetector } from '../../BackgroundClickDetector'

function TransitionSettings({ inSettings, spring }) {
  useEffect(() => {
  spring.start({
    opacity: inSettings ? 1 : 0,
    top: inSettings ? 0 : -50
  })
  }, [ inSettings ])
  return <></>
}

function CloseButton({ setInSettings }) {
  const [ hover, setHover ] = useState(false)
  return (
    <button
      className={styles.close}
      onClick={() => setInSettings(false)}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      >
      <FontAwesomeIcon icon={faRectangleXmark}></FontAwesomeIcon> 
      <p className={hover ? styles.see : styles.noSee}>close</p>
    </button>
  )
}

function SwitchButton({ on, onClick }) {
  return (
    <div
      className={styles.switchButton}
      onClick={onClick}
    >
      <button className={on ? styles.on : styles.off}>
        {on ? 'on' : 'off'}
      </button>
    </div>
  )
}
  
function Settings({ inSettings, setInSettings, setSettings, settings }) {
  const [ x, spring ] = useSpring(() => ({
    opacity: 0,
    top: -50
  }))
  const [ renderedSettings, setRenderedSettings ] = useState()
  useEffect(() => {
    console.log(settings)
    const toSettings = Object.keys(settings).map((setting, index) => 
      (
        <div key={index} className={styles.setting}>
          <div className={styles.firstRow}>
            <p>
              { setting }
            </p>
            <SwitchButton
              onClick={() => {
                const newSettings = { ...settings }
                newSettings[setting].value = !(newSettings[setting].value)
                setSettings(newSettings)
              }}
              on={settings[setting].value}
              ></SwitchButton>
          </div>
          {settings[setting].html}
        </div>
      )
    ) 
    setRenderedSettings(toSettings)
  }, [ settings ])
  return (
    <>
      <animated.div
        id='divSettings'
        className={inSettings ? styles.divSettingsOpen : styles.divSettingsClose}
        style={x}
        >
        <TransitionSettings inSettings={inSettings} spring={spring}></TransitionSettings>
        <CloseButton setInSettings={setInSettings}></CloseButton>
        <div id='settings' className={styles.settings}>
          {renderedSettings}
        </div>
      </animated.div>
      <BackgroundClickDetector
        on={inSettings}
        zIndex={14}
        mousedown={() => setInSettings(false)}
        blur={true}
        ></BackgroundClickDetector>
    </>
  );
}

export { Settings }