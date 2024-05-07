import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 2101 });

let state = {
  count: 0,
  isOn: false
};

wss.on('connection', (ws) => {
  console.log('Nuovo client connesso');

  ws.send(JSON.stringify(state));

  ws.on('message', (message) => {
    console.log('Messaggio ricevuto:', message);
    const data = JSON.parse(message);

    state.count = data.count;
    state.isOn = data.isOn;
    
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(JSON.stringify(state));
      }
    });
  });
});

console.log('Server WebSocket in ascolto sulla porta 2101');
