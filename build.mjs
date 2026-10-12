import {readFileSync,writeFileSync} from 'node:fs';
const data=JSON.parse(readFileSync(new URL('./content.json',import.meta.url),'utf8'));
if(!data.logs.length || data.logs.some((l,i)=>l.n!==i+1)) throw Error('開催番号を連続させてください');
const archive=JSON.stringify(data.logs);
if(/[\w.+-]+@[\w.-]+\.[a-z]{2,}/i.test(archive) || /〒|TEL:|FAX:|Message-ID|mailto:/.test(archive)) throw Error('活動ログに連絡先が含まれています');
writeFileSync(new URL('./dist/data.js',import.meta.url),'window.STUDY_DATA = '+JSON.stringify(data).replaceAll('<','\\u003c')+';\n');
console.log(`${data.logs.length}件の活動ログを生成しました`);
