import { Button, Checkbox, Modal } from 'antd';
import React, { useState } from 'react';

import { CheckboxChangeEvent } from 'antd/lib/checkbox';

type Props = { open: boolean; onAccept: () => void };
const Cookies: React.FC<Props> = ({ open, onAccept }) => {
  const [accpeted, setAccepted] = useState(false);

  const onChange = (e: CheckboxChangeEvent) => {
    setAccepted(e.target.checked);
  };

  return (
    <Modal
      width={640}
      visible={open}
      closable={false}
      footer={[
        <Button key="submit" type="primary" onClick={onAccept} disabled={!accpeted}>
          ALLE COOKIES AKZEPTIEREN
        </Button>,
      ]}
    >
      <p>
        Wir nutzen auf unserer Webseite Techniken, mit deren Hilfe wir auf Daten in Ihrem Endgerät zugreifen oder dort
        ablegen. Dadurch werden auch personenbezogene Daten, zum Beispiel ihre IP-Adresse, verarbeitet. Einige sind
        notwendig für den Betrieb unserer Seite, während andere uns helfen, diese Seite zu verbessern. Wir verwenden
        dabei dann auch Technologien, durch die personenbezogene Daten in die USA übertragen werden können.
      </p>

      <p>
        Die USA werden vom Europäischen Gerichtshof als ein Land eingestuft, das den EU-Datenschutz-Standards nicht
        entsprechen soll. Es bestehe insbesondere das Risiko, dass Ihre personenbezogenen Daten an US-Behörden
        herausgegeben werden (müssen), ohne dass Sie sich dagegen in einem Rechtsbehelfsverfahren nach EU-Standards
        erwehren können.
      </p>

      <p>
        Über den genauen Umfang und Inhalt der Verarbeitung sowie der etwaigen Risiken klärt unsere Datenschutzerklärung
        auf.
      </p>

      <p>
        Ich bin mit der Nutzung meiner Daten nach Maßgabe der in der [
        <a href="https://cleafin0-my.sharepoint.com/:b:/g/personal/mustafa_bicik_cleafin_com/EaFM-QjzCwhNmbe3J0w5TgQBUrhnfuYwYhsYAbJabAZ0Ig?e=9oVg5h">
          Link zur Datenschutzerklärung
        </a>
        ] formulierten Einwilligungserklärung und der Übertragung meiner Daten in die USA nach Maßgabe der in der
        Datenschutzerklärung [
        <a href="https://cleafin0-my.sharepoint.com/:b:/g/personal/mustafa_bicik_cleafin_com/EaFM-QjzCwhNmbe3J0w5TgQBUrhnfuYwYhsYAbJabAZ0Ig?e=9oVg5h">
          Link zur Datenschutzerklärung
        </a>
        ] formulierten Einwilligungserklärung einverstanden. Hinweis: Ohne Ihre Einwilligung ist eine Nutzung der
        Webseite nicht möglich.
      </p>

      <p>Hinweis: Ohne Ihre Einwilligung ist eine Nutzung der Webseite nicht möglich.</p>

      <p>
        <Checkbox checked={accpeted} onChange={onChange}>
          Wir verwenden dabei dann auch Technologien, durch die personenbezogene Daten in die USA übertragen werden
          können.
        </Checkbox>
      </p>
    </Modal>
  );
};

export default Cookies;
