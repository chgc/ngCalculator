import { NgCalculatePage } from './app.po';

describe('ng-calculate App', () => {
  let page: NgCalculatePage;

  beforeEach(() => {
    page = new NgCalculatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
