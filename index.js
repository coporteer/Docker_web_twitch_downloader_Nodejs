
/*
위의 두 글은 빠른 작동확인을 위한 입력예시입니다.
예시1: https://d1m7jfoe9zdc1j.cloudfront.net/a43560afc77def11ccb0_bbaktube_43401346525_1629795192/storyboards/1127872626-strip-0.jpg,91글자,BBAK
예시2: https://d2nvs31859zcd8.cloudfront.net/a9fe8d1bab46ad66567f_haha1550ha_39901245627_1630402871/storyboards/1134842209-strip-0.jpg,93글자,coh2

localhost:3000에 들어가 입력하면 mp4 파일을 생성한 후에 다운로드합니다. 입력이후에 다운로드는 영상길이에 따라 시간이 오래 걸리므로 콘솔로 로그보면서 기다리는 것이 좋을 듯합니다.
글자수는 이전 블로그 글처럼 storyboard 앞까지의 글자수를 세서 입력하면됩니다! 이번 프로그램의 제일 큰 장점은 컴퓨터에 도커나 프로그램 설정없이 웹에서 다운로드 과정을 진핼할 수 있는 것입니다.

이번 프로젝트는 예전의 twitch_downloader를 바탕으로 jade 기반 웹에서 입력을 받아 실행할 수 있는 서버프로그램으로 만들었습니다.

twitch_downloader 블로그 링크: https://ousion.kr/2021/06/Docker_nodejs_twtich_downloader/
*/

var express = require('express');
var app = express();
const download = require("node-hls-downloader").download;

app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './views');

// localhost:3000 페이지를 렌더링합니다!
app.get('/', (req, res) => {
  res.render('welcome.jade');
})

// localhost:3000/input 페이지를 렌더링합니다. 이 페이지에서는 링크주소, 글자수, 다운로드 받을 파일이름을 입력받습니다.
app.get('/input', (req, res) => {
  res.render('input.jade');
})

// 영상을 다운로드받고 클라이언트가 영상을 다운로드를 받습니다.
app.get('/input_check', (req, res) => {
  
  const link_address = req.query.link_address
  const link_number = req.query.link_number
  const filename = req.query.filename

  //ffmpeg에 맞게 변수 가공합니다.
  var changed_link = link_address.substring(0,link_number) + "chunked/index-dvr.m3u8";
  console.log("target link is : " + changed_link);
  //target link is : https://d1m7jfoe9zdc1j.cloudfront.net/a43560afc77def11ccb0_bbaktube_43401346525_1629795192/chunked/index-dvr.m3u8

  const changed_name = filename + ".mp4"
  console.log("File name is : " + changed_name);

  async function asyncCapture(){
    await download({
    quality: "best",
    concurrency: 8,
    // concurrency는 cpu 쓰레드에 맞게 조절하면 될듯합니다.
    // httpHeaders: "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36",
    outputFile: changed_name,
    streamUrl: changed_link,
    });
  
    console.log("Complete");
    
    filepath = __dirname + "/" + filename + ".mp4";
    res.download(filepath);
  }

  asyncCapture();

})
// 웹서버 3000포트에서 시작
app.listen(3000, () => console.log('connected, 3000'));