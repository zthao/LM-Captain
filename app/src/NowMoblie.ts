import format from 'date-fns/format';
import { Client , getType } from './client';
import { padLeft } from './utils';

const ruid = __RUID__;
const roomid = __ROOM_ID__;

function today(offset = 0): string {
  const date = new Date(new Date().getTime() - offset);
  return format(date, 'yyyy-MM-dd');
}

async function run(): Promise<void> {
  const roomid = __ROOM_ID__;//core.getInput('roomid');
  const ruid = __RUID__;//core.getInput('ruid');
  const client = new Client(roomid, ruid);

  const list = await client.get();

  {
    let cnt = 1;
    const width = String(list.length).length;
    for (const user of list) {
      console.log(
        `${padLeft(String(cnt++), width)}. ${getType(user.level)} ${user.username} (uid: ${user.uid})`
      );
    }
  }
  {
    //const outDir = core.getInput('outDir');
    //const csvname = path.join(outDir, `${today(+core.getInput('offset'))}.csv`);
    //const content = toCSV(list);
    //core.info(`---------------------------------------`);
    //core.info(`Writing to ${csvname}`);
    //core.setOutput('csv', csvname);
    //if (!existsSync(outDir)) {
    //  mkdirSync(outDir, { recursive: true });
    //}
    //writeFileSync(csvname, content, 'utf-8');
  }

  //await sendEmail(client, list);
}

//run();