import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./index.css";
import "../../../src/global-styles.css";
import axios from "axios";

import DialogMessage from "../DialogMessage";

export default function AuthorizeTransaction() {
  const [openAlert, setOpenAlert] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [alertMessage, setAlertMessage] = React.useState({
    title: "",
    message: ""
  });

  const [values, setValues] = React.useState({
    cardNumber: "",
    expirantionDate: "",
    cvv: "",
    client: "",
    saleValue: "",
    password: ""
  });

  const handleClear = () => {
    setValues({
      cardNumber: "",
      expirantionDate: "",
      cvv: "",
      client: "",
      saleValue: "",
      password: ""
    });
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleSubmit = event => {
    if (!loading) {
      setLoading(true);
      event.preventDefault();

      axios
        .post(`http://localhost:8080/api/cards/authorization`, {
          cartao: values.cardNumber,
          validade: values.expirantionDate,
          cvv: values.cvv,
          estabelecimento: values.client,
          valor: values.saleValue,
          senha: values.password
        })
        .then(res => {
          const { saldo } = res.data;
          setAlertMessage({
            title: "Transação autorizada!",
            message: `Seu novo saldo é R$ ${saldo}.`
          });
          setLoading(false);
          setOpenAlert(true);
          handleClear();
        })
        .catch(res => {
          if (res.response) {
            const { codigo, erros } = res.response.data;
            setAlertMessage({ title: `ERRO ${codigo}`, message: erros[0] });
          } else {
            setAlertMessage({
              title: "Ops!",
              message: "Erro inesperado. Tente novamente mais tarde."
            });
          }
          setLoading(false);
          setOpenAlert(true);
        });
    }
  };

  return (
    <div>
      <Card className="card">
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Nova venda
          </Typography>

          <form noValidate autoComplete="off">
            <TextField
              required
              id="client"
              label="Estabelecimento"
              style={{ margin: 8 }}
              placeholder="EMPRESA EXEMPLO LTDA"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              value={values.client}
              onChange={handleChange("client")}
            />
            <TextField
              required
              id="saleValue"
              label="Valor"
              style={{ margin: 8 }}
              placeholder="250.90"
              helperText="Digite o valor no padrão americano."
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              type="number"
              value={values.saleValue}
              onChange={handleChange("saleValue")}
            />
            <TextField
              required
              id="cardNumber"
              label="Cartão"
              style={{ margin: 8 }}
              placeholder="5555550987563214"
              helperText="Digite apenas os números."
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              type="number"
              value={values.cardNumber}
              onChange={handleChange("cardNumber")}
            />
            <TextField
              required
              id="expirantionDate"
              label="Validade"
              style={{ margin: 8 }}
              placeholder="08/22"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              value={values.expirantionDate}
              onChange={handleChange("expirantionDate")}
            />
            <TextField
              required
              id="cvv"
              label="CVV"
              style={{ margin: 8 }}
              placeholder="321"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              type="number"
              value={values.cvv}
              onChange={handleChange("cvv")}
            />
            <TextField
              required
              id="password"
              label="Senha"
              style={{ margin: 8 }}
              placeholder="1234"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              type="password"
              value={values.password}
              onChange={handleChange("password")}
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
      <DialogMessage
        open={openAlert}
        title={alertMessage.title}
        message={alertMessage.message}
        handleCloseAlert={handleCloseAlert}
      />
    </div>
  );
}
