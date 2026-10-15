from pathlib import Path
p=Path('public/drawings')
head='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700"><defs><pattern id="hatch" width="5" height="5" patternUnits="userSpaceOnUse"><path d="M0 5L5 0" stroke="#20211e" stroke-width=".3" opacity=".3"/></pattern><pattern id="concrete" width="11" height="13" patternUnits="userSpaceOnUse"><circle cx="2" cy="3" r=".6" fill="#20211e" opacity=".22"/><circle cx="8" cy="9" r=".4" fill="#20211e" opacity=".3"/></pattern><linearGradient id="glass" x2=".8" y2="1"><stop stop-color="#e2e2d7"/><stop offset=".5" stop-color="#bfc3b7"/><stop offset="1" stop-color="#eff0e5"/></linearGradient></defs>'
a=[head,'<g fill="none" stroke="#b7b7aa" stroke-width=".6">']
for x in [250,390,530,670,810,950]: a.append(f'<path stroke-dasharray="8 5 1 5" d="M{x} 90V620"/><circle cx="{x}" cy="90" r="13"/><path d="M{x-7} 620h14"/>')
for y in [160,290,420,550]: a.append(f'<path stroke-dasharray="8 5 1 5" d="M170 {y}H1030"/><path d="M180 {y-5}v10"/>')
a+=['</g><g stroke="#272922" stroke-width="1.2">','<path d="M130 590H1070" fill="none" stroke-width="2"/><path d="M245 550V160H955V550" fill="#e7e6db"/><path d="M245 550V160H955V550" fill="url(#concrete)"/>']
for y in [170,300,430]:
 for x in [265,405,545,685,825]:
  a+=[f'<rect x="{x}" y="{y}" width="110" height="115" fill="url(#glass)"/><path d="M{x+55} {y}v115M{x} {y+92}h110" stroke-width="1.7"/><path d="M{x+5} {y+4}h100v107H{x+5}z" fill="none" stroke-width=".5"/>',f'<path d="M{x+4} {y+5}l96 90v15h-20L{x+4} {y+28}Z" fill="#fff" opacity=".25" stroke="none"/>']
for x in [245,385,525,665,805,945]: a +=[f'<rect x="{x}" y="145" width="10" height="405" fill="#dadace"/><path d="M{x+10} 145l5 5v400h-5" fill="#6f7369"/><path d="M{x+3} 155v385" stroke-width=".5"/>']
for y in [290,420,545]:a.append(f'<path d="M245 {y}h710v10H245z" fill="#8d9185"/>')
a+=['<path d="M522 295h156v255H522z" fill="#dadace"/><path d="M534 307h132v231H534z" fill="url(#glass)"/><path d="M578 307v231m44-231v231M534 423h132" fill="none" stroke-width="2"/>','<path d="M230 550h168v40H230zM398 550h125v40H398zM678 550h292v40H678z" fill="#d8d9cd"/>','<path d="M230 550h740v40H230z" fill="url(#concrete)"/>']
for i in range(8):a.append(f'<path d="M{240+i*2} {552+i*5}h{148-i*2}" stroke-width="1"/>')
a+=['<path d="M690 508h230M690 512h230M690 508v42m230-42v42" fill="none"/>']
for x in range(700,920,11):a.append(f'<path d="M{x} 512v38" stroke-width=".6"/>')
# Drawing trees: recursive original deterministic branches.
def branch(x,y,length,angle,depth):
 import math
 nx=x+math.cos(angle)*length;ny=y+math.sin(angle)*length
 a.append(f'<path d="M{x:.1f} {y:.1f}L{nx:.1f} {ny:.1f}" fill="none" stroke-width="{max(.4,depth*.55)}"/>')
 if depth>0:
  branch(nx,ny,length*.71,angle-.42,depth-1);branch(nx,ny,length*.69,angle+.5,depth-1)
branch(190,586,69,-1.55,6);branch(1020,586,70,-1.6,6)
a+=['</g><g fill="#686b60" font-family="monospace" font-size="9"><text x="176" y="650">NORTH ELEVATION / SCALE 1:100</text><text x="950" y="650">A—001</text><text x="165" y="555">±0.000</text><text x="165" y="425">+3.600</text><text x="165" y="295">+7.200</text><text x="165" y="165">+10.800</text><text x="500" y="120">NORTH COURT / DESIGN STUDY</text></g><g stroke="#85847b" stroke-width=".5"><path d="M245 615H955M245 608v14M955 608v14M245 615l7-3m703 3l-7 3"/></g></svg>']
(p/'elevation.svg').write_text(''.join(a))
# Original courtyard plan, consistent coordinates with interactive UI.
a=['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700"><defs><pattern id="tiles" width="25" height="25" patternUnits="userSpaceOnUse"><path d="M25 0H0V25" fill="none" stroke="#c9c7bd" stroke-width=".5"/></pattern></defs><g fill="none" stroke="#c9c7bd" stroke-width=".7">']
for x in range(100,901,100):a.append(f'<path d="M{x} 45v610" stroke-dasharray="9 5"/><circle cx="{x}" cy="40" r="12"/>')
for y in range(100,601,100):a.append(f'<path d="M60 {y}h880" stroke-dasharray="9 5"/>')
a+=['</g><path d="M150 100H850V600H150Z" fill="url(#tiles)" stroke="#20211e" stroke-width="9"/><path d="M430 260H650V460H430z" fill="#e0e1d2" stroke="#20211e" stroke-width="6"/><g fill="none" stroke="#20211e" stroke-width="7"><path d="M150 260h210m70 0h220m70 0h130M150 450h210m70 0h220m70 0h130M350 100v90m0 70v190m0 80v70M650 100v90m0 70v190m0 80v70M150 350h140m0 0v100M750 260v100h100"/></g><g fill="none" stroke="#6e7065" stroke-width="1.5"><path d="M350 190a70 70 0 0 1-70 70v-70zM650 190a70 70 0 0 0 70 70v-70zM350 530a70 70 0 0 0 80-70h-80zM650 530a70 70 0 0 1 70-70h-70z"/><rect x="180" y="130" width="120" height="80"/><rect x="190" y="140" width="40" height="60"/><rect x="250" y="140" width="40" height="60"/><rect x="700" y="130" width="120" height="80"/><rect x="390" y="130" width="210" height="65"/><circle cx="225" cy="530" r="42"/><rect x="740" y="490" width="60" height="75"/>']
for i in range(12):a.append(f'<path d="M750 {275+i*6}h85"/>')
a+=['</g><g font-family="monospace" font-size="11" fill="#686b60"><text x="185" y="240">BEDROOM 01</text><text x="700" y="240">BEDROOM 02</text><text x="470" y="365">COURTYARD</text><text x="190" y="590">LOUNGE</text><text x="710" y="590">STUDIO</text><text x="390" y="90">NORTH COURT / LEVEL 01</text><text x="150" y="655">PLAN A—101 / 1:100</text></g></svg>']
(p/'plan.svg').write_text(''.join(a))
logo='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 90"><path d="M8 70V15h15l30 43V15h15v55H53L23 27v43Z" fill="#20211e"/><text x="78" y="70" font-family="Arial,sans-serif" font-weight="800" font-size="77" letter-spacing="-5" fill="#20211e">EAT</text><rect x="267" y="58" width="13" height="13" fill="#c84932"/></svg>'
Path('public/logos/neat.svg').write_text(logo)
Path('public/logos/neat-white.svg').write_text(logo.replace('#20211e','#faf9f5'))
Path('public/logos/mark.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><path d="M12 65V15h12l30 35V15h12v50H54L24 30v35Z" fill="#20211e"/><path d="M5 5h18M5 5v18M75 75H57m18 0V57" fill="none" stroke="#c84932" stroke-width="2"/></svg>')
Path('src/app/icon.svg').write_text(Path('public/logos/mark.svg').read_text())
