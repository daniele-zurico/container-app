import { ContainerAppPage } from './app.po';

describe('container-app App', function() {
  let page: ContainerAppPage;

  beforeEach(() => {
    page = new ContainerAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
