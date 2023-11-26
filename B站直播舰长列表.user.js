// ==UserScript==
// @name         B站直播舰长列表
// @namespace    lm-captain.pages.dev
// @version      0.0.0.3
// @description  try to take over the world!
// @author       zthao
// @match        https://lm-captain.pages.dev/now
// @match        https://lm-captain.pages.dev/pages/now
// @match        https://lm-captain.pages.dev/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pages.dev
// @grant        GM_xmlhttpRequest
// @connect      api.live.bilibili.com
// ==/UserScript==
const roomid = 18060;
const ruid = 72960;
(function() {
    'use strict';

    if (document.location.pathname=="/pages/now"){
        timeout();
    }else{
        let old=history.pushState
        history.pushState=function(...arg){
            console.log(arg[0].current);
            if (arg[0].current=="/pages/now"){
                setTimeout(timeout,100);
            }
            return old.call(this,...arg);
        }
    }
})();
function timeout(){
    if (document.querySelector("#tips")){
        document.querySelector("#tips").style.display="none";
        start();
    }else{
        setTimeout(timeout,100);
    }
}
async function retry(fn, count = 3) {
    for (let i = 0, time = 1000; i < count; i++) {
        try {
            const r = await fn();
            return r;
        }
        catch (error) {
            if (i + 1 === count) {
                throw error;
            }
            await sleep(time);
            if (time * 2 <= 2 * 60 * 1000) {
                time = time * 2;
            }
        }
    }
    throw new Error('Did not run retry function');
}
function sleep(ms) {
    return new Promise((res) => {
        setTimeout(() => res(), ms);
    });
}
function getxml(url,data){
    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            method: "GET",
            responseType: "json",
            url: url,
            timeout:5000,
            onload: function(res){
                resolve(res.response);
            }
        })
    });
}
function padLeft(text, length, space = ' ') {
    return space.repeat(length - text.length) + text;
}
function getType(level) {
    if (level === 3){
        return '舰长';
    }
    if (level === 2){
        return '提督';
    }
    if (level === 1){
        return '总督';
    }
    return '舰长';
}
class Client {
    constructor(roomid, ruid) {
        this.roomid = roomid;
        this.ruid = ruid;
    }
    async fetch(page) {
        try {
            let data = await retry(() => getxml('https://api.live.bilibili.com/guard/topList?roomid='+this.roomid+'&ruid='+this.ruid+'&page='+page));
            if (page === 1) {
                return [...data.data.top3, ...data.data.list];
            }
            else {
                return data.data.list;
            }
        }
        catch (error) {
            return error;
        }
    }
    async get() {
        const ans = [];
        for (let i = 1;; i++) {
            const res = await this.fetch(i);
            if (res.length === 0) {
                break;
            }
            ans.push(...res);
        }
        return ans
            .map((u) => ({ uid: u.uid, username: u.username, level: u.guard_level }))
            .sort((lhs, rhs) => { var _a, _b; return ((_a = lhs.level) !== null && _a !== void 0 ? _a : 3) - ((_b = rhs.level) !== null && _b !== void 0 ? _b : 3); });
    }
}
async function start(){
    var p = document.createElement('p');
    p.innerText="加载中"
    document.querySelector("#list").append(p);
    var client = new Client(roomid, ruid);
    var list = await client.get();
    let cnt = 1;
    const width = String(list.length).length;
    p.innerText="请使用Ctrl+F搜索\n抓取时间："+new Date().toTimeString().substr(0, 8);
    for (const user of list) {
        //console.log(`${padLeft(String(cnt++), width)}. ${getType(user.level)} ${user.username} (uid: ${user.uid})`);
        var li = document.createElement('li');
        li.innerText = `${padLeft(String(cnt++), width)}. ${getType(user.level)} ${user.username} (uid: ${user.uid})`;
        document.querySelector("#list").append(li);
    }
}
