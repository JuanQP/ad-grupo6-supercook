# UADE - 2022 1C - Aplicaciones Distribuídas - Grupo 6

TP de la Materia

## ¿Cómo correr este proyecto?

En primer lugar, crear un archivo `.env` (se puede usar el `.env.sample` como ejemplo), y poner la dirección IP del backend. Con esto, esta app ya queda conectada con el backend. En mi caso, cuando ejecuto el backend de manera local el archivo quedaría:

```
BACKEND_HOST=192.168.0.101:8000
```

En la carpeta, usando `cmd.exe`, `bash` o cualquier terminal, tirás:

```sh
npm install
npm start
```

Va a aparecer un código QR en la consola de `cmd.exe`. Te bajás la app "Expo" en tu celular, scaneás ese código QR, y listo, tenés la app andando.
