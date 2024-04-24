function formatarData(dataArray: any) {
  const data = new Date(
    Date.UTC(
      dataArray[0], // ano
      dataArray[1] - 1, // mês (0-11)
      dataArray[2], // dia
      dataArray[3], // hora
      dataArray[4], // minuto
      dataArray[5], // segundo
      dataArray[6] / 1000000 // milissegundo
    )
  );

  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getDate()).padStart(2, "0");
  const hora = String(data.getHours()).padStart(2, "0");
  const minuto = String(data.getMinutes()).padStart(2, "0");

  return `${dia}-${hora}:${minuto}`;
}

export default formatarData;
