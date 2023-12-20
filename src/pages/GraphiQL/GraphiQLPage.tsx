import { useState } from 'react';
import { Button, Drawer } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import Documentation from '../../components/Documentation/Documentation';
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
    <>
      <div className={classes.header}>
        <Button
          className={classes.documentationButton}
          type="default"
          icon={<QuestionCircleOutlined />}
          onClick={toggleDocumentation}
          style={{ backgroundColor: documentationOpen ? 'rgba(0, 0, 0, 0.078)' : 'transparent' }}
        />
      </div>
      <div className={classes.container}>
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
      </div>
    </>
  );
};

export default GraphiQLPage;
