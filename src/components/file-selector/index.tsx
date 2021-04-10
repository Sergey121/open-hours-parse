import React, { ChangeEvent } from 'react';
import { Week } from '../../models';
import styles from './file-selector.module.scss';

type Props = {
  onChanged: (data: Week) => void;
  className?: string;
};

function FileSelector(props: Props) {
  const { onChanged, className } = props;
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.addEventListener('load', (a) => {
        try {
          const result = JSON.parse(reader.result as string);
          onChanged(result);
        } catch (e) {
          window.alert(e.message);
        }
      });

      reader.addEventListener('error', () => {
        window.alert('Something went wrong.');
      });

      reader.readAsText(file);
    }
  };

  return (
    <div className={styles.wrapper}>
      <input className={styles.file} type="file" accept="application/json" onChange={handleChange}/>
      <label className={styles.label} htmlFor="file">
        Select JSON file
      </label>
    </div>

  );
}

export default FileSelector;
