import React from 'react';
import { Container, Content, Footer } from 'native-base';

const Layout = props => (
  <Container>
    <Content {...props} />{props.footer ? <Footer>{props.footer}</Footer> : null}
  </Container>
);
Layout.displayName = 'Layout';

export default Layout;
