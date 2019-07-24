import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import "./index.css";

import CardEmission from "../CardEmission";

function Header(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired
};

export default function SimpleTabs() {
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className="container">
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Emitir Cartão" />
          <Tab label="Fazer Transação" />
        </Tabs>
      </AppBar>
      {value === 0 && (
        <Header>
          <CardEmission />
        </Header>
      )}
      {value === 1 && <Header>Fazer transação</Header>}
    </div>
  );
}
