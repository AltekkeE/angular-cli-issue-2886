import { BugPage } from './app.po';

describe('bug App', function() {
  let page: BugPage;

  beforeEach(() => {
    page = new BugPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
