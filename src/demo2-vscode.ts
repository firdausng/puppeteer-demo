//https://gist.github.com/jsoverson/6d3bbb8d8d7db37e1beacaccb295d801

const childProcess = require('child_process');
const puppeteer = require('puppeteer-core');
const request = require('request-promise-native');
var delay = require('timeout-as-promise');

function spawn(port) {

  let edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  let team = 'C:\\Users\\ten\\AppData\\Local\\Microsoft\\Teams\\Update.exe'
  let vscode = 'C:\\Users\\ten\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe'
  let brave = 'C:\\Program Files (x86)\\BraveSoftware\\Brave-Browser\\Application\\brave.exe'
  let firefox = 'C:\Program Files\Mozilla Firefox\firefox.exe';
  let chrome = `C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe`;

  return childProcess.spawn(
    // '/Applications/Visual\ Studio\ Code\ -\ Insiders.app/Contents/MacOS/Electron',
    vscode,
    [
      `--remote-debugging-port=${port || 9229}`,
      '--user-data-dir=C:\\Users\\ten\\Desktop\\test',
      '--enable-logging',
    ],
    {
      detached: true,
      env: process.env,
      stido: ['pipe', 'pipe', 'pipe']
    }
  );
}

(async function main(){
  const port = 29379;

  const proc = spawn(port);

  await delay(2000);

  const resp = await request(`http://127.0.0.1:${port}/json/version`);
  const devToolsPages = JSON.parse(resp);
  //const endpoint = devToolsPages.find(p => !p.title.match(/^sharedProcess/));

  const browser = await puppeteer.connect({
    browserWSEndpoint: devToolsPages.webSocketDebuggerUrl,
    defaultViewport: null, // used to bypass Chrome viewport issue, doesn't work w/ VS code.
    slowMo: 50
  })

  await delay(1000);

  const page = (await browser.pages())[0];

  await page.click('[href="command:workbench.action.files.newUntitledFile"]');

  await page.type('.monaco-editor', 'Woo! I am automating Visual Studio Code with puppeteer!\n');
  await page.type('.monaco-editor', 'This would be a super cool way of generating foolproof demos.');
  
  setTimeout(() => proc.kill(), 1000);

}())

