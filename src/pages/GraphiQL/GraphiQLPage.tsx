import { useState } from 'react';
import { Button, Drawer } from 'antd';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { Flex, Input } from 'antd';
import { json } from '@codemirror/lang-json';
import CodeMirror from '@uiw/react-codemirror';
import Documentation from '../../components/Documentation/Documentation';
import FunctionalEditor from '../../components/FunctionalEditor/FunctionalEditor';
import ConfigEditor from '../../components/ConfigEditor/ConfigEditor';
import classes from './graphiql-page.module.scss';

const GraphiQLPage = () => {
  const [documentationOpen, setDocumentationOpen] = useState(false);

  const toggleDocumentation = () => {
    setDocumentationOpen(!documentationOpen);
  };

  const onClose = () => {
    setDocumentationOpen(false);
  };

  return (
    <Flex className={classes.content}>
      <div className={classes.header}>
        <Input placeholder="Enter the API endpoint" className={classes.request} />
        <Button
          className={classes.documentationButton}
          type="default"
          icon={<AiOutlineQuestionCircle size={20} />}
          onClick={toggleDocumentation}
          style={{ backgroundColor: documentationOpen ? 'rgba(0, 0, 0, 0.078)' : 'transparent' }}
        />
      </div>
      <Flex className={classes.body}>
        <Flex className={classes.settings}>
          <FunctionalEditor />
          <ConfigEditor />
        </Flex>

        <Flex className={classes.result}>
          <CodeMirror
            theme="light"
            height="100%"
            className={classes.codemirror}
            extensions={[json()]}
            editable={false}
          />
        </Flex>

        <Drawer
          placement="right"
          closable={false}
          mask={false}
          onClose={onClose}
          open={documentationOpen}
          getContainer={false}
        >
          <Documentation />
        </Drawer>
      </Flex>
    </Flex>
  );
};

export default GraphiQLPage;
