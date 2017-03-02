import { CRMChartsPage } from './app.po';

describe('crmcharts App', () => {
  let page: CRMChartsPage;

  beforeEach(() => {
    page = new CRMChartsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
