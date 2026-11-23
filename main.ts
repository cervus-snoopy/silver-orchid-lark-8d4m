import{deflateSync as z,crc32 as v2}from'node:zlib';
import{mkdirSync as m,writeFileSync as w}from'node:fs';
import{dirname as d,resolve as r}from'node:path';
import{fileURLToPath as u}from'node:url';
const CS='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 .,:\'-()/%+&=?!\u2022';
const FT=[[14,17,17,31,17,17,17],[30,17,17,30,17,17,30],[14,17,16,16,16,17,14],[30,17,17,17,17,17,30],[31,16,16,30,16,16,31],[31,16,16,30,16,16,16],[14,17,16,23,17,17,15],[17,17,17,31,17,17,17],[14,4,4,4,4,4,14],[7,2,2,2,2,18,12],[17,18,20,24,20,18,17],[16,16,16,16,16,16,31],[17,27,21,21,17,17,17],[17,25,21,19,17,17,17],[14,17,17,17,17,17,14],[30,17,17,30,16,16,16],[14,17,17,17,21,18,13],[30,17,17,30,20,18,17],[15,16,16,14,1,1,30],[31,4,4,4,4,4,4],[17,17,17,17,17,17,14],[17,17,17,17,17,10,4],[17,17,17,21,21,27,17],[17,17,10,4,10,17,17],[17,17,10,4,4,4,4],[31,1,2,4,8,16,31],[14,17,19,21,25,17,14],[4,12,4,4,4,4,14],[14,17,1,6,8,16,31],[31,2,4,2,1,17,14],[2,6,10,18,31,2,2],[31,16,30,1,1,17,14],[6,8,16,30,17,17,14],[31,1,2,4,8,8,8],[14,17,17,14,17,17,14],[14,17,17,15,1,2,12],[0,0,0,0,0,0,0],[0,0,0,0,0,12,12],[0,0,0,0,12,4,8],[0,12,12,0,12,12,0],[4,4,8,0,0,0,0],[0,0,0,14,0,0,0],[2,4,8,8,8,4,2],[8,4,2,2,2,4,8],[1,2,2,4,8,8,16],[25,26,2,4,8,11,19],[0,4,4,14,4,4,0],[12,18,20,8,21,18,13],[0,0,14,0,14,0,0],[14,17,1,6,4,0,4],[4,4,4,4,4,0,4],[0,0,12,12,0,0,0]];
const W=1024,H=1024,p=Buffer.alloc(W*H*3);
const a=[247,242,231],b=[25,23,20],d2=[166,28,28],e=[30,79,138],f=[15,107,92],g=[172,118,10],y=[96,89,80],h=[255,253,246],v=[255,255,255];
const q=(x,y,w2,h2,c)=>{for(let j=y;j<y+h2;j++)for(let i=x;i<x+w2;i++){if(i<0||j<0||i>=W||j>=H)continue;const o=(j*W+i)*3;p[o]=c[0];p[o+1]=c[1];p[o+2]=c[2];}};
const c=(x,y,r2,c2)=>{for(let s=-r2;s<=r2;s++){const n=Math.floor(Math.sqrt(r2*r2-s*s));q(x-n,y+s,n*2+1,1,c2);}};
const t=(s,x,y,s2,c)=>{let X=x;for(const ch of s){const gi=CS.indexOf(ch);if(gi<0){X+=6*s2;continue;}const gl=FT[gi];for(let r2=0;r2<7;r2++)for(let b2=0;b2<5;b2++)if(gl[r2]&(16>>b2))q(X+b2*s2,y+r2*s2,s2,s2,c);X+=6*s2;}return X;};
const n=s=>s.length*12;
const I=(k,x,y,bg)=>{q(x,y,34,34,bg);const X=x+17,Y=y+17;
if(k==0){c(X,Y,12,v);c(X,Y,9,bg);q(X-12,Y,24,2,v);q(X,Y-12,2,24,v);}
else if(k==1){q(X-3,Y-3,6,6,v);q(X-2,Y-13,4,10,v);q(X-2,Y+3,4,10,v);q(X-13,Y-2,10,4,v);q(X+3,Y-2,10,4,v);q(X-13,Y-13,5,5,v);q(X+8,Y-13,5,5,v);q(X-13,Y+8,5,5,v);q(X+8,Y+8,5,5,v);}
else if(k==2){for(let i=0;i<6;i++)q(X-2-i,Y-11+i*3,4+i*2,3,v);q(X-2,Y+7,4,4,bg);}
else if(k==3){for(let i=0;i<4;i++)q(X-11+i*2,Y+3+i*3,22-i*4,3,v);q(X-1,Y-11,2,14,v);q(X+1,Y-11,7,4,v);}
else if(k==4){q(X-11,Y-9,22,18,v);q(X-8,Y-6,16,12,bg);q(X-5,Y+1,3,3,v);q(X-2,Y+4,3,3,v);q(X+1,Y+1,3,3,v);q(X+4,Y-2,3,3,v);}
else if(k==5){q(X-1,Y-12,2,24,v);q(X-12,Y-1,24,2,v);q(X-2,Y-2,4,4,v);}
else{c(X,Y,12,v);c(X,Y,9,bg);c(X,Y,3,v);q(X-11,Y-5,22,2,v);q(X-11,Y+5,22,2,v);}};
const L='CLIMATE - COP31|COP31 COLLAPSES, NO DEAL|ANTALYA TEXT REJECTED BY EU|AFTER 13 DAYS, NO CONSENSUS|FIRST COP TO END WITH NO DEAL.|REUTERS 06:00'.split('|');
const E=`UKRAINE|186 RUSSIAN DRONES,|161 DOWNED|BARRAGE HITS 18 SITES;|72 JET-POWERED, AIR HIT|UKR AIR FORCE 08:07|1|1
GAZA|ISRAELI STRIKE KILLS|THREE IN GAZA|CEASEFIRE UNDER STRAIN;|HAMAS SEEKS MEDIATORS|REUTERS 08:50|2|0
IRAN|TWO TANKERS HIT|IN HORMUZ|TEHRAN CLAIMS US NAVY|BASES HIT, GULF TENSE|UKMTO 05:00|3|1
N.AMERICA|TRUMP ORDERS SILENCE|ON CONGRESS|CONTRACTORS TOLD NOT TO|TALK TO LAWMAKERS|CNN 21:45|4|3
SPORT|VERSTAPPEN WINS|VEGAS GRAND PRIX|FOURTH TITLE SEALED IN|NEON AS RIVALS FALTER|FORMULA1 05:40|5|0
TECH|NVIDIA PLUNGES ON|SEC PROBE|CHIP GIANT DOWN 14% AS|NASDAQ HAS WORST WEEK|REUTERS 21:00|6|0`.split('\n');
const J=`A|COP31 OMITS FOSSIL FUELS - REUTERS
A|ZELENSKY SLAMS PATRIOT DELAYS - KYIV
A|SPARTA II BURNS AFTER DRONE HIT - NYP
A|131 CLASHES, POKROVSK HEAVIEST - UKR
A|POLAND: MISSILE IN AIRSPACE - REUTERS
A|NATO COUNCIL MEETS MONDAY - EU TODAY
M|HAMAS SEEKS MEDIATOR MEETING - ANADOLU
M|AOUN DEMANDS ISRAEL PULLOUT - AFP
M|TRUMP DELAYS IRAN CALL TO 2027 - RTRS
M|QATAR HOLDS TEHRAN TALKS - REUTERS
A|XI: TAIWAN REUNION CERTAIN - AL JAZ
A|XI HOSTS US-RUSSIA TRILATERAL - RTRS
A|JAPAN, INDIA SIGN MISSILE PACT - QNC
A|TAIWAN FLAGS 2700 ACCOUNTS - TAIWAN+
E|UK, EU CLINCH FOOD DEAL - REUTERS
E|FRANCE PROTESTS DRAW 82500 - REUTERS
E|NASDAQ WORST WEEK SINCE 2020 - WSJ
E|EU, INDONESIA SIGN TRADE DEAL - RTRS
F|DRC EBOLA DEATHS TOP 5700 - AFP
A|TIMOR QUAKE 6.8 SHAKES BANDA - USGS
N|TRUMP THREATENS TAX ON AI - COGNOSCERE
N|VA CHILD DIES OF MEASLES - COGNOSCERE
L|MEXICO ARRESTS CARTEL KINGPIN - BREIT
L|HEGSETH SIGNS VENEZUELA PACT - REUTERS
L|LULA FISCAL BILL FACES VOTE - RIO
L|LULA BACKS SANCHEZ IN SPAIN - BREIT
S|CHELSEA STUNNED BY LEEDS - AKTUALITA
S|REAL MADRID BEATS CELTA VIGO - AKT
S|ROMA THRASH PARMA FIVE ONE - AKTUALITA
S|BOCA WIN SUDAMERICANA TITLE - CONM
S|ALCARAZ FACES ZVEREV IN FINAL - ATP
S|LIVERPOOL HOST MAN UTD TODAY - PREM
S|NFL: VIKINGS VS 49ERS IN MEXICO - NFL
T|CLAUDE LINKED TO RIEMANN CLAIM - AI
T|SPACEX LAUNCHES SPY SATS - SPACEFLIGHT
T|DRAGON SPLASHES DOWN, SCIENCE - NASA
T|BITCOIN REBOUNDS ABOVE 60000 - FINNHUB
T|TENCENT RELEASES HY4 WEIGHTS - AI.INFO
E|NVIDIA PLUNGES 14 PERCENT FRIDAY - WSJ
N|NASDAQ PLUNGES, SP CORRECTS - REUTERS
W|GTA VI EARNS 3.79 BILLION - WSJ
W|MILEY CYRUS MARRIES MORANDO - ANI
W|UN WEAPONS TALKS END WITHOUT DEAL - AP`.split('\n');
const TC={A:e,M:d2,E:b,F:g,L:f,N:b,S:d2,T:e,W:y,O:f};
const TL='00:00 COP31|05:00 HORMUZ|05:30 POLAND|06:00 NO DEAL|07:00 SPARTA|08:07 161 DOWN|08:50 GAZA|17:00 NATO|21:00 NASDAQ'.split('|');
const CC=[d2,e,f,g];
q(0,0,W,H,a);
t('THE WORLD IN ONE DAY',(W-n('THE WORLD IN ONE DAY')*3)/2,20,6,b);
q(24,70,976,2,b);
t('MONDAY 23 NOVEMBER 2026 \u2022 50 STORIES \u2022 7 REGIONS \u2022 ALL TIMES UTC',(W-n('MONDAY 23 NOVEMBER 2026 \u2022 50 STORIES \u2022 7 REGIONS \u2022 ALL TIMES UTC'))/2,78,2,b);
q(24,98,976,2,d2);
q(24,108,976,128,h);q(24,108,8,128,d2);q(24,108,976,2,b);q(24,234,976,2,b);
t(L[0],46,118,2,d2);t(L[1],46,140,3,b);
t(L[2],46,166,2,b);t(L[3],46,184,2,b);t(L[4],46,202,2,b);t(L[5],46,220,2,y);
c(924,172,52,e);c(924,172,48,h);q(876,171,96,2,e);q(923,124,2,96,e);c(948,150,7,d2);
E.forEach((f2,i)=>{const s=f2.split('|'),x=24+(i%3)*328,y2=246+Math.floor(i/3)*148;
q(x,y2,320,140,h);
t(s[0],x+10,y2+10,2,d2);I(+s[6],x+276,y2+8,CC[+s[7]]);
t(s[1],x+10,y2+34,2,b);t(s[2],x+10,y2+52,2,b);
t(s[3],x+10,y2+76,2,y);t(s[4],x+10,y2+92,2,y);
t(s[5],x+10,y2+112,2,y);});
t('THE REST OF THE DAY - 43 MORE',24,544,2,b);
t('ALL FIRST REPORTED 23 NOV 2026',W-24-n('ALL FIRST REPORTED 23 NOV 2026'),544,2,d2);
let X=24;for(const [s2,c2] of [['MEAST',d2],['EUROPE',b],['ASIA',e],['AFRICA',g],['LATAM',f],['N.AMERICA',b],['OCEANIA',f],['SPORT',d2],['TECH',e],['WORLD',y]]){q(X,578,10,10,c2);X=t(s2,X+14,576,2,b)+8;}
J.forEach((row,i)=>{const s=row.split('|'),col=i<22?0:1,j=i<22?i:i-22,x=24+col*498,y2=598+j*16;
q(x,y2+2,10,10,TC[s[0]]);t(s[1],x+16,y2,2,b);});
q(24,958,976,40,b);
const l1=TL.slice(0,5).join(' \u2022 '),l2=TL.slice(5).join(' \u2022 ');
t(l1,(W-n(l1))/2,964,2,v);t(l2,(W-n(l2))/2,980,2,v);
t('DATE CHECK: ALL 50 STORIES FIRST REPORTED MONDAY 23 NOVEMBER 2026',(W-n('DATE CHECK: ALL 50 STORIES FIRST REPORTED MONDAY 23 NOVEMBER 2026'))/2,1004,2,d2);
const C2=(t2,d3)=>{const o=Buffer.alloc(8+d3.length+4);o.writeUInt32BE(d3.length,0);o.write(t2,4,'ascii');d3.copy(o,8);o.writeUInt32BE(v2(Buffer.concat([Buffer.from(t2,'ascii'),d3])),8+d3.length);return o;};
const ih=Buffer.alloc(13);ih.writeUInt32BE(W,0);ih.writeUInt32BE(H,4);ih[8]=8;ih[9]=2;
const ra=Buffer.alloc(H*(1+W*3));for(let y2=0;y2<H;y2++){ra[y2*(1+W*3)]=0;p.copy(ra,y2*(1+W*3)+1,y2*W*3,(y2+1)*W*3);}
const P=Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),C2('IHDR',ih),C2('IDAT',z(ra,{level:9})),C2('IEND',Buffer.alloc(0))]);
const D=process.env.MAKEFUN_OUTPUT_DIR?r(d(u(import.meta.url)),process.env.MAKEFUN_OUTPUT_DIR):'/output';
m(D,{recursive:true});w(r(D,'entry.png'),P);
