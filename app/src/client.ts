import axios from 'axios';

import { User } from './types';
import { retry } from './utils';

export class Client_CF {
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

export class Client_PHP {
  private readonly roomid: string;
  private readonly ruid: string;

  constructor(roomid: string, ruid: string) {
    this.roomid = roomid;
    this.ruid = ruid;
  }

  private async fetch(page: number): Promise<Array<User & { guard_level: number }>> {
    try {
      const { data } = await retry(() =>
        axios.get('http://tz06.byethost13.com/proxy.php', {//https://api.live.bilibili.com/guard/topList
          params: {
            csurl: 'https://api.live.bilibili.com/guard/topList',
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