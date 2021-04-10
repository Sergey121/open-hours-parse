import React, { useCallback, useState } from 'react';
import Form from './components/form';
import './scss/app.scss';
import FileSelector from './components/file-selector';
import { Week } from './models';

function App() {
  const [data, setData] = useState<Week | null>(null);

  const handleChangeData = useCallback((data) => {
    setData(data);
  }, []);

  return (
    <div className="app">
      <FileSelector onChanged={handleChangeData}/>
      {data && <Form week={data}/>}
    </div>
  );
}

export default App;
