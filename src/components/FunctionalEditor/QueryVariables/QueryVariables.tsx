import { Button, Drawer } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { json } from '@codemirror/lang-json';
import CodeMirror from '@uiw/react-codemirror';
import classes from './query-variables.module.scss';

type QueryVariablesParams = {
  setQueryVariables: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

const QueryVariables = ({ setQueryVariables }: QueryVariablesParams) => {
  const [openQueryVariables, setOpenQueryVariables] = useState(false);
  const [codemirrorValue, setCodemirrorValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleQueryVariables = useCallback(() => {
    setErrorMessage('');

    try {
      const variables = JSON.parse(codemirrorValue);
      setQueryVariables(variables);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        setQueryVariables({});
      } else {
        throw error;
      }
    }
  }, [codemirrorValue, setQueryVariables]);

  useEffect(() => {
    handleQueryVariables();
  }, [codemirrorValue]);

  const showVariables = () => {
    setOpenQueryVariables(true);
  };

  const onCloseDrawer = () => {
    setOpenQueryVariables(false);
  };

  const onChangeVariables = useCallback((value: string) => {
    setCodemirrorValue(value);
  }, []);

  return (
    <>
      <Button onClick={showVariables} className={classes.variables}>
        Variables
      </Button>
      <Drawer
        title="Variables"
        placement="bottom"
        onClose={onCloseDrawer}
        open={openQueryVariables}
        getContainer={false}
      >
        <CodeMirror
          theme="light"
          height="250px"
          extensions={[json()]}
          onChange={onChangeVariables}
        />
        {codemirrorValue && errorMessage && <span className={classes.error}>{errorMessage}</span>}
      </Drawer>
    </>
  );
};

export default QueryVariables;
