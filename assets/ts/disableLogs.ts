// zablokovat logger
const DEBUG = true;
function disableLogsMain() {
  if (!DEBUG) {
    //@ts-ignore it's on the website
    if (!window.console) window.console = {};
    const methods = ["log", "debug", "warn", "info"];
    for (let i = 0; i < methods.length; i++) {
      console[methods[i]] = function () {};
    }
  }
}

disableLogsMain();

setTimeout(() => {
  disableLogsMain();
}, 1000);

function disableLogs() {
  disableLogsMain();
}

export default disableLogs;
