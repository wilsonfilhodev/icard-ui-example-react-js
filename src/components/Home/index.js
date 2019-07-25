import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import "./index.css";

import CardEmission from "../CardEmission";
import AuthorizeTransaction from "../AuthorizeTransaction";

function Home(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

Home.propTypes = {
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
          <Tab label="Emissão de Cartão" />
          <Tab label="Autorização de Venda" />
        </Tabs>
      </AppBar>
      {value === 0 && (
        <Home>
          <CardEmission />
        </Home>
      )}
      {value === 1 && (
        <Home>
          <AuthorizeTransaction />
        </Home>
      )}
    </div>
  );
}
