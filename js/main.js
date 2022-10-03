// 전역변수 사용을 피하기 위해 함수 안에서 함
(() => {
  let yOffset = 0; // window.pageYOffset(deprecated) -> window.scrollY 대신 쓸 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 세션들의 스크롤 높이값의 합
  let curScene = 0; // 현재 활성화되어 보고 있는 scene 인덱스(scroll-section)

  const sceneInfo = [
    {
      // 0
      type: 'sticky',
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-0'),
      },
    },
    {
      // 1
      type: 'normal',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-1'),
      },
    },
    {
      // 2
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-2'),
      },
    },
    {
      // 3
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-3'),
      },
    },
  ];

  function setLayout() {
    // 각 스크롤 섹션의 높이 세팅
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    function scrollLoop() {
        prevScrollHeight = 0;
        for (let i = 0; i < curScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
        if (yOffset > prevScrollHeight + sceneInfo[curScene].scrollHeight) {
            curScene++;
        }
        if (yOffset < prevScrollHeight) {
            if (curScene === 0) return;
            curScene--;
        }
        console.log(curScene);
    }

    window.addEventListener('resize', setLayout);
    window.addEventListener('scroll', () => {
        yOffset = window.scrollY;
        // console.log(window.scrollY);
        scrollLoop();
    });
  }

  setLayout();
})();
