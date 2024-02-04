const socket = io();

socket.on("connect", () => {
  console.log("Conexión establecida con éxito");
});

