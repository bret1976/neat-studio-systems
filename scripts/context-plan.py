"""Generate NEAT's original portrait courtyard plan. No external assets."""
from pathlib import Path
parts=['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700"><g fill="none" stroke="#8e9188" stroke-width=".6" opacity=".55">']
for x in range(230,801,50): parts.append(f'<path d="M{x} 10V690" stroke-dasharray="6 5"/>')
for y in range(50,651,50): parts.append(f'<path d="M220 {y}H800" stroke-dasharray="6 5"/>')
parts.append('</g><g fill="none" stroke="#282828" stroke-width="7">')
paths=['M280 50H420M470 50H720V200','M280 50V200H720','M280 200V360H420V440H280','M720 200V480H600V650','M280 440V650H430','M480 650H720V480','M420 200V310M420 360H600V200','M280 520H410V650']
for d in paths: parts.append(f'<path d="{d}"/>')
parts.append('</g><g fill="none" stroke="#72766c" stroke-width=".8">')
for x,y,w,h in [(300,75,95,60),(510,75,180,90),(448,225,125,100),(300,225,90,100),(300,460,90,40),(300,550,90,70),(450,470,120,130),(620,380,70,75)]:
    parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}"/>')
for x in [525,575,625,675]:
    for y in [65,175]:parts.append(f'<rect x="{x}" y="{y}" width="25" height="17" rx="3"/>')
for x,y in [(280,380),(430,650),(600,480),(420,310)]:parts.append(f'<path d="M{x} {y}h45v45M{x} {y+45}a45 45 0 0 1 45-45"/>')
for y in range(210,305,8):parts.append(f'<path d="M630 {y}h70"/>')
parts.append('<path d="M280 34V18H720V34M263 50H245V650H263M280 666V680H720V666M280 65V185M286 65V185M705 220V350M712 220V350M470 640H570M470 647H570"/></g>')
parts.append('<g fill="#777b70" font-family="monospace" font-size="8"><text x="460" y="15">22 000</text><text x="458" y="695">GROUND FLOOR / 1:100</text><text x="311" y="153">ARRIVAL</text><text x="535" y="130">MEETING ROOM</text><text x="462" y="285">COURTYARD</text><text x="302" y="345">STUDIO 01</text><text x="450" y="620">GALLERY</text><text x="300" y="635">SERVICE</text><text x="630" y="465">LIBRARY</text></g></svg>')
Path('public/drawings/context-plan.svg').write_text(''.join(parts))
