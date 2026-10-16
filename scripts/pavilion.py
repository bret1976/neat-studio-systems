"""Original North Court elevation: engraved concrete, recessed glazing, projecting bay.
All geometry and deterministic stipple/branch marks are authored here, without source artwork.
"""
import math
import random
from pathlib import Path
rng = random.Random(3106)
svg = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700"><defs>']
svg.append('<pattern id="concrete-grain" width="151" height="137" patternUnits="userSpaceOnUse">')
for i in range(950):
    x, y = rng.uniform(0, 151), rng.uniform(0, 137)
    r = rng.choice([.13, .18, .22, .3, .45, .65])
    svg.append(f'<circle cx="{x:.2f}" cy="{y:.2f}" r="{r}" fill="#22231f" opacity="{rng.uniform(.12,.58):.2f}"/>')
svg.append('</pattern><pattern id="charcoal" width="103" height="127" patternUnits="userSpaceOnUse">')
for i in range(1800):
    x, y = rng.uniform(0, 103), rng.uniform(0, 127)
    svg.append(f'<path d="M{x:.2f} {y:.2f}l{rng.uniform(-.6,.6):.2f} {rng.uniform(.1,1):.2f}" stroke="#20211e" stroke-width="{rng.uniform(.13,.6):.2f}" opacity="{rng.uniform(.2,.8):.2f}"/>')
svg.append('</pattern><linearGradient id="glass" x1="0" y1="0" x2="1" y2=".3"><stop stop-color="#bdbfb1"/><stop offset=".48" stop-color="#ececde"/><stop offset="1" stop-color="#d7d8c8"/></linearGradient><linearGradient id="recess"><stop stop-color="#45473e"/><stop offset=".35" stop-color="#92958a"/><stop offset="1" stop-color="#b9bbac"/></linearGradient><linearGradient id="cast" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#30332b"/><stop offset="1" stop-color="#8a8d7f"/></linearGradient></defs>')
# Dense, uneven winter crowns with curved branch junctions rather than a regular fractal.
svg.append('<g fill="none" stroke-linecap="round">')
def branch(x, y, length, angle, depth, shade):
    nx, ny = x + math.cos(angle)*length, y + math.sin(angle)*length
    bend = rng.uniform(-2.8, 2.8)
    width = max(.18, depth**1.35*.23)
    svg.append(f'<path d="M{x:.2f} {y:.2f}Q{(x+nx)/2+bend:.2f} {(y+ny)/2:.2f} {nx:.2f} {ny:.2f}" stroke="{shade}" stroke-width="{width:.2f}"/>')
    if depth:
        for delta in [-rng.uniform(.22,.55),rng.uniform(.22,.55)]:
            branch(nx,ny,length*rng.uniform(.64,.79),angle+delta,depth-1,shade)
        if depth > 3 and rng.random() < .24:
            branch(nx,ny,length*.66,angle+rng.uniform(-.15,.15),depth-2,shade)
for x, y, size, depth, shade in [(192,514,58,7,'#85877c'),(220,516,65,8,'#30332b'),(263,516,58,7,'#56594f'),(958,516,66,8,'#33362d'),(1003,516,60,7,'#7c8072')]:
    branch(x,y,size,-math.pi/2,depth,shade)
svg.append('</g>')
def shape(d,fill='#e0e1d3',stroke='#292b25',width=.9,texture=False):
    svg.append(f'<path d="{d}" fill="{fill}" stroke="{stroke}" stroke-width="{width}"/>')
    if texture:svg.append(f'<path d="{d}" fill="url(#concrete-grain)" stroke="none"/>')
def line(d,width=.8,color='#3f4238'):
    shape(d,'none',color,width)
# Entire front rises from the low podium. Its ends are massive concrete, not five equal glazed bays.
shape('M288 590V211H399V240H800V217H912V590Z',texture=True)
# Deep left/right glazed recesses, paper-bright central glass.
for x,w in [(414,96),(686,114)]:
    shape(f'M{x} 252h{w}v292h-{w}Z','url(#recess)')
    shape(f'M{x} 252h{w}v292h-{w}Z','url(#charcoal)','none',0)
    for xx in [x+10,x+w-9]:line(f'M{xx} 254V543',1.2)
    line(f'M{x} 382h{w}M{x} 393h{w}',2)
# Concrete panels, cast shadow boundaries and faint formwork.
shape('M288 211H399V372H288Z',texture=True)
shape('M800 217H912V590H800Z',texture=True)
shape('M800 241L912 378H800Z','url(#cast)',texture=True)
shape('M800 241L912 378H800Z','url(#charcoal)','none',0)
line('M288 272H399M288 328H399M800 278H912M800 337H912M800 397H912M800 454H912',.45,'#828679')
for x in [296,390,808,904]:
    for y in [228,302,354,415,481]:
        svg.append(f'<circle cx="{x}" cy="{y}" r=".8" fill="#606456"/>')
# Offset floor beam and narrow full-height structural fins.
shape('M399 239H800V250H399Z','#4f5348',width=.8)
shape('M288 373H912V386H288Z','#707366',width=.8)
for x,top in [(288,211),(402,214),(510,197),(672,197),(787,212),(904,217)]:
    shape(f'M{x} {top}h7V590h-7Z','#d0d2c3',width=.7,texture=True)
    shape(f'M{x+7} {top}l5 4V590h-5Z','#41463a',width=.7)
    line(f'M{x+2} {top+3}V588',.5,'#8f9485')
# Projecting two-level bay: tall vertical glazing and a deep suspended lower sill.
shape('M510 241H686V517H510Z','#767c6d',width=1,texture=True)
shape('M521 253H674V505H521Z','#3c4235',width=1)
shape('M530 263H665V497H530Z','url(#glass)',width=.7)
for x in [575,620]:line(f'M{x} 263V497',1.4)
shape('M521 373H674V387H521Z','#525849',width=1)
line('M530 393H665M530 489H665',.8)
shape('M510 517H686L674 531H523Z','#353b2e',width=1)
shape('M510 517L674 531L713 590H557Z','url(#cast)','none',0)
shape('M510 517L674 531L713 590H557Z','url(#charcoal)','none',0)
# A smaller door in the right recess and shaded concrete below the left glass.
shape('M711 394H771V480H711Z','#d5d7c6',width=1)
line('M742 394V480M711 433H771',1.6)
shape('M414 394L510 506V394Z','#41483a','none',0)
shape('M414 394L510 506V394Z','url(#charcoal)','none',0)
# Podium, solid parapets, descending left stair and short terrace wall.
shape('M180 514H912V590H180Z',texture=True)
shape('M192 516H353V590H192Z','#bbbfae',texture=True)
shape('M192 516L221 590H192Z','url(#cast)','none',0)
for i in range(11):
    y=519+i*6.4
    line(f'M{194+i*.6:.1f} {y:.1f}H353',.8)
    line(f'M{194+i*.6:.1f} {y+1.6:.1f}H353',.25,'#8a8e7e')
shape('M353 480H402V590H353Z',texture=True)
shape('M788 480H823V590H788Z',texture=True)
shape('M823 516H1018V590H823Z',texture=True)
shape('M823 516L891 590H823Z','url(#cast)','none',0)
shape('M823 516L891 590H823Z','url(#charcoal)','none',0)
shape('M180 514H192V590H180Z',texture=True)
line('M130 590H1070',1.6)
svg.append('</svg>')
Path('public/drawings/elevation.svg').write_text(''.join(svg))
