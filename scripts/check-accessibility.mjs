import {webkit} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
const browser=await webkit.launch();const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});const page=await context.newPage();await page.goto('http://localhost:3120/');await page.waitForTimeout(300);const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();console.log(JSON.stringify(result.violations.map(v=>({id:v.id,help:v.help,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),null,2));await browser.close();
