import * as React from 'react';
import styles from './VisioOnlineReactFunctionWebPart.module.scss';
import { IVisioOnlineReactFunctionWebPartProps } from './IVisioOnlineReactFunctionWebPartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { useEffect, useCallback, useReducer, useState } from "react";


  export default function VisioOnlineReactFunctionWebPart(props) {

  const [keyPressedValue, setKeyPressedValue] = useState("");

  const keydownListener = useCallback(
    keydownEvent => {
      const { code, key, keyCode, ctrlKey, altKey, srcElement, target, repeat } = keydownEvent;
      props.keyPressed = key;
      setKeyPressedValue(key);
      console.log('You just pressed the key:' + key);
      //      setKeyPressedValue(key);
    }, []);

  useEffect(() => {
    console.log('component mounted');
    window.addEventListener("keydown", keydownListener);
    if (props.documentUrl)
      props.visioService.load(props.documentUrl, props.zoomLevel);
    // return a function to execute at unmount
    return () => {
      console.log('component will unmount');
      window.removeEventListener("keydown", keydownListener);
    };
  }, []);

  useEffect(() => {

    console.log('component updated!');
    if (props.documentUrl && props.documentUrl) {
      props.visioService.load(props.documentUrl);
    }
    if (props.showShapeNameFlyout) {
      props.visioService.Options(props.showShapeNameFlyout);
    }
    if ((props.bHighLight) || (props.shapeName)) {
      props.visioService.highlightShape(props.shapeName, props.bHighLight);
    }
    if ((props.bOverlay) || (props.shapeName)) {
      props.visioService.addOverlay(props.shapeName, props.bOverlay, props.overlayType, props.overlayText,
        props.overlayWidth, props.overlayHeight);
    }


  }); // notice, no second argument

    return (
      <div className={styles.visioOnlineReactFunctionWebPart}>
        <div id='iframeHost' className={styles.iframeHost}></div>
        <div>keyPressedValue state:  {keyPressedValue}</div>
      </div>
    );   


}
