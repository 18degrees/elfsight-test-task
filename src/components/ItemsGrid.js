import { useState } from 'react';
import styled from 'styled-components';
import { Popup } from './popup';
import { useData } from './providers';
import { Card } from './Card';
import { useEffect } from 'react';
import { useCallback } from 'react';

const defaultPopupSettings = {
  visible: false,
  content: {}
};

export function ItemsGrid() {
  const { characters } = useData();
  const [popupSettings, setPopupSettings] = useState(defaultPopupSettings);

  const cardOnClickHandler = useCallback((props) => {
    return () => {
      setPopupSettings({
        visible: true,
        content: { ...props }
      });
    };
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setPopupSettings((prevState) => ({
          ...prevState,
          visible: false
        }));
      }
    });
  }, []);

  useEffect(() => {
    popupSettings.visible ? disableRootScroll() : enableRootScroll();

    function disableRootScroll() {
      document.querySelector('#root').style.overflow = 'hidden';
    }
    function enableRootScroll() {
      document.querySelector('#root').style.overflow = 'auto';
    }
  }, [popupSettings]);

  if (!characters.length) {
    return null;
  }

  return (
    <Container>
      {characters.map((props) => (
        <Card
          key={props.name}
          onClickHandler={cardOnClickHandler(props)}
          {...props}
        />
      ))}

      <Popup settings={popupSettings} setSettings={setPopupSettings} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  justify-items: center;
  gap: 30px;
`;
