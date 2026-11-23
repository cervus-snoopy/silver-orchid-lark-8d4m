import{deflateSync as z}from'node:zlib';
import{mkdirSync as m,writeFileSync as w}from'node:fs';
import{join as j}from'node:path';
const W=1024,H=1024,O=process.env.MAKEFUN_OUTPUT_DIR||'/output';
const PAPER=[246,242,233],INK=[22,22,22],NAVY=[16,32,64],RED=[178,34,34],WHITE=[255,255,255],GREY=[110,110,110],GOLD=[200,160,40];
const RC={EU:[30,80,160],AS:[0,130,120],ME:[178,34,34],AM:[110,60,160],AF:[200,110,0],MK:[0,130,60],SP:[180,40,120]};
const buf=Buffer.alloc(W*H*3);
function px(x,y,c){if(x<0||y<0||x>=W||y>=H)return;const i=(y*W+x)*3;buf[i]=c[0];buf[i+1]=c[1];buf[i+2]=c[2];}
function rect(x,y,w,h,c){for(let j=y;j<y+h;j++)for(let i=x;i<x+w;i++)px(i,j,c);}
function line(x0,y0,x1,y1,c){const dx=x1-x0,dy=y1-y0,n=Math.max(Math.abs(dx),Math.abs(dy),1);for(let s=0;s<=n;s++)px(Math.round(x0+dx*s/n),Math.round(y0+dy*s/n),c);}
function circ(cx,cy,r,c){for(let a=0;a<360;a+=4){const t=a*Math.PI/180;px(Math.round(cx+r*Math.cos(t)),Math.round(cy+r*Math.sin(t)),c);}}
const FONT={A:[14,17,17,31,17,17,17],B:[30,17,17,30,17,17,30],C:[14,17,16,16,16,17,14],D:[30,17,17,17,17,17,30],E:[31,16,16,30,16,16,31],F:[31,16,16,30,16,16,16],G:[14,17,16,23,17,17,15],H:[17,17,17,31,17,17,17],I:[14,4,4,4,4,4,14],J:[7,2,2,2,2,18,12],K:[17,18,20,24,20,18,17],L:[16,16,16,16,16,16,31],M:[17,27,21,21,17,17,17],N:[17,25,21,19,17,17,17],O:[14,17,17,17,17,17,14],P:[30,17,17,30,16,16,16],Q:[14,17,17,17,21,18,13],R:[30,17,17,30,20,18,17],S:[15,16,16,14,1,1,30],T:[31,4,4,4,4,4,4],U:[17,17,17,17,17,17,14],V:[17,17,17,17,17,10,4],W:[17,17,17,21,21,27,17],X:[17,17,10,4,10,17,17],Y:[17,17,10,4,4,4,4],Z:[31,1,2,4,8,16,31],'0':[14,17,19,21,25,17,14],'1':[4,12,4,4,4,4,14],'2':[14,17,1,6,8,16,31],'3':[31,2,4,2,1,17,14],'4':[2,6,10,18,31,2,2],'5':[31,16,30,1,1,17,14],'6':[6,8,16,30,17,17,14],'7':[31,1,2,4,8,8,8],'8':[14,17,17,14,17,17,14],'9':[14,17,17,15,1,2,12],' ':[0,0,0,0,0,0,0],'.':[0,0,0,0,0,12,12],',':[0,0,0,0,12,4,8],':':[0,12,12,0,12,12,0],';':[0,12,12,0,12,4,8],"'":[4,4,8,0,0,0,0],'-':[0,0,0,14,0,0,0],'(':[2,4,8,8,8,4,2],')':[8,4,2,2,2,4,8],'/':[1,1,2,4,8,16,16],'%':[25,25,2,4,8,19,19],'&':[12,18,20,8,21,18,13],'+':[0,4,4,31,4,4,0],'=':[0,0,31,0,31,0,0],'!':[4,4,4,4,4,0,4],'?':[14,17,1,2,4,0,4],$:[4,15,20,14,5,30,4],'|':[4,4,4,4,4,4,4]};
function text(s,x,y,sc,col){let cx=x;for(const ch of s){const g=FONT[ch]||FONT['?'];for(let r=0;r<7;r++){const row=g[r];for(let c=0;c<5;c++)if(row&(16>>c))rect(cx+c*sc,y+r*sc,sc,sc,col);}cx+=6*sc;}}
function globe(x,y,s,c){const r=22*s;circ(x,y,r,c);line(x-r,y,x+r,y,c);line(x,y-r,x,y+r,c);circ(x,y,Math.round(r*0.55),c);const a=Math.round(r*0.8),b=Math.round(r*0.55);line(x-a,y-b,x+a,y-b,c);line(x-a,y+b,x+a,y+b,c);}
function drone(x,y,s,c){rect(x-4*s,y-2*s,8*s,4*s,c);line(x,y,x-14*s,y-10*s,c);line(x,y,x+14*s,y-10*s,c);line(x,y,x-14*s,y+10*s,c);line(x,y,x+14*s,y+10*s,c);circ(x-16*s,y-12*s,5*s,c);circ(x+16*s,y-12*s,5*s,c);circ(x-16*s,y+12*s,5*s,c);circ(x+16*s,y+12*s,5*s,c);}
function ship(x,y,s,c){rect(x-22*s,y,44*s,4*s,c);rect(x-18*s,y+4*s,36*s,4*s,c);rect(x-14*s,y+8*s,28*s,4*s,c);line(x,y,x,y-16*s,c);rect(x,y-16*s,10*s,5*s,c);line(x-24*s,y+16*s,x+24*s,y+16*s,c);line(x-20*s,y+20*s,x+20*s,y+20*s,c);}
function chart(x,y,s,c){line(x-20*s,y+16*s,x+22*s,y+16*s,c);line(x-20*s,y+16*s,x-20*s,y-18*s,c);line(x-18*s,y-12*s,x-6*s,y-2*s,c);line(x-6*s,y-2*s,x+4*s,y-8*s,c);line(x+4*s,y-8*s,x+14*s,y+8*s,c);line(x+14*s,y+8*s,x+20*s,y+14*s,c);}
function summit(x,y,s,c){line(x-16*s,y+14*s,x-16*s,y-14*s,c);line(x,y+14*s,x,y-14*s,c);line(x+16*s,y+14*s,x+16*s,y-14*s,c);rect(x-16*s,y-14*s,9*s,5*s,c);rect(x,y-14*s,9*s,5*s,c);rect(x+16*s,y-14*s,9*s,5*s,c);line(x-20*s,y+14*s,x+20*s,y+14*s,c);}
function tanker(x,y,s,c){rect(x-22*s,y+4*s,44*s,6*s,c);rect(x-18*s,y+10*s,36*s,4*s,c);rect(x+8*s,y-4*s,8*s,8*s,c);rect(x-2*s,y-16*s,4*s,4*s,c);rect(x-4*s,y-12*s,8*s,4*s,c);rect(x-5*s,y-8*s,10*s,4*s,c);rect(x-3*s,y-4*s,6*s,4*s,c);}
function ball(x,y,s,c){circ(x,y,14*s,c);line(x-14*s,y,x+14*s,y,c);line(x,y-14*s,x,y+14*s,c);circ(x,y,5*s,c);}
function pic(n,x,y,s,c){if(n===0)globe(x,y,s,c);else if(n===1)drone(x,y,s,c);else if(n===2)ship(x,y,s,c);else if(n===3)chart(x,y,s,c);else if(n===4)summit(x,y,s,c);else if(n===5)tanker(x,y,s,c);else ball(x,y,s,c);}
const LEAD={tag:'CLIMATE - COP31',place:'ANTALYA, TURKEY',h1:'COP31 COLLAPSES,',h2:'NO DEAL',s1:'EU AND 130 NATIONS REJECT TEXT',s2:'WITH NO FOSSIL FUELS IN IT'};
const FEAT=[{tag:'EU',name:'UKRAINE',pic:1,l:['186 DRONES, 161 DOWNED','DYMER FLAT HIT, 10 DEAD','BOY, 7, PULLED ALIVE']},{tag:'AF',name:'LIBYA',pic:2,l:['RUSSIAN WARSHIP SINKS','MERKURY HIT AT BENGHAZI','SUSPECTED DRONE ATTACK']},{tag:'MK',name:'MARKETS',pic:3,l:['NIKKEI -5.06%, ASIA SINKS','NASDAQ WORST WEEK','SINCE MARCH 2020']},{tag:'AS',name:'SHENZHEN',pic:4,l:['TRUMP, PUTIN, XI MEET','IN SHENZHEN, PEACE VOW','DECLARATION SIGNED']},{tag:'ME',name:'HORMUZ',pic:5,l:['TANKERS ABLAZE','MINES HIT SHIPS','IRAN WAR SPREADS']},{tag:'AM',name:'WASHINGTON',pic:6,l:['DEMOCRATS WIN HOUSE','258 SEATS, MOST SINCE','1992, RECOUNT FLIP']}];
const LIST=[['EU','KYIV FLAT SEARCH: 14 MISSING'],['EU','POLAND: 3 MISSILES CROSSED FRIDAY'],['EU','NATO CRISIS TALKS ON UKRAINE'],['EU','UK SENDS 1,000 MISSILES TO KYIV'],['EU','FRANCE HOPEFULS QUERY UKRAINE AID'],['EU','SLOVAKIA SKIPS EU UKRAINE LOAN'],['EU','DENMARK EXPELS RUSSIAN ATTACHE'],['EU','BELGIUM AIRPORTS SHUT BY STRIKE'],['EU','KURSK: UKRAINE TAKES NOVYI PUT'],['EU','KALININGRAD DRONES FIRST TIME'],['EU','KRYVYI RIH STRIKE: 2 DEAD, 60 HURT'],['EU','CARGO SHIP HIT OFF FINLAND'],['AS','TAIWAN STOCKS SWING 1,578 POINTS'],['AS','TSMC TURNS HIGHER, UP 2%'],['AS','S. KOREA EXPORTS TOP $1 TRILLION'],['AS','SEOUL MINISTER QUITS OVER EXAM SCAM'],['AS','S. KOREA STOCKS PLUNGE ON AI FEAR'],['AS','INDONESIA FACTORY FIRE: 24 DEAD'],['AS','SELANGOR FLOODS: 1,800 EVACUATED'],['AS','CHINA HACKERS USE AI ON UNIVERSITIES'],['AS','INDIA YOUTH PROTEST META BLOCKS'],['ME','GAZA STRIKE KILLS 3'],['ME','GAZA TOLL REACHES 74,742'],['ME','ISRAEL, US PLAN FOR IRAN TENSIONS'],['ME','IRAN STRIKE INJURES 2 IN BAHRAIN'],['ME','LEBANON: ISRAEL PULLOUT DEMANDED'],['ME','HAMAS EXECUTES COLLABORATOR'],['ME','IRAQ POWER PLANT FIRE: 4 DEAD'],['ME','SYRIA ARRESTS 2014 AMBUSH OFFICER'],['ME','HOUTHI DRONE INTERCEPTED BY COALITION'],['AM','TRUMP: PUTIN IS MY FRIEND'],['AM','US ARMY TO BLAST IOWA EXPLOSIVES'],['AM','US PORTS HIT BY CYBERATTACK SURGE'],['AM','MEXICO NABS CARTEL BOSS ISIDRO'],['AM','TRUMP REPOSTS TRUMPCARE PITCH'],['AM','CALIFORNIA SUBPOENAS NVIDIA'],['AM','NVIDIA -14% ON SEC PROBE'],['AM','S&P 500 INTO CORRECTION'],['AM','WALL ST FEARS $80.6BN MORE SELLING'],['AF','EBOLA DEATHS PASS 5,700 IN CONGO'],['AF','CAMEROON EX-REBELS IN LIMBO'],['SP','LIVERPOOL 4-0 MAN UTD'],['SP','ALCARAZ WINS ATP FINALS']];
const TL=[['01:51','BENGHAZI SECURE'],['02:35','FACTORY FIRE: 24 DEAD'],['03:15','BELGIUM AIRPORTS SHUT'],['04:38','BOY, 7, RESCUED'],['05:12','AIR DEFENCE PLEDGED'],['07:42','WALL ST FEARS SELLING']];
rect(0,0,W,H,PAPER);
rect(0,0,W,72,NAVY);
text('THE WORLD IN ONE DAY',212,8,5,WHITE);
text('MONDAY 23 NOVEMBER 2026',368,50,2,GOLD);
rect(0,72,10,190,RED);
text(LEAD.tag+' | '+LEAD.place,26,86,2,RED);
text(LEAD.h1,26,112,5,INK);
text(LEAD.h2,26,152,5,INK);
text(LEAD.s1,26,198,2,INK);
text(LEAD.s2,26,220,2,INK);
pic(0,880,165,2,RED);
rect(0,262,W,2,INK);
for(let i=0;i<6;i++){const f=FEAT[i],cx=8+(i%3)*336,cy=272+Math.floor(i/3)*110;rect(cx,cy,328,104,WHITE);rect(cx,cy,328,3,RC[f.tag]);text(f.tag+' - '+f.name,cx+10,cy+12,2,RC[f.tag]);text(f.l[0],cx+10,cy+36,2,INK);text(f.l[1],cx+10,cy+58,2,INK);text(f.l[2],cx+10,cy+80,2,INK);pic(f.pic,cx+300,cy+20,1,RC[f.tag]);}
rect(0,494,W,2,INK);
text('REPORTED (UTC) - MONDAY 23 NOVEMBER 2026',8,506,2,INK);
for(let i=0;i<TL.length;i++){const x=8+i*168;text(TL[i][0],x,530,2,RED);text(TL[i][1],x,552,1,INK);}
text('THE REST OF THE DAY',8,582,2,INK);
pic(6,990,590,1,RED);
rect(0,606,W,2,INK);rect(508,616,2,350,GREY);
for(let i=0;i<LIST.length;i++){const col=i<22?0:1,row=i<22?i:i-22,x=8+col*508,y=616+row*16;text(LIST[i][0]+' -',x,y,2,RC[LIST[i][0]]);text(LIST[i][1],x+56,y,2,INK);}
rect(0,972,W,52,NAVY);
text('DATE CHECK: ALL 50 STORIES FIRST REPORTED MONDAY 23 NOVEMBER 2026',104,982,2,WHITE);
text('EU EUROPE - AS ASIA - ME MIDDLE EAST - AM AMERICAS - AF AFRICA - MK MARKETS - SP SPORT',248,1004,1,GOLD);
const CT=[];
for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xedb88320^(c>>>1):c>>>1;CT[n]=c>>>0;}
function crc(b){let c=0xffffffff;for(let i=0;i<b.length;i++)c=CT[(c^b[i])&0xff]^(c>>>8);return(c^0xffffffff)>>>0;}
function chk(t,d){const o=Buffer.alloc(12+d.length);o.writeUInt32BE(d.length,0);o.write(t,4,'ascii');d.copy(o,8);o.writeUInt32BE(crc(o.subarray(4,8+d.length)),8+d.length);return o;}
const ih=Buffer.alloc(13);
ih.writeUInt32BE(W,0);ih.writeUInt32BE(H,4);ih[8]=8;ih[9]=2;ih[10]=0;ih[11]=0;ih[12]=0;
const raw=Buffer.alloc(H*(1+W*3));
for(let y=0;y<H;y++){raw[y*(1+W*3)]=0;buf.copy(raw,y*(1+W*3)+1,y*W*3,(y+1)*W*3);}
const png=Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chk('IHDR',ih),chk('IDAT',z(raw,{level:9})),chk('IEND',Buffer.alloc(0))]);
m(O,{recursive:true});
w(j(O,'entry.png'),png);
