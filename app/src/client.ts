import axios from 'axios';

import { User } from './types';
import { retry } from './utils';

export class Client {
  private readonly roomid: string;
  private readonly ruid: string;

  constructor(roomid: string, ruid: string) {
    this.roomid = roomid;
    this.ruid = ruid;
  }

  private async fetch(page: number): Promise<Array<User & { guard_level: number }>> {
    try {
      const { data } = await retry(() =>
        axios.get('https://cf-cross.tz06.workers.dev/bgm/guard/topList', {//https://api.live.bilibili.com/guard/topList
          params: {
            roomid: this.roomid,
            ruid: this.ruid,
            page
          }
        })
      );
      if (page === 1) {
        return [...data.data.top3, ...data.data.list];
      } else {
        return data.data.list;
      }
    } catch (error: unknown) {
        console.log(error);
        return [];
    }
  }

  async get(): Promise<User[]> {
    //const ans = [{"uid":3237744,"ruid":72960,"rank":4,"username":"剧毒术士卡布达","face":"https://i0.hdslb.com/bfs/face/715810e0ccc8ce533f47ea07e68a0eca811697ad.jpg","is_alive":0,"guard_level":3,"guard_sub_level":0},{"uid":6792898,"ruid":72960,"rank":5,"username":"沉迷乙游的YosuGa","face":"https://i1.hdslb.com/bfs/face/2da9eda53838ab13e214322d1983dfa60dce5fe6.jpg","is_alive":0,"guard_level":3,"guard_sub_level":0},{"uid":24136234,"ruid":72960,"rank":6,"username":"yuk133","face":"https://i1.hdslb.com/bfs/face/5f83ed6ee4efc79380efb2c770d0824236f9ef3f.jpg","is_alive":0,"guard_level":3,"guard_sub_level":0},{"uid":122449,"ruid":72960,"rank":7,"username":"七夜寒音","face":"https://i1.hdslb.com/bfs/face/c040446c45449688f7bcdc128963f779aaa8e8dd.jpg","is_alive":0,"guard_level":3,"guard_sub_level":0},{"uid":1467186,"ruid":72960,"rank":8,"username":"是禧运楼不是洗浴楼呀","face":"https://i0.hdslb.com/bfs/face/feecc316c0ff8d1f3effa1e5a2fa6df03cd6da2e.jpg","is_alive":0,"guard_level":3,"guard_sub_level":0},{"uid":284054,"ruid":72960,"rank":9,"username":"傲娇藤林杏","face":"https://i2.hdslb.com/bfs/face/8eccacd58e517f0a2857f950988fc1cde0481374.jpg","is_alive":1,"guard_level":3,"guard_sub_level":0},{"uid":581984,"ruid":72960,"rank":10,"username":"jiu红_佐仓财团","face":"https://i2.hdslb.com/bfs/face/1115ed267407b3ddffde8866215cb5dcce0f84f1.jpg","is_alive":0,"guard_level":3,"guard_sub_level":0},{"uid":294667,"ruid":72960,"rank":11,"username":"小狼仔06","face":"http://i1.hdslb.com/bfs/face/4019f5e6183460ca8cfc3bbdf78927c2f83ac1fc.jpg","is_alive":0,"guard_level":3,"guard_sub_level":0},{"uid":11797,"ruid":72960,"rank":12,"username":"NOVE","face":"https://i1.hdslb.com/bfs/face/3679cc826868c47e6559eda67da47df8ef93d330.jpg","is_alive":0,"guard_level":3,"guard_sub_level":0},{"uid":2686444,"ruid":72960,"rank":13,"username":"zhlovenaiye","face":"https://i1.hdslb.com/bfs/face/6d0d234f20e82e9e0adb2f73b1e912d480d96a8b.jpg","is_alive":0,"guard_level":3,"guard_sub_level":0}];
    const ans = [];
        for (let i = 1; ; i++) {
      const res = await this.fetch(i);
      if (res.length === 0) {
        break;
      }
      ans.push(...res);
    } 
    return ans
      .map((u) => ({ uid: u.uid, username: u.username, level: u.guard_level }))
      .sort((lhs, rhs) => (lhs.level ?? 3) - (rhs.level ?? 3));
  }
}

export function getType(level?: number): string {
  if (level === 3) return '舰长';
  if (level === 2) return '提督';
  if (level === 1) return '总督';
  return '舰长';
}