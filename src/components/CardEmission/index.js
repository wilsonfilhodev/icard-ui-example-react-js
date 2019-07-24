import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import "./index.css";
import axios from "axios";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

export default function CardEmission() {
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const [values, setValues] = React.useState({
    name: "",
    balance: ""
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClear = () => {
    setValues({ name: "", balance: "" });
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();

    axios
      .post(`http://localhost:8080/api/cards`, {
        nome: values.name,
        saldo: values.balance
      })
      .then(res => {
        console.log(res.data);
        handleOpen();
      })
      .catch(res => {
        alert(res.response.data.errors[0]);
      });
  };

  return (
    <div>
      <Card className="card">
        <CardContent>
          <Typography className="title" color="textSecondary" gutterBottom>
            Novo cartão
          </Typography>
          <form className="container" noValidate autoComplete="off">
            <TextField
              required
              id="name"
              label="Nome"
              value={values.name}
              onChange={handleChange("name")}
              className="text-field"
              margin="normal"
            />
            <TextField
              required
              id="balance"
              label="Saldo"
              value={values.balance}
              onChange={handleChange("balance")}
              type="number"
              className="text-field"
              margin="normal"
            />
          </form>
        </CardContent>
        <CardActions>
          <Button onClick={handleSubmit} size="small">
            Salvar
          </Button>
          <Button onClick={handleClear} size="small">
            Limpar
          </Button>
        </CardActions>
      </Card>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className="paper">
          <h4 className="title-modal" id="modal-title">
            Cartão criado
          </h4>
          <p className="fields-card" id="simple-modal-description">
            Nome: Teste
          </p>
          <p className="fields-card" id="simple-modal-description">
            Número: Teste
          </p>
          <p className="fields-card" id="simple-modal-description">
            CVV: Teste
          </p>
          <p className="fields-card" id="simple-modal-description">
            Validade: Teste
          </p>
          <p className="fields-card" id="simple-modal-description">
            Senha: Teste
          </p>
          <p className="fields-card" id="simple-modal-description">
            Saldo: Teste
          </p>
        </div>
      </Modal>
    </div>
  );
}
