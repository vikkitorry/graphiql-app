import { Button, Drawer } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { json } from '@codemirror/lang-json';
import CodeMirror from '@uiw/react-codemirror';
import classes from './query-headers.module.scss';

type QueryHeadersParams = {
  queryHeaders: Record<string, string>;
  setQueryHeaders: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

const QueryHeaders = ({ queryHeaders, setQueryHeaders }: QueryHeadersParams) => {
  const [openQueryHeaders, setOpenQueryHeaders] = useState(false);
  const [codemirrorValue, setCodemirrorValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleQueryHeaders = useCallback(() => {
    setErrorMessage('');

    try {
      const headers = JSON.parse(codemirrorValue);
      setQueryHeaders({ ...queryHeaders, ...headers });
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        setQueryHeaders({ 'Content-Type': 'application/json' });
      } else {
        throw error;
      }
    }
  }, [codemirrorValue, queryHeaders, setQueryHeaders]);

  useEffect(() => {
    handleQueryHeaders();
  }, [codemirrorValue]);

  const showHeaders = () => {
    setOpenQueryHeaders(true);
  };

  const onCloseDrawer = () => {
    setOpenQueryHeaders(false);
  };

  const onChangeHeaders = useCallback((value: string) => {
    setCodemirrorValue(value);
  }, []);

  return (
    <>
      <Button onClick={showHeaders} className={classes.headers}>
        Headers
      </Button>
      <Drawer
        title="Headers"
        placement="bottom"
        onClose={onCloseDrawer}
        open={openQueryHeaders}
        getContainer={false}
      >
        <CodeMirror theme="light" height="250px" extensions={[json()]} onChange={onChangeHeaders} />
        {codemirrorValue && errorMessage && <span className={classes.error}>{errorMessage}</span>}
      </Drawer>
    </>
  );
};

export default QueryHeaders;
