import { useState } from 'react';
import { Button, Drawer } from 'antd';
import CodeMirror from '@uiw/react-codemirror';
import classes from './config-editor.module.scss';

const ConfigEditor = () => {
  const [openVariables, setOpenVariables] = useState(false);
  const [openHeaders, setOpenHeaders] = useState(false);

  const showVariables = () => {
    setOpenVariables(true);
  };

  const showHeaders = () => {
    setOpenHeaders(true);
  };

  const onCloseDrawer = () => {
    setOpenVariables(false);
    setOpenHeaders(false);
  };

  return (
    <div className={classes.config}>
      <Button onClick={showVariables} className={classes.button}>
        Variables
      </Button>
      <Drawer
        title="Variables"
        placement="bottom"
        onClose={onCloseDrawer}
        open={openVariables}
        getContainer={false}
      >
        <CodeMirror theme="light" height="250px" />
      </Drawer>

      <Button onClick={showHeaders} className={classes.button}>
        Headers
      </Button>
      <Drawer
        title="Headers"
        placement="bottom"
        onClose={onCloseDrawer}
        open={openHeaders}
        getContainer={false}
      >
        <CodeMirror theme="light" height="250px" />
      </Drawer>
    </div>
  );
};

export default ConfigEditor;
