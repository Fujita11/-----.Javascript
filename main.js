'use strict';

// const stopwatch = document.getElementById('stopwatct');
// const start = document.getElementById('start');

// start.addEventListener('click', () => {
//     let startMs = Date.now();     //開始時間ミリ秒

//     setInterval(() => {
//         const nowMs = Date.now();
//         const elapsedMs = nowMs - startMs;

//         stopwatch.textContent = elapsedMs;
//     }, 10);
// });

{
    const timer = document.getElementById('timer');
    const start = document.getElementById('start');
    const stop = document.getElementById('stop');
    const reset = document.getElementById('reset');

    let startTime;
    let timeoutId;
    let elapsedTime = 0;

    function countUp() {
        // console.log(Date.now() - startTime); //スタートタイムからの経過ミリ秒わかる
        const d = new Date(Date.now() - startTime + elapsedTime);
        //const h = String(d.getHours()).padStart(1, '0'); //////バツ
        const h = String(Math.floor((Date.now() - startTime + elapsedTime) / 3600000)).padStart(1, '0');
        const m = String(d.getMinutes()).padStart(1, '0');
        const s = String(d.getSeconds()).padStart(1, '0');
        const ms = String(d.getMilliseconds()).padStart(3, '0').slice(0, 1); //追加
        timer.textContent = `${h}:${m}:${s}:${ms}`;  //追加

        timeoutId = setTimeout(() => {
            countUp();
        }, 10);
    }

    function setButtonStateInnitial() {
        start.disabled = false;
        stop.disabled = true;
        reset.disabled = true;
    }
    function setButtonStateRunning() {
        start.disabled = true;
        stop.disabled = false;
        reset.disabled = true;
    }
    function setButtonStateStopped() {
        start.disabled = false;
        stop.disabled = true;
        reset.disabled = false;
    }

    setButtonStateInnitial();

    start.addEventListener('click', () => {
        setButtonStateRunning();
        startTime = Date.now();
        countUp();
    });

    stop.addEventListener('click', () => {
        setButtonStateStopped();
        clearTimeout(timeoutId);
        elapsedTime += Date.now() - startTime;
    });

    reset.addEventListener('click', () => {
        setButtonStateInnitial();
        timer.textContent = '0:0:0:0';
        elapsedTime = 0;
    });
}