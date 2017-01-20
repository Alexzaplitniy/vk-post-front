import { VkPostFrontPage } from './app.po';

describe('vk-post-front App', function() {
  let page: VkPostFrontPage;

  beforeEach(() => {
    page = new VkPostFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
