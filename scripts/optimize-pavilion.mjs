import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';
const path='public/drawings/elevation.svg';
let svg=await readFile(path,'utf8');
for(const id of ['concrete-grain','charcoal']){
 const re=new RegExp(`<pattern id="${id}" width="([0-9]+)" height="([0-9]+)" patternUnits="userSpaceOnUse">([\\s\\S]*?)</pattern>`);
 const match=svg.match(re); if(!match)continue;
 const [block,w,h,marks]=match;
 const png=await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${marks}</svg>`),{density:144}).png().toBuffer();
 svg=svg.replace(block,`<pattern id="${id}" width="${w}" height="${h}" patternUnits="userSpaceOnUse"><image width="${w}" height="${h}" href="data:image/png;base64,${png.toString('base64')}"/></pattern>`);
}
await writeFile(path,svg);
console.log(`Optimized original stipple tiles: ${Buffer.byteLength(svg)} SVG bytes`);
