## 목차

- [목차](#목차)
- [빠른시작(TL;DR)](#빠른시작tldr)
  - [결과](#결과)
- [주의할점](#주의할점)
- [참고한 자료](#참고한-자료)

## 빠른시작(TL;DR)

위의 두 줄은 빠른 작동확인을 위한 입력예시입니다. 예시에 링크는 [박김례](https://www.twitch.tv/bbaktube)님과 [101공수사단](https://www.twitch.tv/haha1550ha)님의 트위치방송의 썸네일 링크입니다. 항상 방송 잘보고 있습니다.(꾸벅)

예시1: https://d1m7jfoe9zdc1j.cloudfront.net/a43560afc77def11ccb0_bbaktube_43401346525_1629795192/storyboards/1127872626-strip-0.jpg,91글자,BBAK  
예시2: https://d2nvs31859zcd8.cloudfront.net/a9fe8d1bab46ad66567f_haha1550ha_39901245627_1630402871/storyboards/1134842209-strip-0.jpg,93글자,coh2

[localhost:3000](localhost:3000)에 들어가 입력하면 mp4 파일을 생성한 후에 다운로드합니다. 입력이후에 다운로드는 영상길이에 따라 시간이 오래 걸리므로 콘솔로 로그보면서 기다리는 것이 좋을 듯합니다.
글자수는 이전 블로그 글처럼 storyboard 앞까지의 글자수를 세서 입력하면됩니다! 이번 프로그램의 제일 큰 장점은 컴퓨터에 도커나 프로그램 설정없이 서버를 통해 웹에서 다운로드 과정을 진행할 수 있는 것입니다.

이번 프로젝트는 예전의 twitch_downloader를 바탕으로 jade 기반 웹에서 입력을 받아 실행할 수 있는 서버프로그램으로 만들었습니다. 자세한 사용법은 이전 블로그를 참고해주시면 좋을듯합니다.

[twitch_downloader 블로그 링크](https://ousion.kr/2021/06/Docker_nodejs_twtich_downloader/)

``` bash
docker pull swoho0325/webtwitchdownloader
docker run -it --rm -p 원하는 포트:3000 --name webtwitch swoho0325/webtwitchdownloader
```

### 결과

[![result_img](https://img.youtube.com/vi/d9cGKHfF1BM/0.jpg)](https://youtu.be/d9cGKHfF1BM)

## 주의할점

- dockerfile에 꼭 ffmpeg를 다운로드 받도록 설정해야합니다.

``` bash
COPY --from=mwader/static-ffmpeg:4.4.0 /ffmpeg /usr/local/bin/
COPY --from=mwader/static-ffmpeg:4.4.0 /ffprobe /usr/local/bin/
COPY --from=mwader/static-ffmpeg:4.4.0 /qt-faststart /usr/local/bin/
```

- 다운시간이 꽤 걸립니다. 콘솔창에서 에러내용이나 다운중이라고 나오니 여유를 가지고 기다려합니다. 만약 쓰레드가 많은 컴퓨터라면 쓰레드랑 인터넷을 여유있게주는 것도 속도향상에 도움이됩니다.
- 원본 방송에서 저작권이나 기타이유로 음원이 삭제된 부분은 다운로드가 진행되지않습니다!

## 참고한 자료

1. https://bitlog.tistory.com/101
2. https://hianna.tistory.com/349
3. https://medium.com/@aksgh10230069/node-js-file-download-582dc7871b4
4. https://naltatis.github.io/jade-syntax-docs/#basics
5. https://itholic.github.io/js-form/
6. https://stackoverflow.com/questions/17762188/simple-form-node-js-application