import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pc  from 'picocolors'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'ascii-art',
      configureServer(server) {
        server.httpServer?.once('listening', () => {
          setTimeout(() => {
            console.clear()
            // eslint-disable-next-line no-useless-escape
            console.log("\n\n                                \/^L_      ,.\"\\\r\n           \/~\\       __       \/~    \\   .\/    \\\r\n          \/   _\\   _\/  \\     \/T~\\|~\\_\\ \/ \\_  \/~|          _^\r\n        \/ \\ \/W  \\ \/ V^\\\/X  \/~         T  . \\\/   \\    ,v-.\/\r\n ,\'`-. \/~   ^     H  ,  . \\\/    ;   .   \\      `. \\-\'   \/\r\n     M      ~     | . ;  \/         ,  _   :  .    ~\\_,-\'\r\n    \/    ~    .    \\    \/   :                   \'   \\   ,\/`\r\n   I o. ^    oP     \'98b         -      _  9.`       `\\9b.\r\n 8oO888.  oO888P  d888b9bo. .8o 888o.       8bo.  o     988o.\r\n 88888888888888888888888888bo.98888888bo.    98888bo. .d888P\r\n 88888888888888888888888888888888888888888888888888888888888\r\n 88888888888888P\"   \"\" \"   \"\"\"9888P\" P\" \"8P\"   \"\"*9888888888\n")
            console.log(`Running ${pc.green(`stu's site`)} in dev mode`)
            console.log(pc.cyan(server.resolvedUrls?.local[0]))
          }, 1)
        })
      }
    }
  ],
})
