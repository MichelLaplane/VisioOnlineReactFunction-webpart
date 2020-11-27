import * as React from 'react';
import styles from './VisioOnlineReactFunctionWebPart.module.scss';
import { IVisioOnlineReactFunctionWebPartProps } from './IVisioOnlineReactFunctionWebPartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { useEffect, useCallback, useReducer, useState } from "react";


export function VisioOnlineReactFunctionWebPart(props) {
  //    export const VisioOnlineReactFunctionWebPart: React.FunctionComponent<IVisioOnlineReactFunctionWebPartProps> = (props: IVisioOnlineReactFunctionWebPartProps) => {

  const [documentUrl, setDocumentUrl] = useState("");
  const [keyPressedValue, setKeyPressedValue] = useState("");

  // Listener for grabing Keybord event
  const keydownListener = useCallback(
    keydownEvent => {
      const { code, key, keyCode, ctrlKey, altKey, srcElement, target, repeat } = keydownEvent;
      props.keyPressed = key;
      setKeyPressedValue(key);
      console.log('You just pressed the key:' + key + " keyPressedValue:" + keyPressedValue);

    }, []);

  // Use effect with the second argument of the useState hook (that is normally an array of a state(s) that changes) that is an empty dependency array:
  // It will be called once on mounting. This is a perfect replacement for a componentDidMount method
  // It also return a function that will be called when unmouting. This is a perfect replacement for a componentWillUnmount method
  useEffect(() => {
    console.log('component mounted');
    window.addEventListener("keydown", keydownListener);
    if (props.documentUrl) {
      setDocumentUrl(props.documentUrl);
      props.visioService.load(props.documentUrl, props.zoomLevel);
    }
    // return a function to execute at unmount
    return () => {
      console.log('component will unmount');
      window.removeEventListener("keydown", keydownListener);
    };
  }, []);

  // useEffect with nothing as the second argument so it will trigger whenever a component is updated.
  // This is a perfect replacement for a componentDidUpdate method
  useEffect(() => {
    console.log('component updated!');
    if (props.documentUrl && (props.documentUrl !== documentUrl)) {
      setDocumentUrl(props.documentUrl);
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


  });

  return (
    <div className={styles.visioOnlineReactFunctionWebPart}>
      <div id='iframeHost' className={styles.iframeHost}></div>
      <div>keyPressedValue state:  {keyPressedValue}</div>
    </div>
  );


}
