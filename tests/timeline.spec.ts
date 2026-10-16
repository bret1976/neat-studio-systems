import { test, expect } from '@playwright/test';
test.beforeEach(async ({page}) => {
  const token=process.env.VERCEL_OIDC_TOKEN;
  if(token){ const origin=new URL(process.env.BASE_URL!).origin; await page.route('**/*',r=>new URL(r.request().url()).origin===origin?r.continue({headers:{...r.request().headers(),'x-vercel-trusted-oidc-idp-token':token}}):r.continue()); }
});
test('resource filters and geometric navigation reach real articles',async({page})=>{
  await page.goto('/resources');
  await expect(page.locator('.resource-card')).toHaveCount(3);
  await page.getByRole('button',{name:'Model Review',exact:true}).click();
  await expect(page.locator('.resource-card')).toHaveCount(1);
  await page.locator('.resource-card').click();
  await expect(page).toHaveURL(/resources\/model-review$/);
  await expect(page.locator('.page-grid-transition')).toBeHidden();
  await expect(page.getByRole('heading',{level:1})).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/\/resources$/);
});
test('about identity morph is reversible and product feature controls remain reachable',async({page},info)=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/about');
  const slider=page.getByRole('slider',{name:'Plan to NEAT identity'});
  const path=page.locator('.identity-sticky > svg > path');
  await slider.fill('0'); const before=await path.getAttribute('d');
  await slider.fill('100'); expect(await path.getAttribute('d')).not.toBe(before);
  await slider.fill('0'); expect(await path.getAttribute('d')).toBe(before);
  await page.goto('/product/neat-control');
  await page.locator('.product-tour-nav').getByRole('button',{name:'PROJECT STANDARDS'}).click();
  await expect(page.locator('.tour-caption h2')).toHaveText('PROJECT STANDARDS');
  await expect(page.locator('.workspace')).toContainText('PROJECT STANDARDS');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.locator('.product-tour-nav').scrollIntoViewIfNeeded();
  await page.screenshot({path:`output/playwright/${info.project.name}/product-tour.png`});
});
