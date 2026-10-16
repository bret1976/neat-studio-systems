import random,math
random.seed(31)
s=['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700"><defs><pattern id="stone" width="9" height="11" patternUnits="userSpaceOnUse"><circle cx="2" cy="3" r=".45" fill="#282828" opacity=".4"/><path d="M7 7h.9M3 9h.6" stroke="#282828" stroke-width=".3"/></pattern><pattern id="shade" width="3" height="3" patternUnits="userSpaceOnUse"><path d="M0 3L3 0" stroke="#282828" stroke-width=".35" opacity=".65"/></pattern><linearGradient id="window" x2="1" y2=".7"><stop stop-color="#54584f"/><stop offset=".5" stop-color="#a2a697"/><stop offset="1" stop-color="#dedfd2"/></linearGradient><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="3" seed="12"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="table" tableValues="0 .4"/></feComponentTransfer><feComposite in2="SourceGraphic" operator="in"/><feBlend in2="SourceGraphic" mode="multiply"/></filter></defs>']
# Individually branched winter trees, behind the original pavilion.
s.append('<g stroke="#33372e" fill="none" stroke-linecap="round">')
def branch(x,y,length,angle,depth):
 x2=x+math.cos(angle)*length;y2=y+math.sin(angle)*length
 s.append(f'<path d="M{x:.1f} {y:.1f}L{x2:.1f} {y2:.1f}" stroke-width="{max(.35,depth*.55):.2f}"/>')
 if depth:
  for a in [-.47,.38]:branch(x2,y2,length*random.uniform(.63,.8),angle+a+random.uniform(-.15,.15),depth-1)
for x in [185,1020]:
 branch(x,580,85,-math.pi/2,6);branch(x,500,55,-2.2,5);branch(x,510,65,-.95,5)
s.append('</g><g stroke="#282828" stroke-width="1.4" fill="#e5e5d9" filter="url(#grain)">')
s.append('<path d="M245 550V170H955V550Z"/><path d="M245 550V170H955V550Z" fill="url(#stone)"/>')
for x in [265,405,545,685,825]:
 for y,h in [(185,150),(355,190)]:
  s.append(f'<path d="M{x} {y}h110v{h}H{x}Z" fill="url(#window)"/><path d="M{x+54} {y}v{h}M{x} {y+h-20}h110" fill="none"/>')
  if (x+y)%3==0:s.append(f'<path d="M{x} {y}h110v{h}Z" fill="#30352d" opacity=".32"/>')
# Solid upper end bays and asymmetric interior shadows.
s.append('<path d="M265 185H375V335H265ZM825 185H935V335H825Z" fill="#d5d6c9"/><path d="M265 185H375V335H265ZM825 185H935V335H825Z" fill="url(#stone)"/><path d="M265 245H375M825 245H935" stroke-width=".7"/><path d="M825 185L935 335H825Z" fill="url(#shade)"/><path d="M405 355L515 485V355ZM685 355L795 490V355Z" fill="#42463d" opacity=".7"/>')
for x in [245,385,525,665,805,945]:s.append(f'<path d="M{x} 160h9v390h-9Z" fill="#c3c7b7"/><path d="M{x+9} 160l5 6v384h-5Z" fill="#4f5448"/>')
s.append('<path d="M245 340H959V354H245Z" fill="#555a4d"/><path d="M245 170H959V179H245Z" fill="#3e4438"/>')
# Projecting central bay with a deep sill and clear entrance below.
s.append('<path d="M520 306H682V551H520Z" fill="#d5d6c9"/><path d="M531 316H670V536H531Z" fill="#3d4438"/><path d="M540 322H660V526H540Z" fill="url(#window)"/><path d="M600 322V526M540 425H660" fill="none" stroke-width="2"/><path d="M520 551H682L673 562H531Z" fill="#41473a"/><path d="M520 306L531 316V536L520 551Z" fill="url(#shade)"/>')
# Podium, stair geometry and terrace at the same normalized review regions.
s.append('<path d="M225 550H400V590H225Z"/><path d="M230 550H398L375 590H230Z" fill="url(#shade)"/>')
for i in range(10):s.append(f'<path d="M{230+i*1.5} {552+i*3.8}H{398-i*2}" fill="none" stroke-width=".8"/>')
s.append('<path d="M400 510H480V590H400ZM705 510H760V590H705ZM925 510H975V590H925Z"/><path d="M400 510L480 590H400ZM925 510L975 590H925Z" fill="url(#shade)"/><path d="M705 550H975V590H705Z"/><path d="M690 510H920V550H690Z" fill="none"/>')
for x in range(690,921,16):s.append(f'<path d="M{x} 510V550" fill="none" stroke-width=".65"/>')
s.append('<path d="M130 590H1070" fill="none" stroke-width="2"/></g><g fill="#68685f" font-family="monospace" font-size="8"><text x="500" y="132">NORTH COURT / PAVILION STUDY</text><text x="245" y="635">NORTH ELEVATION / 1:100</text><text x="930" y="635">A–001</text></g></svg>')
open('public/drawings/elevation.svg','w').write(''.join(s))
