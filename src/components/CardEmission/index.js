import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./index.css";
import "../../../src/global-styles.css";
import axios from "axios";

export default function CardEmission() {
  const [openAlert, setOpenAlert] = React.useState(false);
  const [openAlertCardEmitted, setOpenAlertCardEmitted] = React.useState(false);
  const [erroMessage, setErroMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [values, setValues] = React.useState({
    name: "",
    balance: ""
  });

  const [cardEmitted, setCardEmitted] = React.useState({
    cvv: "",
    name: "",
    cardNumber: "",
    balance: "",
    password: "",
    expirantionDate: ""
  });

  const handleOpenAlertCardEmitted = () => {
    setOpenAlertCardEmitted(true);
  };

  const handleCloseAlertCardEmitted = () => {
    setOpenAlertCardEmitted(false);
  };

  const handleClear = () => {
    setValues({ name: "", balance: "" });
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleOpenAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleSubmit = event => {
    if (!loading) {
      setLoading(true);

      event.preventDefault();

      axios
        .post(`http://localhost:8080/api/cards`, {
          nome: values.name,
          saldo: values.balance
        })
        .then(res => {
          const { nome, numero, cvv, validade, senha, saldo } = res.data;
          setCardEmitted({
            name: nome,
            cardNumber: numero,
            cvv,
            expirantionDate: validade,
            password: senha,
            balance: saldo
          });
          setLoading(false);
          handleClear();
          handleOpenAlertCardEmitted();
        })
        .catch(res => {
          if (res.response) {
            setErroMessage(res.response.data.erros[0]);
          } else {
            setErroMessage("Erro inesperado. Tente novamente mais tarde.");
          }
          setLoading(false);
          handleOpenAlert();
        });
    }
  };

  return (
    <div>
      <Card className="card">
        <CardContent>
          <Typography className="title" color="textSecondary" gutterBottom>
            Novo cartão
          </Typography>
          <form noValidate autoComplete="off">
            <TextField
              required
              id="name"
              label="Nome"
              style={{ margin: 8 }}
              placeholder="PAUL R. SMITH"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              value={values.name}
              onChange={handleChange("name")}
            />
            <TextField
              required
              id="balance"
              label="Saldo Inicial"
              style={{ margin: 8 }}
              placeholder="1750.00"
              helperText="Digite o valor no padrão americano."
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              type="number"
              value={values.balance}
              onChange={handleChange("balance")}
            />
          </form>
        </CardContent>
        <CardActions>
          <div className="wrapper-button">
            <Button
              variant="contained"
              color="primary"
              disabled={loading}
              onClick={handleSubmit}
            >
              Salvar
            </Button>
            {loading && (
              <CircularProgress size={24} className="button-progress" />
            )}
          </div>
          <Button onClick={handleClear} size="small">
            Limpar
          </Button>
        </CardActions>
      </Card>
      <Dialog
        open={openAlertCardEmitted}
        onClose={handleCloseAlertCardEmitted}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Parabéns! Cartão emitido"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <span className="fields-card" id="simple-modal-description">
              Nome: {cardEmitted.name}
            </span>
            <span className="fields-card" id="simple-modal-description">
              Número: {cardEmitted.cardNumber}
            </span>
            <span className="fields-card" id="simple-modal-description">
              CVV: {cardEmitted.cvv}
            </span>
            <span className="fields-card" id="simple-modal-description">
              Validade: {cardEmitted.expirantionDate}
            </span>
            <span className="fields-card" id="simple-modal-description">
              Senha: {cardEmitted.password}
            </span>
            <span className="fields-card" id="simple-modal-description">
              Saldo: {cardEmitted.balance}
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlertCardEmitted} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openAlert}
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Ops!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {erroMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
